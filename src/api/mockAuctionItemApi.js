import delay from '../common/delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
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

class AuctionItemApi {
  static getAuctionItems() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], auctionItems));
      }, delay);
    });
  }
}

export default AuctionItemApi;
