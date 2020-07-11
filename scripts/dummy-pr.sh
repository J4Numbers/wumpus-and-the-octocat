#/bin/bash

curl -X POST \
  --data-binary "@../data/dummy-pr.json" \
  --header "Content-Type: application/json" \
  --header "X-GitHub-Event: pull_request" \
  http://localhost:8080/
