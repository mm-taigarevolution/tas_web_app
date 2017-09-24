/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route } from 'react-router-dom';
import LandingPage from './common/LandingPage';
import UserHomePage from './user/UserHomePage';
import AuctionItemPage from './user/AuctionItemPage';
import AdminHomePage from './admin/AdminHomePage';
import SuperAdminHomePage from './superadmin/SuperAdminHomePage';
import NotFoundPage from './common/NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/user" component={UserHomePage} />
          <Route exact path="/user/auction/:id" component={AuctionItemPage} />
          <Route exact path="/admin" component={AdminHomePage} />
          <Route exact path="/superadmin" component={SuperAdminHomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
