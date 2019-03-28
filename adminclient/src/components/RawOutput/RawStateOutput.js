import React, { Component, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';
import flatten from 'flat';
const defaultProps = {
  fullState:true,
  flattenRawData:false,
  flattenOptions: {
    maxDepth:2,
  },
};

class RawStateOutput extends Component {
  constructor(props) {
    super(props);
    // console.info('RawStateOutput props', props);
    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.state = props.fullState && props.getState
      ? Object.assign({}, props, props.getState())
      : Object.assign({}, props);
  }
  componentWillReceiveProps(nextProps) {
    console.info({ nextProps });
    if (this.props.fullState) {
      this.setState(Object.assign({}, nextProps, this.props.getState()));
    } else {
      this.setState(Object.assign({}, nextProps));      
    }
  }
  render() {
    // console.debug('this.props.getState()', this.props.getState());
    let displayProp = '';
    let displayData = '';

    const state = (this.props.fullState)
      ? (Object.assign({}, this.state, this.props.getState()))
      : (Object.assign({}, this.state));
    try {     
      // console.info({ state });
      if (this.props.flattenRawData) {
        let flattenedProps = Object.assign({}, flatten(state, this.props.flattenOptions));
        // console.info({ flattenedProps });
        displayProp = (this.props.select) ? flattenedProps[ this.props.select ] : flattenedProps;
      } else {
        displayProp = (this.props.select) ? state[ this.props.select ] : state;
      }
      displayData = (this.props.display) ? displayProp.toString() : JSON.stringify(displayProp, null, 2);
      // console.info({ displayData, displayProp, });
    }
    catch (e) {
      if (!global) {
        console.error(e);
      }
    }
    switch (this.props.type) {
    case 'rjx':
      return (this.getRenderedComponent(displayData, state));
    case 'inline':
      return (
        <span style={this.props.style}>{displayData}</span>
      );
    case 'block':
      return (
        <div style={this.props.style}>{displayData}</div>
      );
    default:
      return (
        <pre style={this.props.style}>{displayData}</pre>
      );
    }
  }
}  
RawStateOutput.defaultProps = defaultProps;

export default RawStateOutput;
