import * as types from '../common/actionTypes';

export function putBidAmount(amount) {
  return function(dispatch) {
    dispatch({ type: types.PUT_BID_AMOUNT, value: amount });
  };
}
