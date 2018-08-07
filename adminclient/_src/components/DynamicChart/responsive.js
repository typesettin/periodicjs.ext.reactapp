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

var _recharts = require('recharts');

var _index = require('../AppSectionLoading/index');

var _index2 = _interopRequireDefault(_index);

var _error = require('../AppSectionLoading/error');

var _error2 = _interopRequireDefault(_error);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import React, { Component, } from 'react';
// import { getRenderedComponent, } from '../AppLayoutMap';
// import { ResponsiveContainer, } from 'recharts';
// // import * as recharts from 'recharts';

// class DynamicResponsiveChart extends ResponsiveContainer {
//   constructor(props) {
//     console.warn('DynamicResponsiveChart props', props);
//     super(props);
//   }
//   // componentWillReceiveProps(nextProps) {
//   //   this.setState(Object.assign({},
//   //     nextProps.chartProps,
//   //     this.props.getState().dynamic
//   //   ));
//   // }
//   // render() {

//   //   return (<ResponsiveContainer key={new Date().valueOf() + '-' + Math.random()} {...this.props.passProps}>{
//   //     this.getRenderedComponent({
//   //       component: `recharts.${this.props.chartComponent}`,
//   //       props: Object.assign({}, this.props.chartProps, this.state),
//   //       children: this.props.children,
//   //       // cloneElement: true,
//   //     })
//   //   }</ResponsiveContainer>);
//   // }
// }  

var propTypes = {
  assignResourceProperty: _react.PropTypes.string,
  data: _react.PropTypes.object,
  dynamicDataTransformFunction: _react.PropTypes.string,
  layout: _react.PropTypes.object
};
// import { Columns, } from 're-bulma';


var defaultProps = {
  assignResourceProperty: undefined,
  data: {},
  dynamicDataTransformFunction: undefined,
  layout: {}
};

var DynamicResponsiveChart = function (_ResponsiveContainer) {
  (0, _inherits3.default)(DynamicResponsiveChart, _ResponsiveContainer);

  function DynamicResponsiveChart(props) {
    (0, _classCallCheck3.default)(this, DynamicResponsiveChart);

    // console.warn({ props });
    // let dynamicItems = (this.props.dynamicProp)
    //   ? this.props.getState().dynamic[this.props.dynamicProp]
    //   : [];
    // let Items = {
    //   items: Object.assign([], props.items , dynamicItems),
    // };
    var _this = (0, _possibleConstructorReturn3.default)(this, (DynamicResponsiveChart.__proto__ || (0, _getPrototypeOf2.default)(DynamicResponsiveChart)).call(this, props));

    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    _this.state = {
      hasLoaded: false,
      hasError: false,
      resources: {}
    };
    return _this;
  }

  (0, _createClass3.default)(DynamicResponsiveChart, [{
    key: 'assignResources',
    value: function assignResources(resources) {
      // console.warn({ resources });
      var dynamicLayout = void 0;
      if (this.props.assignResourceProperty) {
        var flattenedLayout = (0, _flat2.default)(this.props.layout);
        // console.warn('before flattenedLayout', flattenedLayout);
        flattenedLayout[this.props.assignResourceProperty] = resources;
        dynamicLayout = (0, _assign2.default)({}, (0, _flat.unflatten)(flattenedLayout), { ignoreReduxProps: true, bindprops: false, thisprops: false });
        // console.warn(' unflatten(flattenedLayout', unflatten(flattenedLayout));
        // console.warn('after flattenedLayout', flattenedLayout);
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

      // eslint-disable-next-line 
      var dataTransform = this.props.dynamicDataTransformFunction ? // eslint-disable-next-line 
      Function('dynamicData', this.props.dynamicDataTransformFunction) : function (dynamicData) {
        return dynamicData;
      };
      var resources = {};
      if (this.props.fetch_url) {
        this.props.fetchAction(this.props.fetch_url, this.props.fetch_options).then(function (dynamicData) {
          resources = dataTransform(dynamicData);
          _this2.assignResources(resources);
        }).catch(function (e) {
          console.debug('DynamicResponsiveChart Error', e);
          _this2.setState({ hasError: true });
        });
      } else {
        setTimeout(function () {
          resources = dataTransform(_this2.props.data);
          _this2.assignResources(resources);
        }, 0);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      console.warn('RENDERING DynamicResponsiveChartLayout this.state', this.state, 'this.props', this.props);
      try {
        // let DynamicResponsiveChartLayout = (<AppSectionLoadingIndex />);
        if (this.state.hasError) {
          return _react2.default.createElement(_error2.default, null);
        } else if (this.state.hasLoaded) {
          var component = this.getRenderedComponent(this.state.dynamicLayout || this.props.layout, this.state.resources);
          console.warn('DRC component', component);
          return _react2.default.createElement(
            _recharts.ResponsiveContainer,
            { minHeight: '360' },
            component.props.children
          );
        } else {
          return _react2.default.createElement(_index2.default, null);
        }
      } catch (e) {
        console.debug(e, 'this.state', this.state, 'this.props', this.props);
        return _react2.default.createElement(_error2.default, null);
      }
    }
  }]);
  return DynamicResponsiveChart;
}(_recharts.ResponsiveContainer);

DynamicResponsiveChart.propType = propTypes;
DynamicResponsiveChart.defaultProps = defaultProps;

exports.default = DynamicResponsiveChart;