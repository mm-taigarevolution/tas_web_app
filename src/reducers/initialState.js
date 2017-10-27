export default {
  auctionItems: [],
  keyword: '',
  auctionItem: {
    id: '',
    thumbnailUrl: '',
    title: '',
    itemLocation: '',
    startPrice: 0,
    bids: [],
    auctionStart: '',
    auctionEnd: '',
    active: true
  },
  user: {
    uid: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    authenticated: false
  },
  bid: {
    itemId: '',
    minimumBidAmount: 0,
    bidStep: 0,
    bidAmount: 0
  },
  numberOfBusyOperations: 0,
  errorOccurred: false
};
