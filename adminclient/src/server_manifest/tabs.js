'use strict';

function getTabs(options) {
  const { tabs = [], type, props, componentProps = {}, bindprops,  } = options;
  //tabs={name,layout}
  const tabscomponet= Object.assign({
    component: 'ResponsiveTabs',
    bindprops,
    props: Object.assign({
      isButton: false,
      tabContainer: {
        className:'__rep_tab',
      },
      tabsProps: {
        tabStyle:'isBoxed',
      },
      tabsType: type || 'navBar',
      tabs,
    }, props),
  }, componentProps);
  if (options.debug) console.log(tabscomponet)
  return tabscomponet;
}

module.exports = {
  getTabs,
};