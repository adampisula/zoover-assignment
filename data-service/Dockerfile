FROM python:3.11-slim

COPY Pipfile Pipfile.lock ./
RUN python -m pip install --upgrade pip
RUN pip install pipenv && pipenv install --dev --system --deploy

WORKDIR /app

COPY . .

CMD [ "/bin/bash", "./entrypoint.sh" ]
