# streaming-site

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Docker
```bash
# build docker image
docker build -t pw20-streaming-site:latest .

# run docker image
docker run --publish 80:80 pw20-streaming-site:latest
```
