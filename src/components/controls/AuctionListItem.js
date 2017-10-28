import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardImg, CardBody, CardSubtitle, CardText, Row, Col } from 'reactstrap';
import TimeRemaining from '../controls/TimeRemaining';

const cardStyle = {
  maxWidth: '260px'
};

const imgStyle = {
  width: '258px',
  height: '258px'
};

const subTitleStyle = {
  fontWeight: 'bold',
  color: 'gray'
};

const AuctionListItem = ({auctionItem, onDetailsRequired}) => {
  let numberOfAuctions = auctionItem.bids.length;
  let currentPrice = numberOfAuctions > 0 ? auctionItem.bids[numberOfAuctions-1].bidAmount: auctionItem.startPrice;
  let auctionItemImg = auctionItem.imageUrls.length > 0 ? auctionItem.imageUrls[0] : null;

  return (
    <Card style={cardStyle}
          id={auctionItem.id}
          onClick={onDetailsRequired}>
      <CardImg style={imgStyle} src={auctionItemImg} alt="image" />
      <CardBody>
        <CardSubtitle style={subTitleStyle}>{auctionItem.title}</CardSubtitle>
        <CardText>{auctionItem.itemLocation}</CardText>
        <Row>
          <Col sm="6" className="text-left">
            <CardText>{numberOfAuctions} bids</CardText>
          </Col>
        </Row>
        <Row>
          <Col sm="6" className="text-left">
            <CardText>{currentPrice} €</CardText>
          </Col>
          <Col sm="6" className="text-right">
            <TimeRemaining  days={auctionItem.bid_time_remaining_days}
                            hours={auctionItem.bid_time_remaining_hours}
                            minutes={auctionItem.bid_time_remaining_minutes}
                            seconds={auctionItem.bid_time_remaining_seconds}
                            active={auctionItem.active}/>
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
