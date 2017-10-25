import delay from '../common/delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
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
    bids: [{uid:"G543534534534t43", bid:100, bidTime:"2017-11-20 20:00"}, {uid:"G543534534534t44", bid:110, bidTime:"2017-11-20 20:01"}],
    auctionStart: "2017-09-22",
    auctionEnd: "2017-10-21 14:10"
  },
  {
    id: "3",
    thumbnailUrl: "http://www.gameberry.net/kannet/1578.jpg",
    title: "Donkey Konkey- console",
    itemLocation: "Kuopio",
    startPrice: 0,
    bids: [{uid:"G543534534534t43", bid:100, bidTime:"2017-11-20 20:00"}, {uid:"G543534534534t44", bid:200, bidTime:"2017-11-20 20:01"}],
    auctionStart: "2017-09-20",
    auctionEnd: "2017-10-20 19:00"
  },
  {
    id: "4",
    thumbnailUrl: "http://www.suomenantiikki.fi/images/4591%20lasi%2014.jpg",
    title: "Set of Iittala glasses",
    itemLocation: "Helsinki",
    startPrice: 0,
    bids: [{uid:"G543534534534t43", bid:100, bidTime:"2017-11-20 20:00"}, {uid:"G543534534534t44", bid:200, bidTime:"2017-11-20 20:01"}],
    auctionStart: "2017-10-01",
    auctionEnd: "2017-11-20 20:00"
  }
];

class AuctionItemsApi {
  static getAuctionItems() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(auctionItems);
      }, delay);
    });
  }
}

export default AuctionItemsApi;
