import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardImg, CardBody, CardSubtitle, CardText, Button, Row, Col } from 'reactstrap';

const AuctionListItem = ({auctionItem, onDetailsRequired}) => {
  return (
    <Card className="sm"
          id={auctionItem.id}
          onClick={onDetailsRequired}>
      <CardImg className="card-img-list" src={auctionItem.thumbnailUrl} alt="image" />
      <CardBody>
        <CardSubtitle>{auctionItem.title}</CardSubtitle>
        <CardText>{auctionItem.itemLocation}</CardText>
        <Row>
          <Col sm="6" className="text-left">
            <CardText>{auctionItem.numberOfAuctions} bids</CardText>
            <CardSubtitle className="card-st-list-price">{auctionItem.currentPrice} €</CardSubtitle>
          </Col>
          <Col sm="6" className="text-right">
            <CardText>Ends at</CardText>
            <CardSubtitle className="card-st-list-time-remaining">{auctionItem.auctionEnd}</CardSubtitle>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

AuctionListItem.propTypes = {
  auctionItem: PropTypes.object.isRequired,
  onDetailsRequired: PropTypes.func.isRequired
};

export default AuctionListItem;
