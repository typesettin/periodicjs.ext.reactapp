'use strict';
const periodic = require('periodicjs');
const pluralize = require('pluralize');
const path = require('path');

/**
 * if return a path always prefixed with a '/' 
 */
function getManifestPathPrefix(prefix) {
  return periodic.utilities.routing.manifest_prefix(prefix);
}

function getDataPrefix(options) {
  const { adminRoute, schemaName, dataRoute = 'contentdata', } = options;
  return `${(periodic.utilities.routing.route_prefix(path.join(adminRoute,dataRoute,pluralize(schemaName))))}?format=json`;
}

function getDataRoute(options) {
  const { adminRoute, schemaName, dataRoute = 'contentdata', } = options;
  return `${(periodic.utilities.routing.route_prefix(path.join(adminRoute,dataRoute,pluralize(schemaName))))}`;
}

function getIndexLabel(schemaName) {
  return `${schemaName}_index`;
}

function getContainerPath(options) {
  const { adminRoute, schemaName, } = options;
  return `${adminRoute}data/${pluralize(schemaName)}`;
}

module.exports = {
  getManifestPathPrefix,
  getDataPrefix,
  getDataRoute,
  getIndexLabel,
  getContainerPath,
};