import * as types from '../common/actionTypes';
import api from '../api/mockAuctionItemApi';
import {setBusy} from '../actions/busyActions';
import {errorOccurred} from '../actions/errorActions';

export function getAuctionItemByIdSucceeded(value) {
  return {
    type: types.GET_AUCTION_ITEM_BY_ID, value
  };
}

export function getAuctionItemById(id) {
  return function(dispatch) {
    dispatch(setBusy(true));
    dispatch(errorOccurred(false));
    return api.getAuctionItemById(id).then(auctionItem => {
      dispatch(getAuctionItemByIdSucceeded(auctionItem));
      dispatch(setBusy(false));
    }).catch(() => {
      dispatch(errorOccurred(true));
      dispatch(setBusy(false));
    });
  };
}
