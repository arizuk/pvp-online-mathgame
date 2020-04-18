FROM namely/protoc-all

RUN apk add make

WORKDIR /app
COPY Makefile /app
COPY proto /app

ENTRYPOINT []
CMD ["make", "gen"]