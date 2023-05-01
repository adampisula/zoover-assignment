# Assignment

**Note**: this runs on Docker Compose. I haven't included any volumes there, so the data will most likely be erased the moment you `docker compose down`.

To start up all services navigate to the main directory (containing `_init/`, `data-importer/`, etc.) and run:

```bash
docker compose up -d
```

## Init

Init (found in `_init/`) runs migrations (sets up the database schema) the moment Postgres starts up and then quits.

## Data importer

**Note**: by default runs on port *3000*.

Data importer is a REST API allowing you to upload JSON files to store in the database.

### Routes

- `/accommodation`
    - Method: *POST*
    - Body (JSON): accommodation JSON representation

- `/accommodations`
    - Method: *POST*
    - Body (JSON): JSON list of accommodations

- `/review`
    - Method: *POST*
    - Body (JSON): review JSON representation

- `/reviews`
    - Method: *POST*
    - Body (JSON): JSON list of reviews

### Snippets

Since the outputs can get pretty lengthy, I advise to pipe them to a file like in the following snippets.

- upload a single accommodation

    ```bash
    curl -X POST -H "Content-Type: application/json" -d @./single_accommodation.json http://localhost:3000/accommodation | jq > single_accommodation_output.json
    ```

- upload all accommodations

    ```bash
    curl -X POST -H "Content-Type: application/json" -d @./accommodations.json http://localhost:3000/accommodations | jq > accommodations_output.json
    ```

- upload a single review

    ```bash
    curl -X POST -H "Content-Type: application/json" -d @./single_review.json http://localhost:3000/review | jq > single_review_output.json
    ```

- upload all reviews

    ```bash
    curl -X POST -H "Content-Type: application/json" -d @./reviews.json http://localhost:3000/reviews | jq > reviews_output.json
    ```

## Data service

**Note**: by default runs on port *4000*.

Data service is a REST API allowing you to retrieve accommodation data and its reviews.

### Routes

- `/accommodation/{slug}`
    - Method: *GET*
    - Path params:
        - `slug`: accommodation slug

- `/accommodations`
    - Method: *GET*

- `/accommodation/{slug}/review`
    - Method: *GET*
    - Path params:
        - `slug`: accommodation slug
    - Query params:
        - `id`: review id (`zoover_review_id` field)

- `/accommodation/{slug}/reviews`
    - Method: *GET*
    - Path params:
        - `slug`: accommodation slug

### Snippets

Since the outputs can get pretty lengthy, I advise to pipe them to a file like in some of the following snippets.

- get accommodation data

    ```bash
    curl http://localhost:4000/accommodation/granada-luxury-belek | jq
    ```

- get all accommodations

    ```bash
    curl http://localhost:4000/accommodations | jq > all_accommodations.json
    ```

- get single review

    ```bash
    curl http://localhost:4000/accommodation/granada-luxury-belek/review\?id\=19376892 | jq
    ```

- get all reviews for accommodation

    ```bash
    curl http://localhost:4000/accommodation/granada-luxury-belek/reviews | jq > all_reviews.json
    ```

## Scoring service

**Note**: by default runs on port *5000*.

Scoring service is a REST API allowing you to retrieve weighted both general and score aspects.

### Routes

- `/score/{slug}`
    - Method: *GET*
    - Path params:
        - `slug`: accommodation slug

### Snippets

- get scores for accommodation

    ```bash
    curl http://localhost:5000/score/granada-luxury-belek | jq
    ```
