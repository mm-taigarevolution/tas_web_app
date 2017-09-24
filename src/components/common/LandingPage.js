import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>LandingPage</h1>
      <h2>Select your role first:</h2>
      <ol>
        <li><Link to="/user">User</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/superadmin">Superadmin</Link></li>
      </ol>
    </div>
  );
};

export default LandingPage;
