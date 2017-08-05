'use strict';
const periodic = require('periodicjs');
const pluralize = require('pluralize');
const helpers = require('./helpers');
const containers = require('./containers');

function generateManifestsFromCoreData(options) {
  const reactappSettings = periodic.settings.extensions['periodicjs.ext.reactapp'];
  const adminRoute = helpers.getManifestPathPrefix(reactappSettings.adminPath);
  const { indexOptions, newOptions, showOptions, schema, schemaName, allSchemas, } = options;
  options.adminRoute = adminRoute;
  return {
    [helpers.getContainerPath(options)]: containers.constructIndex({ schema, schemaName, allSchemas, adminRoute, indexOptions }),
    // [`${helpers.getContainerPath(options)}/new`]: containers.constructDetail({ schema, schemaName, allSchemas, adminRoute, detailOptions, newDetail: true, }),
    // [`${helpers.getContainerPath(options)}/:id`]: containers.constructDetail({ schema, schemaName, allSchemas, adminRoute, detailOptions }),
  };
}

function generateCoreDataManifests(options) {
  const allSchemas = Array.from(periodic.models.keys()).reduce((result, key) => {
    result[key] = periodic.models.get(key).scheme;
    return result;
  }, {});
  const coreDataGeneratedContainers = Array.from(periodic.models.keys()).reduce((result, key) => {
    return result = Object.assign(result, generateManifestsFromCoreData({
      schemaName: key,
      schema: periodic.models.get(key).scheme,
      allSchemas,
    }));
  }, {});
  // console.log({ coreDataGeneratedContainers })
  return coreDataGeneratedContainers;
}

module.exports = {
  generateManifestsFromCoreData,
  generateCoreDataManifests,
};