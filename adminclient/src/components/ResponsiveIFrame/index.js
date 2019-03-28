import React, { Component, PropTypes, } from 'react';
import { getFunctionFromProps, } from '../AppLayoutMap';

const propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  targetOrigin: PropTypes.string,
  blockPageUI: PropTypes.bool,
  onLoad: PropTypes.string,
  onLoadEval: PropTypes.string,
  onMessage: PropTypes.string,
  onMessageEval: PropTypes.string,
  dynamicFieldOnLoad: PropTypes.string,
  dynamicFieldOnMessage: PropTypes.string,
};

const defaultProps = {
  title: 'Responsive IFrame',
  src: 'https://local-app.jewelml.io:8900/proxy/https://prettyinpastel.shop/',//'http://tensorscript.io/',
  targetOrigin: '*',
  passProps: {},
  blockPageUI:true,
};

class ResponsiveIFrame extends Component {
  constructor(props) {
    super(props);
    const id = props.id || `id${new Date().valueOf()}`;
    this.state = {
      title: props.title,
      src: props.src,
      targetOrigin: props.targetOrigin,
      id,
    };
    this.getFunction = getFunctionFromProps.bind(this);
    if (props.onLoadEval) {
      // eslint-disable-next-line
      const LoadFunction = Function('data', '"use strict";' + props.onLoadEval);
      Object.defineProperty(
        LoadFunction,
        'name',
        {
          value: `IFrame_${id}_LoadFunction`,
        }
      );
      this.onLoadFunction = LoadFunction.bind(this);
    }
    if (props.onMessageEval) {
      // eslint-disable-next-line
      const MessageFunction = Function('data', '"use strict";' + props.onMessageEval);
      Object.defineProperty(
        MessageFunction,
        'name',
        {
          value: `IFrame_${id}_MessageFunction`,
        }
      );
      this.onMessageFunction = MessageFunction.bind(this);
    }
  }
  componentDidMount() {
    if (this.props.blockPageUI) {
      this.props.setUILoadedState(false, this.props.blockPageUILayout);
    }
    this.ifr.onload = (e) => {
      // console.info('CHANGED IFRAME SOURCE', e);
      if (this.props.blockPageUI) {
        this.props.setUILoadedState(true);
      }
      if (this.onLoadFunction) {
        this.onLoadFunction(e);
      } else if (typeof this.props.onLoad==='string' && this.props.onLoad.includes('setDynamicData')) {
        this.props.setDynamicData(this.props.dynamicFieldOnLoad, e);
      } else if (typeof this.props.onLoad === 'string') {
        this.getFunction({ propFunc: this.props.onLoad })(e);
      }
      // this.ifr.contentWindow.postMessage('hello', this.state.targetOrigin);
    };
    window.addEventListener("message", this.handleFrameTasks);
  }

  componentWillReceiveProps(nextProps) {
    // for (const [objectid, liveData] of Object.entries(nextProps.objectsLive)) {
    //   ........
    //   const prevOn = this.props.objectsLive[objectid] ? this.props.objectsLive[objectid].on : null;
    //   if (prevOn !== liveData.on) {
    //     this.ifr.contentWindow.postMessage({ event: 'onoff', object: objectid, value: liveData.on }, '*');
    //   }
    // }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleFrameTasks);
  }

  sendToFrame(data) {
    if(this.ifr) this.ifr.contentWindow.postMessage(data, this.state.targetOrigin);
  }

  handleFrameTasks = (e) => {
    // if (e.data.type === 'bookmark') {
      //   this.sendToFrame({ event: 'bookmark', data: window.location.hash ? window.location.hash.substr(1) : null });
      // }
    if (e.data.type === 'iframe') {
        // console.info('handleFrameTasks',{e});
      if (this.onMessageFunction) {
        this.onMessageFunction(e.data);
      } else if (typeof this.props.onMessage==='string' && this.props.onMessage.includes('setDynamicData')) {
        this.props.setDynamicData(this.props.dynamicFieldOnMessage, e.data);
      } else if (typeof this.props.onMessage === 'string') {
        this.getFunction({ propFunc: this.props.onMessage })(e.data);
      }
    }
    // window.removeEventListener('message', this.handleFrameTasks);

  }
  render() {
    return (
        <iframe
          sandbox="allow-scripts"
          style={{ width: '100%', height:'100%', border:0 }}
          title={this.state.title}
          src={this.state.src}
          ref={(f) => {
            this.ifr = f;
            window.testFRAME = f;
          }}
          {...this.props.passProps}
        />
    );
  }
}

ResponsiveIFrame.propTypes = propTypes;
ResponsiveIFrame.defaultProps = defaultProps;

export default ResponsiveIFrame;