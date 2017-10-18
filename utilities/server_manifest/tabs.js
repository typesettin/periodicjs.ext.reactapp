'use strict';

function getTabs(options) {
  const { tabs = [], type, props, } = options;
  //tabs={name,layout}
  return {
    component: 'ResponsiveTabs',
    props: Object.assign({
      isButton: false,
      tabContainer: {
        className:'__rep_tab'
      },
      tabsProps: {
        tabStyle:'isBoxed'
      },
      tabsType: type || 'navBar',
      tabs,
    },props),
  };
}

module.exports = {
  getTabs,
};