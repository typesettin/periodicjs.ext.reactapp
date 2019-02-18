'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoutes = getRoutes;

var _containers = require('../containers');

function getRoutes(appContainer) {
  var sharedChildRoutes = [{
    path: 'login**',
    component: _containers.PageComponents.LoginPage,
    indexRoute: {
      component: _containers.PageComponents.LoginPage
    }
  }, {
    path: '*',
    component: _containers.PageComponents.DynamicPage
  }];
  return {
    childRoutes: [{
      path: typeof window.__padmin.adminPath !== 'undefined' ? window.__padmin.adminPath : '/p-admin',
      component: appContainer,
      // onEnter: requireAuth,
      indexRoute: {
        // onEnter: requireAuth,
        component: _containers.PageComponents.LoginPage
      },
      childRoutes: sharedChildRoutes
    }, {
      path: '/',
      component: appContainer,
      // onEnter: requireAuth,
      indexRoute: {
        // onEnter: requireAuth,
        component: _containers.PageComponents.LoginPage
      },
      childRoutes: sharedChildRoutes
    }]
  };
}

// exports.getRoutes = getRoutes;

exports.default = getRoutes;
//https://github.com/ReactTraining/react-router/blob/efac1a8ff4c26d6b7379adf2ab903f1892276362/examples/auth-flow/app.js#L122