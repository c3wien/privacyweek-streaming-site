FROM node:10-alpine as builder

WORKDIR /work
COPY . .

RUN npm install && npm run generate

FROM nginx
COPY --from=builder /work/dist /usr/share/nginx/html
