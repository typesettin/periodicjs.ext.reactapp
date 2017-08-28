'use strict';
const periodic = require('periodicjs');
const pluralize = require('pluralize');
const helpers = require('./helpers');
const containers = require('./containers');
const mockSchemas = require('./schema/mock_schemas');

function generateManifestsFromCoreData(options) {
  const extsettings = periodic.settings.extensions['periodicjs.ext.reactapp'];
  const adminRoute = options.customAdminRoute || helpers.getManifestPathPrefix(extsettings.adminPath);
  const { indexOptions, newOptions, showOptions, schema, schemaName, allSchemas, detailOptions, } = options;
  // options.extsettings = extsettings;
  options.adminRoute = adminRoute;
  return {
    [helpers.getContainerPath(options)]: containers.constructIndex({ schema, schemaName, allSchemas, adminRoute, indexOptions, extsettings }),
    [`${helpers.getContainerPath(options)}/new`]: containers.constructDetail({ schema, schemaName, allSchemas, adminRoute, detailOptions, newEntity: true, extsettings, }),
    [`${helpers.getContainerPath(options)}/:id`]: containers.constructDetail({ schema, schemaName, allSchemas, adminRoute, detailOptions, extsettings, }),
  };
}

function generateCoreDataManifests(options) {
  const allSchemas = Array.from(periodic.models.keys()).reduce((result, key) => {
    result[key] = periodic.models.get(key).scheme;
    return result;
  }, {});
  allSchemas.configuration = mockSchemas.configuration;
  allSchemas.extension = mockSchemas.extension;
  const coreDataGeneratedContainers = Array.from(Object.keys(allSchemas)).reduce((result, key) => {
    return result = Object.assign(result, generateManifestsFromCoreData({
      schemaName: key,
      schema: allSchemas[key],
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