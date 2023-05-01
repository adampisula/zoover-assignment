FROM rust:1.69-slim-buster

RUN apt-get update -y && apt-get install libpq-dev -y
RUN cargo install diesel_cli --no-default-features --features postgres

WORKDIR /app

COPY . .

RUN chmod +x ./entrypoint.sh

CMD [ "/bin/bash", "./entrypoint.sh" ]
