---
title: can you alarm on it?
---

There's a stock phrase I see occasionally in finance: "can you trade it?"  That is: if you have information or a read on
the market that's actually good, then surely you can use it to make a profitable trade.  It's a bit glib (and yes,
almost satirically capitalist) but I do like it as a litmus test.  When gathering information it's easy to get lost and
drop into consumption for consumptions' sake.  This question is a reminder of the original purpose, which in finance is:
can you trade on it?

This pitfall exists in a wider business context, or at least it does the tech-centric one that I've spent most time in.
In the quest to be "data-driven," teams often collect all sorts of data points, carefully collate it, and arrange it
into a nice looking dashboard.  But then the efforts fizzle out.  People stop paying attention, maybe the dashboard
stops being updated.  It becomes a side comment in new hire onboarding: "oh yeah, nobody really looks at that, it's
super outdated."  I suspect one reason is that the it's not actually useful.  The charts are pretty, but if you point at
one and ask, "Are things going well?  How will the line move next week?" answers would likely involve much hemming and
hawing.

There's a similar test question in the dev ops world, even if we don't say out loud it as often: "can you alarm on it"?
Tech systems collect all sorts of metrics, e.g. CPU usage, data storage, network traffic.  It almost comes by default
these days in the cloud.  Plus any application-specific ones we add: transactions executed, emails sent, login attempts,
etc.  These numbers are well and good and can also go in some pretty charts, but the real test is the alarm setup.  An
alarm shows that we've done the thinking to make the metrics useful.  It takes a good operator's instinct and makes it
explicit.  This threshold is "business as usual," but anything outside it requires special attention: we're going viral,
or the database needs an upgrade, or there is a spammer in the system.  Someone should investigate.

What's the equivalent in higher level business?  What's a good litmus test for usefulness of metrics for upper
management?  The closest I've found is the [XmR chart](https://sixsigmastudyguide.com/xmr-charts/), but I haven't seen
it implemented first-hand.
