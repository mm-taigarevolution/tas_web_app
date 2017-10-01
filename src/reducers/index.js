import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auctionItemsReducer from './auctionItemsReducer';
import auctionItemReducer from './auctionItemReducer';

const rootReducer = combineReducers({
  auctionItems: auctionItemsReducer,
  auctionItem: auctionItemReducer,
  routing: routerReducer
});

export default rootReducer;
