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
import TimeRemainingControl from '../stateless/TimeRemainingControl';
import {ThreeBounce} from 'better-react-spinkit';

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

const buttonStyle = {
  margin: '0px 10px',
  textAlign: 'right'
};

const timeRemainingStyle = {
  fontSize: '16px',
  fontWeight: 'normal',
  margin: '0px',
  padding: '0px'
};

const timeRemainingEndingStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'red',
  margin: '0px',
  padding: '0px'
};

const buttonRowStyle = {
  margin: '20px 0px 0px 0px',
  display: 'flex',
  justifyContent: 'center'
};

const spinnerStyle = {
 display: 'flex',
 justifyContent: 'center'
};

const BidControl = ({auctionItem, bidDraft, isBusy, onBidAmountChanged, onCancelRequired, onBidRequired}) => {
  let currentPrice = auctionItem.currentPrice;
  let defaultBidAmount = bidDraft.minimumBidAmount;
  let currentBidAmount = bidDraft.bidAmount;
  let bidStep = bidDraft.bidStep;
  let bidButtonDisabled = currentBidAmount < defaultBidAmount || !auctionItem.active || isBusy;
  let bidInputDisabled = !auctionItem.active || isBusy;

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
              <TimeRemainingControl days={auctionItem.bid_time_remaining_days}
                                    hours={auctionItem.bid_time_remaining_hours}
                                    minutes={auctionItem.bid_time_remaining_minutes}
                                    seconds={auctionItem.bid_time_remaining_seconds}
                                    active={auctionItem.active}
                                    activeStyle={timeRemainingStyle}
                                    endingStyle={timeRemainingEndingStyle}/>
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
                <Input id="bidAmountInput"
                       defaultValue={defaultBidAmount}
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
          <Row style={buttonRowStyle}>
            <Button id="cancelBidButton"
                    style={buttonStyle}
                    color="secondary"
                    onClick={onCancelRequired}>Cancel</Button>
            <Button id="doBidButton"
                    style={buttonStyle}
                    color="primary"
                    disabled={bidButtonDisabled}
                    onClick={onBidRequired}>Bid</Button>
          </Row>
        </Container>
      </CardBody>
      <CardFooter>
        {isBusy &&
          <ThreeBounce color="gray"
                       style={spinnerStyle}/>
        }
      </CardFooter>
    </Card>
  );
};

BidControl.propTypes = {
  auctionItem: PropTypes.object.isRequired,
  bidDraft: PropTypes.object.isRequired,
  isBusy: PropTypes.object.isRequired,
  onBidAmountChanged: PropTypes.func.isRequired,
  onCancelRequired: PropTypes.func.isRequired,
  onBidRequired: PropTypes.func.isRequired
};

export default BidControl;
