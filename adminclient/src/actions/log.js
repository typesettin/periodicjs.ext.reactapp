import constants from '../constants';
import { DateTime, } from 'luxon';

export const TypeMap = {
  default:'isDark',
  error:'isDanger',
  warning:'isWarning',
  highlight:'isSuccess',
  success:'isSuccess',
  info:'isInfo',
  white:'isWhite',
  black:'isBlack',
  dark:'isDark',
};

export const log = {
  hideLog() {
    return {
      type: constants.log.HIDE_LOG,
      payload: {  },
    };
  },
  showLog() {
    return {
      type: constants.log.SHOW_LOG,
      payload: {},
    };
  },
  createLog(options = {}) {
    return (dispatch, getState) => {
      const state = getState();
      const log = {
        date: options.date || DateTime.fromJSDate(new Date(), { zone:state.user.time_zone,  }).toJSDate(),
        level: options.level||'log',
        message: options.message,
        type: TypeMap[options.type]||options.type,
        meta: options.meta,
      };
      dispatch({
        type: constants.log.LOG_DATA,
        payload: { log, },
      });
    };
  },
};

export default log;