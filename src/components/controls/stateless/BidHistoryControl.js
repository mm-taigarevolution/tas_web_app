import React from 'react';
import PropTypes from 'prop-types';
import {Table, Row, Col, Badge} from 'reactstrap';

const titleStyle = {
  fontSize: '16px'
};

const BidHistoryControl = ({bids}) => {
  let items = bids;
  let numberOfBids = bids.length;

  return (
    <div>
      <Row>
        <Col className="text-left">
          <p style={titleStyle}>Bid history</p>
        </Col>
        <Col className="text-right">
          <Badge color="info">{numberOfBids}</Badge>
        </Col>
      </Row>
      {numberOfBids > 0 &&
        <Table responsive striped>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Bid time</th>
              <th>User id</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.bidAmount}>
                <td>{item.bidAmount} €</td>
                <td>{item.bidTime}</td>
                <td>{item.userId}</td>
              </tr>)
            )}
          </tbody>
        </Table>
      }
      {numberOfBids == 0 &&
        <div>
          <p>No bids yet</p>
        </div>
      }
    </div>
  );
};

BidHistoryControl.propTypes = {
  bids: PropTypes.array.isRequired,
};

export default BidHistoryControl;
