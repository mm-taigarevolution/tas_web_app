import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import AuthenticationControl from '../controls/stateless/AuthenticationControl';
import {toastr} from 'react-redux-toastr';

class AuthenticationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginBusy: false
    };

    this.onGoogleAuthRequired = this.onGoogleAuthRequired.bind(this);
    this.onFacebookAuthRequired = this.onFacebookAuthRequired.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.loginBusy) {
      if(nextProps.errorOccurred) {
        toastr.error('Authentication failed', 'Please re-check your credentials.');
        this.setState({loginBusy: false});
      }
      else if(nextProps.user.loggedIn) {
        let userName = nextProps.user.firstName + ' ' + nextProps.user.lastName;
        toastr.success('Nice to see you, ' + userName +'!');

        if(nextProps.forwardTo.length > 0) {
          this.context.router.history.replace(nextProps.forwardTo);
        }
        else {
          this.context.router.history.goBack();
        }
        this.setState({loginBusy: false});
      }
    }
  }

  onGoogleAuthRequired(e) {
    e.preventDefault();
    this.setState({loginBusy: true});
    this.props.userActions.loginUser("Google");
  }

  onFacebookAuthRequired(e) {
    e.preventDefault();
    this.setState({loginBusy: true});
    this.props.userActions.loginUser("Facebook");
  }

  render() {
    let isBusy = this.props.isBusy && this.state.loginBusy;
    return (
      <AuthenticationControl isBusy={isBusy}
                             onGoogleAuthRequired={this.onGoogleAuthRequired}
                             onFacebookAuthRequired={this.onFacebookAuthRequired}/>
    );
  }
}

AuthenticationPage.propTypes = {
  forwardTo: PropTypes.string,
  user: PropTypes.object,
  loginBusy: PropTypes.bool,
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
  let forwardTo = ownProps.location.search.length > 0 ? queryString.parse(ownProps.location.search).forwardTo : '';

  return {
    forwardTo: forwardTo,
    user: state.user,
    isBusy: state.busy.isBusy,
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
