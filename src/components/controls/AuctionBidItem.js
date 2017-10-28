import React from 'react';
import PropTypes from 'prop-types';
import { Container,
         Row,
         Col,
         Card,
         CardBody,
         CardTitle,
         CardSubtitle,
         CardHeader,
         CardFooter,
         Button,
         InputGroup,
         Input,
         InputGroupAddon } from 'reactstrap';
import TimeRemaining from '../controls/TimeRemaining';

const colStyle = {
  fontSize: '16px',
  width: '50%'
};

const detailStyle = {
  fontSize: '16px'
};

const infoStyle = {
  margin: '5px 0px',
  fontSize: '14px',
  color: 'lightgray'
};

const warningStyle = {
  margin: '5px 0px',
  fontSize: '14px',
  color: 'red'
};

const cardStyle = {
  maxWidth: '100%'
};

const timeRemainingStyle = {
  margin: '10px 0px 10px 0px'
};

const buttonStyle = {
  margin: '0px 10px',
  textAlign: 'right'
};

const AuctionBidItem = ({auctionItem, bidDraft, onBidAmountChanged, onCancelRequired, onBidRequired}) => {
  let numberOfAuctions = auctionItem.bids.length;
  let currentPrice = numberOfAuctions > 0 ? auctionItem.bids[numberOfAuctions-1].bidAmount: auctionItem.startPrice;
  let defaultBidAmount = bidDraft.minimumBidAmount;
  let currentBidAmount = bidDraft.bidAmount;
  let bidStep = bidDraft.bidStep;
  let bidButtonDisabled = currentBidAmount < defaultBidAmount || !auctionItem.active;
  let bidInputDisabled = !auctionItem.active;

  return (
    <Card style={cardStyle}>
     <CardHeader>
       <CardTitle>Auction</CardTitle>
       <CardSubtitle>{auctionItem.title}</CardSubtitle>
     </CardHeader>
      <CardBody>
        <Container>
          <Row>
            <Col style={colStyle}>
              <p>Price now:</p>
            </Col>
            <Col style={colStyle}>
              <p style={detailStyle}>{currentPrice} €</p>
            </Col>
          </Row>
          <Row>
            <Col style={colStyle}>
              <p>Time left:</p>
            </Col>
            <Col>
              <TimeRemaining  style={timeRemainingStyle}
                              days={auctionItem.bid_time_remaining_days}
                              hours={auctionItem.bid_time_remaining_hours}
                              minutes={auctionItem.bid_time_remaining_minutes}
                              seconds={auctionItem.bid_time_remaining_seconds}
                              active={auctionItem.active}/>
            </Col>
          </Row>
          <Row>
            <Col style={colStyle}>
              <p>Delivery:</p>
            </Col>
            <Col style={colStyle}>
              <p style={detailStyle}>{auctionItem.deliveryInfo}</p>
            </Col>
          </Row>
          <Row>
            <Col style={colStyle}>
              <p>Payment:</p>
            </Col>
            <Col style={colStyle}>
              <p style={detailStyle}>{auctionItem.paymentInfo}</p>
            </Col>
          </Row>
          <Row>
            <Col style={colStyle}>
              <p>Your bid:</p>
            </Col>
            <Col style={colStyle}>
              <InputGroup>
                <Input defaultValue={defaultBidAmount}
                       type="number"
                       min={defaultBidAmount}
                       step={bidStep}
                       disabled={bidInputDisabled}
                       onChange={onBidAmountChanged}/>
                <InputGroupAddon>€</InputGroupAddon>
              </InputGroup>
              {currentBidAmount < defaultBidAmount &&
                <p style={warningStyle}>Minimum bid is {defaultBidAmount} €</p>
              }
              {currentBidAmount >= defaultBidAmount &&
                <p style={infoStyle}>Minimum bid step is {bidStep} €</p>
              }
            </Col>
          </Row>
        </Container>
      </CardBody>
      <CardFooter>
        <Button style={buttonStyle}
                color="secondary"
                onClick={onCancelRequired}>Cancel</Button>
        <Button style={buttonStyle}
                color="primary"
                disabled={bidButtonDisabled}
                onClick={onBidRequired}>Bid</Button>
      </CardFooter>
    </Card>
  );
};

AuctionBidItem.propTypes = {
  auctionItem: PropTypes.object.isRequired,
  bidDraft: PropTypes.object.isRequired,
  onBidAmountChanged: PropTypes.func.isRequired,
  onCancelRequired: PropTypes.func.isRequired,
  onBidRequired: PropTypes.func.isRequired
};

export default AuctionBidItem;