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

const BidHistory = ({bids}) => {
  let items = bids;
  let count = bids.length;

  return (
    <Container style={containerStyle}>
      <Row>
        <Col className="text-left"><p style={titleStyle}>Bid history</p></Col>
        <Col className="text-right"><p style={titleStyle}>{count} bids</p></Col>
      </Row>
      {count > 0 &&
        <div>
          {items.map(item => (
            <Row style={rowStyle} key={item.uid}>
              <Col className="text-left">{item.bid} €</Col>
              <Col className="text-center">{item.bidTime}</Col>
              <Col className="text-right">{item.uid}</Col>
            </Row>)
          )}
        </div>
      }
      {count == 0 &&
        <div>
          <p>No bids at the moment</p>
        </div>
      }
    </Container>
  );
};

BidHistory.propTypes = {
  bids: PropTypes.array.isRequired,
};

export default BidHistory;
