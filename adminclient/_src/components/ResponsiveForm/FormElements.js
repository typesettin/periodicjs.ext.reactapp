'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clearImmediate2 = require('babel-runtime/core-js/clear-immediate');

var _clearImmediate3 = _interopRequireDefault(_clearImmediate2);

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.getPropertyAttribute = getPropertyAttribute;
exports.getFormDatatable = getFormDatatable;
exports.getFormDatalist = getFormDatalist;
exports.getFormMaskedInput = getFormMaskedInput;
exports.getFormTextInputArea = getFormTextInputArea;
exports.getFormTextArea = getFormTextArea;
exports.getFormSelect = getFormSelect;
exports.getFormCheckbox = getFormCheckbox;
exports.getFormSwitch = getFormSwitch;
exports.getRawInput = getRawInput;
exports.getButton = getButton;
exports.getSliderInput = getSliderInput;
exports.getHiddenInput = getHiddenInput;
exports.getImage = getImage;
exports.getFormLink = getFormLink;
exports.getFormGroup = getFormGroup;
exports.getFormAddons = getFormAddons;
exports.getFormCode = getFormCode;
exports.getFormEditor = getFormEditor;
exports.getFormSubmit = getFormSubmit;
exports.getCardFooterItem = getCardFooterItem;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormItem = require('../FormItem');

var _FormItem2 = _interopRequireDefault(_FormItem);

var _RACodeMirror = require('../RACodeMirror');

var _RACodeMirror2 = _interopRequireDefault(_RACodeMirror);

var _PreviewEditor = require('../PreviewEditor');

var _PreviewEditor2 = _interopRequireDefault(_PreviewEditor);

var _ResponsiveDatalist = require('../ResponsiveDatalist');

var _ResponsiveDatalist2 = _interopRequireDefault(_ResponsiveDatalist);

var _ResponsiveTable = require('../ResponsiveTable');

var _ResponsiveTable2 = _interopRequireDefault(_ResponsiveTable);

var _createNumberMask = require('text-mask-addons/dist/createNumberMask');

var _createNumberMask2 = _interopRequireDefault(_createNumberMask);

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _rcSwitch = require('rc-switch');

var _rcSwitch2 = _interopRequireDefault(_rcSwitch);

var _reBulma = require('re-bulma');

var _reactTextMask = require('react-text-mask');

var _reactTextMask2 = _interopRequireDefault(_reactTextMask);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _styles = require('../../styles');

var _styles2 = _interopRequireDefault(_styles);

