'use strict';
const utilities = require('../../../utilities');
const reactapp = utilities.reactapp();
let navlinks = [{
  'component': 'MenuAppLink',
  'props': {
    'href': `${reactapp.manifest_prefix}account/profile`,
    'label': 'My Account',
    'id': 'my-account',
  },
}, ];
let ra_nav = [{
  component: 'SubMenuLinks',
  children: [{
    'component': 'MenuLabel',
    'children': 'reactapp',
  }, ].concat(...navlinks),
}, ];
module.exports = {
  'wrapper': {
    'style': {},
  },
  'container': {
    'style': {},
  },
  'layout': {
    'component': 'Menu',
    'props': {
      'style': {},
    },
    'children': ra_nav,
  },
};