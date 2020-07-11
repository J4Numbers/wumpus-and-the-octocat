#/bin/bash

curl -X POST \
  --data-binary "@../data/dummy-create.json" \
  --header "Content-Type: application/json" \
  --header "X-GitHub-Event: create" \
  http://localhost:8080/
