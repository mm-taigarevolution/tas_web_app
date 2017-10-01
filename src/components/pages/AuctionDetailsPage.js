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
      auctionItemId: props.auctionItemId,
      auctionItem: Object.assign({}, props.auctionItem)
    };
  }

  componentDidMount() {
    this.props.actions.getAuctionItemById(this.state.auctionItemId);
  }

  onNewBidRequired(event) {
    // TODO: add implementation
  }

  render() {
    const {auctionItem} = this.props;
    return (
      <div>
        <AuctionItemDetails auctionItem={auctionItem}
                            onNewBidRequired={this.onNewBidRequired}/>
      </div>
    );
  }
}

AuctionDetailsPage.propTypes = {
  auctionItemId: PropTypes.string.isRequired,
  auctionItem: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    auctionItem: Object.assign({}, state.auctionItem),
    auctionItemId: ownProps.match.params.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(auctionItemActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetailsPage);