var _FormHelpers = require('./FormHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import RAEditor from '../RAEditor';
// import ResponsiveButton from '../ResponsiveButton';
// import { EditorState, } from 'draft-js';
function getPropertyAttribute(options) {
  var property = options.property,
      element = options.element;

  var attribute = element.name;
  var selector = element.idSelector;
  // console.log({ options });
  var returnVal = void 0;
  if (attribute.indexOf('.') === -1) {
    returnVal = property[attribute];
  } else {
    var attrArray = attribute.split('.');
    returnVal = property[attrArray[0]] ? property[attrArray[0]][attrArray[1]] : undefined;
  }

  if (selector && !options.skipSelector) {
    return returnVal[selector];
  } else {
    return returnVal;
  }
}

function getErrorStatus(state, name) {
  return state.formDataErrors && state.formDataErrors[name];
}

function getValidStatus(state, name) {
  return state.formDataValid && state.formDataValid[name];
}

function getFormElementHelp(hasError, state, name) {
  return hasError ? {
    color: 'isDanger',
    text: state.formDataErrors[name][0]
  } : undefined;
}

function getCustomErrorLabel(hasError, state, formelement) {
  return hasError ? _react2.default.createElement(
    'div',
    { style: (0, _assign2.default)({
        fontSize: 11,
        color: formelement.errorColor || '#ed6c63'
      }, formelement.customErrorProps) },
    state.formDataErrors[formelement.name][0]
  ) : null;
}

function getCustomErrorIcon(hasError, isValid, state, formelement) {
  var iconStyle = (0, _assign2.default)({
    display: 'inline-block',
    fontSize: '1rem',
    height: '24px',
    lineHeight: '24px',
    textAlign: 'center',
    verticalAlign: 'top',
    width: '24px',
    color: '#aeb1b5',
    pointerEvents: 'none',
    position: 'absolute',
    top: '5px',
    zIndex: '4',
    right: '24px'
  }, formelement.customIconStyle);
  var iconVar = hasError ? formelement.errorIcon || 'fa fa-warning' : isValid ? formelement.validIcon || 'fa fa-check' : formelement.initialIcon ? formelement.initialIcon : '';

  return formelement.errorIconRight || formelement.errorIconLeft ? _react2.default.createElement('i', { className: '__re-bulma_fa ' + iconVar, style: iconStyle }) : null;
}

function valueChangeHandler(formElement, callback) {
  var _this = this;

  return function (event) {
    var text = event.target.value;
    // console.debug({ text, formElement, });
    var updatedStateProp = {};
    updatedStateProp[formElement.name] = text;
    if (formElement.onChangeFilter) {
      var onChangeFunc = getFunctionFromProps.call(_this, { propFunc: formElement.onChangeFilter });
      updatedStateProp = onChangeFunc.call(_this, (0, _assign2.default)({}, _this.state, updatedStateProp), updatedStateProp);
    }
    _this.setState(updatedStateProp, function () {
      if (formElement.validateOnChange) {
        _this.validateFormElement({ formElement: formElement });
      }
    });
  };
}

function getFormLabel(formElement) {
  var labelValue = this && this.state && this.state[formElement.formdata_label] ? this.state[formElement.formdata_label] : formElement.label;
  if ((typeof labelValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(labelValue)) === 'object') {
    return this.getRenderedComponent(labelValue);
  } else {
    return formElement.label ? formElement.layoutProps && formElement.layoutProps.horizontalform ? _react2.default.createElement(
      _reBulma.ControlLabel,
      formElement.labelProps,
      labelValue
    ) : _react2.default.createElement(
      _reBulma.Label,
      formElement.labelProps,
      labelValue
    ) : null;
  }
}

function getInitialValue(formElement, state) {
  // console.debug({formElement, state})
  if (!formElement.value && formElement.headers && Array.isArray(formElement.headers) && formElement.headers.length) {
    formElement.value = formElement.headers.reduce(function (returnValue, header, i) {
      if (i === 0) {
        returnValue[0] = {};
      }
      returnValue[0][header.sortid] = header.value;
      return returnValue;
    }, []);
  }
  var formElementValue = formElement.value;

  if (!formElement.showNullValue && (state[formElement.name] === null || formElementValue === null || formElementValue === 'null')) {
    return '';
  } else {
    var returnVal = typeof state[formElement.name] !== 'undefined' ? state[formElement.name] : formElementValue;

    if (formElement.momentFormat) {
      returnVal = (0, _moment2.default)(returnVal).format(formElement.momentFormat);
    }
    if (formElement.numeralFormat) {
      returnVal = (0, _numeral2.default)(returnVal).format(formElement.numeralFormat);
    }

    return returnVal;
  }
}

function getPassablePropsKeyEvents(passableProps, formElement) {
  var _this2 = this;

  var customEventFunctions = ['_onClick', '_onKeyPress', '_onBlur', '_onFocus', '_onKeyUp', '_onChange'];
  customEventFunctions.forEach(function (customEventFunc) {
    if (formElement[customEventFunc]) {
      passableProps[customEventFunc.replace('_', '')] = function (e) {
        // eslint-disable-next-line
        var clickFunc = Function('e', 'formElement', '"use strict";' + formElement[customEventFunc]).bind(_this2);
        try {
          clickFunc(e, formElement);
        } catch (error) {
          console.error(error);
        }
      };
    }
    // if (formElement._onClick) {
    //   passableProps.onClick = (e) => {
    //     const clickFunc = Function('e','formElement', '"use strict";' + formElement._onClick).bind(this);
    //     clickFunc(e, formElement);
    //   };
    // }
  });
  if (formElement.keyPress) {
    var customKeyPress = function customKeyPress() {};
    if (typeof formElement.keyPress === 'string' && formElement.keyPress.indexOf('func:this.props') !== -1) {
      customKeyPress = this.props[formElement.keyPress.replace('func:this.props.', '')];
    } else if (typeof formElement.keyPress === 'string' && formElement.keyPress.indexOf('func:window') !== -1 && typeof window[formElement.keyPress.replace('func:window.', '')] === 'function') {
      customKeyPress = window[formElement.keyPress.replace('func:window.', '')].bind(this);
      // console.debug({ customKeyPress });
    }
    passableProps.onKeyPress = function (e) {
      if (formElement.validateOnKeypress) {
        _this2.validateFormElement({ formElement: formElement });
      }
      customKeyPress(e, formElement);
      // console.debug('custom press');
    };
  } else if (formElement.submitOnEnter) {
    passableProps.onKeyPress = function (e) {
      if (formElement.submitOnEnter && (e.key === 'Enter' || e.which === 13)) {
        _this2.submitForm();
      }
    };
  }
  if (formElement.onBlur) {
    var customonBlur = function customonBlur() {};
    if (typeof formElement.onBlur === 'string' && formElement.onBlur.indexOf('func:this.props') !== -1) {
      customonBlur = this.props[formElement.onBlur.replace('func:this.props.', '')];
    } else if (typeof formElement.onBlur === 'string' && formElement.onBlur.indexOf('func:window') !== -1 && typeof window[formElement.onBlur.replace('func:window.', '')] === 'function') {
      customonBlur = window[formElement.onBlur.replace('func:window.', '')].bind(this);
    }
    passableProps.onBlur = function (e) {
      if (formElement.validateOnBlur) {
        _this2.validateFormElement({ formElement: formElement });
      }
      customonBlur(e, formElement);
    };
  }
  if (formElement.onFocus) {
    var customFocus = function customFocus() {};
    if (typeof formElement.onFocus === 'string' && formElement.onFocus.indexOf('func:this.props') !== -1) {
      customFocus = this.props[formElement.onFocus.replace('func:this.props.', '')];
    } else if (typeof formElement.onFocus === 'string' && formElement.onFocus.indexOf('func:window') !== -1 && typeof window[formElement.onFocus.replace('func:window.', '')] === 'function') {
      customFocus = window[formElement.onFocus.replace('func:window.', '')].bind(this);
    }
    passableProps.onFocus = function (e) {
      customFocus(e, formElement);
    };
  }
  if (formElement.keyUp) {
    var customkeyUp = function customkeyUp() {};
    if (typeof formElement.keyUp === 'string' && formElement.keyUp.indexOf('func:this.props') !== -1) {
      customkeyUp = this.props[formElement.keyUp.replace('func:this.props.', '')];
    } else if (typeof formElement.keyUp === 'string' && formElement.keyUp.indexOf('func:window') !== -1 && typeof window[formElement.keyUp.replace('func:window.', '')] === 'function') {
      customkeyUp = window[formElement.keyUp.replace('func:window.', '')].bind(this);
    }
    passableProps.onKeyUp = function (e) {
      if (formElement.validateOnKeyup) {
        _this2.validateFormElement({ formElement: formElement });
      }
      customkeyUp(e, formElement);
    };
  }
  return passableProps;
}

function getFunctionFromProps(options) {
  var propFunc = options.propFunc;


  if (typeof propFunc === 'string' && propFunc.indexOf('func:this.props.reduxRouter') !== -1) {
    return this.props.reduxRouter[this.props.replace('func:this.props.reduxRouter.', '')];
  } else if (typeof propFunc === 'string' && propFunc.indexOf('func:this.props') !== -1) {
    return this.props[this.props.replace('func:this.props.', '')];
  } else if (typeof propFunc === 'string' && propFunc.indexOf('func:window') !== -1 && typeof window[propFunc.replace('func:window.', '')] === 'function') {
    return window[propFunc.replace('func:window.', '')];
  } else if (typeof this.props[propFunc] === 'function') {
    return propFunc;
  } else {
    return function () {};
  }
}

function getFormDatatable(options) {
  var _this3 = this;

  var formElement = options.formElement,
      i = options.i;

  var initialValue = getInitialValue(formElement, (0, _keys2.default)(this.state.formDataTables).length && this.state.formDataTables[formElement.name] ? this.state.formDataTables : (0, _assign2.default)({}, this.state, (0, _flat.unflatten)(this.state, { overwrite: true })));
  // console.debug({ initialValue },this.state, this.state[formElement.name]);
  var hasError = getErrorStatus(this.state, formElement.name);
  var getTableHeaders = function getTableHeaders(row) {
    return row.map(function (rowkey) {
      var selectOptions = _this3.state.__formOptions && _this3.state.__formOptions[rowkey] ? _this3.state.__formOptions[rowkey] : [];
      // console.log({ selectOptions });
      return {
        label: (0, _capitalize2.default)(rowkey),
        sortid: rowkey,
        sortable: typeof formElement.sortable !== 'undefined' ? formElement.sortable : true,
        formtype: formElement.tableHeaderType && formElement.tableHeaderType[rowkey] ? formElement.tableHeaderType[rowkey] : 'text',
        defaultValue: formElement.tableHeaderDefaultValue && formElement.tableHeaderDefaultValue[rowkey] ? formElement.tableHeaderDefaultValue[rowkey] : selectOptions.length ? selectOptions[0].value : undefined,
        formoptions: selectOptions,
        footerFormElementPassProps: (0, _assign2.default)({
          placeholder: (0, _capitalize2.default)(rowkey)
        }, formElement.footerFormElementPassProps)
      };
    });
  };
  var useRowButtons = formElement.rowButtons;
  var ignoreTableHeaders = formElement.ignoreTableHeaders || [];
  var tableHeaders = formElement.headers ? formElement.useStandardHeaders ? getTableHeaders(formElement.headers.map(function (header) {
    return header.sortid;
  })) : formElement.headers : initialValue && Array.isArray(initialValue) && initialValue.length ? getTableHeaders((0, _keys2.default)(initialValue[0]).filter(function (header) {
    return ignoreTableHeaders.indexOf(header) === -1;
  })) : [];
  tableHeaders = useRowButtons ? tableHeaders.concat({
    label: formElement.rowOptionsLabel || '',
    formtype: false,
    formRowButtons: true,
    formRowButtonProps: formElement.formRowButtonProps
  }) : tableHeaders.concat({
    label: '',
    formtype: false
  });
  tableHeaders = tableHeaders.map(function (header) {
    if (header.formtype === 'select' && !header.formoptions) {
      header.formoptions = header.sortid && _this3.state.__formOptions && _this3.state.__formOptions[header.sortid] ? _this3.state.__formOptions[header.sortid] : [];
    }
    return header;
  });
  var passedProps = (0, _assign2.default)({}, this.props, {
    selectEntireRow: formElement.selectEntireRow,
    insertSelectedRowHeaderIndex: formElement.insertSelectedRowHeaderIndex,
    selectOptionSortId: formElement.selectOptionSortId,
    selectOptionSortIdLabel: formElement.selectOptionSortIdLabel,
    flattenRowData: formElement.flattenRowData,
    addNewRows: formElement.addNewRows,
    sortable: formElement.sortable,
    replaceButton: false,
    uploadAddButton: true,
    useInputRows: formElement.useInputRows,
    rows: initialValue,
    headers: tableHeaders,
    limit: 5000,
    hasPagination: false,
    tableForm: true
  }, formElement.passProps); // formElement.datalist,
  // console.log({ tableHeaders, useRowButtons,passedProps });
  // console.debug({tableHeaders})
  // let shape ={};// this is the header of of the footer which has elements for new insert
  // let inlineshape ={};// if true, should look like a regular form row, else form below
  //   // console.debug({formElement,initialValue, },'this.state',this.state);
  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel.call(this, formElement),
    _react2.default.createElement(_ResponsiveTable2.default, (0, _extends3.default)({
      onChange: function onChange(newvalue) {
        var selectedRowData = formElement.selectEntireRow && (newvalue.selectedRowData || newvalue.selectedRowIndex) ? (0, _defineProperty3.default)({}, formElement.name + '__tabledata', {
          selectedRowData: newvalue.selectedRowData,
          selectedRowIndex: newvalue.selectedRowIndex
        }) : {};
        var flattenedData = _this3.props.flattenFormData ? (0, _flat2.default)((0, _assign2.default)({}, selectedRowData, (0, _defineProperty3.default)({}, formElement.name, newvalue.rows))) : {};
        var formDataTables = (0, _assign2.default)({}, _this3.state.formDataTables, (0, _defineProperty3.default)({}, formElement.name, newvalue.rows));
        if (_this3.props.flattenFormData) {
          (0, _keys2.default)(_this3.state).forEach(function (stateProperty) {
            if (stateProperty.indexOf(formElement.name + '.') === 0) {
              delete _this3.state[stateProperty];
            }
          });
        }

        var updatedStateProp = (0, _assign2.default)((0, _defineProperty3.default)({
          formDataTables: formDataTables
        }, formElement.name, newvalue.rows), flattenedData, selectedRowData);
        if (formElement.onChangeFilter) {
          var onChangeFunc = getFunctionFromProps.call(_this3, { propFunc: formElement.onChangeFilter });
          updatedStateProp = onChangeFunc.call(_this3, (0, _assign2.default)({}, _this3.state, updatedStateProp), updatedStateProp);
        }
        // console.debug('DATATABLE',updatedStateProp);
        _this3.setState(updatedStateProp);
      },
      value: initialValue }, passedProps)),
    getCustomErrorLabel(hasError, this.state, formElement)
  );
}

