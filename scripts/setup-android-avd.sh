#!/usr/bin/env bash
set -euo pipefail

SDK_ROOT="${ANDROID_SDK_ROOT:-${ANDROID_HOME:-$HOME/Android/Sdk}}"
SDKMANAGER="$SDK_ROOT/cmdline-tools/latest/bin/sdkmanager"
AVDMANAGER="$SDK_ROOT/cmdline-tools/latest/bin/avdmanager"
IMAGE="${1:-system-images;android-34;google_apis;x86_64}"
AVD_NAME="${2:-Pixel_6_API_34}"
DEVICE_ID="${3:-pixel_6}"

if [[ ! -x "$SDKMANAGER" || ! -x "$AVDMANAGER" ]]; then
  echo "Android SDK tools not found under $SDK_ROOT"
  echo "Expected cmdline-tools/latest/bin/sdkmanager and avdmanager"
  exit 1
fi

echo "Installing Android emulator packages..."
yes | "$SDKMANAGER" --install "emulator" "$IMAGE"

if "$AVDMANAGER" list avd | grep -q "Name: $AVD_NAME"; then
  echo "AVD already exists: $AVD_NAME"
else
  echo "Creating AVD: $AVD_NAME"
  echo "no" | "$AVDMANAGER" create avd -n "$AVD_NAME" -k "$IMAGE" --device "$DEVICE_ID"
fi

echo
echo "Ready."
echo "Start it with:"
echo "  $SDK_ROOT/emulator/emulator -avd $AVD_NAME"
