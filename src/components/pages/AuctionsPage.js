import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionItemActions from '../../actions/auctionItemActions';
import { CardDeck } from 'reactstrap';
import AuctionItemCard from '../controls/AuctionItemCard';

class AuctionsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      auctionItems: Object.assign([], props.auctionItems)
    };

    this.onDetailsRequired = this.onDetailsRequired.bind(this);
  }

  onDetailsRequired(event) {
    this.context.router.history.push('/'+event.target.value);
  }

  componentDidMount() {
    this.props.actions.getAuctionItems();
  }

  render() {
    const {auctionItems} = this.props;
    return (
      <CardDeck>
        {auctionItems.map(auctionItem =>
          <AuctionItemCard key={auctionItem.id}
                           auctionItem={auctionItem}
                           onDetailsRequired={this.onDetailsRequired}/>)}
      </CardDeck>
    );
  }
}

AuctionsPage.propTypes = {
  auctionItems: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

AuctionsPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    auctionItems: Object.assign([], state.auctionItems)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(auctionItemActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionsPage);
