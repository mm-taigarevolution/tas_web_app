import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col} from 'reactstrap';

const rowStyle = {
  margin: 'inherit',
  padding: '5px 0px 5px 0px',
  borderBottomStyle: 'inset'
};

const titleStyle = {
  fontSize: '16px'
};

const containerStyle = {
  padding: '0px',
  margin: '0px'
};

const BidHistoryControl = ({bids}) => {
  let items = bids;
  let numberOfBids = bids.length;

  return (
    <Container style={containerStyle}>
      <Row>
        <Col className="text-left"><p style={titleStyle}>Bid history</p></Col>
        <Col className="text-right"><p style={titleStyle}>{numberOfBids} bids</p></Col>
      </Row>
      {numberOfBids > 0 &&
        <div>
          {items.map(item => (
            <Row style={rowStyle} key={item.bidTime}>
              <Col className="text-left">{item.bidAmount} €</Col>
              <Col className="text-center">{item.bidTime}</Col>
              <Col className="text-right">{item.userId}</Col>
            </Row>)
          )}
        </div>
      }
      {numberOfBids == 0 &&
        <div>
          <p>No bids yet</p>
        </div>
      }
    </Container>
  );
};

BidHistoryControl.propTypes = {
  bids: PropTypes.array.isRequired,
};

export default BidHistoryControl;
