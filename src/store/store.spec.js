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
  it('should receive one auction item passed as an action', () => {
    const store = createStore(rootReducer, initialState);

    const singleAuctionItem = {
        id: "1",
        status: "active",
        thumbnailUrl: "http://kotisivukone.fi/files/astiataivas.tarjoaa.fi/Arabia/Maitokannut_soppaskoolit_kastikekannut/ae030.jpg",
        title: "Arabia maitokannu",
        description: "Yyberhjuva kannu josta voi kipata vaikka korpikuusen kyyneleitä.",
        startPrice: "0",
        currentPrice: "100",
        minimumBidRaise: "10",
        auctionStart: "2017-10-01",
        auctionEnd: "2017-12-01",
        createdBy: "Keisari ite",
        created: "2017-01-10",
        updated: "2017-01-10",
        itemLocation: "Huttukylä, Kiiminki",
        contactInfo: "Soita +358504872100 ja kysy lisää.",
        paymentInfo: "Voit maksaa luonnossa.",
        deliveryInfo: "Voin tuoda tuotteen vaikka Närpiölle."
    }

    const action = auctionItemActions.getAuctionItemByIdSucceeded(singleAuctionItem);
    store.dispatch(action);

    const actual = store.getState().auctionItem;
    const expected = singleAuctionItem;

    expect(actual).toEqual(expected);
  });
});
