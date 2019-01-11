import React, { Component, PropTypes, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';
// import { Columns, } from 're-bulma';
import AppSectionLoadingIndex from '../AppSectionLoading/index';
import AppSectionLoadingError from '../AppSectionLoading/error';
import flatten, { unflatten, } from 'flat';
import { getAreaChart, getLayout, getLevel, getLineChart, getPageWrapper, getRechart, getVictoryChart, } from '../../server_manifest/standard';
import { getTable, getBasicTable, getSheet, } from '../../server_manifest/table';
import { createForm, } from '../../server_manifest/forms';
import { getCard, } from '../../server_manifest/card';
import cache from 'memory-cache';
import numeral from 'numeral';
import moment from 'moment';
import luxon from 'luxon';

const functionalComponents = {
  getAreaChart, getLayout, getLevel, getLineChart, getPageWrapper, getRechart, getVictoryChart, getTable, getBasicTable, getSheet, createForm, getCard,
};
const propTypes = {
  assignResourceProperty: PropTypes.string,
  assignFunctionalResourceProperty: PropTypes.string,
  data: PropTypes.object,
  useCache: PropTypes.boolean,
  cacheTimeout: PropTypes.number,
  dynamicDataTransformFunction: PropTypes.string,
  functionalComponent: PropTypes.string,
  functionalComponentProps: PropTypes.object,
  flattenOptions: PropTypes.object,
  layout: PropTypes.object,
};
const defaultProps = {
  assignResourceProperty: undefined,
  assignFunctionalResourceProperty: undefined,
  data: {},
  useCache: true,
  cacheTimeout:20000,
  dynamicDataTransformFunction: undefined,
  functionalComponent: undefined,
  functionalComponentProps: undefined,
  layout: {},
};

class DynamicComponent extends Component {
  constructor(props) {
    super(props);
    // console.warn({ props });
    // let dynamicItems = (this.props.dynamicProp)
    //   ? this.props.getState().dynamic[this.props.dynamicProp]
    //   : [];
    // let Items = {
    //   items: Object.assign([], props.items , dynamicItems),
    // };
    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.state = {
      hasLoaded: false,
      hasError: false,
      resources: {},
    };
    
    this.loadingStyle = (props)
      ? props.style
      : props.layout && props.layout.props && props.layout.props.style
        ? props.layout.props.style
        : {// eslint-disable-next-line 
          height: props.height || props.minheight || props.layout && props.layout.props && props.layout.props
            ? props.layout.props.height || props.layout.props.minheight || props.layout.props.minHeight
            : undefined,
        };
    this.computeResources = this.computeResources.bind(this);
  }
  assignResources(resources) {
    // console.warn({ resources });
    let dynamicLayout;
    let functionalProps;
    if (this.props.assignFunctionalResourceProperty) {
      const flattenedFunctionalProps = flatten(this.props.functionalComponentProps,this.props.flattenOptions);
      flattenedFunctionalProps[ this.props.assignFunctionalResourceProperty ] = resources;
      functionalProps = Object.assign({}, unflatten(flattenedFunctionalProps), { ignoreReduxProps:true , });
    }
    // console.log('this.props.functionalComponentProps',this.props.functionalComponentProps,{functionalProps});
    // const functionalProps = (this.props.assignFunctionalResourceProperty)
    //   ? Object.assign({}, this.props.functionalComponentProps, {
    //     [this.props.assignFunctionalResourceProperty]:resources,
    //   })
    //   : this.props.functionalComponentProps;
    const generatedLayout = (this.props.functionalComponent && this.props.functionalComponentProps)
      ? functionalComponents[ this.props.functionalComponent ](functionalProps)
      : this.props.layout;

    if (this.props.assignResourceProperty) {
      const flattenedLayout = flatten(generatedLayout,this.props.flattenOptions);
      // console.warn('before flattenedLayout', flattenedLayout);
      flattenedLayout[ this.props.assignResourceProperty ] = resources;
      dynamicLayout = Object.assign({}, unflatten(flattenedLayout), { ignoreReduxProps:false , });
      // console.warn(' unflatten(flattenedLayout', unflatten(flattenedLayout));
      // console.warn('after flattenedLayout', flattenedLayout);
    } else {
      dynamicLayout=generatedLayout;
    }
    this.setState({
      hasError: false,
      error: undefined,
      hasLoaded: true,
      resources,
      dynamicLayout,
    });
  }
  computeResources(componentProps) {
    try {
      const props = {
        luxon,
        moment,
        numeral,
      };
      // eslint-disable-next-line 
      const dataTransform = (componentProps.dynamicDataTransformFunction) // eslint-disable-next-line 
        ? Function('dynamicData', `"use strict";
${componentProps.dynamicDataTransformFunction}`).bind({ props, })
        : function componentDidMount_dataTransform(dynamicData) {
          return dynamicData;
        }; 
      // console.warn('componentProps.dynamicDataTransformFunction', componentProps.dynamicDataTransformFunction);
      // console.warn('dataTransform', dataTransform);
      let resources = {};
      Object.defineProperty(
        dataTransform,
        'name',
        {
          value:'componentDidMount_dataTransform',
        }
      );
      if (componentProps.fetch_url) {
        const cachedData = cache.get(componentProps.fetch_url);
        if (cachedData && componentProps.useCache) {
          console.log('got data from cache', componentProps.fetch_url, cachedData, componentProps.cacheTimeout);
          resources = dataTransform(cachedData);
          this.assignResources(resources);
        } else {
          componentProps.fetchAction.call(this, componentProps.fetch_url, componentProps.fetch_options)
            .then(dynamicData => {
              if (componentProps.useCache) {
                cache.put(componentProps.fetch_url, dynamicData, componentProps.cacheTimeout, ()=>{
                  console.log('removing from cache: '+componentProps.fetch_url); 
                });
              }
              resources = dataTransform(dynamicData);
              this.assignResources(resources);
            })
            .catch(e => {
              console.error('dynamicComponent Error', e);
              this.setState({
                hasError: true,
                error: e,
              });
            });
        }
      } else {
        setTimeout(() => { 
          try {
            resources = dataTransform(componentProps.data);
            this.assignResources(resources);
          } catch (err) {
            console.error('uncaughtError', err);
            this.setState({
              hasError: true,
              error: err,
            });
          }
        }, 0);
      }
    } catch (e) {
      console.error('dynamicComponent UncaughtError', e);
      this.setState({
        hasError: true,
        error:e,
      });
    }
  }
  componentDidMount() {
    try {
      this.computeResources(this.props);
    } catch (e) {
      console.error('dynamicComponent UncaughtError', e);
      this.setState({
        hasError: true,
        error:e,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.debug({ nextProps });
    // this.setState(nextProps);
    if (nextProps.fetch_url) {
      this.setState({
        hasLoaded: false,
      });
      this.computeResources(Object.assign({}, this.props, nextProps));
    } else {
      this.setState({
        resources: nextProps.resources,
        dynamicLayout: nextProps.dynamicLayout,
      });
    }
  }
  render() {
    // console.warn('RENDERING dynamicComponentLayout this.state', this.state, 'this.props.layout', this.props.layout);
    try {
      // let dynamicComponentLayout = (<AppSectionLoadingIndex />);
      if (this.state.hasError) {
        return <AppSectionLoadingError key={Math.random()} style={this.loadingStyle} />;
      } else if (this.state.hasLoaded) {
        return this.getRenderedComponent(this.state.dynamicLayout || this.props.layout, this.state.resources);
      } else {
        return <AppSectionLoadingIndex key={Math.random()} style={this.loadingStyle}/>;
      }
    } catch (e) {
      console.error(e, 'this.state', this.state, 'this.props', this.props);
      return <AppSectionLoadingError key={Math.random()} style={this.loadingStyle}/>;
    }
  }
}  

DynamicComponent.propType = propTypes;
DynamicComponent.defaultProps = defaultProps;

export default DynamicComponent;
