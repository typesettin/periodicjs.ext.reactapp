'use strict';
const periodic = require('periodicjs');
const Promisie = require('promisie');
const flatten = require('flat');
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
            // console.log({ dbReactAppConfig, dbReactAppClient })
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
            if (initialReactAppConfig && initialReactAppConfig.config && initialReactAppConfig.config.settings && initialReactAppConfig.config.settings.login && initialReactAppConfig.config.settings.login.url && initialReactAppConfig.config.settings && initialReactAppConfig.config.settings.login && initialReactAppConfig.config.settings.login.options && initialReactAppConfig.config.settings.login.options.headers && initialReactAppConfig.config.settings.login.options.headers.clientid) {
              logger.silly('Already configured ReactApp');
            } else {
              if (initialReactAppConfig && initialReactAppConfig.config && initialReactAppConfig.config.settings && initialReactAppConfig.config.settings.login && initialReactAppConfig.config.settings.login.url) {
                reactAppConfig.login = {
                  url: initialReactAppConfig.config.settings.login.url,
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
                reactAppConfig.userprofile = reactAppConfig.login;
              }
              reactAppConfig.basename = periodic.settings.application.protocol + periodic.settings.application.url;
              reactAppConfig.name = periodic.settings.name;
              reactAppConfig.title = periodic.settings.name;
              reactAppConfig.application = {
                environment: periodic.settings.application.environment,
              };
              configurationDB.create({
                  newdoc: {
                    filepath: reactAppConfigFilepath,
                    environment: appEnvironment,
                    config: {
                      settings: reactAppConfig,
                    },
                    container: periodic.settings.container.name,
                  },
                })
                .then(createdReactAppConfig => {
                  logger.silly('created initial react app config');
                  periodic.settings.extensions['periodicjs.ext.reactapp'] = flatten.unflatten(
                    Object.assign({},
                      flatten(periodic.settings.extensions['periodicjs.ext.reactapp'] || {}),
                      flatten(reactAppConfig || {})
                    )
                  );
                })
                .catch(logger.error);
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