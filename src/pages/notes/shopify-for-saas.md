---
title: shopify for saas
---

What could a "Shopify for SaaS companies" look like? Shopify helps with undifferentiated heavy lifting in ecomm: user
registration + login, order status emails, cart management, etc. With Shopify, merchants are free to focus on the core
unique competitive parts of their business: making + selling their product.

It feels like there's the same sort of undifferentiated heavy lifting in building a SaaS business, so what's the
equivalent? This turned into a long one so hold onto your butts, y'all.

### Users + everything around them
A "Shopify for SaaS" has to be built around customer data. Every SaaS company has some notion of a customer account,
from an individual user up to an organization of multiple teams of users. Managing user records requires user login /
registration as a minimum. Teams of users requires support for roles and permissions, e.g. "only a team manager can add
a user to a team." This is well-trodden territory, with both [enterprise players](https://aws.amazon.com/cognito/) and
startups that are mature enough to have [exited](https://auth0.com/blog/okta-acquisition-announcement/).

What's missing is connecting these records to everything else:

- Managing billing against product functionality, e.g. "only enterprise tier customers can access X feature," "customer
  A only has N credits left."
- Attribution of a customer to a marketing campaign, traffic source, or CRM lead. Sending information back into the
  original CRM for upsells and other post-sale activity.
- Syncing with customer service software so that requests can be triaged for existing customers vs new users, tier of
  customer, etc.
- Other functionality that's somewhat tied to the product lifecycle but generic to the business, e.g. user referral
  program management.
- These are all items that 1) most SaaS companies need to grow and operate, 2) suck up a lot of resources usually in the
  form of developer time + operations debt, but 3) are not part of the business' core offering.

### What I like a lot
- Solving this problem reduces the amount of toil required for SaaS businesses and is a net good for the world.
- Developers are typically the costliest resource in a software company, so it's very much in businesses' interest to
  only allocate dev time to work that will make or break the business.
- As a kicker, this type of work is tedious scut work for 99% of developers – I say this with all the love of having
  built at least half a dozen such systems. They'd rather be working on a cool customer-facing feature, and so probably
  will drag their feet at the prospect of Yet Another Marketo Sync.
- Big switching cost moat. Ripping out a user reg system is already nerve-wracking on the best of days. Replacing that +
  everything else? Forget it.
- Unlike ~most SaaS ideas these days, product + architecture can be an enduring competitive advantage. Tacit knowledge
  of vendors' APIs + idiosyncrasies, followed by effectively managing and abstracting that away from the customer, adds
  up to some serious [process power](https://7powers.com/).

### What I like less
- Tight timing window for sales and likely a looong ramp to revenue growth. Getting an existing company to adopt a new
  solution is hard because of switching costs. Prospects need to be found and closed just as they're starting a product
  buildout, and most people do not start new companies (or even products) that often.
- The large surface area can make it hard to gain momentum without a large up-front investment. e.g. it's hard to get
  operational leverage on your Zendesk integration if your first five customers want to use Zendesk, Intercom,
  Freshdesk, and Helpscout.
- Market education will contribute to the cold start problem. Founders today do not commonly search for a solution in
  this shape, e.g. there are no google keywords to go bid up as far as I know. Market awareness needs to be built from
  scratch, which is a long and arduous grind.
- I believe that "a great strength is also a weakness" (and vice versa). So unsurprisingly, a lot of the con's here are
  just the other side of the coin for the pro's. All that said, what are some angles of attack?

### Possible approaches

#### productized consulting
- Customer comes to you, says "We're building a b2b saas that does [...] It's got a few tiers of flat monthly fees and
  customers will likely need teams, [...]" With that info, determine the most likely combination that they will need.
- Deliver a "product-in-a-box." This can be a code repo in a popular tech stack, e.g. Rails, Next.js, Laravel, etc.
  Include boilerplate for integrating with all the bits needed in their stack: Zendesk, Hubspot, Stripe, and so on. Just
  put in the API keys and go.
- Going further: a done-for-you tier. Sign up for the relevant services with best practice setups. Instead of a code
  repo, there is now a deployed PoC with everything fully plugged in and ready for dev. Hand over a 1Pass vault with all
  the credentials. Batteries (and API keys) included.
- Hang around startup accelerators, incubators, etc, and offer these services to start. This is a good way to gauge
  demand + fit. If one is determined to not take funding, revenue from this consulting could be used to bootstrap a
  sustainable product.

#### integrations as a service
- Deliver a middleware SaaS application (let's call it SaaSify) that sits as an intermediary between the main product
  and all the other service providers.
- Developers get a single, sane, vendor-agnostic API for users, application-level events, CRM sync, etc. SaaSify helps
  normalize all data passing through the systems, e.g. phone and country code formats, email case sensitivity, timestamp
  time zones.
- SaaSify also handles common API infra operations. Where possible, it automatically handles concerns like idempotency,
  retries, rate limiting, etc. It nudges towards best practice for all implementations.
- Folks in operations, marketing, etc get a polished admin panel that represents a single source of truth for the user.
  Information is easily shared between teams because it's living in one place and reflecting the data across different
  systems.
- Staff can perform common tasks like updating customer billing info in SaaSify, or jump out to the specific vendor for
  more involved work. Information is synced back and forth automatically.

#### oracle, but make it sexy
- I feel like modern tech startup workers have an instinctual ick for the likes of Oracle and SAP, but I'm going to drop
  this here anyway. What if it's time for a
  [re-bundling](https://hbr.org/2014/06/how-to-succeed-in-business-by-bundling-and-unbundling) of SaaS company
  infrastructure?
- The current abundance of separate products per function has offered endless flexibility, but everyone I've talked to
  has gotten tired of managing it all – not to mention the $$. Now that
  [ZIRP](https://en.wikipedia.org/wiki/Zero_interest-rate_policy) is over by most accounts, folks are starting to pay
  more attention to their burn rate – and by extension, the total cost of their piecemeal application
  stack.
- Is there finally room in the market for a fully integrated solution again? Would people go for a product that does
  their CRM, user reg, billing, email flows, etc? One that offers 80% of the functionality of separate apps for, say,
  50% of the price and 30% of the complexity? "Oracle, but not shit and made for modern tech companies"?
- 'cause let's be real here, even assuming we know what "best in class" means, is e.g. helpdesk software choice really
  moving the needle for the business? Is a handful of incremental features in Zendesk vs Intercom really going to make
  or break the company? Or will it make a bigger impact to spend less time futzing with 23 SaaSes and more time thinking
  about the business' customer and core product?
- Those aren't rhetorical questions, by the way. I honestly have no idea if such a thing would fly right now. Just
  throwing the idea out there.

### Final thoughts
I first thought about "Shopify for SaaS" circa ~2020-21 while considering startup ideas. Flash forward
to 2024 and I think this is still as real a problem as before. Is this the right shape of solution and can a real
business can be built around it? Well, that's the question isn't it.
