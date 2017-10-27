import * as types from '../common/actionTypes';
import api from '../api/mockAuctionItemApi';
import {setBusy} from '../actions/busyActions';
import {errorOccurred} from '../actions/errorActions';

export function getAuctionItemByIdSucceeded(value) {
  return {
    type: types.GET_AUCTION_ITEM_BY_ID, value
  };
}

export function putBidSkeleton(value) {
  return {
    type: types.PUT_BID_SKELETON, value
  };
}

export function bidSucceeded(value) {
  return {
    type: types.POST_BID_AUCTION_ITEM, value
  };
}

function createBidSkeleton(auctionItem) {
  let numberOfAuctions = auctionItem.bids.length;
  let highestBid = numberOfAuctions > 0 ? auctionItem.bids[numberOfAuctions-1].bid: auctionItem.startPrice;
  let bidStep = auctionItem.minimumBidStep;
  let minimumBidAmount = highestBid + bidStep;

  let bid = {
    itemId: auctionItem.id,
    minimumBidAmount: minimumBidAmount,
    bidStep: bidStep,
    bidAmount: minimumBidAmount
  };

  return bid;
}

export function getAuctionItemById(id) {
  return function(dispatch) {
    dispatch(setBusy(true));
    dispatch(errorOccurred(false));
    return api.getAuctionItemById(id).then(auctionItem => {
      dispatch(setBusy(false));
      dispatch(getAuctionItemByIdSucceeded(auctionItem));
      dispatch(putBidSkeleton(createBidSkeleton(auctionItem)));
    }).catch((err) => {
      debugger;
      dispatch(errorOccurred(true));
      dispatch(setBusy(false));
    });
  };
}

export function bidAuctionItem(itemId, uid, bidAmount) {
  return function(dispatch) {
    dispatch(setBusy(true));
    dispatch(errorOccurred(false));
    return api.bidAuctionItem(itemId, uid, bidAmount).then(auctionItem => {
      dispatch(setBusy(false));
      dispatch(bidSucceeded(auctionItem));
      dispatch(putBidSkeleton(createBidSkeleton(auctionItem)));
    }).catch((err) => {
      debugger;
      dispatch(errorOccurred(true));
      dispatch(setBusy(false));
    });
  };
}
