#/bin/bash

curl -X POST \
  --data-binary "@../data/dummy-ping.json" \
  --header "Content-Type: application/json" \
  --header "X-GitHub-Event: ping" \
  http://localhost:8080/
