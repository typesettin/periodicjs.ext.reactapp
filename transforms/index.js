'use strict';
const periodic = require('periodicjs');
const asset = require('./asset');

module.exports = {
  pre: {
    GET: {
      // '/some/route/path/:id': [testPreTransform],
    },
    PUT: {}
  },
  post: {
    GET: {
      [`/r-admin/contentdata/standard_assets/:id`]: [
        asset.formatAssetItem,
        // asset.getFileMetaInfo(periodic),
      ],
      [`/r-admin/contentdata/standard_assets`]: [
        asset.formatAssetIndex,
      ],
    },
    PUT: {}
  }
}