import React from 'react';
import {Jumbotron} from 'reactstrap';

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
