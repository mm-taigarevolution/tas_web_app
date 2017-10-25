import * as types from '../common/actionTypes';
import api from '../api/mockUsersApi';
import {setBusy} from '../actions/busyActions';
import {errorOccurred} from '../actions/errorActions';

export function authenticateUserSucceeded(value) {
  return {
    type: types.AUTHENTICATE_USER, value
  };
}

export function authenticateUser(method) {
  return function(dispatch) {
    dispatch(setBusy(true));
    dispatch(errorOccurred(false));
    return api.authenticateUser(method).then(user => {
      dispatch(authenticateUserSucceeded(user));
      dispatch(setBusy(false));
    }).catch(() => {
      dispatch(errorOccurred(true));
      dispatch(setBusy(false));
    });
  };
}
