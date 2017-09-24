import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auctionItemReducer from './auctionItemReducer';

const rootReducer = combineReducers({
  auctionItems: auctionItemReducer,
  routing: routerReducer
});

export default rootReducer;
