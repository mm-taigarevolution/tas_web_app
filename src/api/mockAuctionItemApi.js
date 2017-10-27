import delay from '../common/delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const singleAuctionItem = {
    id: "1",
    imageUrls: ["http://www.suomenantiikki.fi/images/4591%20lasi%2014.jpg", "https://scontent-dft4-1.cdninstagram.com/t51.2885-15/s480x480/e35/14676626_169921290137198_1808913596554412032_n.jpg"],
    title: "Set of Iittala glasses",
    description: "Unused set of Iittala glasses. It's a pleasure to drink wind-light cognac snaps with these!",
    startPrice: 0,
    bids: [{uid:"G543534534534t43", bid:100, bidTime:"2017-11-20 20:00"}, {uid:"G543534534534t44", bid:110, bidTime:"2017-11-20 20:01"}],
    minimumBidStep: 10,
    auctionStart: "2017-10-12T12:03Z",
    auctionEnd: "2017-11-26T17:50Z",
    createdBy: "Keisari ite",
    created: "2017-01-10",
    updated: "2017-01-10",
    itemLocation: "Huttukylä, Kiiminki",
    contactInfo: "Call +358633455434 and ask for more.",
    paymentInfo: "Credit and debit cards, PayPal, AliPay and Siirto-payments.",
    deliveryInfo: "By mail or pick-up from the address provided."
};

class AuctionItemApi {
  static getAuctionItemById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(singleAuctionItem);
      }, delay);
    });
  }

  static bidAuctionItem(itemId, uid, bidAmount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let newItem = Object.assign({}, singleAuctionItem)
        let newBid = { uid: uid,
                       bid: bidAmount,
                       bidTime: new Date().toString()
                     };
        let bids = Object.assign([], singleAuctionItem.bids);
        bids.push(newBid);

        newItem.bids = Object.assign([], bids);
        resolve(newItem);
      }, delay);
    });
  }
}

export default AuctionItemApi;
