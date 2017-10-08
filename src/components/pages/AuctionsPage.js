import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionItemActions from '../../actions/auctionItemActions';
import { CardDeck } from 'reactstrap';
import AuctionItemCard from '../controls/AuctionItemCard';
import SearchBar from '../controls/SearchBar';

class AuctionsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filteredAuctionItems: []
    };

    this.onDetailsRequired = this.onDetailsRequired.bind(this);
    this.onKeywordChanged = this.onKeywordChanged.bind(this);
  }

  componentDidMount() {
    this.props.actions.getAuctionItems();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({filteredAuctionItems: nextProps.filteredAuctionItems});
  }

  onDetailsRequired(event) {
    this.context.router.history.push('/'+event.target.value);
  }

  onKeywordChanged(event) {
    this.props.actions.updateKeyword(event.target.value.toLowerCase());
  }

  render() {
    let hasItems = this.props.filteredAuctionItems.length > 0;
    let items = this.props.filteredAuctionItems;
    
    return (
      <div>
        <SearchBar onKeywordChanged={this.onKeywordChanged}/>
        {hasItems == false &&
          <div>
            <p>No results</p>
          </div>
        }
        { hasItems &&
          <CardDeck>
            {items.map(auctionItem =>
              <AuctionItemCard key={auctionItem.id}
                               auctionItem={auctionItem}
                               onDetailsRequired={this.onDetailsRequired}/>)}
          </CardDeck>
        }
      </div>
    );
  }
}

AuctionsPage.propTypes = {
  filteredAuctionItems: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

AuctionsPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let filtered = [];
  if(state.keyword.length > 0) {
    filtered = state.auctionItems.filter(auctionItem => auctionItem.title.toLowerCase().includes(state.keyword));
  }

  else {
    filtered = state.auctionItems;
  }

  return {
    filteredAuctionItems: filtered
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(auctionItemActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionsPage);
