import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionActions from '../../actions/auctionActions';
import * as keywordActions from '../../actions/keywordActions';
import * as timerActions from '../../actions/timerActions';
import { CardDeck } from 'reactstrap';
import AuctionListItem from '../controls/AuctionListItem';
import SearchBar from '../controls/SearchBar';
import TitleBar from '../stateful/TitleBar';

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
  }

  componentWillUnmount() {
    this.props.timerActions.stopTimer();
  }

  //
  // Event handlers from stateless components
  //
  onDetailsRequired(e) {
    e.preventDefault();
    let items = this.props.filteredAuctionItems.filter(auctionItem => auctionItem.id == e.target.parentElement.id);
    if(items.length > 0) {
      this.props.auctionActions.putAuctionItem(items[0]);
    }

    this.context.router.history.push('/'+e.target.parentElement.id);
  }

  onKeywordChanged(e) {
    e.preventDefault();
    this.props.keywordActions.putKeyword(e.target.value.toLowerCase());
  }

  //
  // Rendering
  //
  render() {
    let isBusy = this.props.isBusy;
    let errorOccurred = this.props.errorOccurred;
    let items = this.props.filteredAuctionItems;
    let hasItems = this.props.auctionItems.length > 0;

    return (
      <div>
        <TitleBar/>
        <SearchBar onKeywordChanged={this.onKeywordChanged}/>
        {isBusy && !hasItems &&
          <div>
            <p>Loading...</p>
          </div>
        }
        {hasItems &&
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
  auctionItems: PropTypes.array,
  filteredAuctionItems: PropTypes.array,
  keyword: PropTypes.string,
  isBusy: PropTypes.bool,
  errorOccurred: PropTypes.bool,
  auctionActions: PropTypes.object.isRequired,
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
  let filtered = state.keyword.length > 0 ? state.auctionItems.filter(auctionItem => auctionItem.title.toLowerCase().includes(state.keyword)) : state.auctionItems;

  return {
    auctionItems: state.auctionItems,
    filteredAuctionItems: filtered,
    isBusy: state.busy.isBusy,
    errorOccurred: state.errorOccurred,
    keyword: state.keyword
  };
}

//
// Action creators to props
//
function mapDispatchToProps(dispatch) {
  return {
    auctionActions: bindActionCreators(auctionActions, dispatch),
    keywordActions: bindActionCreators(keywordActions, dispatch),
    timerActions: bindActionCreators(timerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionsPage);
