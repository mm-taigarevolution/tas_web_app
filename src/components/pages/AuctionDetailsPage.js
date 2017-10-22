import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionItemActions from '../../actions/auctionItemActions';
import * as timerActions from '../../actions/timerActions';
import AuctionDetailsItem from '../controls/AuctionDetailsItem';
import BidDialog from '../controls/BidDialog';

class AuctionDetailsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showBidDialog: false
    };

    this.onNewBidRequired = this.onNewBidRequired.bind(this);
    this.onBidCancelled = this.onBidCancelled.bind(this);
    this.onBidMade = this.onBidMade.bind(this);
  }

  componentDidMount() {
    this.props.timerActions.startTimer();
    this.props.auctionItemActions.getAuctionItemById(this.props.auctionItemId);
  }

  componentWillUnmount() {
    this.props.timerActions.stopTimer();
  }

  onNewBidRequired(event) {
    this.setState({showBidDialog: true});
  }

  onBidCancelled(event) {
    this.setState({showBidDialog: false});
  }

  onBidMade(event) {
    this.setState({showBidDialog: false});
  }

  render() {
    let auctionItem = this.props.auctionItem;
    let isBusy = this.props.isBusy;
    let errorOccurred = this.props.errorOccurred;
    let showBidDialog = this.state.showBidDialog;

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
                     <BidDialog isOpen={showBidDialog}
                                auctionItem={auctionItem}
                                onBidCancelled={this.onBidCancelled}
                                onBidMade={this.onBidMade}/>
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
  isBusy: PropTypes.bool,
  errorOccurred: PropTypes.bool,
  auctionItemActions: PropTypes.object.isRequired,
  timerActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let auctionItemId = ownProps.match.params.id;
  let busy = state.numberOfBusyOperations > 0;
  let errorOccurred = state.errorOccurred;
  let auctionItem = state.auctionItem;

  return {
    auctionItemId: auctionItemId,
    auctionItem: auctionItem,
    isBusy: busy,
    errorOccurred: errorOccurred
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auctionItemActions: bindActionCreators(auctionItemActions, dispatch),
    timerActions: bindActionCreators(timerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetailsPage);
