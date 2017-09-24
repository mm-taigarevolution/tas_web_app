import React from 'react';
import PropTypes from 'prop-types';

const AuctionItemsRow = ({auctionItem}) => {
  return (
    <tr>
      <td>{auctionItem.title}</td>
      <td>{auctionItem.description}</td>
    </tr>
  );
};

AuctionItemsRow.propTypes = {
  auctionItem: PropTypes.object.isRequired
};

export default AuctionItemsRow;
