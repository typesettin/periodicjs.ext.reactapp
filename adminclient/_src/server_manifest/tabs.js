'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTabs(options) {
  var _options$tabs = options.tabs,
      tabs = _options$tabs === undefined ? [] : _options$tabs,
      type = options.type,
      props = options.props,
      _options$componentPro = options.componentProps,
      componentProps = _options$componentPro === undefined ? {} : _options$componentPro,
      bindprops = options.bindprops;
  //tabs={name,layout}

  var tabscomponet = (0, _assign2.default)({
    component: 'ResponsiveTabs',
    bindprops: bindprops,
    props: (0, _assign2.default)({
      isButton: false,
      tabContainer: {
        className: '__rep_tab'
      },
      tabsProps: {
        tabStyle: 'isBoxed'
      },
      tabsType: type || 'navBar',
      tabs: tabs
    }, props)
  }, componentProps);
  if (options.debug) console.log(tabscomponet);
  return tabscomponet;
}

module.exports = {
  getTabs: getTabs
};