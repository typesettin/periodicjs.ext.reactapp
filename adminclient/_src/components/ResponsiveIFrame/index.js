'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _AppLayoutMap = require('../AppLayoutMap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  title: _react.PropTypes.string,
  src: _react.PropTypes.string,
  targetOrigin: _react.PropTypes.string,
  blockPageUI: _react.PropTypes.bool,
  onLoad: _react.PropTypes.string,
  onLoadEval: _react.PropTypes.string,
  onMessage: _react.PropTypes.string,
  onMessageEval: _react.PropTypes.string,
  dynamicFieldOnLoad: _react.PropTypes.string,
  dynamicFieldOnMessage: _react.PropTypes.string
};

var defaultProps = {
  title: 'Responsive IFrame',
  src: 'https://local-app.jewelml.io:8900/proxy/https://prettyinpastel.shop/', //'http://tensorscript.io/',
  targetOrigin: '*',
  passProps: {},
  blockPageUI: true
};

var ResponsiveIFrame = function (_Component) {
  (0, _inherits3.default)(ResponsiveIFrame, _Component);

  function ResponsiveIFrame(props) {
    (0, _classCallCheck3.default)(this, ResponsiveIFrame);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ResponsiveIFrame.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveIFrame)).call(this, props));

    var id = props.id || 'id' + new Date().valueOf();
    _this.state = {
      title: props.title,
      src: props.src,
      targetOrigin: props.targetOrigin,
      id: id
    };
    _this.getFunction = _AppLayoutMap.getFunctionFromProps.bind(_this);
    if (props.onLoadEval) {
      // eslint-disable-next-line
      var LoadFunction = Function('data', '"use strict";' + props.onLoadEval);
      Object.defineProperty(LoadFunction, 'name', {
        value: 'IFrame_' + id + '_LoadFunction'
      });
      _this.onLoadFunction = LoadFunction.bind(_this);
    }
    if (props.onMessageEval) {
      // eslint-disable-next-line
      var MessageFunction = Function('data', '"use strict";' + props.onMessageEval);
      Object.defineProperty(MessageFunction, 'name', {
        value: 'IFrame_' + id + '_MessageFunction'
      });
      _this.onMessageFunction = MessageFunction.bind(_this);
    }
    _this.handleFrameTasks = _this.handleFrameTasks.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ResponsiveIFrame, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.blockPageUI) {
        this.props.setUILoadedState(false, this.props.blockPageUILayout);
      }
      this.ifr.onload = function (e) {
        // console.info('CHANGED IFRAME SOURCE', e);
        if (_this2.props.blockPageUI) {
          _this2.props.setUILoadedState(true);
        }
        if (_this2.onLoadFunction) {
          _this2.onLoadFunction(e);
        } else if (typeof _this2.props.onLoad === 'string' && _this2.props.onLoad.includes('setDynamicData')) {
          _this2.props.setDynamicData(_this2.props.dynamicFieldOnLoad, e);
        } else if (typeof _this2.props.onLoad === 'string') {
          _this2.getFunction({ propFunc: _this2.props.onLoad })(e);
        }
        // this.ifr.contentWindow.postMessage('hello', this.state.targetOrigin);
      };
      window.addEventListener("message", this.handleFrameTasks);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // for (const [objectid, liveData] of Object.entries(nextProps.objectsLive)) {
      //   ........
      //   const prevOn = this.props.objectsLive[objectid] ? this.props.objectsLive[objectid].on : null;
      //   if (prevOn !== liveData.on) {
      //     this.ifr.contentWindow.postMessage({ event: 'onoff', object: objectid, value: liveData.on }, '*');
      //   }
      // }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('message', this.handleFrameTasks);
      if (this.props.blockPageUI) {
        this.props.setUILoadedState(true);
      }
    }
  }, {
    key: 'sendToFrame',
    value: function sendToFrame(data) {
      if (this.ifr) this.ifr.contentWindow.postMessage(data, this.state.targetOrigin);
    }
  }, {
    key: 'handleFrameTasks',
    value: function handleFrameTasks(e) {
      // if (e.data.type === 'bookmark') {
      //   this.sendToFrame({ event: 'bookmark', data: window.location.hash ? window.location.hash.substr(1) : null });
      // }
      if (e.data.type === 'iframe') {
        // console.info('handleFrameTasks',{e});
        if (this.props.blockPageUI) {
          this.props.setUILoadedState(true);
        }
        if (this.onMessageFunction) {
          this.onMessageFunction(e.data);
        } else if (typeof this.props.onMessage === 'string' && this.props.onMessage.includes('setDynamicData')) {
          this.props.setDynamicData(this.props.dynamicFieldOnMessage, e.data);
        } else if (typeof this.props.onMessage === 'string') {
          this.getFunction({ propFunc: this.props.onMessage })(e.data);
        }
      }
      // window.removeEventListener('message', this.handleFrameTasks);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('iframe', (0, _extends3.default)({
        sandbox: 'allow-scripts',
        style: { width: '100%', height: '100%', border: 0 },
        title: this.state.title,
        src: this.state.src,
        ref: function ref(f) {
          _this3.ifr = f;
          window.testFRAME = f;
        }
      }, this.props.passProps));
    }
  }]);
  return ResponsiveIFrame;
}(_react.Component);

ResponsiveIFrame.propTypes = propTypes;
ResponsiveIFrame.defaultProps = defaultProps;

exports.default = ResponsiveIFrame;