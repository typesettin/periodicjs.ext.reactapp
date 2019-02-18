'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _AppLayoutMap = require('../AppLayoutMap');

var _index = require('../AppSectionLoading/index');

var _index2 = _interopRequireDefault(_index);

var _error = require('../AppSectionLoading/error');

var _error2 = _interopRequireDefault(_error);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _standard = require('../../server_manifest/standard');

var _table = require('../../server_manifest/table');

var _formsEs = require('../../server_manifest/forms-es');

var _card = require('../../server_manifest/card');

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _luxon = require('luxon');

var _luxon2 = _interopRequireDefault(_luxon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var functionalComponents = {
  getAreaChart: _standard.getAreaChart, getLayout: _standard.getLayout, getLevel: _standard.getLevel, getLineChart: _standard.getLineChart, getPageWrapper: _standard.getPageWrapper, getRechart: _standard.getRechart, getVictoryChart: _standard.getVictoryChart, getTable: _table.getTable, getBasicTable: _table.getBasicTable, getSheet: _table.getSheet, createForm: _formsEs.createForm, getCard: _card.getCard
};
// import { Columns, } from 're-bulma';

var propTypes = {
  assignResourceProperty: _react.PropTypes.string,
  assignFunctionalResourceProperty: _react.PropTypes.string,
  data: _react.PropTypes.object,
  useCache: _react.PropTypes.boolean,
  cacheTimeout: _react.PropTypes.number,
  dynamicDataTransformFunction: _react.PropTypes.string,
  functionalComponent: _react.PropTypes.string,
  functionalComponentProps: _react.PropTypes.object,
  flattenOptions: _react.PropTypes.object,
  layout: _react.PropTypes.object
};
var defaultProps = {
  assignResourceProperty: undefined,
  assignFunctionalResourceProperty: undefined,
  data: {},
  useCache: true,
  cacheTimeout: 20000,
  dynamicDataTransformFunction: undefined,
  functionalComponent: undefined,
  functionalComponentProps: undefined,
  layout: {}
};

var DynamicComponent = function (_Component) {
  (0, _inherits3.default)(DynamicComponent, _Component);

  function DynamicComponent(props) {
    (0, _classCallCheck3.default)(this, DynamicComponent);

    // console.warn({ props });
    // let dynamicItems = (this.props.dynamicProp)
    //   ? this.props.getState().dynamic[this.props.dynamicProp]
    //   : [];
    // let Items = {
    //   items: Object.assign([], props.items , dynamicItems),
    // };
    var _this = (0, _possibleConstructorReturn3.default)(this, (DynamicComponent.__proto__ || (0, _getPrototypeOf2.default)(DynamicComponent)).call(this, props));

    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    _this.state = {
      hasLoaded: false,
      hasError: false,
      resources: {}
    };

    _this.loadingStyle = props ? props.style : props.layout && props.layout.props && props.layout.props.style ? props.layout.props.style : { // eslint-disable-next-line 
      height: props.height || props.minheight || props.layout && props.layout.props && props.layout.props ? props.layout.props.height || props.layout.props.minheight || props.layout.props.minHeight : undefined
    };
    _this.computeResources = _this.computeResources.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(DynamicComponent, [{
    key: 'assignResources',
    value: function assignResources(resources) {
      // console.warn({ resources });
      var dynamicLayout = void 0;
      var functionalProps = void 0;
      if (this.props.assignFunctionalResourceProperty) {
        var flattenedFunctionalProps = (0, _flat2.default)(this.props.functionalComponentProps, this.props.flattenOptions);
        flattenedFunctionalProps[this.props.assignFunctionalResourceProperty] = resources;
        functionalProps = (0, _assign2.default)({}, (0, _flat.unflatten)(flattenedFunctionalProps), { ignoreReduxProps: true });
      }
      // console.log('this.props.functionalComponentProps',this.props.functionalComponentProps,{functionalProps});
      // const functionalProps = (this.props.assignFunctionalResourceProperty)
      //   ? Object.assign({}, this.props.functionalComponentProps, {
      //     [this.props.assignFunctionalResourceProperty]:resources,
      //   })
      //   : this.props.functionalComponentProps;
      var generatedLayout = this.props.functionalComponent && this.props.functionalComponentProps ? functionalComponents[this.props.functionalComponent](functionalProps) : this.props.layout;

      if (this.props.assignResourceProperty) {
        var flattenedLayout = (0, _flat2.default)(generatedLayout, this.props.flattenOptions);
        // console.warn('before flattenedLayout', flattenedLayout);
        flattenedLayout[this.props.assignResourceProperty] = resources;
        dynamicLayout = (0, _assign2.default)({}, (0, _flat.unflatten)(flattenedLayout), { ignoreReduxProps: false });
        // console.warn(' unflatten(flattenedLayout', unflatten(flattenedLayout));
        // console.warn('after flattenedLayout', flattenedLayout);
      } else {
        dynamicLayout = generatedLayout;
      }
      this.setState({
        hasError: false,
        error: undefined,
        hasLoaded: true,
        resources: resources,
        dynamicLayout: dynamicLayout
      });
    }
  }, {
    key: 'computeResources',
    value: function computeResources(componentProps) {
      var _this2 = this;

      try {
        var props = {
          luxon: _luxon2.default,
          moment: _moment2.default,
          numeral: _numeral2.default
        };
        // eslint-disable-next-line 
        var dataTransform = componentProps.dynamicDataTransformFunction ? // eslint-disable-next-line 
        Function('dynamicData', '"use strict";\n' + componentProps.dynamicDataTransformFunction).bind({ props: props }) : function componentDidMount_dataTransform(dynamicData) {
          return dynamicData;
        };
        // console.warn('componentProps.dynamicDataTransformFunction', componentProps.dynamicDataTransformFunction);
        // console.warn('dataTransform', dataTransform);
        var resources = {};
        Object.defineProperty(dataTransform, 'name', {
          value: 'componentDidMount_dataTransform'
        });
        if (componentProps.fetch_url) {
          var cachedData = _memoryCache2.default.get(componentProps.fetch_url);
          if (cachedData && componentProps.useCache) {
            console.log('got data from cache', componentProps.fetch_url, cachedData, componentProps.cacheTimeout);
            resources = dataTransform(cachedData);
            this.assignResources(resources);
          } else {
            componentProps.fetchAction.call(this, componentProps.fetch_url, componentProps.fetch_options).then(function (dynamicData) {
              if (componentProps.useCache) {
                _memoryCache2.default.put(componentProps.fetch_url, dynamicData, componentProps.cacheTimeout, function () {
                  console.log('removing from cache: ' + componentProps.fetch_url);
                });
              }
              resources = dataTransform(dynamicData);
              _this2.assignResources(resources);
            }).catch(function (e) {
              console.error('dynamicComponent Error', e);
              _this2.setState({
                hasError: true,
                error: e
              });
            });
          }
        } else {
          setTimeout(function () {
            try {
              resources = dataTransform(componentProps.data);
              _this2.assignResources(resources);
            } catch (err) {
              console.error('uncaughtError', err);
              _this2.setState({
                hasError: true,
                error: err
              });
            }
          }, 0);
        }
      } catch (e) {
        console.error('dynamicComponent UncaughtError', e);
        this.setState({
          hasError: true,
          error: e
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        this.computeResources(this.props);
      } catch (e) {
        console.error('dynamicComponent UncaughtError', e);
        this.setState({
          hasError: true,
          error: e
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.debug({ nextProps });
      // this.setState(nextProps);
      if (nextProps.fetch_url) {
        this.setState({
          hasLoaded: false
        });
        this.computeResources((0, _assign2.default)({}, this.props, nextProps));
      } else {
        this.setState({
          resources: nextProps.resources,
          dynamicLayout: nextProps.dynamicLayout
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // console.warn('RENDERING dynamicComponentLayout this.state', this.state, 'this.props.layout', this.props.layout);
      try {
        // let dynamicComponentLayout = (<AppSectionLoadingIndex />);
        if (this.state.hasError) {
          return _react2.default.createElement(_error2.default, { key: Math.random(), style: this.loadingStyle });
        } else if (this.state.hasLoaded) {
          return this.getRenderedComponent(this.state.dynamicLayout || this.props.layout, this.state.resources);
        } else {
          return _react2.default.createElement(_index2.default, { key: Math.random(), style: this.loadingStyle });
        }
      } catch (e) {
        console.error(e, 'this.state', this.state, 'this.props', this.props);
        return _react2.default.createElement(_error2.default, { key: Math.random(), style: this.loadingStyle });
      }
    }
  }]);
  return DynamicComponent;
}(_react.Component);

DynamicComponent.propType = propTypes;
DynamicComponent.defaultProps = defaultProps;

exports.default = DynamicComponent;