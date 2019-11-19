FROM jekyll/jekyll:3.8 AS build

ENV WORKDIR /var/www/web

WORKDIR ${WORKDIR}

COPY . ${WORKDIR}/

RUN mkdir ${WORKDIR}/_site

RUN jekyll build --trace

FROM nginx:1.15.8-alpine

WORKDIR /usr/share/nginx/html

COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /var/www/web/_site .






