import {GET_AUCTION_ITEM_BY_ID,
        PUT_AUCTION_ITEM,
        POST_LOGIN,
        POST_LOGOUT,
        POST_BID,
        PUT_BID_DRAFT_AMOUNT} from '../common/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note using Object.assign to create a copy of current state
// and update values on the copy.
export default function bidReducer(state = initialState.bidDraft, action) {
  switch (action.type) {
    case GET_AUCTION_ITEM_BY_ID:
    case PUT_AUCTION_ITEM: {
      let newState = Object.assign({}, state);
      let auctionItem = action.value;
      let numberOfAuctions = auctionItem.bids.length;
      let highestBid = numberOfAuctions > 0 ? auctionItem.bids[numberOfAuctions-1].bidAmount: auctionItem.startPrice;
      let bidStep = auctionItem.minimumBidStep;
      let minimumBidAmount = highestBid + bidStep;

      newState.itemId = auctionItem.id;
      newState.minimumBidAmount = minimumBidAmount;
      newState.bidStep = bidStep;
      newState.bidAmount = minimumBidAmount;

      return newState;
    }
    case POST_LOGIN: {
      let newState = Object.assign({}, state);
      newState.userId = action.value.userId;

      return newState;
    }
    case POST_LOGOUT: {
      let newState = Object.assign({}, state);
      newState.userId = '';
      return newState;
    }
    case POST_BID: {
      let bid = action.value.bid;
      let minimumBidAmount = bid.bidAmount + state.bidStep;

      let newState = Object.assign({}, state);
      newState.minimumBidAmount = minimumBidAmount;
      newState.bidAmount = minimumBidAmount;

      return newState;
    }
    case PUT_BID_DRAFT_AMOUNT: {
      let newState = Object.assign({}, state);
      newState.bidAmount = action.value;
      return newState;
    }
    default:
      return state;
  }
}
