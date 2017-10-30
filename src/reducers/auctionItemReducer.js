import {GET_AUCTION_ITEM_BY_ID,
        PUT_AUCTION_ITEM,
        POST_TIMER_TICK,
        POST_BID} from '../common/actionTypes';
import initialState from './initialState';
import {updateTimeRemaining} from './tools';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note using Object.assign to create a copy of current state
// and update values on the copy.
export default function auctionItemReducer(state = initialState.auctionItem, action) {
  switch (action.type) {
    case GET_AUCTION_ITEM_BY_ID: {
      let newState = updateTimeRemaining(action.value);

      let bids = Object.assign([], newState.bids);

      if(bids.length > 0) {
        // sort from highest bid to lowest
        bids.sort(function(a,b){
          return b.bidAmount - a.bidAmount;
        });
        newState.bids = Object.assign([], bids);
        newState.currentPrice = bids[0].bidAmount;
      }

      else {
        newState.currentPrice = updatedItem.startPrice;
      }

      return newState;
    }
    case PUT_AUCTION_ITEM: {
      let newState = updateTimeRemaining(action.value);
      return newState;
    }
    case POST_TIMER_TICK: {
      if(state.id.length > 0) {
        let newState = updateTimeRemaining(state);
        return newState;
      }
      return state;
    }
    case POST_BID: {
      let bidContainer = action.value;

      if(state.id.length > 0 &&
         state.id == bidContainer.itemId) {
        let bids = Object.assign([], state.bids);
        bids.push(bidContainer.bid);

        // sort from highest bid to lowest
        bids.sort(function(a,b){
          return b.bidAmount - a.bidAmount;
        });

        let newState = Object.assign({}, state);
        newState.bids = Object.assign([], bids);
        newState.currentPrice = bids[0].bidAmount;

        return newState;
      }
      return state;
    }
    default:
      return state;
  }
}
