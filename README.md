# streaming-site

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Docker
```bash
# build docker image
docker build -t pw20-streaming-site:latest .

# run docker image
docker run --publish 80:80 pw20-streaming-site:latest
```

## Loading the schedule
### Local development
Download schedule.json from `https://cfp.privacyweek.at/pw20/schedule/export/schedule.json` and place it in `static`
### Server deployment
When deploying a generated build, make sure the server regularly fetches the `schedule.json` and places it in the top-most level next to `index.html`.
