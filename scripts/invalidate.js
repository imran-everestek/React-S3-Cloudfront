#!/usr/bin/env node

const shell = require("shelljs");
const config = {
  deploy: {
    bucketUrl: "<your-bucket-url>", // TODO: change this
    cacheControlMaxAge: 300,
    cloudFrontDistributionId: "<cloudfront-distribution-id>", // TODO: change this
  },
};

console.log("config deploy:", config.deploy.bucketUrl);

const tryShell = (command) => {
  shell.exec(command);
  if (shell.error()) process.exit(1);
};

const setContentType = (ext, type) =>
  tryShell(`
    aws s3 cp \
      --exclude '*' \
      --include '*.${ext}' \
      --content-type '${type}' \
      --metadata-directive 'REPLACE' \
      --recursive ${config.deploy.bucketUrl} ${config.deploy.bucketUrl}
  `);

// upload
console.log("going for fix content-type:---------->");
tryShell(`aws s3 sync --delete out ${config.deploy.bucketUrl}`);

// fix content-types
setContentType("css", "text/css");
setContentType("eot", "font/eot");
setContentType("jpeg", "image/jpeg");
setContentType("jpg", "image/jpeg");
setContentType("js", "application/javascript");
setContentType("json", "application/json");
setContentType("png", "image/png");
setContentType("svg", "image/svg+xml");
setContentType("ttf", "font/ttf");
setContentType("woff", "font/woff");
setContentType("woff2", "font/woff2");

console.log("going for copy & set max-age:---------->");
// set max-age
tryShell(
  `aws s3 cp --exclude "*" --include "*.css" --include "*.eot" --include "*.jpeg" --include "*.jpg" --include "*.js" --include "*.json" --include "*.png" --include "*.svg" --include "*.ttf" --include "*.webp" --include "*.woff" --include "*.woff2" --cache-control max-age=${config.deploy.cacheControlMaxAge} --metadata-directive "REPLACE" --recursive ${config.deploy.bucketUrl} ${config.deploy.bucketUrl}`,
);

console.log("going for invalidate cloudfront cache:---------->");
// invalidate cloudfront cache
tryShell(
  `aws configure set preview.cloudfront true && aws cloudfront create-invalidation --distribution-id ${config.deploy.cloudFrontDistributionId} --paths "/*"`,
);
