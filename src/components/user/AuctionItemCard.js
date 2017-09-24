import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardImg, CardBlock, CardTitle, Button } from 'reactstrap';

const AuctionItemsCard = ({auctionItem}) => {
  return (
    <Card>
      <CardImg top width="100%" src={auctionItem.thumbnailUrl} alt="image" />
      <CardBlock>
        <CardTitle>{auctionItem.title}</CardTitle>
        <Button color="primary">Details</Button>
      </CardBlock>
    </Card>
  );
};

AuctionItemsCard.propTypes = {
  auctionItem: PropTypes.object.isRequired
};

export default AuctionItemsCard;
