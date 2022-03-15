FROM node:8.9.1-slim AS builder

EXPOSE 7001

RUN \
  mkdir -p /var/app && \
  mkdir -p /var/app-build && \
  mkdir -p /var/app-run

RUN \
  buildDeps='git make g++' && \
  apt-get update && apt-get install -y $buildDeps

COPY package-build.json /var/app-build/package.json
RUN cd /var/app-build && npm install --no-package-lock --no-optional

COPY package-run.json /var/app-run/package.json
RUN cd /var/app-run && npm install --no-package-lock --no-optional


FROM node:8.9.1-slim
COPY --from=builder /var/app /var/app
COPY --from=builder /var/app-run /var/app-run
COPY --from=builder /var/app-build /var/app-build

WORKDIR /var/app

ENV NODE_ENV production
ENV EGG_SERVER_ENV prod

CMD ["/usr/local/bin/node", "/var/app/index.js"]
