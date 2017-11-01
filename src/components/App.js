/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route } from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import AuctionsPage from './pages/AuctionsPage';
import AuctionDetailsPage from './pages/AuctionDetailsPage';
import AuthenticationPage from './pages/AuthenticationPage';
import AuctionBidPage from './pages/AuctionBidPage';
import NotFoundPage from './pages/NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity
  };
}

// child matches will...
const opacityTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: 0
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: 1
  },
};

class App extends React.Component {
  render() {
    return (
      <AnimatedSwitch atEnter={opacityTransition.atEnter}
                      atLeave={opacityTransition.atLeave}
                      atActive={opacityTransition.atActive}
                      mapStyles={mapStyles}
                      className="route-wrapper">
        <Route exact path="/" component={AuctionsPage} />
        <Route exact path="/bid" component={AuctionBidPage} />
        <Route exact path="/authenticate" component={AuthenticationPage} />
        <Route exact path="/:id" component={AuctionDetailsPage} />
        <Route component={NotFoundPage} />
      </AnimatedSwitch>
    );
  }
}

export default App;
