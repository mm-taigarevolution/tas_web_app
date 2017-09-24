import * as ActionTypes from '../common/actionTypes';
import { createStore } from 'redux';
import initialState from '../reducers/initialState';
import rootReducer from './../reducers';
import * as auctionItemActions from '../actions/auctionItemActions';

describe('Store', () => {
  it('should receive the empty array of auction items passed as an action', () => {
    const store = createStore(rootReducer, initialState);

    const auctionItems = [];
    const action = auctionItemActions.getAuctionItemsSucceeded(auctionItems);
    store.dispatch(action);

    const actual = store.getState().auctionItems;
    const expected = auctionItems;

    expect(actual).toEqual(expected);
  });

  it('should receive the 3 auction items passed as an action', () => {
    const store = createStore(rootReducer, initialState);

    const auctionItems = [
      {
        id: "1",
        status: "active",
        title: "Auction item 1",
        currentPrice: "100",
        auctionStart: "2017-09-23",
        auctionEnd: "2017-11-23"
      },
      {
        id: "2",
        status: "'active",
        title: "Auction item 2",
        currentPrice: "110",
        auctionStart: "2017-09-22",
        auctionEnd: "2017-11-22"
      },
      {
        id: "3",
        status: "active",
        title: "Auction item 3",
        currentPrice: "200",
        auctionStart: "2017-09-20",
        auctionEnd: "2017-11-20"
      }
    ];

    const action = auctionItemActions.getAuctionItemsSucceeded(auctionItems);
    store.dispatch(action);

    const actual = store.getState().auctionItems;
    const expected = auctionItems;

    expect(actual).toEqual(expected);
  });
});
