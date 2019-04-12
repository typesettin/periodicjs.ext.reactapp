import React, { createElement, } from 'react';
import * as rebulma from 're-bulma';
import * as recharts from 'recharts';
import * as victory from 'victory';
import MaskedInput from 'react-text-mask';
import { Link, } from 'react-router';
import Slider, { Range, } from 'rc-slider';
import { default as Slick } from 'react-slick';
import { default as RCTable } from 'rc-table';
import { default as RCSwitch } from 'rc-switch';
import { default as RCTree, TreeNode as RCTreeNode } from 'rc-tree';
import Steps, { Step as RCStep, } from 'rc-steps';
import { Carousel, } from 'react-responsive-carousel';
import GoogleMap from 'google-map-react';
import { getAdvancedBinding, } from './advancedBinding';
import ResponsiveForm from '../ResponsiveForm';
import DynamicForm from '../DynamicForm';
import DynamicLayout from '../DynamicLayout';
import RawOutput from '../RawOutput';
import RawStateOutput from '../RawOutput/RawStateOutput';
import MenuAppLink from '../AppSidebar/MenuAppLink';
import SubMenuLinks from '../AppSidebar/SubMenuLinks';
import CodeMirror from '../RACodeMirror';
import PreviewEditor from '../PreviewEditor';
import ResponsiveDatalist from '../ResponsiveDatalist';
// import Editor from '../RAEditor';
import ResponsiveTable from '../ResponsiveTable';
import ResponsiveCard from '../ResponsiveCard';
import DynamicChart from '../DynamicChart';
// import DynamicResponsiveChart from '../DynamicChart/responsive';
import DynamicComponent from '../DynamicComponent';
import ResponsiveTabs from '../ResponsiveTabs';
import ResponsiveBar from '../ResponsiveBar';
import ResponsiveLink from '../ResponsiveLink';
import ResponsiveIFrame from '../ResponsiveIFrame';
import ResponsiveButton from '../ResponsiveButton';
import ResponsiveSteps from '../ResponsiveSteps';
import FormItem from '../FormItem';
import utilities from '../../util';
let advancedBinding = getAdvancedBinding();
let renderIndex = 0;

//https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
export const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
export const ARGUMENT_NAMES = /([^\s,]+)/g;
export function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null){
    result = [];
  }
  return result;
}

export function getEvalProps(options = {}) {
  const { rjx, } = options;
  // console.warn({rjx})
  // eslint-disable-next-line
  const scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
  const evProps = Object.keys(rjx.__dangerouslyEvalProps || {}).reduce((eprops, epropName) => {
    let evVal;
    try {
      // eslint-disable-next-line
      evVal = scopedEval(rjx.__dangerouslyEvalProps[ epropName ]);
    } catch (e) { 
      if (this.debug || rjx.debug) evVal = e;
    }
    
    eprops[ epropName ] = (typeof evVal === 'function')
      ? evVal.call(this, { rjx })
      : evVal;
    // console.warn('eprops',eprops)
    return eprops;
  }, {});
  const evBindProps = Object.keys(rjx.__dangerouslyBindEvalProps || {}).reduce((eprops, epropName) => {
    let evVal;
    try {
      let args;
      // InlineFunction = Function.prototype.constructor.apply({}, args);
      const functionDefinition = scopedEval(rjx.__dangerouslyBindEvalProps[ epropName ]);
      if (rjx.__functionargs && rjx.__functionargs[ epropName ]) {
        args = [this,].concat(rjx.__functionargs[ epropName ].map(arg => rjx.props[ arg ]));
      }  else if (rjx.__functionparams) {
        const functionDefArgs = getParamNames(functionDefinition);
        args = [this,].concat(functionDefArgs);
      } else {
        args = [this,];
      } 
      // eslint-disable-next-line
      evVal = functionDefinition.bind(...args);
    } catch (e) { 
      if (this.debug || rjx.debug) evVal = e;
    }
    // eslint-disable-next-line
    eprops[ epropName ] = evVal;
    return eprops;
  }, {});

  return Object.assign({}, evProps, evBindProps);
}

