---
title: zsh startup slowness
layout: post
tags: blog
date: 2022-08-07
---

For a while now I've felt like my zsh has been starting up more and more slowly. It's one of those small annoyances that
builds up over time, especially if you pop a lot of shells via e.g. tmux and have to wait more than "One Mississippi" to
do anything.  This week I finally got annoyed enough to do something about it.

## before

Step one is to figure out exactly how slow and why.  First I timed the init:

```
$ time zsh -i -c exit
0.71s user 0.58s system 52% cpu 2.479 total`
```

... Two and a half seconds??  Ouch.

Next was to figure out what was causing the slowness via the profiler:

```sh
# in .zshrc...
zmodload zsh/zprof
# rest of config file
zprof
```

This gets zsh to print out a breakdown of resource use for everything in `.zshrc`.  The output looks something like:

```
num  calls                time                       self            name
-----------------------------------------------------------------------------------
 1)    2         288.03   144.01   20.45%    288.03   144.01   20.45%  compdump
 2)    2         697.50   348.75   49.53%    209.51   104.76   14.88%  compinit
 3)    1         538.85   538.85   38.26%    200.08   200.08   14.21%  nvm_auto
 4)    2         338.77   169.39   24.05%    193.05    96.53   13.71%  nvm
 5) 1563         156.34     0.10   11.10%    156.34     0.10   11.10%  compdef
 6)    1         126.92   126.92    9.01%    114.74   114.74    8.15%  nvm_ensure_version_installed
 7)    4          44.64    11.16    3.17%     44.64    11.16    3.17%  compaudit
 8)    5          34.08     6.82    2.42%     34.08     6.82    2.42%  __rvm_db
```

tl;dr - the first 25 or so lines for me were dominated by nvm and rvm.  Somehow not surprised.

## nvm

nvm apparently takes forever for a variety of reasons, so the best course is to only use it when needed.  There are
manual solutions out there, but I decided to lean into oh-my-zsh and just use the plugin's built-in lazy functionality.
After removing the manual nvm install:

```
# in .zshrc / config
export NVM_LAZY=1
plugins=(nvm)
```

## rvm

rvm is mostly around as cruft I had picked up over the ages.  I don't use ruby often (or at all) these days, so I just
went ahead and removed it.  However, there are [other](https://github.com/FrederickGeek8/zsh-rvm-lazy)
[solutions](https://github.com/gowda/lazy-load.sh) for folks who still need it + want lazy loading.

## after

After the above, the time went down to about:

```
time zsh -i -c exit  0.23s user 0.10s system 101% cpu 0.332 total
```

Repeated runs showed it mostly starting in .3 - .5 sec.  Pretty good, but still plenty of room for improvement.
