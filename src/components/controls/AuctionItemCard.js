import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardImg, CardBlock, CardTitle, Button } from 'reactstrap';

const AuctionItemCard = ({auctionItem, onDetailsRequired}) => {
  return (
    <Card>
      <CardImg top width="100%" src={auctionItem.thumbnailUrl} alt="image" />
      <CardBlock>
        <CardTitle>{auctionItem.title}</CardTitle>
        <Button color="primary"
                onClick={onDetailsRequired}
                value={auctionItem.id}>
                Details
        </Button>
      </CardBlock>
    </Card>
  );
};

AuctionItemCard.propTypes = {
  auctionItem: PropTypes.object.isRequired,
  onDetailsRequired: PropTypes.func.isRequired
};

export default AuctionItemCard;