export function getFunctionFromProps(options) {
  const { propFunc, propBody, } = options;
  if (typeof propFunc === 'string' && propFunc.includes('func:inline')) {
    // eslint-disable-next-line
    const InlineFunction = Function('param1','param2','"use strict";' + propBody);
    const [ propFuncName, funcName, ] = propFunc.split('.');
    // console.info({ propFunc, propBody, propFuncName, funcName, });
    Object.defineProperty(
      InlineFunction,
      'name',
      {
        value: funcName ||propFuncName,
      }
    );
    return InlineFunction.bind(this);
  } else if (typeof propFunc === 'string' && propFunc.indexOf('func:this.props.reduxRouter') !== -1) {
    return this.props.reduxRouter[ propFunc.replace('func:this.props.reduxRouter.', '') ];
  } else if (typeof propFunc === 'string' && propFunc.indexOf('func:this.props') !== -1) {
    return this.props[ propFunc.replace('func:this.props.', '') ].bind(this);
  } else if (typeof propFunc === 'string' && propFunc.indexOf('func:window') !== -1 && typeof window[propFunc.replace('func:window.', '')] ==='function') {
    return window[ propFunc.replace('func:window.', '') ].bind(this);
  } else if(typeof this.props[propFunc] ==='function') {
    return propFunc.bind(this);
  } else {
    return function () { }
  }
}

export let AppLayoutMap = Object.assign({}, { victory,
  recharts, ResponsiveForm, DynamicLayout, DynamicComponent, DynamicForm, RawOutput, RawStateOutput, FormItem, MenuAppLink, SubMenuLinks, ResponsiveTable, ResponsiveCard, DynamicChart, /* DynamicResponsiveChart,*/ ResponsiveBar, ResponsiveTabs, ResponsiveDatalist, CodeMirror, Range, Slider, GoogleMap, Carousel, PreviewEditor, ResponsiveSteps, /* Editor,*/
  ResponsiveLink,
  ResponsiveButton,
  ResponsiveIFrame,
  MaskedInput,
  RCTable,
  RCTree,
  RCTreeNode,
  RCSwitch,
  Slick,
  RCSteps: Steps,
  RCStep
}, React.DOM, rebulma, window.__ra_custom_elements, { Link, });

export function getComponentFromMap(options = {}) {
  const { componentObject, AppLayoutMap } = options;
  // let reactComponent = null;
  try {
    if (typeof componentObject.component !== 'string') {
      return componentObject.component;
    } else if (React.DOM[ componentObject.component ]) {
      return componentObject.component;
    } else if (recharts[ componentObject.component.replace('recharts.', '') ]) {
      return recharts[ componentObject.component.replace('recharts.', '') ];
    } else if (victory[ componentObject.component.replace('victory.', '') ]) {
      return victory[ componentObject.component.replace('victory.', '') ];
    } else {
      return AppLayoutMap[ componentObject.component ];
    }
  } catch (e) {
    console.error(e, (e.stack) ? e.stack:'no stack');
    // throw e;
    return null;
  }
}

