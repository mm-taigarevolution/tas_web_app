import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auctionItemsReducer from './auctionItemsReducer';
import auctionItemReducer from './auctionItemReducer';
import userReducer from './userReducer';
import keywordReducer from './keywordReducer';
import busyReducer from './busyReducer';
import errorReducer from './errorReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';
import bidDraftReducer from './bidDraftReducer';

const rootReducer = combineReducers({
  auctionItems: auctionItemsReducer,
  auctionItem: auctionItemReducer,
  user: userReducer,
  keyword: keywordReducer,
  busy: busyReducer,
  errorOccurred: errorReducer,
  routing: routerReducer,
  toastr: toastrReducer,
  bidDraft: bidDraftReducer
});

export default rootReducer;
