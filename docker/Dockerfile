FROM node:latest as base

ARG NODE_ENV
ARG APP_PORT

WORKDIR /server
EXPOSE ${APP_PORT}
ENV NODE_ENV=${NODE_ENV}

CMD ["tail","-f","/dev/null"]
