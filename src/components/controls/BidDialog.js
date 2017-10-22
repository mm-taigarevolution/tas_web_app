import React from 'react';
import PropTypes from 'prop-types';
import { Container,
         Row,
         Col,
         Button,
         Modal,
         ModalHeader,
         ModalBody,
         ModalFooter,
         InputGroup,
         Input,
         InputGroupAddon } from 'reactstrap';

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

class BidDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      auctionItem: { id: '', bids:[] },
      onBidCancelled: null,
      onBidMade: null,
      minimumBid: 0,
      bid: 0,
      bidDisabled: false
    };

    this.onBidAmountChanged = this.onBidAmountChanged.bind(this);
    this.onCancelClicked = this.onCancelClicked.bind(this);
    this.onBidClicked = this.onBidClicked.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let newAuctionItem = nextProps.auctionItem;
    let currentPrice = newAuctionItem.bids.length > 0 ? newAuctionItem.bids[newAuctionItem.bids.length-1].bid: newAuctionItem.startPrice;
    let minimumBid = currentPrice + newAuctionItem.minimumBidStep;

    this.setState({isOpen: nextProps.isOpen,
                   auctionItem: Object.assign({}, newAuctionItem),
                   onBidCancelled: nextProps.onBidCancelled,
                   onBidMade: nextProps.onBidMade,
                   minimumBid: minimumBid,
                   bid: minimumBid
                 });
  }

  onBidAmountChanged(event) {
    let disabled = event.target.value < this.state.minimumBid ? true : false;
    this.setState({bid: event.target.value, bidDisabled: disabled});
  }

  onCancelClicked(event) {
    this.props.onBidCancelled();
  }

  onBidClicked(event) {
    this.props.onBidMade(event);
  }

  render() {
    let auctionItem = this.state.auctionItem;
    let numberOfAuctions = auctionItem.bids.length;
    let currentPrice = auctionItem.bids.length > 0 ? auctionItem.bids[auctionItem.bids.length-1].bid: auctionItem.startPrice;
    let minimumBid = this.state.minimumBid;
    let bidStep = auctionItem.minimumBidStep;
    let bid = this.state.bid;
    let bidDisabled = this.state.bidDisabled;

    return (
      <div>
        <Modal isOpen={this.state.isOpen} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}>
          <ModalHeader toggle={this.onCancelClicked}>Auction</ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <p style={titleStyle}>{auctionItem.title}</p>
              </Row>
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
                    <Input defaultValue={bid}
                           type="number"
                           min={minimumBid}
                           step={bidStep}
                           onChange={this.onBidAmountChanged}/>
                    <InputGroupAddon>€</InputGroupAddon>
                  </InputGroup>
                  {bidDisabled &&
                    <p style={warningStyle}>Minimum bid is {minimumBid} €</p>
                  }
                  {!bidDisabled &&
                    <p style={infoStyle}>Minimum bid step is {bidStep} €</p>
                  }
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.onCancelClicked}>Cancel</Button>
            <Button color="primary"
                    disabled={bidDisabled}
                    onClick={this.onBidClicked}>Bid</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

BidDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  auctionItem: PropTypes.object.isRequired,
  onBidCancelled: PropTypes.func.isRequired,
  onBidMade: PropTypes.func.isRequired,
  currentBidProspect: PropTypes.number,
  bidDisabled: PropTypes.bool
};

export default BidDialog;
