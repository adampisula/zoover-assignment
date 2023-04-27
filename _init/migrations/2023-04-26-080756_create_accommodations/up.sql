CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS accommodations (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),

  name TEXT NOT NULL,
  slug VARCHAR(255) NOT NULL,

  address__zipcode TEXT NOT NULL,
  address__street TEXT NOT NULL,

  _created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  _updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp,

  PRIMARY KEY(id),
  CONSTRAINT accommodations_slug_unique UNIQUE (slug)
);

