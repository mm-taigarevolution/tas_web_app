import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardImg, CardBody, CardSubtitle, CardText, Row, Col } from 'reactstrap';
import TimeRemainingControl from './TimeRemainingControl';

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

const priceStyle = {
  fontSize: '16px'
};

const AuctionListItemControl = ({auctionItem, onDetailsRequired}) => {
  let numberOfBids = auctionItem.bids.length;
  let currentPrice = auctionItem.currentPrice;
  let auctionItemImg = auctionItem.imageUrls.length > 0 ? auctionItem.imageUrls[0] : null;

  return (
    <Card style={cardStyle}
          id="auctionListItemCard"
          onClick={() => onDetailsRequired(auctionItem)}>
      <CardImg style={imgStyle} src={auctionItemImg} alt="image" />
      <CardBody>
        <CardSubtitle style={subTitleStyle}>{auctionItem.title}</CardSubtitle>
        <CardText>{auctionItem.itemLocation}</CardText>
        <Row>
          <Col sm="6" className="text-left">
            {numberOfBids > 0 &&
              <p>{numberOfBids} bids</p>
            }
            {numberOfBids == 0 &&
              <p>No bids yet</p>
            }
          </Col>
        </Row>
        <Row>
          <Col sm="6" className="text-left">
            <p style={priceStyle}>{currentPrice} €</p>
          </Col>
          <Col sm="6" className="text-right">
            <TimeRemainingControl days={auctionItem.bid_time_remaining_days}
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

AuctionListItemControl.propTypes = {
  auctionItem: PropTypes.object.isRequired,
  onDetailsRequired: PropTypes.func.isRequired
};

export default AuctionListItemControl;
