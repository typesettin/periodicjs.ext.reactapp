
function _route_prefix(adminPath) {
  return (adminPath === '')
    ? '/'
    : (adminPath && adminPath.charAt(0) === '/')
      ? adminPath
      : '/' + adminPath;
}

function _admin_prefix(adminPath) {
  return _route_prefix(adminPath).substr(1);
}

function _manifest_prefix(adminPath) {
  var admin_prefix = _admin_prefix(adminPath);
  return (admin_prefix.length > 0)
    ? '/'+admin_prefix+'/'
    : '/';
}

export const route_prefix = _route_prefix;
export const admin_prefix = _admin_prefix;
export const manifest_prefix = _manifest_prefix;
export const all_prefixes = function (adminPath) {
  return {
    route_prefix : _route_prefix(adminPath),
    admin_prefix : _admin_prefix(adminPath),
    manifest_prefix : _manifest_prefix(adminPath),
  };
};