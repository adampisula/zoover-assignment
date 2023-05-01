#!/bin/bash

if [[ -z "${DATABASE_URL}" ]]; then
  echo "DATABASE_URL environment variable is not set"
  exit 1
else
  diesel migration run && echo "Migrations ran successfully"
fi
