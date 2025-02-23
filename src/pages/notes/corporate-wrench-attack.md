---
title: corporate wrench attack
---

I came across this blog series from Kin, a personal AI startup, about privacy in in personal AIs: https://blog.mykin.ai/p/privacy-in-personal-ai

The first three parts were quite good, and do a decent job covering 1) why we should care about privacy for this use
case, and 2) high level technical approaches used to preserve privacy while balancing usability tradeoffs.  I'd
recommend a read for anyone interested in the topic of data privacy inside and outside of AI.

My biggest issue is not with them specifically, but a trend I see across ~80-90% of startups with privacy as a core
value: they focus only on the technical and gloss over the social-but-still-very-real ways that privacy can be
compromised.  At the end of the day, the company itself still a trusted party in the transaction, and a lot can go
wrong.  Off the top of my head:

- CEO wakes up one day, decides privacy is overrated vs product velocity, and updates the system to undo a lot of the
  fancy encryption stuff so they can Move Faster(TM).
- CEO gets hit by a truck, control of the company goes to a stakeholder, perhaps a family member, who is decidedly less
  privacy-friendly.
- Company needs to juice revenue for a raise, decides they want the money from selling data, ideology be damned.  Oh
  wait, [that's not a hypothetical](https://www.reuters.com/technology/reddit-ai-content-licensing-deal-with-google-sources-say-2024-02-22/).
- Company gets acquired and the acquirer decides that privacy is overrated and they'd rather have the money from selling
  data.  Or they just decide to sunset the project because it's a pain to maintain and develop.

... And so on.  It's the corporate version of the [wrench attack](https://xkcd.com/538/).  Even with a flawless
technical implementation, all it takes is one human factor.  Even if the code is fully public and attested, the median
user is not going to read every update.

For all their faults, [DAOs](https://en.wikipedia.org/wiki/Decentralized_autonomous_organization) (remember when they
were the "future of work" and the "death of the traditional firm"?) at least spent time thinking about the governance
and legal structures that buttress the tech.  The great shame is most of them, to my knowledge, spent so much time on
governance that very little other value was delivered.  Perhaps in the next crypto bull run?
