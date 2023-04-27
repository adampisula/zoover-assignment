CREATE TYPE review_status AS ENUM (
  'approved',
  'pending_approval',
  'removed'
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  zoover_review_id INT4 NOT NULL,

  accommodation_id UUID NOT NULL, 

  user_name VARCHAR(255) NOT NULL,

  title VARCHAR(255),
  text TEXT NOT NULL,
  status review_status NOT NULL DEFAULT 'pending_approval',

  general_score REAL NOT NULL,
  score_aspects JSON NOT NULL DEFAULT '{}',

  created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,

  PRIMARY KEY(id),
  CONSTRAINT zoover_review_id_unique UNIQUE (zoover_review_id)
);

