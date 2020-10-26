FROM node:10-alpine as builder

WORKDIR /work
COPY . .

RUN yarn install && yarn generate

FROM nginx
COPY --from=builder /work/dist /usr/share/nginx/html
