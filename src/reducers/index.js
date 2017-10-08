import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auctionItemsReducer from './auctionItemsReducer';
import auctionItemReducer from './auctionItemReducer';
import keywordReducer from './keywordReducer';

const rootReducer = combineReducers({
  auctionItems: auctionItemsReducer,
  keyword: keywordReducer,
  auctionItem: auctionItemReducer,
  routing: routerReducer
});

export default rootReducer;
