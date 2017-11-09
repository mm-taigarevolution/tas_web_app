import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auctionActions from '../../actions/auctionActions';
import * as keywordActions from '../../actions/keywordActions';
import * as timerActions from '../../actions/timerActions';
import AuctionListItemControl from '../controls/stateless/AuctionListItemControl';
import SearchBarControl from '../controls/stateless/SearchBarControl';
import TitleBarControl from '../controls/stateful/TitleBarControl';
import Transition from 'react-motion-ui-pack';
import { spring } from 'react-router-transition';
import {ThreeBounce} from 'better-react-spinkit';

const containerStyle = {
  margin: '0px',
  padding: '0px'
};

const spinnerStyle = {
 margin: '10px',
 display: 'flex',
 justifyContent: 'center'
};

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
  onDetailsRequired(auctionItem) {
    this.props.auctionActions.putAuctionItem(auctionItem);
    this.context.router.history.push('/'+auctionItem.id);
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
    let runOnMount = true;
    let keyword = this.props.keyword;

    return (
      <div>
        <TitleBarControl/>
        <SearchBarControl keyword={keyword}
                          onKeywordChanged={this.onKeywordChanged}/>
        {isBusy && !hasItems &&
          <div>
            <ThreeBounce color="gray"
                         style={spinnerStyle}/>
          </div>
        }
        {hasItems &&
          <div style={containerStyle}>
            {errorOccurred == false &&
              <div>
                {items.length == 0 &&
                  <div>
                    <p>No results.</p>
                  </div>
                }
                {items.length > 0 &&
                  <Transition component="div"
                              enter={{opacity: 1, translateY: spring(0, {stiffness: 200, damping: 20})}}
                              leave={{opacity: 0, translateY: 800}}
                              runOnMount={runOnMount}>
                    {items.map(auctionItem => (
                      <div key={auctionItem.id}>
                        <AuctionListItemControl auctionItem={auctionItem}
                                                onDetailsRequired={this.onDetailsRequired}/>
                      </div>))
                    }
                  </Transition>
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
