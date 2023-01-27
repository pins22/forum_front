FROM node:19-alpine as base

WORKDIR /front
COPY package.json package-lock.json /front/
COPY . /front


# This stage builds the svelte app
FROM base as build
# Would be "production" in a perfect world, but good luck getting svelte auth to work xd
ENV NODE_ENV=development
# ENV ORIGIN=https://dragondrop.online
ENV ORIGIN=http://front:3000
RUN npm install --ommit=dev
RUN npm run build


# This stage runs the production svelte app
FROM build as production
# Would be "production" in a perfect world, but good luck getting svelte auth to work xd
ENV NODE_ENV=development
ENV ORIGIN=http://0.0.0.0:3000
CMD ["node", "./build/index.js"]

FROM base as dev

ENV NODE_ENV=development
ENV ORIGIN=http://front:3000
RUN npm install
CMD ["npm" ,"run", "dev"]
