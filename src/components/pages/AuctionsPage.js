import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionItemActions from '../../actions/auctionItemActions';
import * as keywordActions from '../../actions/keywordActions';
import { CardDeck } from 'reactstrap';
import AuctionListItem from '../controls/AuctionListItem';
import SearchBar from '../controls/SearchBar';
import Header from '../controls/Header';

class AuctionsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filteredAuctionItems: [],
      keyword: "",
      isBusy: false,
      errorOccurred: false
    };

    this.onDetailsRequired = this.onDetailsRequired.bind(this);
    this.onKeywordChanged = this.onKeywordChanged.bind(this);
    this.onSearchButtonClicked = this.onSearchButtonClicked.bind(this);
  }

  //
  // Lifecycle methods
  //
  componentDidMount() {
    this.props.auctionItemActions.getAuctionItems();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({filteredAuctionItems: nextProps.filteredAuctionItems,
                   isBusy: nextProps.isBusy,
                   errorOccurred: nextProps.errorOccurred});
  }

  //
  // Event handlers from stateless components
  //
  onDetailsRequired(event) {
    debugger;
    this.context.router.history.push('/'+event.target.parentElement.id);
  }

  onKeywordChanged(event) {
    this.setState({keyword: event.target.value.toLowerCase()});

    if(event.target.value.length == 0) {
      this.props.keywordActions.updateKeyword(this.state.keyword);
    }
  }

  onSearchButtonClicked(event) {
    this.props.keywordActions.updateKeyword(this.state.keyword);
  }
  //
  // Rendering
  //
  render() {
    let isBusy = this.props.isBusy;
    let errorOccurred = this.props.errorOccurred;
    let hasItems = this.props.filteredAuctionItems.length > 0;
    let items = this.props.filteredAuctionItems;

    return (
      <div>
        <Header/>
        <SearchBar onKeywordChanged={this.onKeywordChanged}
                   onSearchButtonClicked={this.onSearchButtonClicked}/>
        {isBusy &&
          <p>Loading...</p>
        }
        {!isBusy &&
          <div>
            {errorOccurred == false &&
              <div>
                {hasItems == false &&
                  <div>
                    <p>No results</p>
                  </div>
                }
                {hasItems &&
                  <CardDeck>
                    {items.map(auctionItem =>
                      <AuctionListItem key={auctionItem.id}
                                       auctionItem={auctionItem}
                                       onDetailsRequired={this.onDetailsRequired}/>)}
                  </CardDeck>
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

//
// Prop types for the page
//
AuctionsPage.propTypes = {
  filteredAuctionItems: PropTypes.array,
  keyword: PropTypes.string,
  isBusy: PropTypes.bool,
  errorOccurred: PropTypes.bool,
  auctionItemActions: PropTypes.object,
  keywordActions: PropTypes.object,
};

//
// Context types for the page
//
AuctionsPage.contextTypes = {
  router: PropTypes.object
};

//
// State mapping to props
// Called every time state changes in the store
// This will trigger componentWillReceiveProps for setting the props to component's state
//
function mapStateToProps(state, ownProps) {
  let errorOccurred = state.errorOccurred;
  let busy = state.numberOfBusyOperations > 0;
  let filtered = [];

  if(state.keyword.length > 0) {
    filtered = state.auctionItems.filter(auctionItem => auctionItem.title.toLowerCase().includes(state.keyword));
  }
  else {
    filtered = state.auctionItems;
  }

  return {
    filteredAuctionItems: filtered,
    isBusy: busy,
    errorOccurred: errorOccurred
  };
}

//
// Action creators to props
//
function mapDispatchToProps(dispatch) {
  return {
    auctionItemActions: bindActionCreators(auctionItemActions, dispatch),
    keywordActions: bindActionCreators(keywordActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionsPage);
