import {GET_AUCTION_ITEMS_SUCCEEDED, GET_AUCTION_ITEMS_FAILED} from '../common/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note using Object.assign to create a copy of current state
// and update values on the copy.
export default function auctionItemReducer(state = initialState.auctionItems, action) {
  switch (action.type) {
    case GET_AUCTION_ITEMS_SUCCEEDED:
      return action.auctionItems;
    default:
      return state;
  }
}
