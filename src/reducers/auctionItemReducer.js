import {GET_AUCTION_ITEM_BY_ID, TIMER_TICK} from '../common/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note using Object.assign to create a copy of current state
// and update values on the copy.
export default function auctionItemReducer(state = initialState.auctionItem, action) {
  switch (action.type) {
    case GET_AUCTION_ITEM_BY_ID:
      return Object.assign({}, action.value);
    case TIMER_TICK:
      if(state != initialState.auctionItem) {
        let newState = Object.assign({}, state);

        let end = new Date(state.auctionEnd);
        let current = new Date();
        let timeRemaining = 0;
        if(current < end) {
          let seconds = Math.floor((end - current)/1000);
          let secondsPerDay = 3600*24;
          let secondsPerHour = 3600;
          let secondsPerMinute = 60;

          let days = Math.floor(parseFloat(seconds / secondsPerDay));
          seconds -= days*secondsPerDay;
          let hours = Math.floor(parseFloat(seconds / secondsPerHour));
          seconds -= hours*secondsPerHour;
          let minutes = Math.floor(parseFloat(seconds / secondsPerMinute));
          seconds -= minutes*secondsPerMinute;

          newState.bid_time_remaining_days = days;
          newState.bid_time_remaining_hours = hours;
          newState.bid_time_remaining_minutes = minutes;
          newState.bid_time_remaining_seconds = seconds;

          newState.status = "active";
        }

        else {
          newState.bid_time_remaining_days = 0;
          newState.bid_time_remaining_hours = 0;
          newState.bid_time_remaining_minutes = 0;
          newState.bid_time_remaining_seconds = 0;
          newState.status = "inactive";
        }

        return newState;
      }
      return state;
    default:
      return state;
  }
}
