---
title: ingesting brave browser history
layout: post
tags: blog
date: 2022-09-21
---

As part of shaving the "build a personal google" yak (longer story for another time), I wanted to extract and ingest my
browsing history into a system that I fully control.  I use Brave, but this also works for Chrome in much the same way.

First, the location.  On Macs this is `~/Library/Application Support/BraveSoftware/Brave-Browser/[Default || Profile N]/History/brave_history.sqlite`.
For chrome, the location is similar `~/Library/Application Support/BraveSoftware/Google/Chrome/[Default || Profile N]/History`.

The history is kept in a sqlite database, either `brave_history.sqlite` or `History`.  It's usually locked while the
browser process is running, but a quick hack is to make a copy of the file to a temp location to make it
read/write-able.

From there, the usual sqlite exploration tools work.  I recommend `litecli`, by the same folks behind the excellent
`pgcli`.  An example query to extract browsing history into denormalized rows to throw into a csv or what have you:

```sql
select
  v.id,
  v.visit_time,
  u.url as url,
  u.title as url_title
from
  visits v
inner join urls u
  on v.url = u.id;
```

A quick note on `visit_time`: it is not milliseconds from unix epoch, as I had initially expected.  It's actually
*microseconds* from the *win32* epoch, which is `Jan 1 1601 00:00:00 UTC`.  To get to unix epoch millis, subtract
`11644473600000000` from `visit_time` and divide by 1000.
