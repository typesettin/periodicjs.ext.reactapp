'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = exports.TypeMap = undefined;

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _luxon = require('luxon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeMap = exports.TypeMap = {
  default: 'isDark',
  error: 'isDanger',
  warning: 'isWarning',
  highlight: 'isSuccess',
  success: 'isSuccess',
  info: 'isInfo',
  white: 'isWhite',
  black: 'isBlack',
  dark: 'isDark'
};

var log = exports.log = {
  hideLog: function hideLog() {
    return {
      type: _constants2.default.log.HIDE_LOG,
      payload: {}
    };
  },
  showLog: function showLog() {
    return {
      type: _constants2.default.log.SHOW_LOG,
      payload: {}
    };
  },
  createLog: function createLog() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return function (dispatch, getState) {
      var state = getState();
      var log = {
        date: options.date || _luxon.DateTime.fromJSDate(new Date(), { zone: state.user.time_zone }).toJSDate(),
        level: options.level || 'log',
        message: options.message,
        type: TypeMap[options.type] || options.type,
        meta: options.meta
      };
      dispatch({
        type: _constants2.default.log.LOG_DATA,
        payload: { log: log }
      });
    };
  }
};

exports.default = log;