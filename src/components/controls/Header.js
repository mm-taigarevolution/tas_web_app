import React from 'react';
import PropTypes from 'prop-types';
import {Jumbotron, Container} from 'reactstrap';

const Header = () => {
  return (
    <div>
      <Jumbotron>
        <h3>Taiga Auction System</h3>
        <p className="lead">Welcome to TAS.</p>
      </Jumbotron>
    </div>
  );
};

export default Header;
