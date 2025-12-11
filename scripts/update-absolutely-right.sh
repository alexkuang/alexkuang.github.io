#!/usr/bin/env bash
set -euo pipefail

# Update the "absolutely right" counter by fetching the most recent public commit date

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
DATA_FILE="$REPO_ROOT/src/data/absolutely-right.json"

if [ -z "${GH_TOKEN:-}" ]; then
  echo "Error: GH_TOKEN environment variable is required"
  echo "Usage: GH_TOKEN=your_token $0"
  exit 1
fi

# Fetch recent public events for the user
RESPONSE=$(curl -s -H "Authorization: token $GH_TOKEN" \
  "https://api.github.com/users/alexkuang/events/public?per_page=100")

# Find the most recent PushEvent and extract its timestamp
LAST_COMMIT_DATE=$(echo "$RESPONSE" | jq -r '
  [.[] | select(.type == "PushEvent")] |
  first |
  .created_at // empty
')

if [ -z "$LAST_COMMIT_DATE" ] || [ "$LAST_COMMIT_DATE" = "null" ]; then
  echo "No push events found, keeping existing data"
  exit 0
fi

echo "Last public commit: $LAST_COMMIT_DATE"

# Write to data file
cat > "$DATA_FILE" << EOF
{
  "lastCommitDate": "$LAST_COMMIT_DATE",
  "updatedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF

echo "Updated $DATA_FILE"