function getFormDatalist(options) {
  var _this4 = this;

  var formElement = options.formElement,
      i = options.i;

  var initialValue = getInitialValue(formElement, (0, _assign2.default)({}, this.state, (0, _flat.unflatten)(this.state)));
  var hasError = getErrorStatus(this.state, formElement.name);
  var passedProps = (0, _assign2.default)({}, this.props, {
    wrapperProps: {
      style: {
        display: 'flex',
        width: '100%',
        flex: '5',
        alignItems: 'stretch',
        flexDirection: 'column'
      }
    },
    passableProps: {
      help: getFormElementHelp(hasError, this.state, formElement.name),
      color: hasError ? 'isDanger' : undefined,
      icon: hasError ? formElement.errorIcon || 'fa fa-warning' : undefined,
      placeholder: formElement.placeholder,
      style: {
        width: '100%'
      }
    }
  }, formElement.datalist);
  // console.debug({formElement,initialValue, },'this.state',this.state);
  // console.debug({ passedProps });
  if (formElement.datalist.staticSearch) {
    // let datalistdata = this.state[formElement.name];
    var datalistdata = [];
    if (this.props.__formOptions && this.props.__formOptions[formElement.name]) {
      datalistdata = this.props.__formOptions[formElement.name];
    } else if (formElement.options) {
      datalistdata = formElement.options;
    } else {
      datalistdata = this.props.formdata[(0, _pluralize2.default)(formElement.datalist.entity)] || [];
    }
    passedProps.datalistdata = datalistdata;
  }
  // console.log({formElement, initialValue})
  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel.call(this, formElement),
    _react2.default.createElement(_ResponsiveDatalist2.default, (0, _extends3.default)({
      onChange: function onChange(newvalue) {
        // console.log({newvalue})
        var updatedStateProp = {};
        updatedStateProp[formElement.name] = newvalue;

        if (_this4.props.flattenFormData) {
          (0, _keys2.default)(_this4.state).forEach(function (stateProperty) {
            if (stateProperty.indexOf(formElement.name + '.') === 0) {
              // console.log('deleting',stateProperty)
              delete _this4.state[stateProperty];
            }
          });
        }
        // console.log({updatedStateProp})
        _this4.setState(updatedStateProp);
      },
      value: initialValue }, passedProps))
  );
}

