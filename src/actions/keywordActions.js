import * as types from '../common/actionTypes';

export function putKeyword(value) {
  return {
    type: types.PUT_KEYWORD, value
  };
}
