import * as types from '../common/actionTypes';

export function errorOccurred(value) {
  return {
    type: types.ERROR_OCCURRED, value
  };
}
