#/bin/bash

curl -X POST \
  --data-binary "@../data/dummy-push.json" \
  --header "Content-Type: application/json" \
  --header "X-GitHub-Event: push" \
  http://localhost:8080/