function getFormMaskedInput(options) {
  var _this5 = this;

  var formElement = options.formElement,
      i = options.i,
      onChange = options.onChange;

  var initialValue = getInitialValue(formElement, this.state);
  var getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  var fileClassname = '__reactapp_file_' + formElement.name;
  var hasError = getErrorStatus(this.state, formElement.name);
  var hasValue = formElement.name && this.state[formElement.name] ? true : false;
  var isValid = getValidStatus(this.state, formElement.name);
  var passableProps = (0, _assign2.default)({
    type: 'text',
    className: '__re-bulma_input'
  }, formElement.passProps);

  if (typeof initialValue !== 'string') {
    initialValue = (0, _stringify2.default)(initialValue, null, 2);
  }
  if (formElement.disableOnChange) {
    onChange = function onChange() {};
  } else if (!onChange) {
    onChange = function onChange(event) {
      var text = event.target.value;
      var updatedStateProp = {};
      if (passableProps && passableProps.multiple) {
        document.querySelector('.' + fileClassname + ' input').setAttribute('multiple', true);
      }
      updatedStateProp[formElement.name] = passableProps.maxLength ? text.substring(0, passableProps.maxLength) : text;
      _this5.setState(updatedStateProp);
    };
  }
  passableProps = getPassablePropkeyevents(passableProps, formElement);
  if (passableProps && passableProps.multiple) {
    var t = (0, _setImmediate3.default)(function () {
      document.querySelector('.' + fileClassname + ' input').setAttribute('multiple', true);
      (0, _clearImmediate3.default)(t);
    });
  }

  formElement.customErrorProps = formElement.customErrorProps ? (0, _assign2.default)({}, { marginTop: '6px' }, formElement.customErrorProps) : { marginTop: '6px' };

  var mask = [];
  function maskFunction(maskProp) {
    return function () {
      // return [ '(', /[1-9]/, /\d/, /\d/, ')', '\u2000', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ];
      if (Array.isArray(maskProp)) {
        var maskArray = maskProp.map(function (maskItem) {
          if (maskItem.charAt(0) === '/' && maskItem.charAt(maskItem.length - 1) === '/') {
            if (maskItem.charAt(1) === '[') {
              return new RegExp(maskItem.slice(1, maskItem.length - 1));
            } else {
              return new RegExp('\\' + maskItem.slice(1, maskItem.length - 1));
            }
          } else {
            return maskItem;
          }
        });
        return maskArray;
      } else {
        return maskProp;
      }
    };
  }
  if (formElement.createNumberMask && typeof passableProps.mask === 'string' && passableProps.mask.indexOf('func:window') !== -1 && typeof window[passableProps.mask.replace('func:window.', '')] === 'function') {
    var numberMaskConfig = (0, _typeof3.default)(window[passableProps.mask.replace('func:window.', '')].call(this, formElement)) === 'object' ? window[passableProps.mask.replace('func:window.', '')].call(this, formElement) : {};
    mask = (0, _createNumberMask2.default)(numberMaskConfig);
  } else if (typeof passableProps.mask === 'string' && passableProps.mask.indexOf('func:window') !== -1 && typeof window[passableProps.mask.replace('func:window.', '')] === 'function') {
    mask = window[passableProps.mask.replace('func:window.', '')].bind(this, formElement);
  } else if (formElement.createNumberMask) {
    // console.log('passableProps.numberMask',passableProps.numberMask)
    mask = (0, _createNumberMask2.default)(maskFunction(passableProps.mask));
  } else if (passableProps.mask) {
    mask = maskFunction(passableProps.mask);
  }
  // console.log({mask})
  var wrapperProps = (0, _assign2.default)({
    className: '__re-bulma_control'
  }, formElement.wrapperProps);

  wrapperProps.className = (hasError || isValid || formElement.initialIcon) && (formElement.errorIconRight || formElement.errorIconLeft) ? formElement.errorIconRight ? wrapperProps.className + ' __re-bulma_has-icon __re-bulma_has-icon-right' : wrapperProps.className + ' __re-bulma_has-icon __re-bulma_has-icon-left' : wrapperProps.className;

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps, { initialIcon: formElement.initialIcon, isValid: isValid, hasError: hasError, hasValue: hasValue }),
    getFormLabel.call(this, formElement),
    _react2.default.createElement(
      'span',
      wrapperProps,
      _react2.default.createElement(_reactTextMask2.default, (0, _extends3.default)({
        mask: mask,
        className: hasError ? passableProps.className + ' __re-bulma_is-danger' : passableProps.className,
        color: hasError ? 'isDanger' : undefined,
        onChange: onChange,
        placeholder: formElement.placeholder,
        value: initialValue
      }, passableProps)),
      getCustomErrorIcon(hasError, isValid, this.state, formElement),
      getCustomErrorLabel(hasError, this.state, formElement)
    )
  );
}

function getFormTextInputArea(options) {
  var _this6 = this;

  var formElement = options.formElement,
      i = options.i,
      onChange = options.onChange;

  var initialValue = getInitialValue(formElement, this.state); //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  var getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  var fileClassname = '__reactapp_file_' + formElement.name;
  var hasError = getErrorStatus(this.state, formElement.name);
  var isValid = getValidStatus(this.state, formElement.name);
  var hasValue = formElement.name && this.state[formElement.name] ? true : false;
  var passableProps = (0, _assign2.default)({
    type: formElement.type || 'text'
  }, formElement.passProps);
  if (passableProps && passableProps.type === 'file') {
    passableProps.className = fileClassname;
  }
  if (typeof initialValue !== 'string') {
    initialValue = (0, _stringify2.default)(initialValue, null, 2);
  }
  if (formElement.disableOnChange) {
    onChange = function onChange() {};
  } else if (!onChange) {
    onChange = function onChange(event) {
      var text = event.target.value;
      var updatedStateProp = {};
      if (passableProps && passableProps.multiple) {
        document.querySelector('.' + fileClassname + ' input').setAttribute('multiple', true);
      }

      if (passableProps && passableProps.type === 'file') {
        updatedStateProp.formDataFiles = (0, _assign2.default)({}, _this6.state.formDataFiles, (0, _defineProperty3.default)({}, formElement.name, document.querySelector('.' + fileClassname + ' input')));
      } else {
        updatedStateProp[formElement.name] = passableProps.maxLength ? text.substring(0, passableProps.maxLength) : text;
      }
      if (formElement.onChangeFilter) {
        var onChangeFunc = getFunctionFromProps.call(_this6, { propFunc: formElement.onChangeFilter });
        updatedStateProp = onChangeFunc.call(_this6, (0, _assign2.default)({}, _this6.state, updatedStateProp), updatedStateProp);
      }
      _this6.setState(updatedStateProp);
    };
  }
  passableProps = getPassablePropkeyevents(passableProps, formElement);

  // console.debug({ passableProps });
  if (passableProps && passableProps.multiple) {
    var t = (0, _setImmediate3.default)(function () {
      document.querySelector('.' + fileClassname + ' input').setAttribute('multiple', true);
      (0, _clearImmediate3.default)(t);
    });
  }
  var inputElement = _react2.default.createElement(_reBulma.Input, (0, _extends3.default)({
    help: getFormElementHelp(hasError, this.state, formElement.name),
    color: hasError ? 'isDanger' : undefined,
    icon: hasError ? formElement.errorIcon || 'fa fa-warning' : isValid ? formElement.validIcon || 'fa fa-check' : formElement.initialIcon ? formElement.initialIcon : undefined,
    hasIconRight: formElement.errorIconRight,
    onChange: onChange,
    placeholder: formElement.placeholder,
    value: initialValue }, passableProps));
  return formElement.rawItem ? inputElement : _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps, { initialIcon: formElement.initialIcon, isValid: isValid, hasError: hasError, hasValue: hasValue }),
    getFormLabel.call(this, formElement),
    inputElement
  );
}

