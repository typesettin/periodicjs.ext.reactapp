'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  logs: [],
  // messages: [],
  showLogs: false
};

var logReducer = function logReducer(state, action) {
  switch (action.type) {
    case _constants2.default.log.SHOW_LOG:
      return (0, _assign2.default)({}, state, {
        showLogs: true
      });
    case _constants2.default.log.HIDE_LOG:
      return (0, _assign2.default)({}, state, {
        showLogs: false
      });
    case _constants2.default.log.LOG_DATA:
      var log = action.payload.log;

      var arrayOfLogs = [].concat(state.logs);
      arrayOfLogs.unshift(log);
      return (0, _assign2.default)({}, state, {
        logs: arrayOfLogs.slice(0, 200)
      });
    default:
      return (0, _assign2.default)(initialState, state);
  }
};

exports.default = logReducer;