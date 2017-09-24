import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionItemActions from '../../actions/auctionItemActions';

class AuctionItemsDetails extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const {auctionItem} = this.props;
    debugger;
    return (
      <div>
        <h1>Auction item details</h1>
      </div>
    );
  }
}

AuctionItemsDetails.propTypes = {
  auctionItem: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    auctionItem: state.auctionItem
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(auctionItemActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionItemsDetails);
