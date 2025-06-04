---
title: local secrets automation with 1pass
publishedAt: "2024-12-03T00:00:00-05:00[America/New_York]"
---

One of the annoying things about running the personal cloud is managing secrets (API keys, google creds, etc) for
the bits that run locally on my laptop.

So far I've just been shuffling these creds around local-only env files tied to a couple of start scripts. It's kind of
a pain cause the files can't be shared or committed to GitHub for obvious reasons so I have to walk on glass every time
I touch them. And lord help if I accidentally delete one of the files or get them mixed up somehow.

Last week I finally got tired of the nonsense and automated it via 1Pass. Apparently they have a nifty
[command line package](https://developer.1password.com/docs/cli) that makes this pretty easy. (And if you're not running
1Pass or some password manager by now... What are you doing??)

First bit is jamming all the local app secrets into their own vault + setting up a
[service account](https://developer.1password.com/docs/service-accounts/get-started/) for it. This makes it so the CLI
start scripts just have access to those secrets, vs my entire 1Pass account:

```bash
op service-account create local-apps --vault local_apps:read_items
```

To actually use the secrets, set up a new env file with 1pass urls:

```bash
DATABASE_URL="op://local_apps/server_phoenix_settings_prod/database_url"
SECRET_KEY="op://local_apps/server_phoenix_settings_prod/secret_key"
AWS_ACCESS_KEY_ID="op://local_apps/server_aws_prod/username"
AWS_SECRET_ACCESS_KEY="op://local_apps/server_aws_prod/credential"
GOOGLE_CLIENT_ID="op://local_apps/server_google_prod/username"
GOOGLE_CLIENT_SECRET="op://local_apps/server_google_prod/credential"
```

Then op run injects them into the environment:

```bash
op run --env-file="./.deploy.env" -- ./bin/server start
```

Now the local app secrets have all the usual 1Pass convenience: history tracking, sharing between machines, encryption
at rest, etc. Plus I can (finally!) commit the 1pass env files to GitHub as part of the build.
