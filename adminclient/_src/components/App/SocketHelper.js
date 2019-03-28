'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.initSockets = initSockets;

var _routerEsm = require('simple-socket-router/bundle/router.esm.js');

var _FormHelpers = require('../ResponsiveForm/FormHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Router, EventRouter, } from 'simple-socket-router/lib/router.mjs';
var once = false;

function initSockets() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var auth = options.auth;
  // console.debug('CALLING initSockets');
  // console.debug({auth},'this.state',this.state)

  this.getSocketFunction = _FormHelpers.getFunctionFromProps.bind(this);
  var router = new _routerEsm.Router();
  router.addRoute('*', function (req) {
    var propFunc = req.body.function || req.path;
    var props = req.body && req.body.props && Array.isArray(req.body.props) ? req.body.props : [req.body];
    // console.debug({ propFunc, props, once, req, });
    var reduxFunction = _this.getSocketFunction({ propFunc: propFunc });
    if (reduxFunction) reduxFunction.call.apply(reduxFunction, [_this].concat((0, _toConsumableArray3.default)(props)));
    // else this.props.errorNotification(new Error('Invalid Live Update'));
  });
  var socketOptions = (0, _assign2.default)({
    // transports: [ 'websocket', ],
    reconnectionAttempts: 10
  }, this.state.settings.socket_server_options);
  var socket = this.state.settings.socket_server ? window.io(this.state.settings.socket_server, socketOptions) : window.io('', socketOptions);
  this.props.setSocket(socket);
  socket.once('connect', function () {
    (0, _routerEsm.EventRouter)({ socket: socket, router: router });
    socket.emit('authentication', {
      user: auth ? _this.state.user : false,
      reconnection: true
    });
  });
  socket.on('error', function (e) {
    return _this.props.createLog({
      type: 'error',
      meta: e
    });
  });
  socket.on('connect_error', function (e) {
    return console.debug(e);
  });
  socket.on('disconnect', function (reason) {
    if (once === false && _this.state.settings.socket_disconnect_message) {
      _this.props.createNotification({
        text: 'Live Updated Disconnected: ' + reason + '. Refresh for live updates'
      });
      once = true;
    }
  });
  socket.on('reconnect', function (attemptNumber) {
    socket.emit('authentication', {
      user: auth ? _this.state.user : false,
      reconnection: true
    });
    _this.props.createLog({
      type: 'highlight',
      message: 'Reconnected to Live',
      meta: { attemptNumber: attemptNumber }
    });
  });
  socket.on('reconnecting', function (attemptNumber) {
    _this.props.createLog({
      type: 'error',
      message: 'reconnecting socket',
      meta: { attemptNumber: attemptNumber }
    });
    // console.debug('reconnecting', );
  });
  // if (auth) {
  //   // console.debug('REAUTH',this.state.user)
  //   socket.emit('authentication', {
  //     user: this.state.user,
  //     reconnection: true,
  //   });
  // }
  socket.on('authenticated', function () {
    // use the socket as usual
    socket.emit('/user/createrepl', {
      user: auth ? _this.state.user : false,
      reconnection: true,
      authSend: 0
    });
  });
  // this.previousRoute = {};
}