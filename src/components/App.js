/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route } from 'react-router-dom';
import UserHome from './user/UserHomePage';
import AdminHome from './admin/AdminHomePage';
import SuperAdminHome from './superadmin/SuperAdminHomePage';
import NotFoundPage from './common/NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <div>
          <NavLink exact to="/" activeStyle={activeStyle}>User's home</NavLink>
          {' | '}
          <NavLink exact to="/admin" activeStyle={activeStyle}>Admin's home</NavLink>
          {' | '}
          <NavLink exact to="/superadmin" activeStyle={activeStyle}>Super admin's home</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={UserHome} />
          <Route exact path="/admin" component={AdminHome} />
          <Route exact path="/superadmin" component={SuperAdminHome} />
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
