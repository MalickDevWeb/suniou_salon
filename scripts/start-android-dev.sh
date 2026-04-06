#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SDK_ROOT="${ANDROID_SDK_ROOT:-${ANDROID_HOME:-$HOME/Android/Sdk}}"
EMULATOR_BIN="$SDK_ROOT/emulator/emulator"
ADB_BIN="$SDK_ROOT/platform-tools/adb"
AVD_NAME="${1:-Pixel_6_API_34}"

if [[ ! -x "$EMULATOR_BIN" || ! -x "$ADB_BIN" ]]; then
  echo "Android emulator tools not found under $SDK_ROOT"
  exit 1
fi

if ! "$ADB_BIN" devices | grep -q $'\tdevice$'; then
  echo "Starting emulator $AVD_NAME..."
  nohup "$EMULATOR_BIN" -avd "$AVD_NAME" >/tmp/suniou-android-emulator.log 2>&1 &
  echo "Waiting for Android device..."
  "$ADB_BIN" wait-for-device
fi

cd "$ROOT_DIR"
npm run android
