import * as types from '../common/actionTypes';

export function setBusy(value) {
  return {
    type: types.SET_BUSY, value
  };
}
