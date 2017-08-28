'use strict';
const periodic = require('periodicjs');
const flatten = require('flat');
const controllerhelper = require('./controllerhelper');
const helpers = require('./manifest/helpers');
const data_tables = require('./manifest/table/data_tables');
const oauth2ServerUtils = periodic.locals.extensions.get('periodicjs.ext.oauth2server');
const logger = periodic.logger;
let initialReactAppConfig = {};
let intialReactAppClient;
let reactAppConfig = {};

function getDefaultIndexTableFields() {
  const reactAppConfig = periodic.settings.extensions['periodicjs.ext.reactapp'];
  const adminRoute = helpers.getManifestPathPrefix(reactAppConfig.adminPath);

  function getUserTableHeader(schemaName) {
    return [
      data_tables.tableField({
        field: 'email',
        link: true,
        headerStyle: {
          maxWidth: 200,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        columnStyle: {
          maxWidth: 200,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      })({ adminRoute, schemaName, }),
      data_tables.tableCreatedDate(),
      data_tables.tableField({
        title: 'First Name',
        field: 'firstname',
      })({ adminRoute, schemaName, }),
      data_tables.tableField({
        title: 'Last Name',
        field: 'lastname',
      })({ adminRoute, schemaName, }),
      data_tables.tableField({
        // title: 'Last Name',
        field: 'activated',
      })({ adminRoute, schemaName, }),
      data_tables.tableField({
        title: 'User Roles',
        field: 'userroles',
      })({ adminRoute, schemaName, }),
      data_tables.tableField({
        title: 'Account Type',
        field: 'accounttype',
      })({ adminRoute, schemaName, }),
      data_tables.tableOptions({ adminRoute, schemaName, }),
    ];
  }
  return {
    standard_user: getUserTableHeader('standard_user'),
    standard_account: getUserTableHeader('standard_account'),
    standard_userrole: [
      data_tables.tableField({
        field: 'name',
        link: true,
        headerStyle: {
          maxWidth: 150,
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        },
        columnStyle: {
          maxWidth: 150,
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        },
      })({ adminRoute, schemaName: 'standard_userrole', }),
      data_tables.tableField({
        title: 'Role ID',
        field: 'userroleid',
      })({ adminRoute, schemaName: 'standard_userrole', }),
      data_tables.tableField({
        title: 'Privileges',
        field: 'privileges',
      })({ adminRoute, schemaName: 'standard_userrole', }),
      data_tables.tableField({
        title: 'Description',
        field: 'description',
      })({ adminRoute, schemaName: 'standard_userrole', }),
      data_tables.tableOptions({ adminRoute, schemaName: 'standard_userrole', }),
    ],
    standard_userprivilege: [
      data_tables.tableField({
        field: 'name',
        link: true,
        headerStyle: {
          maxWidth: 150,
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        },
        columnStyle: {
          maxWidth: 150,
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        },
      })({ adminRoute, schemaName: 'standard_userprivilege', }),
      data_tables.tableField({
        title: 'Privilege ID',
        field: 'userprivilegeid',
      })({ adminRoute, schemaName: 'standard_userprivilege', }),
      data_tables.tableField({
        title: 'Label',
        field: 'label',
      })({ adminRoute, schemaName: 'standard_userprivilege', }),
      data_tables.tableField({
        title: 'Description',
        field: 'description',
      })({ adminRoute, schemaName: 'standard_userprivilege', }),
      data_tables.tableOptions({ adminRoute, schemaName: 'standard_userprivilege', }),
    ],
    standard_asset: [
      data_tables.tableField({
        field: 'name',
        link: true,
        headerStyle: {
          maxWidth: 150,
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        },
        columnStyle: {
          maxWidth: 150,
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        },
      })({ adminRoute, schemaName: 'standard_asset', }),
      data_tables.tableCreatedDate({}),
      data_tables.tableField({
        title: 'Size',
        field: 'transform.size',
      })({ adminRoute, schemaName: 'standard_asset', }),
      data_tables.tableField({
        title: 'Attributes',
        icon: true,
        field: 'transform.attributes',
      })({ adminRoute, schemaName: 'standard_asset', }),
      // data_tables.tableField({
      //   title: 'Encrypted',
      //   icon: true,
      //   field: 'transform.encrypted',
      // }),
      // data_tables.tableField({
      //   title: 'Exif',
      //   icon: true,
      //   field: 'transform.exif',
      // }),
      data_tables.tableField({
        title: 'Preview',
        image: true,
        field: 'transform.preview',
      })({ adminRoute, schemaName: 'standard_asset', }),
      data_tables.tableOptions({ adminRoute, schemaName: 'standard_asset', }),
    ],
    configuration: [
      data_tables.tableField({
        field: 'filepath',
        link: true,
        headerStyle: {
          maxWidth: 350,
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        },
        columnStyle: {
          maxWidth: 350,
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        },
      })({ adminRoute, schemaName: 'configuration', }),
      data_tables.tableField({
        // title: 'Size',
        field: 'environment',
      })({ adminRoute, schemaName: 'configuration', }),
      data_tables.tableField({
        field: 'container',
      })({ adminRoute, schemaName: 'configuration', }),
      data_tables.tableCreatedDate({}),
      data_tables.tableOptions({ adminRoute, schemaName: 'configuration', }),
    ],
    extension: [
      data_tables.tableField({
        field: 'name',
        link: true,
        headerStyle: {
          maxWidth: 250,
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        },
        columnStyle: {
          maxWidth: 250,
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        },
      })({ adminRoute, schemaName: 'extension', }),
      data_tables.tableField({
        field: 'source',
      })({ adminRoute, schemaName: 'extension', }),
      data_tables.tableField({
        field: 'version',
      })({ adminRoute, schemaName: 'extension', }),
      data_tables.tableField({
        title: 'Type',
        field: 'periodic_type',
      })({ adminRoute, schemaName: 'extension', }),
      data_tables.tableField({
        title: 'Priority',
        field: 'periodic_priority',
      })({ adminRoute, schemaName: 'extension', }),
      data_tables.tableField({
        title: 'Compatibility',
        field: 'periodic_compatibility',
      })({ adminRoute, schemaName: 'extension', }),
      data_tables.tableCreatedDate({}),
      data_tables.tableOptions({ adminRoute, schemaName: 'extension', }),
    ],
  }
}

function setInitialIndexTable() {
  const reactAppConfig = periodic.settings.extensions['periodicjs.ext.reactapp'];
  periodic.settings.extensions['periodicjs.ext.reactapp'].data_tables = Object.assign({}, getDefaultIndexTableFields(), periodic.settings.extensions['periodicjs.ext.reactapp'].data_tables);
  // console.log('getDefaultIndexTableFields()', getDefaultIndexTableFields())
  if (reactAppConfig && reactAppConfig.includeCoreData && reactAppConfig.includeCoreData.manifest) {
    let task = setImmediate(() => {
      controllerhelper.setCoreDataConfigurations();
      clearImmediate(task);
    });
  }
}

function init() {
  const configurationDB = periodic.datas.get('configuration');
  const appEnvironment = periodic.settings.application.environment;
  const reactAppConfigFilepath = `content/config/extensions/periodicjs.ext.reactapp/${appEnvironment}.json`;
  Promise.all([
    configurationDB.load({
      query: {
        filepath: reactAppConfigFilepath,
      },
    }),
    periodic.datas.get('standard_client').load({
      query: {
        name: 'reactapp',
      },
    }),
  ])
    .then(results => {
      const [dbReactAppConfig, dbReactAppClient, ] = results;
      // console.log({ dbReactAppConfig, dbReactAppClient })
      initialReactAppConfig = dbReactAppConfig;
      intialReactAppClient = dbReactAppClient;
      if (!dbReactAppClient) {
        return oauth2ServerUtils.client.create({ name: 'reactapp', });
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
        return true;
      } else {
        if (initialReactAppConfig && initialReactAppConfig.config && initialReactAppConfig.config.settings && initialReactAppConfig.config.settings.login && initialReactAppConfig.config.settings.login.url) {
          reactAppConfig.login = {
            url: initialReactAppConfig.config.settings.login.url,
          };
        } else {
          reactAppConfig.login = {
            url: periodic.settings.application.protocol + periodic.settings.application.url + '/api/jwt/token',
            options: {
              headers: {
                clientid: intialReactAppClient.client_id,
              },
            },
          };
          reactAppConfig.userprofile = Object.assign({}, reactAppConfig.login);
          reactAppConfig.userprofile.url = periodic.settings.application.protocol + periodic.settings.application.url + '/api/jwt/profile';
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
        }).then(createdReactAppConfig => {
          logger.silly('created initial react app config');
          periodic.settings.extensions[ 'periodicjs.ext.reactapp' ] = flatten.unflatten(
            Object.assign({},
              flatten(periodic.settings.extensions[ 'periodicjs.ext.reactapp' ] || {}),
              flatten(reactAppConfig || {})
            )
          );
          return true;
        })
        .catch(logger.error);
      }
    })
    .then(configStatus => {
      setInitialIndexTable();
      logger.silly({ configStatus });
    })
    .catch(logger.error);
}

module.exports = {
  getDefaultIndexTableFields,
  setInitialIndexTable,
  init,
};