import React, { Component, } from 'react';
import { Message, Button, Addons, Input, Columns, Column, Notification, Label } from 're-bulma';
import { getRenderedComponent, } from '../AppLayoutMap';
import styles from '../../styles';
import moment from 'moment';

class Logs extends Component {
  constructor(props) {
    // console.debug({ props });
    super(props);
    this.state = Object.assign({ replcommand: '', }, props, props.useGetState ? props.getState() : {});
    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.setCommand = this.setCommand.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps nextProps.log', nextProps.log);
    this.setState({log:nextProps.log});
  }
  componentDidMount() {
    this.useSocketMessages();
  }
  useSocketMessages() {
    if (this.props.useMountedSocket) {
      const initState = this.props.getState();
      const socket = initState.dynamic.socket;
      // console.debug({socket});
      socket.onevent = (packet) => {
        const newState = this.props.getState();
        const newlog = newState.log;
        // console.log({ packet, newlog });
        this.setState({
          log: newlog,
        });
      }
    }
  }
  handleClick() {
    // console.log('this.props',this.props)
    this.props.hideLog();
  }
  handleKeyPress(e) {
    if(e.key === 'Enter' || e.which === 13) {
      this.sendCommand();
    }
  }
  setCommand(text) {
    this.setState({ replcommand: text, });
  }
  sendCommand() {
    if (this.props.dynamic && this.props.dynamic.socket) {
      this.props.dynamic.socket.emit('stdin', this.state.replcommand);
    }
    this.setState({ replcommand: '', });
  }
  render() {
    const logs = (this.state.log && this.state.log.logs && this.state.log.logs.length > 0)
      ? this.state.log.logs.map((log, key) => {
        function getMSG(log) {
          return (log.meta && typeof log.meta !== 'string' && log.meta.component)
          ? this.getRenderedComponent(log.meta)
          : typeof log.meta === 'string'
            ? log.meta
            : log.meta
              ? JSON.stringify(log.meta, null, 2)
              : null
        }
        return (this.props.showLogs)
          ? <Notification color={log.type}>
            <div>
              <Label>{moment(log.date).format('l LTS')}</Label>
              <div>{log.message}</div>
              <div>{getMSG(log)}</div>
            </div>
          </Notification>
          : <Message
            color={log.type}
            key={key}
            header={`${log.date}${log.message ? ' - ' + log.message : ''}`}
            icon="fa fa-times">
            {
              getMSG(log)
            }
          </Message>
      })
      : null;
    const closeButton = (this.props.showLogs)
      ? <span></span>
      : <Button icon="fa fa-times" onClick={this.handleClick}> Close </Button>
    // this.getRenderedComponent(formElement.value, undefined, true)
    return (
      (this.props.showLogs || this.state.log.showLogs)
        ? (<div style={this.props.showLogs
          ? Object.assign({padding: '1rem',width: '100%',  },
            styles.fullHeight, styles.mainContainer,
            {
              margin:0,
          })
          : Object.assign({ padding: '1rem', }, styles.fullHeight, styles.mainContainer, styles.sidebarContainer, { position: 'absolute', width: '40%', })}
        className={(this.props.showLogs || this.state.log.showLogs) ? 'animated fadeInLeft Nav-Sidebar-Speed  __ra_l_s' : 'animated slideOutLeft Nav-Sidebar-Speed  __ra_l_s'}>
        <div style={Object.assign({
          position: this.props.showLogs ?undefined:'fixed',
          height: '100%',
          overflowY: 'auto',
          width:'96%',
        })}
          className=" __ra_l_w"
          > 
            <Columns style={{ marginBottom: '1rem', }} >
              <Column>
                <Addons>
                  <Input value={this.state.replcommand} onKeyPress={this.handleKeyPress} onChange={(event) => {
                    this.setCommand(event.target.value);
                  }} style={{ width: '100%' }} />
                  <Button onClick={this.sendCommand}>Send</Button>
                </Addons>
              </Column>
              <Column size="isNarrow">
              {closeButton}
              </Column>
            </Columns>
          {logs }
        </div>
      </div>)
      : null  
    );
  }
}

export default Logs;
