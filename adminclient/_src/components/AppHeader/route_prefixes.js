'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _route_prefix(adminPath) {
  return adminPath === '' ? '/' : adminPath && adminPath.charAt(0) === '/' ? adminPath : '/' + adminPath;
}

function _admin_prefix(adminPath) {
  return _route_prefix(adminPath).substr(1);
}

function _manifest_prefix(adminPath) {
  var admin_prefix = _admin_prefix(adminPath);
  return admin_prefix.length > 0 ? '/' + admin_prefix + '/' : '/';
}

var route_prefix = exports.route_prefix = _route_prefix;
var admin_prefix = exports.admin_prefix = _admin_prefix;
var manifest_prefix = exports.manifest_prefix = _manifest_prefix;
var all_prefixes = exports.all_prefixes = function all_prefixes(adminPath) {
  return {
    route_prefix: _route_prefix(adminPath),
    admin_prefix: _admin_prefix(adminPath),
    manifest_prefix: _manifest_prefix(adminPath)
  };
};