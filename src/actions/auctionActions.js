import * as types from '../common/actionTypes';
import api from '../api/mockAuctionsApi';
import {postBusy} from '../actions/busyActions';
import {putErrorOccurred} from '../actions/errorActions';

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

export function putAuctionItem(value) {
  return {
    type: types.PUT_AUCTION_ITEM, value
  };
}

export function getAuctionItems() {
  return function(dispatch) {
    dispatch(postBusy(true));
    dispatch(putErrorOccurred(false));
    return api.getAuctionItems().then(auctionItems => {
      dispatch(postBusy(false));
      dispatch(getAuctionItemsSucceeded(auctionItems));
    }).catch((err) => {
      debugger;
      dispatch(putErrorOccurred(true));
      dispatch(postBusy(false));
    });
  };
}

export function getAuctionItemById(id) {
  return function(dispatch) {
    dispatch(postBusy(true));
    dispatch(putErrorOccurred(false));
    return api.getAuctionItemById(id).then(auctionItem => {
      dispatch(postBusy(false));
      dispatch(getAuctionItemByIdSucceeded(auctionItem));
    }).catch((err) => {
      debugger;
      dispatch(putErrorOccurred(true));
      dispatch(postBusy(false));
    });
  };
}
