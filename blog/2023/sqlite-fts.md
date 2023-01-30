---
title: full text search with sqlite + elixir
layout: post
tags: blog
date: 2023-01-30
---

As a part of my work on [alice]({{"/blog/2023/alice/" | url}}), I wanted to have full-text search on my bookmark
metadata, including highlights.  The initial implementation used [sqlite native fts](https://www.sqlite.org/fts5.html) +
the excellent [ecto](https://hexdocs.pm/ecto/Ecto.html) for interaction in elixir.  Though alice has since moved to
postgres, the sqlite setup was interesting + ~mostly worked, so it deserves a quick walkthrough.

## index + trigger setup

For the this walkthrough, let's say I have a table `bookmarks` with a title and a description field.  First step is
setting up the index:

```elixir
defmodule Alice.Repo.Migrations.AddFtsIndexes do
  use Ecto.Migration

  def change do
    # first arg is used for migrating up; second for migrating down
    execute(
      """
      create virtual table
        fts_bookmarks
      using fts5(
        title,
        description,
        content=bookmarks,
        content_rowid=id
      );
      """,
      "drop table fts_bookmarks;"
    )
  end
end
)
```

The `content` option tells sqlite that this is an [external content table](https://www.sqlite.org/fts5.html#external_content_tables)
-- that is, the full bookmark content lives outside of `fts_bookmarks`.  I chose this setup because 1) `bookmarks`
contains other information that doesn't need full text search; 2) I already have a `bookmarks` table, so duplicating all
fields is a waste of space; 3) I still want some fields e.g. title to be easily accessible without joining.

The downside is that sqlite leaves it to the user to ensure that the index is up to date with the source content.  This
is relatively straightforward with triggers, though a bit verbose:

```elixir
# rest of migration scaffolding omitted
execute(
  """
  create trigger bookmarks_ai after insert on bookmarks begin
    insert into fts_bookmarks(rowid, title, description) values (new.id, new.title, new.description);
  end;
  """,
  "drop trigger bookmarks_ai;"
)

execute(
  """
  create trigger bookmarks_ad after delete on bookmarks begin
    insert into fts_bookmarks(fts_bookmarks, rowid, title, description) values('delete', old.id, old.title, old.description);
  end;
  """,
  "drop trigger bookmarks_ad;"
)

execute(
  """
  create trigger bookmarks_au after update on bookmarks begin
    insert into fts_bookmarks(fts_bookmarks, rowid, title, description) values('delete', old.id, old.title, old.description);
    insert into fts_bookmarks(rowid, title, description) values (new.id, new.title, new.description);
  end;
  """,
  "drop trigger bookmarks_au;"
)
```

Unfortunately, sqlite doesn't offer first-class `update` or `delete` operations on external FTS tables.  Instead, you
have to insert a 'delete' command with the exact current values in order to delete or update a given row. NB inserting a
'delete' with the wrong values can bork the entire index.  The reasoning given in [the docs](https://www.sqlite.org/fts5.html#the_delete_command)
makes sense, but still seems like a leaky abstraction and an annoying gotcha.

## doing search

After all the pomp and circumstance, the index can be used like so:

```sql
select rowid from fts_bookmarks where fts_bookmarks match 'some title';
```

With light ecto wrapping:

```elixir
query_string = "some title"

from(r in "fts_bookmarks", select: %{id: r.rowid, rank: r.rank})
|> where([_], fragment("fts_bookmarks match ?", ^query_string))
|> order_by([r], r.rank)
|> Repo.all()
```

It's worth noting that sqlite has its own [query syntax](https://www.sqlite.org/fts5.html#full_text_query_syntax) +
tokenization which is exposed in its unadulterated form to the caller.  This can lead to some weird edge cases, e.g.
`query_string = 'abc.d'` will fail because of the naked period.

## more tables

I also ran into a hitch when indexing more tables, e.g. `highlights`.  With FTS the `where` clause you want is
effectively the same for every table: `... where $table match '$query_string`.  DRY-ing up the `match` fragment proved
less than straightforward.

My first attempt was to put the table in the args -- I didn't think this structure would work with prepared statements,
but figured it was worth a try in case of magic.  It compiled but unsurprisingly errored at runtime with `unable to use
function MATCH in the requested context`:

```elixir
def fts_match(query, fts_table, fts_query) do
  from r in query,
    where: fragment(unquote("? match ?"), ^fts_query),
    order_by: r.rank
end
```

Straight string interpolation -- `fragment("#{fts_table} match ?", ^fts_query)` -- did not even compile, for the obvious
reason: `(Ecto.Query.CompileError) to prevent SQL injection attacks, fragment(...) does not allow strings to be
interpolated as the first argument [...]`

Eventually I settled on a light macro approach that preserves safety while minimizing repetition:

```elixir
[
  "fts_bookmarks",
  "fts_highlights"
]
|> Enum.each(fn fts_table ->
  defp fts_match(query, unquote(fts_table), fts_query) do
    from r in query,
      where: fragment(unquote("#{fts_table} match ?"), ^fts_query),
      order_by: r.rank
  end
end)
```

## is it good?

I stand by my characterization from the intro: sqlite fts5 is interesting and ~mostly works.  Would I reach for it
again?  Sure, if I'm stuck in sqlite and want to write minimum app code :)  There are enough sharp edges that I wouldn't
use it as-is for anything end user facing, but at the same time it's a nice addition to the toolkit for the
quick-and-dirty use cases.
