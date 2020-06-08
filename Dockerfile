FROM node:12-alpine AS builder
ARG app
ARG target
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build:$app

FROM node:12-alpine
ARG app
ARG target
ENV app=$app
ENV NODE_ENV=$target
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD npm run start:prod:$app
