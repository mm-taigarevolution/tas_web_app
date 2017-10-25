import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import { Container,
         Row,
         Col,
         Card,
         CardBody,
         CardTitle,
         CardFooter,
         Button} from 'reactstrap';

 const cardStyle = {
   maxWidth: '100%'
 };

 const buttonStyle = {
   margin: '5px 0px'
 };

 const warningStyle = {
   margin: '5px 0px',
   fontSize: '14px',
   color: 'red'
 };

class AuthenticationPage extends React.Component {
  constructor(props) {
    super(props);

    this.onGoogleClicked = this.onGoogleClicked.bind(this);
    this.onFacebookClicked = this.onFacebookClicked.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.authenticated) {
      if(this.props.forwardTo.length > 0) {
        this.context.router.history.push(this.props.forwardTo);
      }
      else {
        this.context.router.history.back();
      }
    }
  }

  onGoogleClicked(event) {
    event.preventDefault();
    this.props.userActions.authenticateUser("Google");
  }

  onFacebookClicked(event) {
    event.preventDefault();
    this.props.userActions.authenticateUser("Facebook");
  }

  render() {
    let isBusy = this.props.isBusy;
    let errorOccurred = this.props.errorOccurred;

    return (
      <Card style={cardStyle}>
        <CardBody>
          <CardTitle>Authentication</CardTitle>
        </CardBody>
        <CardBody>
          <Container>
            <Row>
              <p>Please authenticate to TAS before making the bid.</p>
            </Row>
            <Row>
              <Button style={buttonStyle}
                      color="primary"
                      disabled={isBusy}
                      onClick={this.onGoogleClicked}>Login by Google</Button>
            </Row>
            <Row>
              <Button style={buttonStyle}
                      color="primary"
                      disabled={isBusy}
                      onClick={this.onFacebookClicked}>Login by Facebook</Button>
            </Row>
          </Container>
        </CardBody>
        <CardFooter>
          {isBusy &&
            <p>Loading...</p>
          }
          {!isBusy &&
             <div>
               {errorOccurred &&
                 <Row>
                   <p style={warningStyle}>Authentication failed. Please try again.</p>
                 </Row>
               }
             </div>
          }
        </CardFooter>
      </Card>
    );
  }
}

AuthenticationPage.propTypes = {
  forwardTo: PropTypes.string.isRequired,
  authenticated: PropTypes.bool,
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
  let authenticated = state.user.uid.length > 0 && !state.isBusy && !state.errorOccurred;

  return {
    forwardTo: queryItem.forwardTo,
    authenticated: authenticated,
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
