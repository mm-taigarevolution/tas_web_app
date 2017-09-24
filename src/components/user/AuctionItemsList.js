import React from 'react';
import PropTypes from 'prop-types';
import AuctionItemRow from './AuctionItemRow';

const AuctionItemsList = ({auctionItems}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsb;</th>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
      {auctionItems.map(auctionItem => <AuctionItemRow key={auctionItem.id} auctionItem={auctionItem}/>)}
      </tbody>
    </table>
  );
};

AuctionItemsList.propTypes = {
  auctionItems: PropTypes.array.isRequired
};

export default AuctionItemsList;
