FROM node:alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --silent
COPY . .
EXPOSE 8080
CMD ["yarn", "start"]
