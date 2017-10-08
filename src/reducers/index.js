import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auctionItemsReducer from './auctionItemsReducer';
import auctionItemReducer from './auctionItemReducer';
import keywordReducer from './keywordReducer';
import busyReducer from './busyReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  auctionItems: auctionItemsReducer,
  auctionItem: auctionItemReducer,
  keyword: keywordReducer,
  numberOfBusyOperations: busyReducer,
  errorOccurred: errorReducer,
  routing: routerReducer
});

export default rootReducer;