function getFormTextArea(options) {
  var formElement = options.formElement,
      i = options.i,
      _onChange = options.onChange;

  var initialValue = getInitialValue(formElement, this.state); //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  var hasError = getErrorStatus(this.state, formElement.name);
  var isValid = getValidStatus(this.state, formElement.name);
  var hasValue = formElement.name && this.state[formElement.name] ? true : false;
  var passableProps = (0, _assign2.default)({}, formElement.passProps);
  var getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  passableProps = getPassablePropkeyevents(passableProps, formElement);

  if (typeof initialValue !== 'string') {
    initialValue = (0, _stringify2.default)(initialValue, null, 2);
  }
  if (formElement.disableOnChange) {
    _onChange = function onChange() {
      return function () {};
    };
  } else if (!_onChange) {
    _onChange = valueChangeHandler.bind(this, formElement);
  }

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps, { initialIcon: formElement.initialIcon, isValid: isValid, hasError: hasError, hasValue: hasValue }),
    getFormLabel.call(this, formElement),
    _react2.default.createElement(_reBulma.Textarea, (0, _extends3.default)({
      onChange: function onChange(event) {
        return _onChange()(event);
      },
      help: getFormElementHelp(hasError, this.state, formElement.name),
      icon: hasError ? formElement.errorIcon || 'fa fa-warning' : isValid ? formElement.validIcon || 'fa fa-check' : formElement.initialIcon ? formElement.initialIcon : undefined,
      color: hasError ? 'isDanger' : undefined,
      hasIconRight: formElement.errorIconRight,
      placeholder: formElement.placeholder || formElement.label,
      value: this.state[formElement.name] || initialValue }, passableProps))
  );
}

function getFormSelect(options) {
  var formElement = options.formElement,
      i = options.i,
      _onChange2 = options.onChange;

  var initialValue = getInitialValue(formElement, this.state); //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  var hasError = getErrorStatus(this.state, formElement.name);
  var isValid = getValidStatus(this.state, formElement.name);
  var getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  var passableProps = getPassablePropkeyevents(formElement.passProps, formElement);
  formElement.passProps = (0, _assign2.default)({}, formElement.passProps, passableProps);
  var hasValue = formElement.name && this.state[formElement.name] ? true : false;
  var selectOptions = this.state.__formOptions && this.state.__formOptions[formElement.name] ? this.state.__formOptions[formElement.name] : formElement.options || [];

  if (typeof initialValue !== 'string') {
    initialValue = (0, _stringify2.default)(initialValue, null, 2);
  }
  if (formElement.disableOnChange) {
    _onChange2 = function onChange() {
      return function () {};
    };
  } else if (!_onChange2) {
    _onChange2 = valueChangeHandler.bind(this, formElement);
  }
  var customCallbackfunction = void 0;
  if (formElement.customOnChange) {
    if (formElement.customOnChange.indexOf('func:this.props') !== -1) {
      customCallbackfunction = this.props[formElement.customOnChange.replace('func:this.props.', '')];
    } else if (formElement.customOnChange.indexOf('func:window') !== -1 && typeof window[formElement.customOnChange.replace('func:window.', '')] === 'function') {
      customCallbackfunction = window[formElement.customOnChange.replace('func:window.', '')].bind(this, formElement);
    }
  }

  var selectElement = _react2.default.createElement(
    'span',
    { className: '__re-bulma_control', style: { position: 'relative', display: 'block' } },
    _react2.default.createElement(
      _reBulma.Select,
      (0, _extends3.default)({
        style: (0, _assign2.default)({}, { flex: 'inherit', marginBottom: 0 }, formElement.passProps && formElement.passProps.style ? formElement.passProps.style : {}),
        help: getFormElementHelp(hasError, this.state, formElement.name),
        color: hasError ? 'isDanger' : undefined,
        onChange: function onChange(event) {
          _onChange2()(event);
          if (customCallbackfunction) customCallbackfunction(event);
        },
        placeholder: formElement.placeholder || formElement.label,
        value: this.state[formElement.name] || initialValue }, formElement.passProps),
      selectOptions.map(function (opt, k) {
        return _react2.default.createElement(
          'option',
          { key: k, disabled: opt.disabled, value: opt.value },
          opt.label || opt.value
        );
      })
    ),
    !formElement.errorIconLeft ? getCustomErrorIcon(hasError, isValid, this.state, formElement) : null
  );
  return formElement.rawItem ? selectElement : _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps, { initialIcon: formElement.initialIcon, isValid: isValid, hasError: hasError, hasValue: hasValue }),
    getFormLabel.call(this, formElement),
    selectElement
  );
}

