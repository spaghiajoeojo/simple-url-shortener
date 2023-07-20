# Simple URL Shortener

## How to start
To start the project simply run the following command from root folder:
```
docker compose up
```

Command to run in dev mode (/w hot reload):
```
docker compose -f docker-compose-dev.yaml up
```

## Introduction
This project uses [ExpressBeans](https://github.com/spaghiajoeojo/express-beans) (a framework written by me) for Dependency Injection and Express routing. It consists in two applications containerized (sus-client and sus-server).
RabbitMQ is used to implement RPC between client and server.
- sus-client exposes all the endpoints to the outer network
- sus-server consumes messages and execute tasks to calculate responses

## How to use
A [Postman collection](/Simple%20URL%20Shortener.postman_collection.json) is provided to use the system.
Collection's variables:
- user: it is sent via header "x-user", it simulates a token and identify a user
- shortId: it is populated automatically when a `POST /short` is made. It represents the 6 character long id that composes the short url `/u/<shortId>`.

# Known limitations
- generic errors are managed but no mapping with appropriate HTTP statuses was made
- no checks are made on already inserted URLs
