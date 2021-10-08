# Install the node dependencies for the jekyll website
FROM node:16-alpine AS node-build

ENV WORKDIR /usr/src/application/frontend

WORKDIR ${WORKDIR}

COPY . .

RUN apk add --no-cache bash git && npm ci && npm run build

# Final nginx image with the website compiled
FROM nginx:1.21.3-alpine

WORKDIR /usr/share/nginx/html

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=node-build /usr/src/application/frontend/build .
