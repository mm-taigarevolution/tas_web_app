import * as types from '../common/actionTypes';

export function updateKeyword(value) {
  return {
    type: types.UPDATE_KEYWORD, value
  };
}
