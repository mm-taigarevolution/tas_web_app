import * as types from '../common/actionTypes';
import auctionItemApi from '../api/mockAuctionItemApi';

export function getAuctionItemsSucceeded(auctionItems) {
  return {
    type: types.GET_AUCTION_ITEMS_SUCCEEDED, auctionItems
  };
}

export function getAuctionItemsFailed(error) {
  return {
    type: types.GET_AUCTION_ITEMS_FAILED, error
  };
}

export function getAuctionItems() {
  return function(dispatch) {
    return auctionItemApi.getAuctionItems().then(auctionItems => {
      dispatch(getAuctionItemsSucceeded(auctionItems));
    }).catch(error => {
      dispatch(getAuctionItemsFailed(error));
    });
  };
}