function getFormCheckbox(options) {
  var _this7 = this;

  var formElement = options.formElement,
      i = options.i,
      onValueChange = options.onValueChange;

  var hasError = getErrorStatus(this.state, formElement.name);
  var hasValue = formElement.name && this.state[formElement.name] ? true : false;
  var getFormDataLabel = getFormLabel.bind(this);
  if (formElement.disableOnChange) {
    onValueChange = function onValueChange() {};
  } else if (!onValueChange) {
    onValueChange = function onValueChange() /*event*/{
      // let text = event.target.value;
      var updatedStateProp = {};
      // console.debug('before', { updatedStateProp, formElement, }, event.target);
      if (formElement.type === 'radio') {
        // event.target.value = 'on';
        updatedStateProp[_this7.state[formElement.formdata_name] || formElement.name] = _this7.state[formElement.formdata_value] || formElement.value || 'on';
      } else {
        updatedStateProp[_this7.state[formElement.formdata_name] || formElement.name] = _this7.state[_this7.state[formElement.formdata_name] || formElement.name] ? 0 : 'on';
      }
      // console.debug('after', { updatedStateProp, formElement, }, event.target);
      if (formElement.onChangeFilter) {
        var onChangeFunc = getFunctionFromProps.call(_this7, { propFunc: formElement.onChangeFilter });
        updatedStateProp = onChangeFunc.call(_this7, (0, _assign2.default)({}, _this7.state, updatedStateProp), updatedStateProp);
      }
      _this7.setState(updatedStateProp, function () {
        if (formElement.validateOnChange) {
          _this7.validateFormElement({ formElement: formElement });
        }
      });
    };
  }

  var getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  var passableProps = getPassablePropkeyevents(formElement.passProps, formElement);
  formElement.passProps = (0, _assign2.default)({}, formElement.passProps, passableProps);

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps, { hasError: hasError, hasValue: hasValue }),
    getFormDataLabel(formElement),
    _react2.default.createElement('input', (0, _extends3.default)({
      type: formElement.type || 'checkbox',
      name: this.state[formElement.formdata_name] || formElement.name,
      checked: formElement.type === 'radio' ? this.state[formElement.name] === formElement.value : this.state[formElement.name],
      onChange: onValueChange }, formElement.passProps)),
    _react2.default.createElement(
      'span',
      formElement.placeholderProps,
      this.state[formElement.formdata_placeholder] || formElement.placeholder
    ),
    getCustomErrorLabel(hasError, this.state, formElement)
  );
}

function getFormSwitch(options) {
  var _this8 = this;

  var formElement = options.formElement,
      i = options.i,
      onValueChange = options.onValueChange;

  var hasError = getErrorStatus(this.state, formElement.name);
  var hasValue = formElement.name && this.state[formElement.name] ? true : false;
  var getFormDataLabel = getFormLabel.bind(this);
  if (formElement.disableOnChange) {
    onValueChange = function onValueChange() {};
  } else if (!onValueChange) {
    onValueChange = function onValueChange() /*event*/{
      // let text = event.target.value;
      var updatedStateProp = {};
      // console.debug('before', { updatedStateProp, formElement, }, event.target);
      updatedStateProp[_this8.state[formElement.formdata_name] || formElement.name] = _this8.state[_this8.state[formElement.formdata_name] || formElement.name] ? 0 : 'on';

      // console.debug('after', { updatedStateProp, formElement, }, event.target);
      if (formElement.onChange) {
        var onChangeFunc = getFunctionFromProps.call(_this8, { propFunc: formElement.onChange });
        onChangeFunc.call(_this8, (0, _assign2.default)({}, _this8.state, updatedStateProp), updatedStateProp);
      }
      if (formElement.onChangeFilter) {
        var _onChangeFunc = getFunctionFromProps.call(_this8, { propFunc: formElement.onChangeFilter });
        updatedStateProp = _onChangeFunc.call(_this8, (0, _assign2.default)({}, _this8.state, updatedStateProp), updatedStateProp);
      }
      _this8.setState(updatedStateProp, function () {
        if (formElement.validateOnChange) {
          _this8.validateFormElement({ formElement: formElement });
        }
      });
    };
  }

  var getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  // let passableProps = getPassablePropkeyevents(formElement.passProps, formElement);
  formElement.passProps = getPassablePropkeyevents(formElement.passProps, formElement);

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps, { hasError: hasError, hasValue: hasValue }),
    getFormDataLabel(formElement),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_rcSwitch2.default
      // type={formElement.type || 'checkbox'}
      // name={this.state[ formElement.formdata_name] || formElement.name}
      , (0, _extends3.default)({ checked: this.state[formElement.name]
        // disabled={this.state.disabled}
        // checkedChildren={'on'}
        // unCheckedChildren={''}
        , onChange: onValueChange
      }, formElement.passProps))
    ),
    _react2.default.createElement(
      'span',
      formElement.placeholderProps,
      this.state[formElement.formdata_placeholder] || formElement.placeholder
    ),
    getCustomErrorLabel(hasError, this.state, formElement)
  );
}

function getRawInput(options) {
  var _this9 = this;

  var formElement = options.formElement,
      i = options.i,
      onValueChange = options.onValueChange;

  var hasError = getErrorStatus(this.state, formElement.name);
  var wrapperProps = (0, _assign2.default)({
    style: {
      overflow: 'auto',
      backgroundColor: 'white',
      border: hasError ? '1px solid #ed6c63' : '1px solid #d3d6db',
      borderRadius: 3,
      height: 'auto',
      boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)'
    }
  }, formElement.wrapperProps);
  var passableProps = formElement.passProps;
  var getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  passableProps = getPassablePropkeyevents(passableProps, formElement);
  if (!onValueChange) {
    onValueChange = function onValueChange() /*event*/{
      // let text = event.target.value;
      var updatedStateProp = {};
      updatedStateProp[formElement.name] = _this9.state[formElement.name] ? false : 'on';
      // console.log({ updatedStateProp });
      if (formElement.onChangeFilter) {
        var onChangeFunc = getFunctionFromProps.call(_this9, { propFunc: formElement.onChangeFilter });
        updatedStateProp = onChangeFunc.call(_this9, (0, _assign2.default)({}, _this9.state, updatedStateProp), updatedStateProp);
      }
      _this9.setState(updatedStateProp);
    };
  }

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel.call(this, formElement),
    _react2.default.createElement(
      'div',
      wrapperProps,
      _react2.default.createElement('input', (0, _extends3.default)({
        type: formElement.type,
        checked: this.state[formElement.name],
        onChange: onValueChange }, passableProps)),
      getCustomErrorLabel(hasError, this.state, formElement)
    )
  );
}

function getButton(options) {
  var _this10 = this;

  var formElement = options.formElement,
      i = options.i,
      onValueChange = options.onValueChange;

  var hasError = getErrorStatus(this.state, formElement.name);
  var passableProps = formElement.passProps || {};
  var getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  passableProps = getPassablePropkeyevents(passableProps, formElement);
  if (!onValueChange) {
    onValueChange = function onValueChange() /*event*/{
      // let text = event.target.value;
      var updatedStateProp = {};
      updatedStateProp[formElement.name] = _this10.state[formElement.name] ? false : 'on';
      // console.log({ updatedStateProp });
      if (formElement.onChangeFilter) {
        var onChangeFunc = getFunctionFromProps.call(_this10, { propFunc: formElement.onChangeFilter });
        updatedStateProp = onChangeFunc.call(_this10, (0, _assign2.default)({}, _this10.state, updatedStateProp), updatedStateProp);
      }
      _this10.setState(updatedStateProp);
    };
  }

  var buttonElement = _react2.default.createElement(
    _reBulma.Button,
    (0, _extends3.default)({
      type: formElement.type,
      onChange: onValueChange }, passableProps),
    formElement.value || passableProps.value
  );
  return formElement.rawItem ? buttonElement : _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel.call(this, formElement),
    buttonElement,
    getCustomErrorLabel(hasError, this.state, formElement)
  );
}

