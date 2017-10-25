import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as timerActions from '../../actions/timerActions';
import { Container,
         Row,
         Col,
         Card,
         CardBody,
         CardTitle,
         CardSubtitle,
         CardText,
         CardHeader,
         CardFooter,
         Button,
         InputGroup,
         Input,
         InputGroupAddon } from 'reactstrap';
import TimeRemaining from '../controls/TimeRemaining';

 const titleStyle = {
   fontSize: '20px',
   fontWeight: 'bold',
   width: '100%'
 };

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

class AuctionBidPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bid: 0,
      bidDisabled: false
    };

    this.onBidAmountChanged = this.onBidAmountChanged.bind(this);
    this.onCancelClicked = this.onCancelClicked.bind(this);
    this.onBidClicked = this.onBidClicked.bind(this);
  }

  componentDidMount() {
    this.props.timerActions.startTimer();
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() {
    this.props.timerActions.stopTimer();
  }

  onBidAmountChanged(event) {
    let auctionItem = this.props.auctionItem;
    let numberOfAuctions = auctionItem.bids.length;
    let currentPrice = numberOfAuctions > 0 ? auctionItem.bids[numberOfAuctions-1].bid: auctionItem.startPrice;
    let bidStep = auctionItem.minimumBidStep;
    let defaultBid = currentPrice + bidStep;
    let disabled = event.target.value < defaultBid ? true : false;

    this.setState({bid: event.target.value, bidDisabled: disabled});
  }

  onCancelClicked() {
    // TODO: go back
  }

  onBidClicked(event) {
    // TODO: add implementation
  }

  render() {
    let auctionItem = this.props.auctionItem;
    let numberOfAuctions = auctionItem.bids.length;
    let currentPrice = numberOfAuctions > 0 ? auctionItem.bids[numberOfAuctions-1].bid: auctionItem.startPrice;
    let bidStep = auctionItem.minimumBidStep;
    let defaultBid = currentPrice + bidStep;
    let bidDisabled = this.state.bidDisabled || !auctionItem.active;
    let isBusy = this.props.isBusy;
    let errorOccurred = this.props.errorOccurred;
    let authenticated = this.props.user.uid.length > 0;
    let inputDisabled = !auctionItem.active;

    return (
      <div>
        {!authenticated &&
          <p>User must be authenticated before making the bid.</p>
        }
        {authenticated &&
          <div>
            {isBusy &&
              <p>Loading...</p>
            }
            {!isBusy &&
               <div>
                 {errorOccurred == false &&
                   <div>
                     {auctionItem.id.length > 0 &&
                       <div>
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
                                     <Input defaultValue={defaultBid}
                                            type="number"
                                            min={defaultBid}
                                            step={bidStep}
                                            disabled={inputDisabled}
                                            onChange={this.onBidAmountChanged}/>
                                     <InputGroupAddon>€</InputGroupAddon>
                                   </InputGroup>
                                   {bidDisabled &&
                                     <p style={warningStyle}>Minimum bid is {defaultBid} €</p>
                                   }
                                   {!bidDisabled &&
                                     <p style={infoStyle}>Minimum bid step is {bidStep} €</p>
                                   }
                                 </Col>
                               </Row>
                             </Container>
                           </CardBody>
                           <CardFooter>
                             <Button style={buttonStyle}
                                     color="secondary"
                                     onClick={this.onCancelClicked}>Cancel</Button>
                             <Button style={buttonStyle}
                                     color="primary"
                                     disabled={bidDisabled}
                                     onClick={this.onBidClicked}>Bid</Button>
                           </CardFooter>
                         </Card>
                       </div>
                     }
                   </div>
                 }
                 {errorOccurred == true &&
                   <div>
                     <p>Service is unavailable at the moment. Please try again later.</p>
                   </div>
                 }
               </div>
            }
          </div>
        }
      </div>
    );
  }
}

AuctionBidPage.propTypes = {
  auctionItem: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  bid: PropTypes.number,
  bidDisabled: PropTypes.bool,
  isBusy: PropTypes.bool,
  errorOccurred: PropTypes.bool,
  timerActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auctionItem: state.auctionItem,
    user: state.user,
    isBusy: state.numberOfBusyOperations > 0,
    errorOccurred: state.errorOccurred
  };
}

function mapDispatchToProps(dispatch) {
  return {
    timerActions: bindActionCreators(timerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionBidPage);
