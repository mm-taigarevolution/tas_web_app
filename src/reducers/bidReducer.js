import {PUT_BID_SKELETON, PUT_BID_AMOUNT} from '../common/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note using Object.assign to create a copy of current state
// and update values on the copy.
export default function bidReducer(state = initialState.bid, action) {
  switch (action.type) {
    case PUT_BID_SKELETON:
      return Object.assign({}, action.value);
    case PUT_BID_AMOUNT:
      let newState = Object.assign({}, state);
      newState.bidAmount = action.value;
      return newState;
    default:
      return state;
  }
}
