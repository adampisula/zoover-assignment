# Assignment

## Init

To-do.

## Data importer

To-do.

Snippets:

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
