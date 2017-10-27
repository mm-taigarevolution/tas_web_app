import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import AuthenticationItem from '../controls/AuthenticationItem';
import {toastr} from 'react-redux-toastr';

class AuthenticationPage extends React.Component {
  constructor(props) {
    super(props);

    this.onGoogleAuthRequired = this.onGoogleAuthRequired.bind(this);
    this.onFacebookAuthRequired = this.onFacebookAuthRequired.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.isBusy) {
      if(nextProps.errorOccurred) {
        toastr.error('Authentication failed', 'Please re-check your credentials.');
      }

      else if(nextProps.user.authenticated) {
        if(nextProps.forwardTo.length > 0) {
          toastr.success('Authentication succeeded');
          this.context.router.history.push(nextProps.forwardTo);
        }
        else {
          this.context.router.history.back();
        }
      }
    }
  }

  onGoogleAuthRequired(e) {
    e.preventDefault();
    this.props.userActions.authenticateUser("Google");
  }

  onFacebookAuthRequired(e) {
    e.preventDefault();
    this.props.userActions.authenticateUser("Facebook");
  }

  render() {
    let isBusy = this.props.isBusy;

    return (
      <AuthenticationItem isBusy={isBusy}
                          onGoogleAuthRequired={this.onGoogleAuthRequired}
                          onFacebookAuthRequired={this.onFacebookAuthRequired}/>
    );
  }
}

AuthenticationPage.propTypes = {
  forwardTo: PropTypes.string.isRequired,
  user: PropTypes.object,
  isBusy: PropTypes.bool,
  errorOccurred: PropTypes.bool,
  userActions: PropTypes.object.isRequired
};

//
// Context types for the page
//
AuthenticationPage.contextTypes = {
  router: PropTypes.object
};

//
// State mapping to props
// Called every time state changes in the store
// This will trigger componentWillReceiveProps for setting the props to component's state
//
function mapStateToProps(state, ownProps) {
  let queryString = require('query-string');
  let queryItem = ownProps.location.search.length > 0 ? queryString.parse(ownProps.location.search) : "";

  return {
    forwardTo: queryItem.forwardTo,
    user: state.user,
    isBusy: state.numberOfBusyOperations > 0,
    errorOccurred: state.errorOccurred
  };
}

//
// Action creators to props
//
function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationPage);
