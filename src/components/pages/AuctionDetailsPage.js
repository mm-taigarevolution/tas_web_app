import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionActions from '../../actions/auctionActions';
import * as timerActions from '../../actions/timerActions';
import AuctionDetailsControl from '../controls/stateless/AuctionDetailsControl';
import TitleBarControl from '../controls/stateful/TitleBarControl';
import {ThreeBounce} from 'better-react-spinkit';

const spinnerStyle = {
 display: 'flex',
 justifyContent: 'center'
};

class AuctionDetailsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onNewBidRequired = this.onNewBidRequired.bind(this);
  }

  componentDidMount() {
    if(this.props.auctionItem.id.length == 0) {
      this.props.auctionActions.getAuctionItemById(this.props.auctionItemId);
    }
    this.props.timerActions.startTimer();
  }

  componentWillUnmount() {
    this.props.timerActions.stopTimer();
  }

  onNewBidRequired(e) {
    e.preventDefault();
    if(!this.props.user.loggedIn) {
      let route = '/authenticate?forwardTo=/bid';
      this.context.router.history.push(route);
    }
    else {
      let route = '/bid';
      this.context.router.history.push(route);
    }
  }

  render() {
    let auctionItem = this.props.auctionItem;
    let auctionItemValid = auctionItem.id.length > 0;
    let isBusy = this.props.isBusy;
    let errorOccurred = this.props.errorOccurred;

    return (
      <div>
        <TitleBarControl/>
        {isBusy && !auctionItemValid &&
          <ThreeBounce color="gray"
                       style={spinnerStyle}/>
        }
        {errorOccurred == true &&
          <div>
            <p>Service is unavailable at the moment. Please try again later.</p>
          </div>
        }
        {errorOccurred == false &&
         !isBusy &&
           <AuctionDetailsControl auctionItem={auctionItem}
                                  onNewBidRequired={this.onNewBidRequired}/>
        }
      </div>
    );
  }
}

AuctionDetailsPage.propTypes = {
  auctionItemId: PropTypes.string.isRequired,
  auctionItem: PropTypes.object.isRequired,
  user: PropTypes.object,
  isBusy: PropTypes.bool,
  errorOccurred: PropTypes.bool,
  auctionActions: PropTypes.object.isRequired,
  timerActions: PropTypes.object.isRequired
};

//
// Context types for the page
//
AuctionDetailsPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    auctionItemId: ownProps.match.params.id,
    auctionItem: state.auctionItem,
    user: state.user,
    isBusy: state.busy.isBusy,
    errorOccurred: state.errorOccurred
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auctionActions: bindActionCreators(auctionActions, dispatch),
    timerActions: bindActionCreators(timerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetailsPage);
