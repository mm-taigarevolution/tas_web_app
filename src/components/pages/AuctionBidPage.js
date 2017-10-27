import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionItemActions from '../../actions/auctionItemActions';
import * as timerActions from '../../actions/timerActions';
import * as bidActions from '../../actions/bidActions';
import AuctionBidItem from '../controls/AuctionBidItem';
import {toastr} from 'react-redux-toastr';

class AuctionBidPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      bidBusy: false
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
          toastr.info('Bid completed', 'Your bid is now the highest one!');
          let route = '/' + nextProps.auctionItem.id;
          this.context.router.history.push(route);
        }

        this.setState({bidBusy: false});
      }
    }

    else if(!active){
      toastr.info('Bid closed');
    }
  }
  componentWillUnmount() {
    this.props.timerActions.stopTimer();
  }

  onBidAmountChanged(e) {
    e.preventDefault();
    this.props.bidActions.putBidAmount(e.target.value);
  }

  onCancelRequired() {
    let route = '/' + this.props.auctionItem.id;
    this.context.router.history.push(route);
  }

  onBidRequired() {
    this.setState({bidBusy: true});
    this.props.auctionItemActions.bidAuctionItem( this.props.bid.itemId,
                                                  this.props.user.uid,
                                                  this.props.bid.bidAmount);
  }

  render() {
    let authenticated = this.props.user.authenticated;
    let auctionItem = this.props.auctionItem;
    let bid = this.props.bid;

    return (
      <div>
        {!authenticated &&
          <p>User must be authenticated before making the bid.</p>
        }
        {authenticated &&
           <AuctionBidItem auctionItem={auctionItem}
                           bid={bid}
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
  bid: PropTypes.object.isRequired,
  isBusy: PropTypes.bool,
  errorOccurred: PropTypes.bool,
  auctionItemActions: PropTypes.object.isRequired,
  timerActions: PropTypes.object.isRequired,
  bidBusy: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    auctionItem: state.auctionItem,
    bid: state.bid,
    user: state.user,
    isBusy: state.numberOfBusyOperations > 0,
    errorOccurred: state.errorOccurred
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auctionItemActions: bindActionCreators(auctionItemActions, dispatch),
    timerActions: bindActionCreators(timerActions, dispatch),
    bidActions: bindActionCreators(bidActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionBidPage);
