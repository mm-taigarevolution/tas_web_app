import React from 'react';
import PropTypes from 'prop-types';
import {Table, Row, Col, Badge} from 'reactstrap';

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
              <tr>
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
