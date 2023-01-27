### STAGE 1: Build ###
FROM docker.io/node:16 as build
ARG CACHEBUST=1
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY .npmrc angular.json custom-webpack.config.js package.json tsconfig.app.json tsconfig.json tsconfig.spec.json  /usr/src/app/
RUN yarn install --silent
#COPY public /usr/src/app/public
COPY src /usr/src/app/src
RUN yarn run build

### STAGE 2: Production Environment ###
# build for example with:
# docker build -t $TAG \
#		--build-arg GIT_COMMIT=$(git rev-parse HEAD) \
#		--build-arg GIT_VERSION="$(git log --pretty='format:%h %s' -q -1)" .
FROM docker.io/nginx:1.22-alpine
COPY nginx/default.conf.template /etc/nginx/templates/
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
EXPOSE 3000
ARG GIT_COMMIT
ARG GIT_VERSION
LABEL platform=react git.commit=$GIT_COMMIT git.version=$GIT_VERSION
CMD ["nginx", "-g", "daemon off;"]
