FROM node:10.16.0
USER node

ENV BUILD=${PLATFORM_BUILD_NUMBER}
ENV USER_HOSTNAME=${USER_HOSTNAME}
ENV API_URL=http://api.${USER_HOSTNAME}.zonkej.cz
ENV APP_URL=http://app.${USER_HOSTNAME}.zonkej.cz
ENV REDIRECT_URL=/public/index.html
ENV COOKIE_DOMAIN_NAKED=.zonkej.cz

COPY ./ /home/node
COPY ./scripts/docker/start.sh /home/node/start.sh

USER root
RUN chown node:node -R /home/node

USER node
RUN cd /home/node/ && npm ci

WORKDIR /home/node

CMD ["sh", "/home/node/start.sh"]
