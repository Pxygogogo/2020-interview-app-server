# Build
FROM node:13.6.0-alpine as builder
WORKDIR /app
COPY . .
RUN yarn config set registry https://registry.npm.taobao.org && yarn && ./node_modules/.bin/tsc


# Deploy
FROM node:13.6.0-alpine

WORKDIR /app
COPY --from=builder /app/dist .
COPY --from=builder /app/package.json .
RUN yarn config set registry https://registry.npm.taobao.org && yarn --production && yarn global add pm2
EXPOSE 8080

CMD ["pm2-docker", "start", "index.js"]
