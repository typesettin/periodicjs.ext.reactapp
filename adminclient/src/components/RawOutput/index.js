import React from 'react';
import flatten from 'flat';

const RawOutput = (props) => {
  // console.info('GOT TO RAWOUTPUT')
  let displayProp='';
  let displayData='';
  try {
    let propData = props;
    console.info({propData})
    if (props.flattenRawData) {
      let flattenedProps = Object.assign({}, flatten(propData, props.flattenOptions));
      displayProp = (props.select) ? flattenedProps[ props.select ] : flattenedProps;
    } else {
      displayProp = (props.select) ? propData[ props.select ] : propData;
    }
    displayData = (props.display) ? displayProp.toString() : JSON.stringify(displayProp, null, 2);

    if(props.debug) console.debug({ props, displayData, displayProp, });
  } catch (e) {
    // console.info(e);
    if (!global) {
      console.error(e);
    }
  }  
  switch (props.type) {
    case 'rjx':
      return (this.getRenderedComponent(displayData, this.state));
  case 'inline':
    return (
      <span style={props.style}>{displayData}</span>
    );
  case 'block':
    return (
      <div style={props.style}>{displayData}</div>
    );
  default:
    return (
      <pre style={props.style}>{displayData}</pre>
    );
  }
};

export default RawOutput;
