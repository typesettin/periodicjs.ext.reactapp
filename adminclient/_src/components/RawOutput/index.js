'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RawOutput = function RawOutput(props) {
  // console.info('GOT TO RAWOUTPUT')
  var displayProp = '';
  var displayData = '';
  try {
    var propData = props;
    console.info({ propData: propData });
    if (props.flattenRawData) {
      var flattenedProps = (0, _assign2.default)({}, (0, _flat2.default)(propData, props.flattenOptions));
      displayProp = props.select ? flattenedProps[props.select] : flattenedProps;
    } else {
      displayProp = props.select ? propData[props.select] : propData;
    }
    displayData = props.display ? displayProp.toString() : (0, _stringify2.default)(displayProp, null, 2);

    if (props.debug) console.debug({ props: props, displayData: displayData, displayProp: displayProp });
  } catch (e) {
    // console.info(e);
    if (!global) {
      console.error(e);
    }
  }
  switch (props.type) {
    case 'rjx':
      return undefined.getRenderedComponent(displayData, undefined.state);
    case 'inline':
      return _react2.default.createElement(
        'span',
        { style: props.style },
        displayData
      );
    case 'block':
      return _react2.default.createElement(
        'div',
        { style: props.style },
        displayData
      );
    default:
      return _react2.default.createElement(
        'pre',
        { style: props.style },
        displayData
      );
  }
};

exports.default = RawOutput;