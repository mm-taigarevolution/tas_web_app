import * as types from '../common/actionTypes';
import api from '../api/mockBidApi';
import {postBusy} from '../actions/busyActions';
import {putErrorOccurred} from '../actions/errorActions';

export function putBidDraftAmount(value) {
  return function(dispatch) {
    dispatch({ type: types.PUT_BID_DRAFT_AMOUNT, value });
  };
}

export function bidSucceeded(value) {
  return {
    type: types.POST_BID, value
  };
}

export function bidAuctionItem(bidDraft) {
  return function(dispatch) {
    dispatch(postBusy(true));
    dispatch(putErrorOccurred(false));
    return api.bidAuctionItem(bidDraft).then(bidContainer => {
      dispatch(postBusy(false));
      dispatch(bidSucceeded(bidContainer));
    }).catch((err) => {
      debugger;
      dispatch(putErrorOccurred(true));
      dispatch(postBusy(false));
    });
  };
}
