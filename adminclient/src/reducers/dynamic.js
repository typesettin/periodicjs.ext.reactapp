import constants from '../constants';
// import Immutable from 'immutable';

const initialState = {

};

const dynamicReducer = (state, action) => {
  switch (action.type) {
  case constants.dynamic.SET_DYNAMIC_DATA:
    var dynamicPayload = action.payload;
    return Object.assign({}, state, {
      [dynamicPayload.prop]: dynamicPayload.value,
    });
  case constants.dynamic.SET_SOCKET:
    var { socket, } = action.payload;
    return Object.assign({}, state, {
      socket,
    });
  default:
    return Object.assign(initialState, state);
  }
};

export default dynamicReducer;