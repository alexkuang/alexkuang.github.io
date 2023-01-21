---
title: alice
layout: post
tags: blog
date: 2023-01-17
---

alice is, as a bunch of friends already know, my version of the old car in the garage: a hobby project that's fun to
tinker with but with almost-certainly-not-maximal utility.  Despite the lack of practical use and its complete
nonviability as a business, I keep coming back to the idea and I want to spend more of this year obeying the
[inscrutable exhortations of my soul](https://www.gocomics.com/calvinandhobbes/2015/03/16), so here we are.  Hopefully
this ramble plants a flag for more future work + writing.

### so what's alice?

alice is:
- a second brain in the grand tradition of [memexes](https://en.wikipedia.org/wiki/Memex) and [bicycles for the mind](https://www.themarginalian.org/2011/12/21/steve-jobs-bicycle-for-the-mind-1990/)
- ... AKA a personal google because google is garbage these days
- proving a point (or at least, trying) that a lot of modern software "best practices" are bloated and one person can still make something useful
- a result of my hubris wondering "why the hell doesn't this exist already, surely it's not that hard"
- a small part in The Resistance against personal data being held hostage in Way Too Many tech company silos
- perhaps, if lucky, foundational life infrastructure that will serve me in years to come :)

### ok but what does it actually do?

Right now, not a lot!  It pulls my web bookmark + highlight data out of the [raindrop](https://raindrop.io/) API and
whacks it together with my local Brave browsing history.  It indexes that data in
[sqlite](https://www.sqlite.org/fts5.html) and exposes a simple search and timeline view.  Demo forthcoming as soon as
I figure out a dummy data setup + loom / something.

### why "alice"?

- It's easier to repeat than "my toy mini google second brain app thing."
- There's probably a pun here about falling down rabbit holes, or something.
- Some dude Jeff has already taken Alexa, apparently.

### what's next?

Immediately next is some boring infra stuff.  The initial idea was to have alice run completely locally on my laptop,
but over time I realized I'd also really like access to it via mobile.  Thus, first order of business is to migrate the
app to a real server.  I'll also be switching out the db from sqlite to postgres while I'm at it.  Using postgres will
open up some new (ahem, completely gratuitous) fancy db stuff, plus I'll be able to start using
[oban](https://hexdocs.pm/oban/Oban.html) for background jobs instead of homegrown GenServers.  I'll be hooking
everything up via [tailscale](https://tailscale.com/) so you know, my entire personal data footprint isn't just floating
around on the open internet.

After that the arbitrary Not a Roadmap is something like:
- teaching alice about meetings, humans in said meetings, and how to keep notes on each
- first class sync with google calendar to pull lots of that info automatically
- maybe some sort of sync with contact apps?
- text editor + rendering that doesn't suck and is not just a plain `textarea`
- better keyboard shortcuts, esp for firing off the search ui
- automated ingestion of kindle notes + highlights
- ... And More (TM)!
