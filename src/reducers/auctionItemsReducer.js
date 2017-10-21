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
      return Object.assign([], action.value);
    case TIMER_TICK:
      if(state != initialState.auctionItems) {
        let newState = Object.assign([], state);
        newState.map(function(item) {
          let end = new Date(item.auctionEnd);
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

            item.bid_time_remaining_days = days;
            item.bid_time_remaining_hours = hours;
            item.bid_time_remaining_minutes = minutes;
            item.bid_time_remaining_seconds = seconds;
            item.active = true;
          }

          else {
            item.bid_time_remaining_days = 0;
            item.bid_time_remaining_hours = 0;
            item.bid_time_remaining_minutes = 0;
            item.bid_time_remaining_seconds = 0;
            item.active = false;
          }
        });
        return newState;
      }
      return state;
    default:
      return state;
  }
}
