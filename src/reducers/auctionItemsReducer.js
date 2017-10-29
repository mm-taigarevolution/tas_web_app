import {GET_AUCTION_ITEMS,
        POST_TIMER_TICK,
        POST_BID} from '../common/actionTypes';
import initialState from './initialState';
import {updateTimeRemaining} from './tools';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note using Object.assign to create a copy of current state
// and update values on the copy.
export default function auctionItemsReducer(state = initialState.auctionItems, action) {
  switch (action.type) {
    case GET_AUCTION_ITEMS: {
      let newState = [];
      let newItems = action.value;
      if(newItems.length > 0) {
         newItems.map(function(item) {
          let updatedItem = updateTimeRemaining(item);
          let bids = Object.assign([], updatedItem.bids);

          if(bids.length > 0) {
            // sort from highest bid to lowest
            bids.sort(function(a,b){
              return b.bidAmount - a.bidAmount;
            });
            updatedItem.bids = Object.assign([], bids);
            updatedItem.currentPrice = bids[0].bidAmount;
          }

          else {
            updatedItem.currentPrice = updatedItem.startPrice;
          }

          newState.push(updatedItem);
        });
      }
      return newState;
    }
    case POST_TIMER_TICK: {
      let newState = [];
      if(state.length > 0) {
        state.map(function(item) {
          let updatedItem = updateTimeRemaining(item);
          newState.push(updatedItem);
        });
      }
      return newState;
    }
    case POST_BID: {
      let bidContainer = action.value;
      let newState = [];

      if(state.length > 0) {
        state.map(function(item) {
          if(item.id == bidContainer.itemId) {
            let bids = Object.assign([], item.bids);
            bids.push(bidContainer.bid);

            // sort from highest bid to lowest
            bids.sort(function(a,b){
              return b.bidAmount - a.bidAmount;
            });

            let newItem = Object.assign({}, item);
            newItem.bids = Object.assign([], bids);
            newState.currentPrice = bids[0].bidAmount;

            newState.push(newItem);
          }
          else {
            newState.push(item);
          }
        });
      }
      return newState;
    }
    default:
      return state;
  }
}
