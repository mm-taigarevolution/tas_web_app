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

export function getAuctionItemByIdSucceeded(auctionItem) {
  return {
    type: types.GET_AUCTION_ITEM_BY_ID_SUCCEEDED, auctionItem
  };
}

export function getAuctionItemByIdFailed(error) {
  return {
    type: types.GET_AUCTION_ITEM_BY_ID_FAILED, error
  };
}

export function updateKeywordSucceeded(keyword) {
  return {
    type: types.PUT_KEYWORD_SUCCEEDED, keyword
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

export function getAuctionItemById(id) {
  return function(dispatch) {
    return auctionItemApi.getAuctionItemById(id).then(auctionItem => {
      dispatch(getAuctionItemByIdSucceeded(auctionItem));
    }).catch(error => {
      dispatch(getAuctionItemByIdFailed(error));
    });
  };
}

export function updateKeyword(keyword) {
  return function(dispatch) {
    dispatch(updateKeywordSucceeded(keyword));
  };
}
