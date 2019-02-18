import React, { Component, } from 'react';
import { Message, Button, Addons, Input, Columns, Column, } from 're-bulma';
import { getRenderedComponent, } from '../AppLayoutMap';
import styles from '../../styles';

class Logs extends Component {
  constructor(props) {
    // console.debug({ props });
    super(props);
    this.state = Object.assign({ replcommand:'', }, props);
    this.getRenderedComponent = getRenderedComponent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.setCommand = this.setCommand.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps nextProps', nextProps);
    this.setState(nextProps);
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
    const logs = (this.state.log.logs && this.state.log.logs.length > 0)
      ? this.state.log.logs.map((log, key) => <Message
        color={log.type}
        key={key}
        header={`${log.date}${log.message ? ' - ' + log.message : ''}`}
        icon="fa fa-times">
        {
          (log.meta && typeof log.meta !== 'string' && log.meta.component)
            ? this.getRenderedComponent(log.meta)
            : typeof log.meta === 'string' 
              ? log.meta
              : log.meta
                ? JSON.stringify(log.meta, null, 2)
                : null
        }
      </Message>)
      : null;
    // this.getRenderedComponent(formElement.value, undefined, true)
    return (
      (this.state.log.showLogs)
        ? (<div style={Object.assign({ padding: '1rem',  }, styles.fullHeight, styles.mainContainer, styles.sidebarContainer, { position:'absolute', width:'40%', } )}
        className={(this.state.log.showLogs) ? 'animated fadeInLeft Nav-Sidebar-Speed  __ra_l_s' : 'animated slideOutLeft Nav-Sidebar-Speed  __ra_l_s'}>
        <div style={Object.assign({
          position: 'fixed',
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
                  }} style={{width:'100%'}}/><Button onClick={this.sendCommand}>Send</Button>
                </Addons>
              </Column>
              <Column size="isNarrow">
                <Button icon="fa fa-times" onClick={this.handleClick}> Close </Button>
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
