import delay from '../common/delay';

class BidApi {
  static bidAuctionItem(bidDraft) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let bid = { userId: bidDraft.userId,
                    bidAmount: bidDraft.bidAmount,
                    bidTime: new Date().toString()
                  };
        let bidContainer = { itemId: bidDraft.itemId,
                             bid: bid
                           };
        resolve(bidContainer);
      }, delay.mockApiTimeout);
    });
  }
}

export default BidApi;
