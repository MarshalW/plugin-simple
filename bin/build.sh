#!/usr/bin/env bash
set -euo pipefail

# ------------------------------
# 配置区
# ------------------------------

REGISTRY="docker-registry:5000"
IMAGE_NAME="simple-app"
PACKAGE_JSON="packages/plugins/@marshal/plugin-simple-service/package.json"

# ------------------------------
# 基础校验
# ------------------------------

if [ ! -f "$PACKAGE_JSON" ]; then
  echo "[ERROR] package.json not found: $PACKAGE_JSON" >&2
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "[ERROR] jq is required but not installed" >&2
  exit 1
fi

# ------------------------------
# 构建流程
# ------------------------------

echo "===> yarn build"
yarn build

echo "===> lerna publish"
npx lerna publish

echo "===> read version from package.json"
VERSION="$(jq -r '.version' "$PACKAGE_JSON")"

if [ -z "$VERSION" ] || [ "$VERSION" = "null" ]; then
  echo "[ERROR] failed to read version from $PACKAGE_JSON" >&2
  exit 1
fi

echo "===> version detected: $VERSION"

IMAGE_TAG="${REGISTRY}/${IMAGE_NAME}:${VERSION}"

echo "===> docker build: $IMAGE_TAG"
docker build \
  --build-arg APP_VERSION="${VERSION}" \
  -t "${IMAGE_TAG}" \
  .

echo "===> docker push: $IMAGE_TAG"
docker push "${IMAGE_TAG}"

echo "===> DONE"
