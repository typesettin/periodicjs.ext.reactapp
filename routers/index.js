'use strict';

const periodic = require('periodicjs');
const extensionRouter = periodic.express.Router();
const utilities = require('../utilities');
const reactappRouter = require('./reactapp');
const securecontentRouter = require('./securecontent');
const contentRouter = require('./content');
const contentdataRouter = require('./contentdata');
const componentRouter = require('./component');
const reactapp = utilities.reactapp();

extensionRouter.use(`${reactapp.manifest_prefix}securecontent`, securecontentRouter);
extensionRouter.use(`${reactapp.manifest_prefix}contentdata`, contentRouter);
extensionRouter.use(`${reactapp.manifest_prefix}contentdata`, contentdataRouter);
extensionRouter.use(`${reactapp.manifest_prefix}load`, componentRouter);
extensionRouter.use(`${reactapp.manifest_prefix}`, reactappRouter);

module.exports = extensionRouter;