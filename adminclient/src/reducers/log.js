import constants from '../constants';

const initialState = {
  logs: [],
  // messages: [],
  showLogs:false,
};

const logReducer = (state, action) => {
  switch (action.type) {
  case constants.log.SHOW_LOG:
    return Object.assign({}, state, {
      showLogs: true,
    });  
  case constants.log.HIDE_LOG:
    return Object.assign({}, state, {
      showLogs: false,
    });  
  case constants.log.LOG_DATA:
    var { log, } = action.payload;
    var arrayOfLogs = [].concat(state.logs);
    arrayOfLogs.unshift(log);  
    return Object.assign({}, state, {
      logs: arrayOfLogs.slice(0, 200),
    });    
  default:
    return Object.assign(initialState, state);
  }
};

export default logReducer;