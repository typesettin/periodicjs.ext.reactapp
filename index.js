'use strict';
const periodic = require('periodicjs');
const Promisie = require('promisie');
const utilities = require('./utilities');
const logger = periodic.logger;
const extsettings = utilities.reactapp().settings;

module.exports = () => {
  return new Promise((resolve, reject) => {
    try {
      if (extsettings && extsettings.includeCoreData && extsettings.includeCoreData.manifest) {
        let task = setImmediate(() => {
          utilities.controllerhelper.setCoreDataConfigurations();
          clearImmediate(task);
        });
      }

      Promisie.all(utilities.controllerhelper.pullConfigurationSettings(), utilities.controllerhelper.pullComponentSettings())
      .then(() => {
        logger.silly('MANIFEST SETTINGS LOADED');
      },
        logger.silly.bind(logger, 'settings error'));
      return resolve(true);
    } catch (e) {
      return reject(e);
    }
  });
};