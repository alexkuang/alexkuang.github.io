#!/usr/bin/env bash
# Updates the "absolutely right" counter with most recent contribution data
set -euo pipefail


SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
DATA_FILE="$REPO_ROOT/src/data/absolutely-right.json"

if [ -z "${GH_TOKEN:-}" ]; then
  echo "Error: GH_TOKEN environment variable is required"
  echo "Usage: GH_TOKEN=your_token $0"
  exit 1
fi

QUERY='query($userName: String!) {
  user(login: $userName) {
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}'

RESPONSE=$(curl -s -H "Authorization: bearer $GH_TOKEN" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "$(jq -n --arg query "$QUERY" '{"query": $query, "variables": {"userName": "alexkuang"}}')" \
  "https://api.github.com/graphql")

LAST_COMMIT_DATE=$(echo "$RESPONSE" | jq -r '
  .data.user.contributionsCollection.contributionCalendar.weeks
  | map(.contributionDays)
  | flatten
  | map(select(.contributionCount > 0))
  | last
  | .date
')

if [ -z "$LAST_COMMIT_DATE" ] || [ "$LAST_COMMIT_DATE" = "null" ]; then
  echo "No contributions found"
  exit 0
fi

echo "Last contribution: $LAST_COMMIT_DATE"

# Write to data file
cat > "$DATA_FILE" << EOF
{
  "lastCommitDate": "$LAST_COMMIT_DATE",
  "updatedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF

echo "Updated $DATA_FILE"
