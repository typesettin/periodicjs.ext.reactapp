'use strict';
const periodic = require('periodicjs');
const Promisie = require('promisie');
const utilities = require('./utilities');
const logger = periodic.logger;
const extsettings = utilities.reactapp().settings;
const oauth2ServerUtils = periodic.locals.extensions.get('periodicjs.ext.oauth2server');
let initialReactAppConfig = {};
let intialReactAppClient;
let reactAppConfig = {};

module.exports = () => {
  return new Promise((resolve, reject) => {
    try {
      periodic.status.on('configuration-complete', (status) => {
        const appEnvironment = periodic.settings.application.environment;
        const reactAppConfigFilepath = `content/config/extensions/periodicjs.ext.reactapp/${appEnvironment}.json`;
        const configurationDB = periodic.datas.get('configuration');
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



        Promise.all([
            configurationDB.load({
              query: {
                filepath: reactAppConfigFilepath,
              }
            }),
            periodic.datas.get('standard_client').load({
              query: {
                name: 'reactapp',
              }
            })
          ])
          .then(results => {
            const [dbReactAppConfig, dbReactAppClient] = results;
            initialReactAppConfig = dbReactAppConfig;
            intialReactAppClient = dbReactAppClient;
            if (!dbReactAppClient) {
              return oauth2ServerUtils.client.create({ name: 'reactapp' });
            } else {
              return true;
            }
          })
          .then(createdClient => {
            if (!intialReactAppClient) {
              intialReactAppClient = (typeof createdClient.toJSON === 'function') ? createdClient.toJSON() : createdClient;
            }
            if (initialReactAppConfig && initialReactAppConfig.config && initialReactAppConfig.config.login && initialReactAppConfig.config.login.url && initialReactAppConfig.config && initialReactAppConfig.config.login && initialReactAppConfig.config.login.options && initialReactAppConfig.config.login.options.headers && initialReactAppConfig.config.login.options.headers.clientid) {
              logger.silly('Already configured ReactApp');
            } else {
              if (initialReactAppConfig.config && initialReactAppConfig.config.login && initialReactAppConfig.config.login.url) {
                reactAppConfig.login = {
                  url: initialReactAppConfig.login.url,
                }
              } else {
                reactAppConfig.login = {
                  url: periodic.settings.application.protocol + periodic.settings.application.url,
                  options: {
                    headers: {
                      clientid: intialReactAppClient.client_id,
                    }
                  }
                }
              }
              configurationDB.create({
                  newdoc: {
                    filepath: reactAppConfigFilepath,
                    environment: appEnvironment,
                    config: reactAppConfig,
                    container: periodic.settings.container.name,
                  },
                }).then(createdReactAppConfig => {
                  logger.silly('created initial react app config', createdReactAppConfig);
                })
                // console.log({ reactAppConfig });
            }
          })
          .catch(logger.error);
      });
      // console.log('periodic.settings.application.environment', periodic.settings.application.environment);
      // // configurations.findOne({ filepath: 'content/config/extensions/periodicjs.ext.oauth2server/development.json' }, { sort: { createdat: -1 }, fields: {} })
      // // load reatapp config


      return resolve(true);
    } catch (e) {
      return reject(e);
    }
  });
};