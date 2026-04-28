#!/usr/bin/env bash

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name')

if [ "$tool_name" = "create_file" ] || [ "$tool_name" = "replace_string_in_file" ]; then
  npx prettier --write .
fi
