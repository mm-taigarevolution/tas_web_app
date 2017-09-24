import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionItemActions from '../../actions/auctionItemActions';
import AuctionItemsList from './AuctionItemsList';

class UserHomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const {auctionItems} = this.props;
    debugger;
    return (
      <div>
        <h1>Auction items</h1>
        <AuctionItemsList auctionItems={auctionItems}/>
      </div>
    );
  }
}

UserHomePage.propTypes = {
  auctionItems: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    auctionItems: state.auctionItems
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(auctionItemActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage);
