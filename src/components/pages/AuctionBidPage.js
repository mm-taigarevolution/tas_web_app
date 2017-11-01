import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionActions from '../../actions/auctionActions';
import * as timerActions from '../../actions/timerActions';
import * as bidActions from '../../actions/bidActions';
import BidControl from '../controls/stateless/BidControl';
import {toastr} from 'react-redux-toastr';

class AuctionBidPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bidBusy: false,
      closedToastShown: false
    };
    this.onBidAmountChanged = this.onBidAmountChanged.bind(this);
    this.onCancelRequired = this.onCancelRequired.bind(this);
    this.onBidRequired = this.onBidRequired.bind(this);
  }

  componentDidMount() {
    this.props.timerActions.startTimer();
  }

  componentWillReceiveProps(nextProps) {
    let active = nextProps.auctionItem.active;
    let errorOccurred = nextProps.errorOccurred;
    let isBusy = nextProps.isBusy;

    if(this.state.bidBusy)
    {
      if(!isBusy) {
        if(errorOccurred){
          toastr.error('Bid failed');
        }
        else{
          this.context.router.history.goBack();
          toastr.info('Bid completed', 'Your bid is now the highest one!');
        }

        this.setState({bidBusy: false});
      }
    }
    else if(!active &&
            !this.state.closedToastShown){
      toastr.info('Bid closed');
      this.setState({closedToastShown: true});
    }
  }

  componentWillUnmount() {
    this.props.timerActions.stopTimer();
  }

  onBidAmountChanged(e) {
    e.preventDefault();
    this.props.bidActions.putBidDraftAmount(parseInt(e.target.value));
  }

  onCancelRequired() {
    let route = '/' + this.props.auctionItem.id;
    this.context.router.history.push(route);
  }

  onBidRequired() {
    this.setState({bidBusy: true});
    this.props.bidActions.bidAuctionItem(this.props.bidDraft);
  }

  render() {
    let loggedIn = this.props.user.loggedIn;
    let auctionItem = this.props.auctionItem;
    let bidDraft = this.props.bidDraft;
    let isBusy = this.state.bidBusy;

    return (
      <div>
        {!loggedIn &&
          <p>User must be logged in before making the bid.</p>
        }
        {loggedIn &&
           <BidControl auctionItem={auctionItem}
                       bidDraft={bidDraft}
                       isBusy={isBusy}
                       onBidAmountChanged={this.onBidAmountChanged}
                       onCancelRequired={this.onCancelRequired}
                       onBidRequired={this.onBidRequired}/>
        }
      </div>
    );
  }
}

//
// Context types for the page
//
AuctionBidPage.contextTypes = {
  router: PropTypes.object
};

AuctionBidPage.propTypes = {
  auctionItem: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  bidDraft: PropTypes.object.isRequired,
  isBusy: PropTypes.bool,
  errorOccurred: PropTypes.bool,
  auctionActions: PropTypes.object.isRequired,
  timerActions: PropTypes.object.isRequired,
  bidActions: PropTypes.object.isRequired,
  bidBusy: PropTypes.bool,
  closedToastShown: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    auctionItem: state.auctionItem,
    user: state.user,
    bidDraft: state.bidDraft,
    isBusy: state.busy.isBusy,
    errorOccurred: state.errorOccurred
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auctionActions: bindActionCreators(auctionActions, dispatch),
    timerActions: bindActionCreators(timerActions, dispatch),
    bidActions: bindActionCreators(bidActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionBidPage);