function getSliderInput(options) {
  var _this11 = this;

  var formElement = options.formElement,
      i = options.i,
      onValueChange = options.onValueChange;
  // const Handle = (
  // );

  var hasError = getErrorStatus(this.state, formElement.name);
  var wrapperProps = (0, _assign2.default)({
    style: {
      overflow: 'auto',
      backgroundColor: 'white',
      border: hasError ? '1px solid #ed6c63' : '1px solid #d3d6db',
      borderRadius: 3,
      height: 'auto',
      boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)'
    }
  }, formElement.wrapperProps);
  var passableProps = (0, _assign2.default)({}, formElement.passProps);
  var customCallbackfunction = function customCallbackfunction() {};
  if (formElement.handle) {
    passableProps.handle = function (_ref2) {
      var value = _ref2.value,
          offset = _ref2.offset;
      return _react2.default.createElement(
        'div',
        { style: { left: offset + '%' }, className: '__reactapp_slider__handle' },
        _react2.default.createElement('span', { className: '__reactapp_arrow-left' }),
        formElement.numeralFormat ? (0, _numeral2.default)(value).format(formElement.numeralFormat) : value,
        _react2.default.createElement('span', { className: '__reactapp_arrow-right' })
      );
    };
  }
  if (formElement.customOnChange) {
    if (formElement.customOnChange.indexOf('func:this.props') !== -1) {
      customCallbackfunction = this.props[formElement.customOnChange.replace('func:this.props.', '')];
    } else if (formElement.customOnChange.indexOf('func:window') !== -1 && typeof window[formElement.customOnChange.replace('func:window.', '')] === 'function') {
      customCallbackfunction = window[formElement.customOnChange.replace('func:window.', '')].bind(this);
    }
  }
  if (!onValueChange) {
    onValueChange = function onValueChange(val) {
      // console.debug({ val });
      var updatedStateProp = {};
      updatedStateProp[formElement.name] = val;
      // console.log({ updatedStateProp });
      if (formElement.onChangeFilter) {
        var onChangeFunc = getFunctionFromProps.call(_this11, { propFunc: formElement.onChangeFilter });
        updatedStateProp = onChangeFunc.call(_this11, (0, _assign2.default)({}, _this11.state, updatedStateProp), updatedStateProp);
      }
      _this11.setState(updatedStateProp);
      customCallbackfunction(val);
    };
  }

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel.call(this, formElement),
    _react2.default.createElement(
      'div',
      wrapperProps,
      _react2.default.createElement(
        _rcSlider2.default,
        (0, _extends3.default)({
          onChange: onValueChange }, passableProps),
        formElement.leftLabel ? _react2.default.createElement(
          'span',
          { className: '__reactapp_slider__label __reactapp_slider__label_left' },
          formElement.leftLabel
        ) : null,
        formElement.rightLabel ? _react2.default.createElement(
          'span',
          { className: '__reactapp_slider__label __reactapp_slider__label_right' },
          formElement.rightLabel
        ) : null
      ),
      getCustomErrorLabel(hasError, this.state, formElement)
    )
  );
}

function getHiddenInput(options) {
  var formElement = options.formElement,
      i = options.i;

  var initialValue = this.state[formElement.formdata_name] || this.state[formElement.name] || formElement.value;

  return _react2.default.createElement('input', (0, _extends3.default)({ key: i }, formElement.passProps, {
    type: 'hidden',
    value: initialValue }));
}

function getImage(options) {
  var formElement = options.formElement,
      i = options.i;

  var initialValue = getInitialValue(formElement, this.state);
  var imageProps = (0, _assign2.default)({
    style: {
      textAlign: 'center'
    }
  }, formElement.passProps);
  //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel.call(this, formElement),
    formElement.link ? // eslint-disable-next-line
    _react2.default.createElement(
      'a',
      { href: initialValue, target: '_blank' },
      _react2.default.createElement(_reBulma.Image, (0, _extends3.default)({ key: i }, imageProps, { src: this.state[formElement.preview] || initialValue }))
    ) : _react2.default.createElement(_reBulma.Image, (0, _extends3.default)({ key: i }, imageProps, { src: this.state[formElement.preview] || initialValue }))
  );
}

function getFormLink(options) {
  var formElement = options.formElement,
      i = options.i,
      button = options.button;

  var wrapperProps = (0, _assign2.default)({
    style: _styles2.default.inputStyle
  }, formElement.wrapperProps);
  var linkWrapperProps = (0, _assign2.default)({
    style: {
      padding: '0 5px'
    }
  }, formElement.linkWrapperProps);
  // console.debug({ linkWrapperProps, formElement });

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel.call(this, formElement),
    _react2.default.createElement(
      'span',
      wrapperProps,
      _react2.default.createElement(
        'span',
        linkWrapperProps,
        button
      )
    )
  );
}

function getFormGroup(options) {
  var formElement = options.formElement,
      i = options.i,
      groupElements = options.groupElements;


  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel.call(this, formElement),
    _react2.default.createElement(
      _reBulma.Group,
      formElement.passProps,
      groupElements
    )
  );
}

function getFormAddons(options) {
  var formElement = options.formElement,
      i = options.i,
      addonElements = options.addonElements;


  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel.call(this, formElement),
    _react2.default.createElement(
      _reBulma.Addons,
      formElement.passProps,
      addonElements
    )
  );
}

