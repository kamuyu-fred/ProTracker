#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install

# bundle exec rails db:drop DISABLE_DATABASE_ENVIRONMENT_CHECK=1
bundle exec rails db:create
bundle exec rails db:migrate
bundle exec rails db:seed