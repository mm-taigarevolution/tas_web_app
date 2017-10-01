import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

const AuctionItemDetails = ({auctionItem, onNewBidRequired}) => {
  return (
    <Card>
      <CardBlock>
        <CardTitle>{auctionItem.title}</CardTitle>
        <CardSubtitle>{auctionItem.itemLocation}</CardSubtitle>
      </CardBlock>
      <CardBlock>
        <CardImg top width="100%" src={auctionItem.thumbnailUrl} alt="image" />
      </CardBlock>
      <CardBlock>
        <CardText>{auctionItem.description}</CardText>
        <CardText>{auctionItem.contactInfo}</CardText>
        <CardText>{auctionItem.deliveryInfo}</CardText>
        <CardText>{auctionItem.paymentInfo}</CardText>
        <Button color="warning"
                onClick={onNewBidRequired}
                value={auctionItem.id}>Make a bid</Button>
      </CardBlock>
    </Card>
  );
};

AuctionItemDetails.propTypes = {
  auctionItem: PropTypes.object.isRequired,
  onNewBidRequired: PropTypes.func.isRequired
};

export default AuctionItemDetails;
