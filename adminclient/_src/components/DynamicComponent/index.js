'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _forms = require('../../server_manifest/forms');

var _card = require('../../server_manifest/card');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var functionalComponents = {
  getAreaChart: _standard.getAreaChart, getLayout: _standard.getLayout, getLevel: _standard.getLevel, getLineChart: _standard.getLineChart, getPageWrapper: _standard.getPageWrapper, getRechart: _standard.getRechart, getVictoryChart: _standard.getVictoryChart, getTable: _table.getTable, getBasicTable: _table.getBasicTable, getSheet: _table.getSheet, createForm: _forms.createForm, getCard: _card.getCard
};
// import { Columns, } from 're-bulma';

var propTypes = {
  assignResourceProperty: _react.PropTypes.string,
  assignFunctionalResourceProperty: _react.PropTypes.string,
  data: _react.PropTypes.object,
  dynamicDataTransformFunction: _react.PropTypes.string,
  functionalComponent: _react.PropTypes.string,
  functionalComponentProps: _react.PropTypes.object,
  layout: _react.PropTypes.object
};
var defaultProps = {
  assignResourceProperty: undefined,
  assignFunctionalResourceProperty: undefined,
  data: {},
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
    return _this;
  }

  (0, _createClass3.default)(DynamicComponent, [{
    key: 'assignResources',
    value: function assignResources(resources) {
      // console.warn({ resources });
      var dynamicLayout = void 0;
      var functionalProps = this.props.assignFunctionalResourceProperty ? (0, _assign2.default)({}, this.props.functionalComponentProps, (0, _defineProperty3.default)({}, this.props.assignFunctionalResourceProperty, resources)) : this.props.functionalComponentProps;
      var generatedLayout = this.props.functionalComponent && this.props.functionalComponentProps ? functionalComponents[this.props.functionalComponent](functionalProps) : this.props.layout;

      if (this.props.assignResourceProperty) {
        var flattenedLayout = (0, _flat2.default)(generatedLayout);
        // console.warn('before flattenedLayout', flattenedLayout);
        flattenedLayout[this.props.assignResourceProperty] = resources;
        dynamicLayout = (0, _assign2.default)({}, (0, _flat.unflatten)(flattenedLayout), { ignoreReduxProps: true });
        // console.warn(' unflatten(flattenedLayout', unflatten(flattenedLayout));
        // console.warn('after flattenedLayout', flattenedLayout);
      } else {
        dynamicLayout = generatedLayout;
      }
      this.setState({
        hasError: false,
        hasLoaded: true,
        resources: resources,
        dynamicLayout: dynamicLayout
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      try {
        // eslint-disable-next-line 
        var dataTransform = this.props.dynamicDataTransformFunction ? // eslint-disable-next-line 
        Function('dynamicData', this.props.dynamicDataTransformFunction) : function componentDidMount_dataTransform(dynamicData) {
          return dynamicData;
        };
        // console.warn('this.props.dynamicDataTransformFunction', this.props.dynamicDataTransformFunction);
        // console.warn('dataTransform', dataTransform);
        var resources = {};
        Object.defineProperty(dataTransform, 'name', {
          value: 'componentDidMount_dataTransform'
        });
        if (this.props.fetch_url) {
          this.props.fetchAction.call(this, this.props.fetch_url, this.props.fetch_options).then(function (dynamicData) {
            resources = dataTransform(dynamicData);
            _this2.assignResources(resources);
          }).catch(function (e) {
            console.error('dynamicComponent Error', e);
            _this2.setState({ hasError: true });
          });
        } else {
          setTimeout(function () {
            try {
              resources = dataTransform(_this2.props.data);
              _this2.assignResources(resources);
            } catch (err) {
              console.error('uncaughtError', err);
              _this2.setState({ hasError: true });
            }
          }, 0);
        }
      } catch (e) {
        console.error('dynamicComponent UncaughtError', e);
        this.setState({ hasError: true });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // console.warn('RENDERING dynamicComponentLayout this.state', this.state, 'this.props.layout', this.props.layout);
      try {
        // let dynamicComponentLayout = (<AppSectionLoadingIndex />);
        if (this.state.hasError) {
          return _react2.default.createElement(_error2.default, { key: Math.random() });
        } else if (this.state.hasLoaded) {
          return this.getRenderedComponent(this.state.dynamicLayout || this.props.layout, this.state.resources);
        } else {
          return _react2.default.createElement(_index2.default, { key: Math.random() });
        }
      } catch (e) {
        console.error(e, 'this.state', this.state, 'this.props', this.props);
        return _react2.default.createElement(_error2.default, { key: Math.random() });
      }
    }
  }]);
  return DynamicComponent;
}(_react.Component);

DynamicComponent.propType = propTypes;
DynamicComponent.defaultProps = defaultProps;

exports.default = DynamicComponent;