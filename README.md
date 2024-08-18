# jkkwatcher

This is an application for personal use. Since it performs web scraping, please be careful not to overload the server by setting the cron interval to at least one day apart.

## Development

Create ./dev/.env

```bash
GITHUB_USER_NAME=${GITHUB_USER_NAME}
GITHUB_TOKEN=${GITHUB_TOKEN}
GITHUB_EMAIL=${GITHUB_EMAIL}
JKK_USERID=${JKK_USERID}
JKK_PASSWORD=${JKK_PASSWORD}
NOTIFY_TOKEN=${NOTIFY_TOKEN} # Slack web api token
```

Run a container

```bash
make develop
```

Then attach the container and execute commands the below

```bash
# Start watch ts files to build to js files
make watch

# Run built app
make run
```