function getFormCode(options) {
  var formElement = options.formElement,
      i = options.i,
      onValueChange = options.onValueChange;

  var hasError = getErrorStatus(this.state, formElement.name);
  var initialVal = getInitialValue(formElement, this.state);
  var CodeMirrorProps = (0, _assign2.default)({
    codeMirrorProps: (0, _assign2.default)({
      lineNumbers: true,
      value: formElement.stringify ? (0, _stringify2.default)(initialVal, null, 2) : initialVal, //formElement.value || this.state[ formElement.name ] || getPropertyAttribute({ element:formElement, property:this.state, });
      //value: this.state[ formElement.name ] || formElement.value,
      style: {
        minHeight: 200
      },
      lineWrapping: true,
      onChange: !onValueChange ? function (newvalue) {
        // console.log({ newvalue });
        newvalue = formElement.stringify ? JSON.parse(newvalue) : newvalue;
        var updatedStateProp = {};
        updatedStateProp[formElement.name] = newvalue;
        if (formElement.onChangeFilter) {
          var onChangeFunc = getFunctionFromProps.call(this, { propFunc: formElement.onChangeFilter });
          updatedStateProp = onChangeFunc.call(this, (0, _assign2.default)({}, this.state, updatedStateProp), updatedStateProp);
        }
        this.setState(updatedStateProp);
      }.bind(this) : onValueChange
    }, formElement.codeMirrorProps),
    wrapperProps: (0, _assign2.default)({
      style: {
        overflow: 'auto',
        backgroundColor: 'white',
        border: hasError ? '1px solid #ed6c63' : '1px solid #d3d6db',
        borderRadius: 3,
        height: 'auto',
        boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)'
      }
    }, formElement.codeMirrorWrapperProps)
  }, formElement.passProps);

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel.call(this, formElement),
    _react2.default.createElement(_RACodeMirror2.default, (0, _extends3.default)({ key: i }, CodeMirrorProps)),
    getCustomErrorLabel(hasError, this.state, formElement)
  );
}

function getFormEditor(options) {
  var _this12 = this;

  var formElement = options.formElement,
      i = options.i,
      onValueChange = options.onValueChange;

  var initialVal = getInitialValue(formElement, this.state);
  if (!onValueChange) {
    onValueChange = function onValueChange(newvalue) {
      // console.debug({ newvalue, });
      var updatedStateProp = {};
      updatedStateProp[formElement.name] = newvalue.target.value;
      if (formElement.onChangeFilter) {
        var onChangeFunc = getFunctionFromProps.call(_this12, { propFunc: formElement.onChangeFilter });
        updatedStateProp = onChangeFunc.call(_this12, (0, _assign2.default)({}, _this12.state, updatedStateProp), updatedStateProp);
      }
      _this12.setState(updatedStateProp);
    };
  }
  // console.debug({ initialVal });
  var EditorProps = (0, _assign2.default)({}, this.props, {
    // wrapperProps: {
    //   style: {
    //     overflow: 'hidden',
    //     backgroundColor: 'white',
    //     border: '1px solid #d3d6db',
    //     borderRadius: 3,
    //     minHeight:'2rem',
    //     display:'flex',
    //     boxShadow: 'inset 0 1px 2px rgba(17,17,17,.1)',
    //   },
    // },
    passProps: {
      // toolbarStyle: {
      //   borderTop: 'none',
      //   borderLeft: 'none',
      //   borderRight: 'none',
      //   padding: '5px 0 0',
      // },
    },
    onChange: onValueChange
  }, formElement.passProps);

  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel.call(this, formElement),
    _react2.default.createElement(_PreviewEditor2.default, (0, _extends3.default)({ key: i }, EditorProps, { value: initialVal }))
  );
}

function getFormSubmit(options) {
  var _this13 = this;

  var formElement = options.formElement,
      i = options.i;


  var getPassablePropkeyevents = getPassablePropsKeyEvents.bind(this);
  var customPassableProps = getPassablePropkeyevents(formElement.passProps, formElement);
  // formElement.passProps = Object.assign({}, formElement.passProps, passableProps);
  var passableProps = (0, _assign2.default)({
    state: formElement.confirmModal && (0, _keys2.default)(this.state.formDataErrors).length > 0 ? 'isDisabled' : undefined
  }, this.props.useLoadingButtons && this.state.__formIsSubmitting ? {
    state: 'isLoading'
  } : {}, customPassableProps, formElement.passProps);
  return _react2.default.createElement(
    _FormItem2.default,
    (0, _extends3.default)({ key: i }, formElement.layoutProps),
    getFormLabel.call(this, formElement),
    _react2.default.createElement(
      _reBulma.Button,
      (0, _extends3.default)({
        onClick: function onClick() {
          var validated_formdata = _FormHelpers.validateForm.call(_this13, { formdata: _this13.state, validationErrors: {} });
          var updateStateData = {
            formDataErrors: validated_formdata.validationErrors
          };
          if (_this13.props.sendSubmitButtonVal) {
            updateStateData['submitButtonVal'] = formElement.value;
          }
          _this13.setState(updateStateData, function () {
            formElement.confirmModal && (0, _keys2.default)(_this13.state.formDataErrors).length < 1 ? _this13.props.createModal((0, _assign2.default)({
              title: 'Please Confirm',
              text: {
                component: 'div',
                props: {
                  style: {
                    textAlign: 'center'
                  },
                  className: '__ra_rf_fe_s_cm'
                },
                children: [{
                  component: 'div',
                  props: {
                    className: '__ra_rf_fe_s_cm_t'
                  },
                  children: formElement.confirmModal.textContent || ''
                }, {
                  component: 'div',
                  props: (0, _assign2.default)({
                    className: '__ra_rf_fe_s_cm_bc'
                  }, formElement.confirmModal.buttonWrapperProps),
                  children: [{
                    component: 'ResponsiveButton',
                    props: (0, _assign2.default)({
                      style: {
                        margin: 10
                      },
                      buttonProps: {
                        size: 'isMedium',

                        color: 'isPrimary'
                      },
                      onClick: function onClick() {
                        _this13.props.hideModal('last');
                        _this13.submitForm.call(_this13);
                      },
                      onclickProps: 'last'
                    }, formElement.confirmModal.yesButtonProps),
                    children: formElement.confirmModal.yesButtonText || 'Yes'
                  }, {
                    component: 'ResponsiveButton',
                    props: (0, _assign2.default)({
                      style: {
                        margin: 10
                      },
                      buttonProps: {
                        size: 'isMedium'
                      },
                      onClick: 'func:this.props.hideModal',
                      onclickProps: 'last'
                    }, formElement.confirmModal.noButtonProps),
                    children: formElement.confirmModal.noButtonText || 'No'
                  }]
                }]
              } }, formElement.confirmModal)) : _this13.submitForm.call(_this13);
          });
        } }, passableProps),
      formElement.value
    )
  );
}

function getCardFooterItem(options) {
  var formElement = options.formElement,
      i = options.i;

  formElement.layoutProps = (0, _assign2.default)({
    style: { cursor: 'pointer', textAlign: 'center' }
  }, formElement.layoutProps);
  return _react2.default.createElement(
    _reBulma.CardFooterItem,
    (0, _extends3.default)({ key: i }, formElement.layoutProps, { onClick: this.submitForm.bind(this) }),
    _react2.default.createElement(
      _reBulma.Label,
      formElement.passProps,
      formElement.value
    )
  );
}