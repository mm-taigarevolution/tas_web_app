import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionItemActions from '../../actions/auctionItemActions';
import * as timerActions from '../../actions/timerActions';
import AuctionDetailsItem from '../controls/AuctionDetailsItem';

class AuctionDetailsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onNewBidRequired = this.onNewBidRequired.bind(this);
  }

  componentDidMount() {
    this.props.timerActions.startTimer();
    this.props.auctionItemActions.getAuctionItemById(this.props.auctionItemId);
  }

  componentWillUnmount() {
    this.props.timerActions.stopTimer();
  }

  onNewBidRequired() {
    if(this.props.user.uid.length == 0) {
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
    let isBusy = this.props.isBusy;
    let errorOccurred = this.props.errorOccurred;

    return (
      <div>
        {isBusy &&
          <p>Loading...</p>
        }
        {!isBusy &&
           <div>
             {errorOccurred == false &&
               <div>
                 {auctionItem.id.length > 0 &&
                   <div>
                     <AuctionDetailsItem auctionItem={auctionItem}
                                         onNewBidRequired={this.onNewBidRequired}/>
                   </div>
                 }
               </div>
             }
             {errorOccurred == true &&
               <div>
                 <p>Service is unavailable at the moment. Please try again later.</p>
               </div>
             }
           </div>
        }
      </div>
    );
  }
}

AuctionDetailsPage.propTypes = {
  auctionItemId: PropTypes.string.isRequired,
  auctionItem: PropTypes.object,
  user: PropTypes.object,
  isBusy: PropTypes.bool,
  errorOccurred: PropTypes.bool,
  auctionItemActions: PropTypes.object.isRequired,
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
    isBusy: state.numberOfBusyOperations > 0,
    errorOccurred: state.errorOccurred
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auctionItemActions: bindActionCreators(auctionItemActions, dispatch),
    timerActions: bindActionCreators(timerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetailsPage);
