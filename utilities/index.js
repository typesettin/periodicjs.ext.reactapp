'use strict';

const settings = require('./settings');
const data = require('./data');
const ssr_manifest = require('./ssr_manifest');
const reloader = require('./reloader');
const initialization = require('./initialization');
// const components = require('./components');
const manifest = require('./manifest');
const styles = require('./styles');
const controllerhelper = require('./controllerhelper');
const detail_views = require('./detail_views');

module.exports = {
  settings,
  data,
  manifest,
  styles,
  generateDetailManifests: settings.generateDetailManifests,
  findMatchingRoute: settings.findMatchingRoute,
  getParameterized: settings.getParameterized,
  ssr_manifest,
  reloader,
  initialization,
  detail_views,
  getSettings: settings.getSettings,
  reactapp: settings.reactapp,
  controllerhelper,
};