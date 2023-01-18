---
layout: base.html
permalink: "/"
---

Hello, world! Welcome to bikeshed.coffee, the personal site of Alex Kuang.

### /now

- Living in New York
- Starting a [new company](https://www.parallax.to/) in web 2.42069
- Learning the basics of olympic lifting
- Working on closing my first rental property
- Thinking about the missed potential of modern software

### /contact

I want to meet interesting people and nerd out about stuff.  The best way to get in touch is email: hi @ this domain.

I'm also on the socials: [twitter](https://twitter.com/waffledotexe), [linkedin](https://www.linkedin.com/in/khxela/),
[github](https://github.com/alexkuang)

### /blog

{% for post in collections.blog reversed %}
<p>
    <a href="{{ post.url }}">{{ post.data.title }}</a> <i><span style="font-size: .875rem">{{ post.date | postDate }}</span></i>
</p>
{% endfor %}
