import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, UncontrolledCarousel } from 'reactstrap';
import TimeRemaining from '../controls/TimeRemaining';
import BidHistory from '../controls/BidHistory';

const chapterStyle = {
  margin: '10px 0px 0px 0px',
  padding: '10px',
  border: '1px dotted lightgray',
  width: '100%'
};

const chapterTitleStyle = {
  margin: '5px 0px 0px 0px',
  width: '100%'
};

const chapterBodyStyle = {
  margin: '10px 0px 0px 0px',
  width: '100%'
};

const priceStyle = {
  margin: '5px 5px 10px 10px',
  fontWeight: 'bold',
  fontSize: '32px',
  color: 'orange'
};

const timeRemainingStyle = {
  margin: '10px 0px 10px 0px'
};

const bidButtonStyle = {
  margin: '0px 0px 10px 0px',
  backgroundColor: 'orange',
  color: 'white'
};

const cardStyle = {
  maxWidth: '100%'
};

const AuctionDetailsItem = ({auctionItem, onNewBidRequired}) => {
  let autoPlay = false;
  let bidButtonDisabled = !auctionItem.active;
  let numberOfAuctions = auctionItem.bids.length;
  let currentPrice = numberOfAuctions > 0 ? auctionItem.bids[numberOfAuctions-1].bid: auctionItem.startPrice;

  let carouselItems = auctionItem.imageUrls.map(imageUrl => {
    return {
      src: imageUrl,
      caption: ''
    };
  });

  return (
    <Card style={cardStyle}>
      <CardBody>
        <Row>
          <Col className="text-left">
            <CardTitle>{auctionItem.title}</CardTitle>
            <CardSubtitle>{auctionItem.itemLocation}</CardSubtitle>
          </Col>
          <Col className="text-right">
            <CardSubtitle style={priceStyle}>{currentPrice} €</CardSubtitle>
            <Button style={bidButtonStyle}
                    disabled={bidButtonDisabled}
                    onClick={onNewBidRequired}
                    value={auctionItem.id}>Make a bid</Button>
            <TimeRemaining  style={timeRemainingStyle}
                            days={auctionItem.bid_time_remaining_days}
                            hours={auctionItem.bid_time_remaining_hours}
                            minutes={auctionItem.bid_time_remaining_minutes}
                            seconds={auctionItem.bid_time_remaining_seconds}
                            active={auctionItem.active}/>
          </Col>
        </Row>
        <Row>
          <UncontrolledCarousel items={carouselItems}
                                ride={autoPlay}/>
          <div style={chapterStyle}>
            <CardSubtitle style={chapterTitleStyle}>Description</CardSubtitle>
            <CardText style={chapterBodyStyle}>{auctionItem.description}</CardText>
          </div>
          <div style={chapterStyle}>
            <CardSubtitle style={chapterTitleStyle}>Delivery info</CardSubtitle>
            <CardText style={chapterBodyStyle}>{auctionItem.deliveryInfo}</CardText>
          </div>
          <div style={chapterStyle}>
            <CardSubtitle style={chapterTitleStyle}>Payment info</CardSubtitle>
            <CardText style={chapterBodyStyle}>{auctionItem.paymentInfo}</CardText>
          </div>
          <div style={chapterStyle}>
            <CardSubtitle style={chapterTitleStyle}>Contact info</CardSubtitle>
            <CardText style={chapterBodyStyle}>{auctionItem.contactInfo}</CardText>
          </div>
          <div style={chapterStyle}>
            <BidHistory bids={auctionItem.bids}/>
          </div>
        </Row>
      </CardBody>
    </Card>
  );
};

AuctionDetailsItem.propTypes = {
  auctionItem: PropTypes.object.isRequired,
  onNewBidRequired: PropTypes.func.isRequired
};

export default AuctionDetailsItem;
