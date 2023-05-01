# Builder image
FROM rust:1.69-slim-buster AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y pkg-config libssl-dev

# Install and build dependencies to prevent cache invalidation
COPY ./Cargo.toml ./Cargo.lock ./
RUN mkdir src && echo "fn main() { println!(\"dummy\"); }" > src/main.rs 
RUN cargo build --release && rm -rf src/ && rm -f target/release/data-importer*

# Build app
COPY . .
RUN cargo clean --release -p data-importer && cargo build --release

# Runtime image
FROM debian:buster-slim AS runtime

RUN apt-get update && apt-get install -y pkg-config libssl-dev

WORKDIR /app

COPY --from=builder /app/target/release/data-importer ./data-importer

CMD ["./data-importer"]
