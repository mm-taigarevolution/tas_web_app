import delay from '../common/delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const auctionItems = [
  {
    id: "1",
    status: "active",
    thumbnailUrl: "http://kotisivukone.fi/files/astiataivas.tarjoaa.fi/Arabia/Maitokannut_soppaskoolit_kastikekannut/ae030.jpg",
    title: "Arabia maitokannu",
    currentPrice: "100",
    auctionStart: "2017-09-23",
    auctionEnd: "2017-11-23"
  },
  {
    id: "2",
    status: "'active",
    thumbnailUrl: "https://scontent-dft4-1.cdninstagram.com/t51.2885-15/s480x480/e35/14676626_169921290137198_1808913596554412032_n.jpg",
    title: "Keisarin kaffepannu",
    currentPrice: "110",
    auctionStart: "2017-09-22",
    auctionEnd: "2017-11-22"
  },
  {
    id: "3",
    status: "active",
    thumbnailUrl: "http://www.gameberry.net/kannet/1578.jpg",
    title: "Donkkikonkki-peli",
    currentPrice: "200",
    auctionStart: "2017-09-20",
    auctionEnd: "2017-11-20"
  },
  {
    id: "4",
    status: "active",
    thumbnailUrl: "http://www.suomenantiikki.fi/images/4591%20lasi%2014.jpg",
    title: "Iittalan lasia",
    currentPrice: "200",
    auctionStart: "2017-10-01",
    auctionEnd: "2017-11-20"
  }
];

const singleAuctionItem = {
    id: "1",
    status: "active",
    thumbnailUrl: "http://www.suomenantiikki.fi/images/4591%20lasi%2014.jpg",
    imageUrls: [],
    title: "Iittalan lasia",
    description: "Yyberhjuvat kupit joista voi kipata vaikka korpikuusen kyyneleitä.",
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
    paymentInfo: "Voit maksaa käyttäen integroituja maksutapoja.",
    deliveryInfo: "Postitse tai nouto ym. osoitteesta"
}

class AuctionItemApi {
  static getAuctionItems() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], auctionItems));
      }, delay);
    });
  }
  static getAuctionItemById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, singleAuctionItem));
      }, delay);
    });
  }
}

export default AuctionItemApi;
