import { createStore } from 'redux';
import initialState from '../reducers/initialState';
import rootReducer from './../reducers';
import * as auctionActions from '../actions/auctionActions';

describe('Store', () => {
  it('should receive the empty array of auction items passed as an action', () => {
    const store = createStore(rootReducer, initialState);

    const auctionItems = [];
    const action = auctionActions.getAuctionItemsSucceeded(auctionItems);
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
        thumbnailUrl: "http://kotisivukone.fi/files/astiataivas.tarjoaa.fi/Arabia/Maitokannut_soppaskoolit_kastikekannut/ae030.jpg",
        title: "Arabia milk can",
        itemLocation: "Oulu",
        startPrice: 0,
        bids: [],
        auctionStart: "2017-09-23",
        auctionEnd: "2017-10-23 12:10"
      },
      {
        id: "2",
        thumbnailUrl: "https://scontent-dft4-1.cdninstagram.com/t51.2885-15/s480x480/e35/14676626_169921290137198_1808913596554412032_n.jpg",
        title: "Caesar's coffee pot",
        itemLocation: "Jyväskylä",
        startPrice: 0,
        bids: [{userId:"G543534534534t43", bid:100, bidTime:"2017-11-20 20:00"}, {userId:"G543534534534t44", bid:110, bidTime:"2017-11-20 20:01"}],
        auctionStart: "2017-09-22",
        auctionEnd: "2017-10-21 14:10"
      },
      {
        id: "3",
        thumbnailUrl: "http://www.gameberry.net/kannet/1578.jpg",
        title: "Donkey Konkey- console",
        itemLocation: "Kuopio",
        startPrice: 0,
        bids: [{userId:"G543534534534t43", bid:100, bidTime:"2017-11-20 20:00"}, {userId:"G543534534534t44", bid:200, bidTime:"2017-11-20 20:01"}],
        auctionStart: "2017-09-20",
        auctionEnd: "2017-10-20 19:00"
      }
    ];

    const action = auctionActions.getAuctionItemsSucceeded(auctionItems);
    store.dispatch(action);

    const actual = store.getState().auctionItems;
    const expected = auctionItems;

    expect(actual.length).toEqual(expected.length);
  });
});
