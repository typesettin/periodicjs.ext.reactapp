import React, { Component, PropTypes, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';
// import { Columns, } from 're-bulma';
import AppSectionLoadingIndex from '../AppSectionLoading/index';
import AppSectionLoadingError from '../AppSectionLoading/error';
import flatten, { unflatten, } from 'flat';
import { getAreaChart, getLayout, getLevel, getLineChart, getPageWrapper, getRechart, getVictoryChart, } from '../../server_manifest/standard';
import { getTable, getBasicTable, getSheet } from '../../server_manifest/table';
import { createForm, } from '../../server_manifest/forms';
import { getCard, } from '../../server_manifest/card';
import cache from 'memory-cache';

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
  }
  assignResources(resources) {
    // console.warn({ resources });
    let dynamicLayout;
    const functionalProps = (this.props.assignFunctionalResourceProperty)
      ? Object.assign({}, this.props.functionalComponentProps, {
        [this.props.assignFunctionalResourceProperty]:resources
      })
      : this.props.functionalComponentProps;
    const generatedLayout = (this.props.functionalComponent && this.props.functionalComponentProps)
      ? functionalComponents[ this.props.functionalComponent ](functionalProps)
      : this.props.layout;

    if (this.props.assignResourceProperty) {
      const flattenedLayout = flatten(generatedLayout);
      // console.warn('before flattenedLayout', flattenedLayout);
      flattenedLayout[ this.props.assignResourceProperty ] = resources;
      dynamicLayout = Object.assign({}, unflatten(flattenedLayout),{ignoreReduxProps:true});
      // console.warn(' unflatten(flattenedLayout', unflatten(flattenedLayout));
      // console.warn('after flattenedLayout', flattenedLayout);
    } else {
      dynamicLayout=generatedLayout;
    }
    this.setState({
      hasError: false,
      hasLoaded: true,
      resources,
      dynamicLayout,
    });
  }
  componentDidMount() {
    try {
      // eslint-disable-next-line 
      const dataTransform = (this.props.dynamicDataTransformFunction) // eslint-disable-next-line 
        ? Function('dynamicData', this.props.dynamicDataTransformFunction)
        : function componentDidMount_dataTransform(dynamicData) {
          return dynamicData;
        }; 
      // console.warn('this.props.dynamicDataTransformFunction', this.props.dynamicDataTransformFunction);
      // console.warn('dataTransform', dataTransform);
      let resources = {};
      Object.defineProperty(
        dataTransform,
        'name',
        {
          value:'componentDidMount_dataTransform',
        }
      );
      if (this.props.fetch_url) {
        const cachedData = cache.get(this.props.fetch_url);
        if (cachedData && this.props.useCache) {
          console.log('got data from cache', this.props.fetch_url, cachedData, this.props.cacheTimeout);
          resources = dataTransform(cachedData);
          this.assignResources(resources);
        } else {
          this.props.fetchAction.call(this,this.props.fetch_url, this.props.fetch_options)
            .then(dynamicData => {
              if (this.props.useCache) {
                cache.put(this.props.fetch_url, dynamicData,this.props.cacheTimeout,()=>{ console.log('removing from cache: '+this.props.fetch_url) });
              }
              resources = dataTransform(dynamicData);
              this.assignResources(resources);
            })
            .catch(e => {
              console.error('dynamicComponent Error', e);
              this.setState({ hasError: true, });
            });
        }
      } else {
        setTimeout(() => { 
          try {
            resources = dataTransform(this.props.data);
            this.assignResources(resources);
          } catch (err) {
            console.error('uncaughtError', err);
            this.setState({ hasError: true, });
          }
        }, 0);
      }
    } catch (e) {
      console.error('dynamicComponent UncaughtError', e);
      this.setState({ hasError: true, });
    }
  }
  render() {
    // console.warn('RENDERING dynamicComponentLayout this.state', this.state, 'this.props.layout', this.props.layout);
    try {
      // let dynamicComponentLayout = (<AppSectionLoadingIndex />);
      if (this.state.hasError) {
        return <AppSectionLoadingError key={Math.random()} />;
      } else if (this.state.hasLoaded) {
        return this.getRenderedComponent(this.state.dynamicLayout || this.props.layout, this.state.resources);
      } else {
        return <AppSectionLoadingIndex key={Math.random()}/>;
      }
    } catch (e) {
      console.error(e, 'this.state', this.state, 'this.props', this.props);
      return <AppSectionLoadingError key={Math.random()}/>;
    }
  }
}  

DynamicComponent.propType = propTypes;
DynamicComponent.defaultProps = defaultProps;

export default DynamicComponent;
