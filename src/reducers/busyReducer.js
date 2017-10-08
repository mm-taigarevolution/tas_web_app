import {SET_BUSY} from '../common/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note using Object.assign to create a copy of current state
// and update values on the copy.
export default function busyReducer(state = initialState.numberOfBusyOperations, action) {
  switch (action.type) {
    case SET_BUSY:
      if(action.value == true)
        return state + 1;
      return state - 1;
    default:
      return state;
  }
}
