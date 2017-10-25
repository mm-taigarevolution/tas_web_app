/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuctionsPage from './pages/AuctionsPage';
import AuctionDetailsPage from './pages/AuctionDetailsPage';
import AuthenticationPage from './pages/AuthenticationPage';
import AuctionBidPage from './pages/AuctionBidPage';
import NotFoundPage from './pages/NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={AuctionsPage} />
          <Route exact path="/bid" component={AuctionBidPage} />
          <Route exact path="/authenticate" component={AuthenticationPage} />
          <Route exact path="/:id" component={AuctionDetailsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
