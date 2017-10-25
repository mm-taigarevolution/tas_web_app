import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionItemsActions from '../../actions/auctionItemsActions';
import * as keywordActions from '../../actions/keywordActions';
import * as timerActions from '../../actions/timerActions';
import { CardDeck } from 'reactstrap';
import AuctionListItem from '../controls/AuctionListItem';
import SearchBar from '../controls/SearchBar';
import Header from '../controls/Header';

class AuctionsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onDetailsRequired = this.onDetailsRequired.bind(this);
    this.onKeywordChanged = this.onKeywordChanged.bind(this);
  }

  //
  // Lifecycle methods
  //
  componentDidMount() {
    this.props.timerActions.startTimer();
    this.props.auctionItemsActions.getAuctionItems();
  }

  componentWillUnmount() {
    this.props.timerActions.stopTimer();
  }

  //
  // Event handlers from stateless components
  //
  onDetailsRequired(event) {
    this.context.router.history.push('/'+event.target.parentElement.id);
  }

  onKeywordChanged(event) {
    this.props.keywordActions.updateKeyword(event.target.value.toLowerCase());
  }

  //
  // Rendering
  //
  render() {
    let isBusy = this.props.isBusy;
    let errorOccurred = this.props.errorOccurred;
    let items = this.props.filteredAuctionItems;

    return (
      <div>
        <Header/>
        <SearchBar onKeywordChanged={this.onKeywordChanged}/>
        {isBusy &&
          <div>
            <p>Loading...</p>
          </div>
        }
        {!isBusy &&
          <div>
            {errorOccurred == false &&
              <div>
                {items.length == 0 &&
                  <div>
                    <p>No results.</p>
                  </div>
                }
                {items.length > 0 &&
                  <CardDeck>
                    {items.map(auctionItem => (
                      <AuctionListItem key={auctionItem.id}
                                       auctionItem={auctionItem}
                                       onDetailsRequired={this.onDetailsRequired}/>))
                    }
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
  auctionItemsActions: PropTypes.object.isRequired,
  keywordActions: PropTypes.object.isRequired,
  timerActions: PropTypes.object.isRequired
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
function mapStateToProps(state) {
  let errorOccurred = state.errorOccurred;
  let busy = state.numberOfBusyOperations > 0;
  let keyword = state.keyword;
  let filtered = state.keyword.length > 0 ? state.auctionItems.filter(auctionItem => auctionItem.title.toLowerCase().includes(state.keyword)) : state.auctionItems;

  return {
    filteredAuctionItems: filtered,
    isBusy: busy,
    errorOccurred: errorOccurred,
    keyword: keyword
  };
}

//
// Action creators to props
//
function mapDispatchToProps(dispatch) {
  return {
    auctionItemsActions: bindActionCreators(auctionItemsActions, dispatch),
    keywordActions: bindActionCreators(keywordActions, dispatch),
    timerActions: bindActionCreators(timerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionsPage);
