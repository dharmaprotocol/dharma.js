npm run docs:build

S3_BASE_URL=s3://json-docs/dharma.js

# Version key/value should be on his own line
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

S3_URL=$S3_BASE_URL/$PACKAGE_VERSION npm run docs:upload
