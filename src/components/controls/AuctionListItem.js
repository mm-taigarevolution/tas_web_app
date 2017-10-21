import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardImg, CardBody, CardSubtitle, CardText, Button, Row, Col } from 'reactstrap';
import TimeRemaining from '../controls/TimeRemaining';

const AuctionListItem = ({auctionItem, onDetailsRequired}) => {
  let useListStyle = true;
  let numberOfAuctions = auctionItem.bids.length;
  let currentPrice = auctionItem.bids.length > 0 ? auctionItem.bids[auctionItem.bids.length-1].bid: auctionItem.startPrice;

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
            <CardText>
              {numberOfAuctions} bids
              <p className="p-list-price">{currentPrice} €</p>
            </CardText>
          </Col>
          <Col sm="6" className="text-right">
            <CardText>
              <TimeRemaining  days={auctionItem.bid_time_remaining_days}
                              hours={auctionItem.bid_time_remaining_hours}
                              minutes={auctionItem.bid_time_remaining_minutes}
                              seconds={auctionItem.bid_time_remaining_seconds}
                              active={auctionItem.active}
                              useListStyle={useListStyle}/>
            </CardText>
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
