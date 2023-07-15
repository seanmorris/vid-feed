FROM ruby:3.1.2-bullseye

RUN apt update \
    && apt install -y --no-install-recommends \
        nodejs      \
        libxml2-dev \
        libxslt-dev \
        postgresql

RUN mkdir /app

WORKDIR /app

COPY Gemfile ./Gemfile

COPY Gemfile.lock ./Gemfile.lock

RUN bundle install -j 20

COPY . .
