'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idActionParams = [{
  key: ':id',
  val: '_id'
}];

function getModalPopUp(options) {
  var onclickProps = options.onclickProps,
      style = options.style,
      tooltip = options.tooltip,
      button = options.button,
      type = options.type,
      onclickAddProp = options.onclickAddProp,
      responsiveButton = options.responsiveButton;

  var modalType = {
    tooltip: [{
      component: 'Icon',
      props: {
        icon: 'fa fa-info-circle',
        title: options.modalTitle
        // size: 'isMedium',
      }
    }],
    button: button ? button.title : undefined
  };
  return (0, _assign2.default)({
    component: 'ResponsiveButton',
    props: {
      onClick: 'func:this.props.createModal',
      onclickProps: (0, _assign2.default)({}, {
        title: options.modalTitle,
        pathname: options.modalPathname
        // animation:'fadeInDown',
      }, onclickProps),
      style: style,
      onclickAddProp: onclickAddProp,
      buttonProps: button ? (0, _assign2.default)({}, {
        color: 'isPrimary',
        buttonStyle: 'isOutlined'
      }, button.props) : undefined
      // aProps: {},
    },
    children: modalType[type] || {}
  }, responsiveButton);
}

function getPageTitle(options) {
  var _options$styles = options.styles,
      styles = _options$styles === undefined ? {} : _options$styles,
      title = options.title,
      tooltip = options.tooltip,
      action = options.action,
      asynctitle = options.asynctitle,
      titleprefix = options.titleprefix;

  function getAction(action) {
    var actionType = {
      link: action && action.type === 'link' ? [{
        component: 'ResponsiveButton',
        props: {
          onClick: 'func:this.props.reduxRouter.push',
          onclickProps: action.link,
          // style: {
          //   marginLeft: '10px',
          // },
          buttonProps: (0, _assign2.default)({
            color: 'isPrimary',
            buttonStyle: 'isOutlined'
          }, action.buttonProps)
        },
        children: action.title
      }] : null,
      action: action && action.type === 'action' ? [{
        component: 'ResponsiveButton',
        props: {
          buttonProps: {
            color: action.method === 'DELETE' ? 'isDanger' : 'isPrimary',
            buttonStyle: 'isOutlined'
          },
          onClick: 'func:this.props.fetchAction',
          onclickBaseUrl: action.pathname,
          onclickLinkParams: action.pathParams,
          fetchProps: {
            method: action.method
          },
          'successProps': {
            success: true,
            successCallback: 'func:this.props.reduxRouter.push',
            successProps: action.callbackRedirect
          },
          confirmModal: action.confirm
        },
        children: action.title,
        thisprops: action.thisprops,
        asyncprops: action.asyncprops
      }] : null,
      modal: action && action.type === 'modal' ? [getModalPopUp({
        modalTitle: action.title,
        modalPathname: action.pathname,
        confirmAction: action.confirm,
        onclickProps: action.onclickProps,
        type: 'button',
        button: (0, _assign2.default)({
          title: action.title
        }, action.buttonProps),
        responsiveButton: action.responsiveButton
      })] : null
    };
    return actionType[action.type];
  }

  return {
    component: 'Columns',
    children: [{
      component: 'Column',
      children: [{
        component: 'Title',
        props: {
          style: styles && styles.ui && styles.ui.topContainerMargin
        },
        children: [titleprefix ? {
          component: 'span',
          children: titleprefix
        } : null, {
          component: 'span',
          children: title
        }, asynctitle ? {
          component: 'span',
          asyncprops: {
            children: asynctitle
          }
        } : null, tooltip ? getModalPopUp({
          modalTitle: tooltip.title,
          modalPathname: tooltip.pathname,
          type: 'tooltip',
          tooltip: true
        }) : null]
      }]
    }, {
      component: 'Column',
      props: {
        style: {
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          display: 'flex'
        }
      },
      children: action ? Array.isArray(action) ? [{
        component: 'Addons',
        children: action.map(function (act) {
          return getAction(act)[0];
        })
      }] : getAction(action) || null : null
    }]
  };
}

function getTitlePrefix(options) {
  var location = options.location,
      title = options.title,
      style = options.style;

  return [{
    component: 'ResponsiveLink',
    props: {
      location: location,
      style: (0, _assign2.default)({
        textDecoration: 'none'
      }, style)
    },
    children: title
  }];
}

function getTitleArrow() {
  return [{
    component: 'span',
    // props
    children: ' › '
  }];
}

function getButton() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = options.action,
      props = options.props,
      content = options.content,
      button = options.button,
      onclickProps = options.onclickProps,
      style = options.style,
      onclickAddProp = options.onclickAddProp;


  var actionType = {
    link: action && action.type === 'link' ? {
      onClick: 'func:this.props.reduxRouter.push',
      onclickProps: action.link,
      // style: {
      //   marginLeft: '10px',
      // },
      buttonProps: {
        color: 'isPrimary'
      }
    } : undefined,
    fetch: action && action.type === 'fetch' ? {
      buttonProps: {
        color: action.method === 'DELETE' ? 'isDanger' : 'isPrimary',
        buttonStyle: 'isOutlined'
      },
      onClick: 'func:this.props.fetchAction',
      onclickBaseUrl: action.pathname,
      onclickLinkParams: action.pathParams,
      fetchProps: {
        method: action.method
      },
      'successProps': action.refresh ? {
        success: true,
        successCallback: 'func:this.props.refresh'
      } : {
        success: true,
        successCallback: 'func:this.props.reduxRouter.push',
        successProps: action.callbackRedirect
      },
      confirmModal: action.confirm
    } : undefined,
    modal: action && action.type === 'modal' ? {
      onClick: 'func:this.props.createModal',
      onclickProps: (0, _assign2.default)({}, {
        title: options.modalTitle,
        pathname: action.pathname
        // animation:'fadeInDown',
      }, onclickProps),
      style: style,
      onclickAddProp: onclickAddProp,
      buttonProps: button ? (0, _assign2.default)({}, {
        color: 'isPrimary',
        buttonStyle: 'isOutlined'
      }, button.props) : undefined
      // aProps: {},
    } : undefined
  };
  var returnButton = (0, _assign2.default)({
    component: 'ResponsiveButton',
    props: (0, _assign2.default)({}, actionType[action.type], props),
    children: content
  }, options.responsiveButton);
  // console.log({ returnButton });
  return returnButton;
}

module.exports = {
  idActionParams: idActionParams,
  getModalPopUp: getModalPopUp,
  getPageTitle: getPageTitle,
  getTitlePrefix: getTitlePrefix,
  getTitleArrow: getTitleArrow,
  getButton: getButton
};