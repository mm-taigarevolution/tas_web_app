import React from 'react';
import PropTypes from 'prop-types';
import { CardDeck } from 'reactstrap';
import AuctionItemCard from './AuctionItemCard';

const AuctionItemsList = ({auctionItems}) => {
  return (
    <CardDeck>
      {auctionItems.map(auctionItem => <AuctionItemCard key={auctionItem.id} auctionItem={auctionItem}/>)}
    </CardDeck>
  );
};

AuctionItemsList.propTypes = {
  auctionItems: PropTypes.array.isRequired
};

export default AuctionItemsList;