export function getRenderedComponent(componentObject, resources, debug) {
  if (debug) {
    console.debug({resources,componentObject})
  }
  try {
    if (advancedBinding) {
      AppLayoutMap.ResponsiveLink = ResponsiveLink.bind(this);
      AppLayoutMap.ResponsiveButton = ResponsiveButton.bind(this);
    }
  } catch (e) {
    console.warn('deeply nested props are unsupported on this device', e);
  }
  // console.log('this.props', this);
  renderIndex++;
  // if(resources) console.info({ resources });
  if (componentObject && componentObject.$$typeof) { 
    return componentObject;
  } else if (componentObject && componentObject.component.$$typeof) {
    return componentObject.component;
  } else if (!componentObject) {
    return createElement('span', {}, debug ? 'Error: Missing Component Object' : '');
  }
  try {
    const getFunction = getFunctionFromProps.bind(this);
    let asyncprops = (componentObject.asyncprops && typeof componentObject.asyncprops === 'object')
      ? utilities.traverse(componentObject.asyncprops, resources)
      : {};
    let windowprops = (componentObject.windowprops && typeof componentObject.windowprops === 'object')
      ? utilities.traverse(componentObject.windowprops, window)
      : {};
    let thisprops = (componentObject.thisprops && typeof componentObject.thisprops === 'object')
      ? utilities.traverse(componentObject.thisprops, Object.assign({
        __reactapp_manifest: {
          _component: componentObject,
          _resources: resources,
        },
      }, this.props, componentObject.props, this.props.getState()))
      : {};
    let thisDotProps = (!React.DOM[ componentObject.component ] && !rebulma[ componentObject.component ] && !componentObject.ignoreReduxProps)
      ? this.props
      : null;
    //allowing javascript injections
    let evalProps = (componentObject.__dangerouslyEvalProps||componentObject.__dangerouslyBindEvalProps)
      ? getEvalProps.call(this, { rjx:componentObject, })
      : {};
    
    let insertedComponents = (componentObject.__dangerouslyInsertComponents)
      ? Object.keys(componentObject.__dangerouslyInsertComponents).reduce((cprops, cpropName) => {
        // eslint-disable-next-line
        cprops[ cpropName ] = getRenderedComponent.call(this, componentObject.__dangerouslyInsertComponents[ cpropName ], resources, debug);
        return cprops;
      }, {})
      : {};
    // if (componentObject.__dangerouslyInsertComponents){ console.log({ insertedComponents });}
    let renderedCompProps = Object.assign({
      key: renderIndex,
      __inline:{},
    }, thisDotProps,
      thisprops,
      componentObject.props, asyncprops, windowprops, evalProps, insertedComponents);
    
    if (renderedCompProps.ref) {
      renderedCompProps.ref = getFunction({
        propFunc: renderedCompProps.ref,
        propBody: componentObject.__inline[ renderedCompProps.ref ],
      });
    }
      //Allowing for window functions
    if(componentObject.hasWindowFunc || componentObject.hasPropFunc){
      Object.keys(renderedCompProps).forEach(key => {
        // if (typeof renderedCompProps[key] ==='string' && renderedCompProps[key].indexOf('func:window') !== -1 && typeof window[ renderedCompProps[key].replace('func:window.', '') ] ==='function'){
        //   renderedCompProps[key]= window[ renderedCompProps[key].replace('func:window.', '') ].bind(this);
        // } 
        if (typeof renderedCompProps[key] ==='string' && renderedCompProps[key].indexOf('func:') !== -1 ){
          renderedCompProps[ key ] = getFunction({ propFunc: renderedCompProps[ key ] });
        } 
      });
    }
    if (componentObject.hasWindowComponent && window.__ra_custom_elements) {
      Object.keys(renderedCompProps).forEach(key => {
        if (typeof renderedCompProps[key] ==='string' && renderedCompProps[key].indexOf('func:window.__ra_custom_elements') !== -1 && typeof window.__ra_custom_elements[ renderedCompProps[key].replace('func:window.__ra_custom_elements.', '') ] ==='function'){
          renderedCompProps[ key ] = React.createElement(window.__ra_custom_elements[ renderedCompProps[ key ].replace('func:window.__ra_custom_elements.', '') ], (renderedCompProps[ 'windowCompProps' ]) ? renderedCompProps[ 'windowCompProps' ]
            : this.props, null);
        }
      });
    }
    if (componentObject.__dangerouslyCalcProps && Object.keys(componentObject.__dangerouslyCalcProps).length) {
      Object.keys(componentObject.__dangerouslyCalcProps).forEach(epropName => {
        const functionBodyString = componentObject.__dangerouslyCalcProps[ epropName ];
        // eslint-disable-next-line
        const stringFunction = Function('renderedCompProps', '"use strict";' + functionBodyString);
        Object.defineProperty(
          stringFunction,
          'name',
          {
            value: `${epropName}Function`,
          }
        );
        renderedCompProps[ epropName ] = stringFunction(renderedCompProps);
      });
    }
    if (renderedCompProps._children /* && !componentObject.children */) {
      if (Array.isArray(renderedCompProps._children)) {
        componentObject.children = [].concat(renderedCompProps._children);
      } else {
        componentObject.children = renderedCompProps._children;
      }
      delete renderedCompProps._children;
    }
    let comparisons = {};
    // if (thisprops) {
    //   console.debug({ thisprops, renderedCompProps });
    // }
    // console.debug('componentObject.component', componentObject.component, { thisDotProps, });

    if (componentObject.comparisonprops) {
      comparisons = componentObject.comparisonprops.map(comp => {
        let compares = {};
        if (Array.isArray(comp.left)) {
          compares.left = comp.left;
        }
        if (Array.isArray(comp.right)) {
          compares.right = comp.right;
        }
        let propcompares = utilities.traverse(compares, renderedCompProps);
        let opscompares = Object.assign({}, comp, propcompares);
        // console.debug({ opscompares, compares, renderedCompProps });
        if (opscompares.operation === 'eq') {
          // return opscompares.left == opscompares.right;
          return opscompares.left === opscompares.right;
        } else if (opscompares.operation === 'dneq') {
          // return opscompares.left != opscompares.right;
          return opscompares.left !== opscompares.right;
        } else if (opscompares.operation === 'dnseq') {
          return opscompares.left !== opscompares.right;
        } else if (opscompares.operation === 'seq') {
          return opscompares.left === opscompares.right;
        } else if (opscompares.operation === 'lt') {
          return opscompares.left < opscompares.right;
        } else if (opscompares.operation === 'lte') {
          return opscompares.left <= opscompares.right;
        } else if (opscompares.operation === 'gt') {
          return opscompares.left > opscompares.right;
        } else if (opscompares.operation === 'gte') {
          return opscompares.left >= opscompares.right;
        } else if (opscompares.operation === 'dne') {
          return opscompares.left === undefined || opscompares.left === null;
        } else { //'exists'
          return opscompares.left !== undefined || opscompares.left !== null;
        }
      });
      // console.debug({ comparisons });
      // console.debug(comparisons.filter(comp => comp === true).length);
    }
    if (componentObject.comparisonprops && comparisons.filter(comp => comp === true).length!==comparisons.length && (!componentObject.comparisonorprops || (componentObject.comparisonorprops && comparisons.filter(comp => comp === true).length===0))) { 
      return null;
    } else if (typeof componentObject.conditionalprops !== 'undefined'
      && !Object.keys(utilities.traverse(componentObject.conditionalprops, renderedCompProps)).filter(key => utilities.traverse(componentObject.conditionalprops, renderedCompProps)[ key ]).length && (!componentObject.comparisonorprops || (componentObject.comparisonorprops && comparisons.filter(comp => comp === true).length===0))) {
      return null;
    } else {


      return createElement(
        //element component
        getComponentFromMap({ componentObject, AppLayoutMap }),
        // (typeof componentObject.component === 'string')
        //   ? (React.DOM[ componentObject.component ])
        //     ? componentObject.component
        //     : (recharts[ componentObject.component.replace('recharts.', '') ])
        //       ? recharts[ componentObject.component.replace('recharts.', '') ]
        //       : AppLayoutMap[ componentObject.component ]
        //   : componentObject.component,
        //element props
        renderedCompProps,
        //props children
        (componentObject.children && Array.isArray(componentObject.children) && typeof componentObject.children !== 'string')
          ? componentObject.children.map(childComponentObject => getRenderedComponent.call(this,
            (componentObject.bindprops)
              ? Object.assign({},
                childComponentObject, {
                  props: Object.assign({},
                    renderedCompProps,
                    ((childComponentObject.thisprops && childComponentObject.thisprops.style) // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
                      || (childComponentObject.asyncprops && childComponentObject.asyncprops.style)
                        || (childComponentObject.windowprops && childComponentObject.windowprops.style))
                        ? {}
                        : {
                          style: {},
                        },
                    childComponentObject.props,
                    { key: renderIndex + Math.random(), }),
                })
              : childComponentObject, resources))
          : (typeof componentObject.children === 'undefined')
            ? (renderedCompProps && renderedCompProps.children && typeof renderedCompProps.children==='string') ? renderedCompProps.children : null
            : componentObject.children
      );
    }
   
  } catch (e) {
    console.error({ componentObject, resources, }, 'this', this);
    console.error(e, (e.stack) ? e.stack:'no stack');
    throw e;
    // return createElement('div', {}, e.toString());
  }
}