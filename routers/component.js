'use strict';

const periodic = require('periodicjs');
// const utilities = require('../utilities');
const controllers = require('../controllers');
const componentRouter = periodic.express.Router();
// const componentSettings = utilities.getSettings();

const oauth2serverControllers = periodic.controllers.extension.get('periodicjs.ext.oauth2server');
let ensureApiAuthenticated = oauth2serverControllers.auth.ensureApiAuthenticated;
//   const accountController = resources.app.controller.native.account;
const uacController = {
  loadUserRoles: (req, res, next) => {
    if (req.session) {
      req.session.userprivilegesdata = {};
    }
    next();
  },
}; //resources.app.controller.extension.user_access_control.uac;
const mfaController = {
  authenticate_totp: (req, res, next) => {
    next();
  },
}; //resources.app.controller.extension.login_mfa

componentRouter.post('/manifest', ensureApiAuthenticated, uacController.loadUserRoles, controllers.reactapp.loadManifest);
componentRouter.get('/public_manifest', controllers.reactapp.loadUnauthenticatedManifest);
componentRouter.post('/preferences', ensureApiAuthenticated, uacController.loadUserRoles, controllers.reactapp.loadUserPreferences);
componentRouter.post('/navigation', ensureApiAuthenticated, uacController.loadUserRoles, controllers.reactapp.loadNavigation);
componentRouter.post('/configurations', ensureApiAuthenticated, uacController.loadUserRoles, controllers.reactapp.loadConfigurations);
componentRouter.post('/mfa', ensureApiAuthenticated, mfaController.authenticate_totp);
componentRouter.get('/components/:component', controllers.reactapp.loadComponent);
componentRouter.get('/healthcheck', function(req, res) {
  res.status(200).send({ status: 'ok', });
});
componentRouter.get('/healthcheck/:id/:name', function(req, res) {
  console.log(req.params);
  res.status(200).send({ status: 'ok', params: req.params, });
});

module.exports = componentRouter;