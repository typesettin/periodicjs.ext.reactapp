'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reBulma = require('re-bulma');

var _AppLayoutMap = require('../AppLayoutMap');

var _styles = require('../../styles');

var _styles2 = _interopRequireDefault(_styles);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logs = function (_Component) {
  (0, _inherits3.default)(Logs, _Component);

  function Logs(props) {
    (0, _classCallCheck3.default)(this, Logs);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Logs.__proto__ || (0, _getPrototypeOf2.default)(Logs)).call(this, props));
    // console.debug({ props });


    _this.state = (0, _assign2.default)({ replcommand: '' }, props, props.useGetState ? props.getState() : {});
    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.sendCommand = _this.sendCommand.bind(_this);
    _this.setCommand = _this.setCommand.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Logs, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.log('componentWillReceiveProps nextProps.log', nextProps.log);
      this.setState({ log: nextProps.log });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.useSocketMessages();
    }
  }, {
    key: 'useSocketMessages',
    value: function useSocketMessages() {
      var _this2 = this;

      if (this.props.useMountedSocket) {
        var initState = this.props.getState();
        var socket = initState.dynamic.socket;
        // console.debug({socket});
        socket.onevent = function (packet) {
          var newState = _this2.props.getState();
          var newlog = newState.log;
          // console.log({ packet, newlog });
          _this2.setState({
            log: newlog
          });
        };
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      // console.log('this.props',this.props)
      this.props.hideLog();
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      if (e.key === 'Enter' || e.which === 13) {
        this.sendCommand();
      }
    }
  }, {
    key: 'setCommand',
    value: function setCommand(text) {
      this.setState({ replcommand: text });
    }
  }, {
    key: 'sendCommand',
    value: function sendCommand() {
      if (this.props.dynamic && this.props.dynamic.socket) {
        this.props.dynamic.socket.emit('stdin', this.state.replcommand);
      }
      this.setState({ replcommand: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var logs = this.state.log && this.state.log.logs && this.state.log.logs.length > 0 ? this.state.log.logs.map(function (log, key) {
        function getMSG(log) {
          return log.meta && typeof log.meta !== 'string' && log.meta.component ? this.getRenderedComponent(log.meta) : typeof log.meta === 'string' ? log.meta : log.meta ? (0, _stringify2.default)(log.meta, null, 2) : null;
        }
        return _this3.props.showLogs ? _react2.default.createElement(
          _reBulma.Notification,
          { color: log.type },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _reBulma.Label,
              null,
              (0, _moment2.default)(log.date).format('l LTS')
            ),
            _react2.default.createElement(
              'div',
              null,
              log.message
            ),
            _react2.default.createElement(
              'div',
              null,
              getMSG(log)
            )
          )
        ) : _react2.default.createElement(
          _reBulma.Message,
          {
            color: log.type,
            key: key,
            header: '' + log.date + (log.message ? ' - ' + log.message : ''),
            icon: 'fa fa-times' },
          getMSG(log)
        );
      }) : null;
      var closeButton = this.props.showLogs ? _react2.default.createElement('span', null) : _react2.default.createElement(
        _reBulma.Button,
        { icon: 'fa fa-times', onClick: this.handleClick },
        ' Close '
      );
      // this.getRenderedComponent(formElement.value, undefined, true)
      return this.props.showLogs || this.state.log.showLogs ? _react2.default.createElement(
        'div',
        { style: this.props.showLogs ? (0, _assign2.default)({ padding: '1rem', width: '100%' }, _styles2.default.fullHeight, _styles2.default.mainContainer, {
            margin: 0
          }) : (0, _assign2.default)({ padding: '1rem' }, _styles2.default.fullHeight, _styles2.default.mainContainer, _styles2.default.sidebarContainer, { position: 'absolute', width: '40%' }),
          className: this.props.showLogs || this.state.log.showLogs ? 'animated fadeInLeft Nav-Sidebar-Speed  __ra_l_s' : 'animated slideOutLeft Nav-Sidebar-Speed  __ra_l_s' },
        _react2.default.createElement(
          'div',
          { style: (0, _assign2.default)({
              position: this.props.showLogs ? undefined : 'fixed',
              height: '100%',
              overflowY: 'auto',
              width: '96%'
            }),
            className: ' __ra_l_w'
          },
          _react2.default.createElement(
            _reBulma.Columns,
            { style: { marginBottom: '1rem' } },
            _react2.default.createElement(
              _reBulma.Column,
              null,
              _react2.default.createElement(
                _reBulma.Addons,
                null,
                _react2.default.createElement(_reBulma.Input, { value: this.state.replcommand, onKeyPress: this.handleKeyPress, onChange: function onChange(event) {
                    _this3.setCommand(event.target.value);
                  }, style: { width: '100%' } }),
                _react2.default.createElement(
                  _reBulma.Button,
                  { onClick: this.sendCommand },
                  'Send'
                )
              )
            ),
            _react2.default.createElement(
              _reBulma.Column,
              { size: 'isNarrow' },
              closeButton
            )
          ),
          logs
        )
      ) : null;
    }
  }]);
  return Logs;
}(_react.Component);

exports.default = Logs;