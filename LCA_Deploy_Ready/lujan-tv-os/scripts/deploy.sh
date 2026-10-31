#!/bin/bash
# Dev preview: serve src/ from your computer and open it on the Fire TV over ADB.
# Usage: ./scripts/deploy.sh <TV_IP>        e.g. ./scripts/deploy.sh 192.168.1.50
# For daily use, install the sideloaded Fire TV app instead (see README).
set -euo pipefail
TV_IP="${1:?Usage: ./scripts/deploy.sh <TV_IP>}"
DIR="$(cd "$(dirname "$0")/.." && pwd)"

lsof -ti:8080 | xargs kill -9 2>/dev/null || true
python3 -m http.server 8080 -d "$DIR/src" >/dev/null 2>&1 &
HOST_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}' || true)
if [ -z "$HOST_IP" ]; then
  echo "Error: Could not detect local LAN IP address." >&2
  exit 1
fi

adb connect "$TV_IP:5555"
adb -s "$TV_IP:5555" shell am start -a android.intent.action.VIEW -d "http://$HOST_IP:8080"
echo "Serving http://$HOST_IP:8080 (LUJAN TV OS) to $TV_IP"
