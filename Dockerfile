FROM node:current-alpine as builder

WORKDIR /work
COPY . .

RUN npm install && npm run generate

FROM nginx:mainline-alpine
COPY --from=builder /work/dist /usr/share/nginx/html
