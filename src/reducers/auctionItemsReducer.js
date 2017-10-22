import {GET_AUCTION_ITEMS, TIMER_TICK} from '../common/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note using Object.assign to create a copy of current state
// and update values on the copy.
export default function auctionItemsReducer(state = initialState.auctionItems, action) {
  switch (action.type) {
    case GET_AUCTION_ITEMS:
      state =  Object.assign([], action.value);
      // fall through to calculate time remaining
    case TIMER_TICK:
      let newState = [];

      state.map(function(item) {
        let newItem = Object.assign({}, item);
        let end = new Date(newItem.auctionEnd);
        let current = new Date();

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

          newItem.bid_time_remaining_days = days;
          newItem.bid_time_remaining_hours = hours;
          newItem.bid_time_remaining_minutes = minutes;
          newItem.bid_time_remaining_seconds = seconds;
          newItem.active = true;
        }

        else {
          newItem.bid_time_remaining_days = 0;
          newItem.bid_time_remaining_hours = 0;
          newItem.bid_time_remaining_minutes = 0;
          newItem.bid_time_remaining_seconds = 0;
          newItem.active = false;
        }

        newState.push(newItem);
      });

      return newState;
    default:
      return state;
  }
}
