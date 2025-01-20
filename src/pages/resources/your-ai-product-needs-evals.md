---
title: Your AI Product Needs Evals
url: https://hamel.dev/blog/posts/evals/
---

Evals are key in bridging the [[AI demo-product chasm]].

> Unlike typical unit tests, you want to organize these assertions for use in places beyond unit tests, such as data
> cleaning and automatic retries (using the assertion error to course-correct) during model inference.

> One signal you are writing good tests and assertions is when the model struggles to pass them - these failure modes
> become problems you can solve with techniques like fine-tuning later on.

Smells a bit like "TDD, but for AI"

> unlike traditional unit tests, you don’t necessarily need a 100% pass rate. Your pass rate is a product decision,
> depending on the failures you are willing to tolerate.

Another frame for this is sample size.  Model output is not deterministic, so how many runs do you give a test to pass?
Anecdotally, lots of folks seem to go "*shrug* 3-5 runs for acceptance?"

> Fine-tuning is best for learning syntax, style, and rules, whereas techniques like RAG supply the model with context
> or up-to-date facts.

> 99% of the labor involved with fine-tuning is assembling high-quality data that covers your AI product’s surface area.
> However, if you have a solid evaluation system like Rechat’s, you already have a robust data generation and curation
> engine!
