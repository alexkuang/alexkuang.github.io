---
title: full text search with sqlite
publishedAt: "2023-01-30T00:00:00-04:00"
---

As a part work on an old project, I used [sqlite native fts](https://www.sqlite.org/fts5.html) for an MVP full text
search.  The setup was interesting + ~mostly worked, so it deserves a quick walkthrough.

### index + trigger setup

For the this walkthrough, let's say I have a table `bookmarks` with a title and a description field.  First step is
setting up the index:

```sql
create virtual table
  fts_bookmarks
using fts5(
  title,
  description,
  content=bookmarks,
  content_rowid=id
);
```

The `content` option tells sqlite that this is an [external content table](https://www.sqlite.org/fts5.html#external_content_tables)
-- that is, the full bookmark content lives outside of `fts_bookmarks`.  I chose this setup because 1) `bookmarks`
contains other information that doesn't need full text search; 2) I already have a `bookmarks` table, so duplicating all
fields is a waste of space; 3) I still want some fields e.g. title to be easily accessible without joining.

The downside is that sqlite leaves it to the user to ensure that the index is up to date with the source content.  This
is relatively straightforward with triggers, though a bit verbose:

```sql
create trigger bookmarks_ai after insert on bookmarks begin
  insert into fts_bookmarks(rowid, title, description) values (new.id, new.title, new.description);
end;

create trigger bookmarks_ad after delete on bookmarks begin
  insert into fts_bookmarks(fts_bookmarks, rowid, title, description) values('delete', old.id, old.title, old.description);
end;

create trigger bookmarks_au after update on bookmarks begin
  insert into fts_bookmarks(fts_bookmarks, rowid, title, description) values('delete', old.id, old.title, old.description);
  insert into fts_bookmarks(rowid, title, description) values (new.id, new.title, new.description);
end;
```

Unfortunately, sqlite doesn't offer first-class `update` or `delete` operations on external FTS tables.  Instead, you
have to insert a 'delete' command with the exact current values in order to delete or update a given row. NB inserting a
'delete' with the wrong values can bork the entire index.  The reasoning given in [the docs](https://www.sqlite.org/fts5.html#the_delete_command)
makes sense, but still seems like a leaky abstraction and an annoying gotcha.

### doing search

After all the pomp and circumstance, the index can be used like so:

```sql
select rowid from fts_bookmarks where fts_bookmarks match 'some title';
```

With light ecto wrapping:

```sql
select rowid as id, rank
from fts_bookmarks
where fts_bookmarks match 'some title'
order by rank;
```

It's worth noting that sqlite has its own [query syntax](https://www.sqlite.org/fts5.html#full_text_query_syntax) +
tokenization which is exposed in its unadulterated form to the caller.  This can lead to some weird edge cases, e.g.
`query_string = 'abc.d'` will fail because of the naked period.

### is it good?

I stand by my characterization from the intro: sqlite fts5 is interesting and ~mostly works.  Would I reach for it
again?  Sure, if I'm stuck in sqlite and want to write minimum app code :)  There are enough sharp edges that I wouldn't
use it as-is for anything end user facing, but at the same time it's a nice addition to the toolkit for the
quick-and-dirty use cases.
