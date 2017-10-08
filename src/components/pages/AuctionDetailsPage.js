import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionItemActions from '../../actions/auctionItemActions';
import AuctionItemDetails from '../controls/AuctionItemDetails';

class AuctionDetailsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      auctionItemId: "",
      auctionItem: {},
      isBusy: false,
      errorOccurred: false
    };
  }

  componentDidMount() {
    this.props.auctionItemActions.getAuctionItemById(this.state.auctionItemId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({auctionItemId: nextProps.auctionItemId,
                   auctionItem: nextProps.auctionItem,
                   isBusy: nextProps.isBusy,
                   errorOccurred: nextProps.errorOccurred});
  }

  onNewBidRequired(event) {
    // TODO: add implementation
  }

  render() {
    let isBusy = this.props.isBusy;
    let errorOccurred = this.props.errorOccurred;
    let auctionItem = this.props.auctionItem;

    return (
      <div>
        {isBusy &&
          <p>Loading...</p>
        }
        {!isBusy &&
           <div>
             {errorOccurred == false &&
               <div>
                 <AuctionItemDetails auctionItem={auctionItem}
                                     onNewBidRequired={this.onNewBidRequired}/>
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
  auctionItem: PropTypes.object.isRequired,
  isBusy: PropTypes.bool.isRequired,
  errorOccurred: PropTypes.bool.isRequired,
  auctionItemActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let auctionItemId = ownProps.match.params.id;
  let busy = state.numberOfBusyOperations > 0;
  let errorOccurred = state.errorOccurred;

  return {
    auctionItemId: auctionItemId,
    auctionItem: state.auctionItem,
    isBusy: busy,
    errorOccurred: errorOccurred
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auctionItemActions: bindActionCreators(auctionItemActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetailsPage);
