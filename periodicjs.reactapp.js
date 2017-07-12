'use strict';

module.exports = {
  'periodicjs_ext_reactapp': {
    'manifests': [
      'node_modules/periodicjs.ext.reactapp/adminclient/src/content/config/manifest.json',
      // 'node_modules/periodicjs.ext.reactapp/views/home/',
      // 'node_modules/periodicjs.ext.reactapp/views/account/',
      'node_modules/periodicjs.ext.reactapp/views/test/',
    ],
    'unauthenticated_manifests': [
      'node_modules/periodicjs.ext.reactapp/views/public/home/',
    ],
    'navigation': 'node_modules/periodicjs.ext.reactapp/adminclient/src/content/config/navigation.json',
    'components': {
      // 'login':'/content/themes/periodicjs.theme.default/views/auth/loginDISABLED.manifest.json',
      'main': {
        // 'header':'node_modules/periodicjs.ext.reactapp/adminclient/src/content/config/header.js',
        'footer': 'node_modules/periodicjs.ext.reactapp/adminclient/src/content/config/footer.js',
      },
      'error': {
        '404': 'node_modules/periodicjs.ext.reactapp/adminclient/src/content/config/manifests/dynamic404.json',
        '400': 'node_modules/periodicjs.ext.reactapp/adminclient/src/content/config/manifests/dynamic400.json',
      },
    },
  },
};