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

import React, { Component, PropTypes, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';
import { ResponsiveContainer, } from 'recharts';
// import { Columns, } from 're-bulma';
import AppSectionLoadingIndex from '../AppSectionLoading/index';
import AppSectionLoadingError from '../AppSectionLoading/error';
import flatten, { unflatten, } from 'flat';

const propTypes = {
  assignResourceProperty: PropTypes.string,
  data: PropTypes.object,
  dynamicDataTransformFunction: PropTypes.string,
  layout: PropTypes.object,
};

const defaultProps = {
  assignResourceProperty: undefined,
  data: {},
  dynamicDataTransformFunction: undefined,
  layout: {},
};

class DynamicResponsiveChart extends ResponsiveContainer {
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
    if (this.props.assignResourceProperty) {
      const flattenedLayout = flatten(this.props.layout);
      // console.warn('before flattenedLayout', flattenedLayout);
      flattenedLayout[ this.props.assignResourceProperty ] = resources;
      dynamicLayout = Object.assign({}, unflatten(flattenedLayout),{ignoreReduxProps:true, bindprops:false, thisprops:false});
      // console.warn(' unflatten(flattenedLayout', unflatten(flattenedLayout));
      // console.warn('after flattenedLayout', flattenedLayout);
    }
    this.setState({
      hasError: false,
      hasLoaded: true,
      resources,
      dynamicLayout,
    });
  }
  componentDidMount() {
    // eslint-disable-next-line 
    const dataTransform = (this.props.dynamicDataTransformFunction) // eslint-disable-next-line 
      ? Function('dynamicData', this.props.dynamicDataTransformFunction)
      : (dynamicData) => dynamicData;
    let resources = {};
    if (this.props.fetch_url) {
      this.props.fetchAction(this.props.fetch_url, this.props.fetch_options)
        .then(dynamicData => {
          resources = dataTransform(dynamicData);
          this.assignResources(resources);
        })
        .catch(e => {
          console.debug('DynamicResponsiveChart Error', e);
          this.setState({ hasError: true, });
        });
    } else {
      setTimeout(() => { 
        resources = dataTransform(this.props.data);
        this.assignResources(resources);
      }, 0);
    }
  }
  render() {
    console.warn('RENDERING DynamicResponsiveChartLayout this.state', this.state, 'this.props', this.props);
    try {
      // let DynamicResponsiveChartLayout = (<AppSectionLoadingIndex />);
      if (this.state.hasError) {
        return <AppSectionLoadingError />;
      } else if (this.state.hasLoaded) {
        const component = this.getRenderedComponent(this.state.dynamicLayout || this.props.layout, this.state.resources);
        console.warn('DRC component', component);
        return <ResponsiveContainer minHeight="360">
          {component.props.children}
        </ResponsiveContainer>
      } else {
        return <AppSectionLoadingIndex />;
      }
    } catch (e) {
      console.debug(e, 'this.state', this.state, 'this.props', this.props);
      return <AppSectionLoadingError/>;
    }
  }
}  

DynamicResponsiveChart.propType = propTypes;
DynamicResponsiveChart.defaultProps = defaultProps;

export default DynamicResponsiveChart;
