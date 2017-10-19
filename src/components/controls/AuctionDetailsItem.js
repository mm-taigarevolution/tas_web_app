import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, UncontrolledCarousel, CarouselItem } from 'reactstrap';
import TimeRemainingCtrl from '../controls/TimeRemainingCtrl';

const AuctionDetailsItem = ({auctionItem, onNewBidRequired}) => {
  let autoPlay = false;
  let carouselItems = [];

  if(auctionItem.imageUrls != undefined)
  {
    carouselItems = auctionItem.imageUrls.map(imageUrl => {
      return {
        src: imageUrl
      };
    });
  }

  return (
    <Card className="lg">
      <CardBody>
        <Row>
          <Col className="text-leftt">
            <CardTitle>{auctionItem.title}</CardTitle>
            <CardSubtitle>{auctionItem.itemLocation}</CardSubtitle>
          </Col>
          <Col className="text-right">
            <CardSubtitle className="card-st-details-price">{auctionItem.currentPrice} €</CardSubtitle>
            <Button color="warning"
                    onClick={onNewBidRequired}
                    value={auctionItem.id}>Make a bid</Button>
            <CardText className="card-st-details-time-remaining">Time remaining</CardText>
            <TimeRemainingCtrl auctionItem={auctionItem}></TimeRemainingCtrl>
          </Col>
        </Row>
      </CardBody>
      <CardBody>
        <UncontrolledCarousel items={carouselItems}
                              autoPlay={autoPlay}/>
      </CardBody>
      <CardBody>
        <CardText>{auctionItem.description}</CardText>
        <CardText>{auctionItem.contactInfo}</CardText>
        <CardText>{auctionItem.deliveryInfo}</CardText>
        <CardText>{auctionItem.paymentInfo}</CardText>
      </CardBody>
    </Card>
  );
};

AuctionDetailsItem.propTypes = {
  auctionItem: PropTypes.object.isRequired,
  onNewBidRequired: PropTypes.func.isRequired
};

export default AuctionDetailsItem;
