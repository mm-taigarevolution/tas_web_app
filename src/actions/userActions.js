import * as types from '../common/actionTypes';
import api from '../api/mockUsersApi';
import {postBusy} from '../actions/busyActions';
import {putErrorOccurred} from '../actions/errorActions';

export function loginUserSucceeded(value) {
  return {
    type: types.POST_LOGIN, value
  };
}

export function logoutUserSucceeded(value) {
  return {
    type: types.POST_LOGOUT, value
  };
}

export function loginUser(method) {
  return function(dispatch) {
    dispatch(postBusy(true));
    dispatch(putErrorOccurred(false));
    return api.loginUser(method).then(user => {
      dispatch(postBusy(false));
      dispatch(loginUserSucceeded(user));
    }).catch((err) => {
      debugger;
      dispatch(putErrorOccurred(true));
      dispatch(postBusy(false));
    });
  };
}

export function logoutUser() {
  return function(dispatch) {
    dispatch(postBusy(true));
    dispatch(putErrorOccurred(false));
    return api.logoutUser().then(user => {
      dispatch(postBusy(false));
      dispatch(logoutUserSucceeded(user));
    }).catch((err) => {
      debugger;
      dispatch(putErrorOccurred(true));
      dispatch(postBusy(false));
    });
  };
}
