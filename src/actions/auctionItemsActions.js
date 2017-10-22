import * as types from '../common/actionTypes';
import api from '../api/mockAuctionItemApi';
import {setBusy} from '../actions/busyActions';
import {errorOccurred} from '../actions/errorActions';

export function getAuctionItemsSucceeded(value) {
  return {
    type: types.GET_AUCTION_ITEMS, value
  };
}

export function getAuctionItems() {
  return function(dispatch) {
    dispatch(setBusy(true));
    dispatch(errorOccurred(false));
    return api.getAuctionItems().then(auctionItems => {
      dispatch(getAuctionItemsSucceeded(auctionItems));
      dispatch(setBusy(false));
    }).catch(() => {
      dispatch(errorOccurred(true));
      dispatch(setBusy(false));
    });
  };
}
