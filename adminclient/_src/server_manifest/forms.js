// eslint-disable-next-line 
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var capitalize = require('capitalize');

function getFormElement(formElement) {
  var formElementTypes = {
    input: formElement,
    submit: (0, _assign2.default)({}, {
      passProps: {
        color: 'isSuccess',
        buttonStyle: 'isOutlined'
      }
    }, formElement)
  };
  var element = formElementTypes[formElement.type] || formElement;

  if (formElement.label === true) {
    element.label = capitalize(element.name);
  }
  if (formElement.submit === true) {
    element.submitOnEnter = true;
  }
  if (formElement.horizontal === true) {
    element.layoutProps = (0, _assign2.default)({}, element.layoutProps, {

      horizontalform: true,
      formItemStyle: {}
    });
  }
  if (formElement.columnSize) {
    element.layoutProps = (0, _assign2.default)({}, element.layoutProps, { size: formElement.columnSize });
  }
  return element;
}

function getFormgroups(options) {
  var randomKey = Math.random;
  return options.rows.map(function (row) {
    return (0, _assign2.default)({}, row, {
      gridProps: (0, _assign2.default)({
        key: randomKey(),
        // style: {
        //   marginTop: 30,
        //   padding: 10,
        // },
        subColumnProps: row.containGrid ? {
          style: {
            // overflow:'hidden',
            overflow: 'auto'
          }
        } : undefined
      }, row.gridProps),
      formElements: row.formElements && row.formElements.length ? row.formElements.map(getFormElement) : []
    });
  });
}

function getFormOnSubmitCallbacks(type, options) {
  var callbackMethod = {
    redirect: {
      callback: 'func:this.props.reduxRouter.push',
      props: options.redirect
    },
    refresh: {
      callback: 'func:this.props.refresh'
      // props: options.redirect,
    },
    closeModal: {
      callback: 'func:this.props.hideModal',
      props: 'last'
    }
  };
  var submitAction = callbackMethod[options.onSubmit] || {};
  var completeAction = callbackMethod[options.onComplete] || {};
  return {
    successCallback: submitAction.callback,
    successProps: submitAction.props,
    responseCallback: completeAction.callback,
    responseProps: completeAction.props
  };
}

function getFormNotification(options) {
  if (options.successNotification) {
    return { notification: options.successNotification };
  } else if (options.successModal) {
    return { modal: options.successModal };
  } else {
    return true;
  }
}

function getFormValidations(options) {
  var _options$validations = options.validations,
      validations = _options$validations === undefined ? [] : _options$validations;

  return validations.reduce(function (validationArray, key) {
    var returnValidationObject = {};
    returnValidationObject.name = key.field;
    returnValidationObject.constraints = (0, _defineProperty3.default)({}, key.field, key.constraints);
    validationArray.push(returnValidationObject);
    return validationArray;
  }, []);
}

function createForm(options) {
  var formSubmission = (0, _assign2.default)({
    success: getFormNotification(options),
    url: options.action, //'/tranforms',
    options: {
      method: options.method ? options.method.toUpperCase() : 'POST',
      'Content-Type': 'application/json'
    },
    'params': options.actionParams /** [{key:':id',val:'_id'}] */

  }, options.onSubmit ? getFormOnSubmitCallbacks('onSubmit', options) : {}, options.onComplete ? getFormOnSubmitCallbacks('onComplete', options) : {});
  var validations = getFormValidations(options);
  var formProps = {
    flattenFormData: true,
    footergroups: false,
    useLoadingButtons: true,
    blockPageUI: options.loadingScreen,
    blockPageUILayout: options.loadingScreenLayout,
    hiddenFields: [{
      form_val: '$loki',
      form_name: '$loki'
    }, {
      form_val: 'meta',
      form_name: 'meta'
    }].concat(options.hiddenFields || []),
    onSubmit: formSubmission,
    validations: validations,
    formgroups: getFormgroups(options),
    style: (0, _assign2.default)({
      paddingBottom: '1rem'
    }, options.style)
  };
  return {
    component: 'ResponsiveForm',
    props: (0, _assign2.default)({}, formProps, options.formProps),
    asyncprops: (0, _assign2.default)({}, options.asyncprops)
  };
}

module.exports = {
  getFormElement: getFormElement,
  getFormgroups: getFormgroups,
  getFormOnSubmitCallbacks: getFormOnSubmitCallbacks,
  getFormNotification: getFormNotification,
  createForm: createForm
};