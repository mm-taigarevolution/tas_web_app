import * as types from '../common/actionTypes';
import auctionItemApi from '../api/mockAuctionItemApi';
import {setBusy} from '../actions/busyActions';
import {errorOccurred} from '../actions/errorActions';

export function getAuctionItemsSucceeded(value) {
  return {
    type: types.GET_AUCTION_ITEMS, value
  };
}

export function getAuctionItemByIdSucceeded(value) {
  return {
    type: types.GET_AUCTION_ITEM_BY_ID, value
  };
}

export function getAuctionItems() {
  return function(dispatch) {
    dispatch(setBusy(true));
    dispatch(errorOccurred(false));
    return auctionItemApi.getAuctionItems().then(auctionItems => {
      dispatch(getAuctionItemsSucceeded(auctionItems));
      dispatch(setBusy(false));
    }).catch(() => {
      dispatch(errorOccurred(true));
      dispatch(setBusy(false));
    });
  };
}

export function getAuctionItemById(id) {
  return function(dispatch) {
    dispatch(setBusy(true));
    dispatch(errorOccurred(false));
    return auctionItemApi.getAuctionItemById(id).then(auctionItem => {
      dispatch(getAuctionItemByIdSucceeded(auctionItem));
      dispatch(setBusy(false));
    }).catch(() => {
      dispatch(errorOccurred(true));
      dispatch(setBusy(false));
    });
  };
}
