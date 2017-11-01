import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../../actions/userActions';
import {toastr} from 'react-redux-toastr';
import { Container,
         Row,
         Col,
         Button} from 'reactstrap';

const containerStyle = {
  padding: '0px',
  margin: '10px 0px 30px 0px',
  width: '100%'
};

class TitleBarControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutBusy: false
    };

    this.onLoginRequired = this.onLoginRequired.bind(this);
    this.onLogoutRequired = this.onLogoutRequired.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let loggedIn = nextProps.user.loggedIn;

    if(this.state.logoutBusy &&
       !loggedIn)
    {
      toastr.info('See you soon!');
      this.setState({logoutBusy: false});
    }
  }

  onLoginRequired(e) {
    e.preventDefault();
    let route = '/authenticate';
    this.context.router.history.push(route);
  }

  onLogoutRequired(e) {
    e.preventDefault();
    this.setState({logoutBusy: true});
    this.props.userActions.logoutUser();
  }

  render() {
    let loggedIn = this.props.user.loggedIn;
    let busy = this.state.logoutBusy;

    return (
      <Container style={containerStyle}>
        <Row>
          <Col sm="10" className="text-left">
            <h3>Taiga Auction System</h3>
          </Col>
          <Col sm="2" className="text-right">
            {!loggedIn &&
              <Button id="loginButton"
                      color="primary"
                      disabled={busy}
                      onClick={this.onLoginRequired}>Login</Button>
            }
            {loggedIn &&
              <Button id="logoutButton"
                      color="secondary"
                      disabled={busy}
                      onClick={this.onLogoutRequired}>Logout</Button>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

TitleBarControl.propTypes = {
  user: PropTypes.object.isRequired,
  logoutBusy: PropTypes.bool,
  userActions: PropTypes.object.isRequired
};

//
// Context types for the page
//
TitleBarControl.contextTypes = {
  router: PropTypes.object
};

//
// State mapping to props
// Called every time state changes in the store
// This will trigger componentWillReceiveProps for setting the props to component's state
//
function mapStateToProps(state) {
  return {
    user: state.user
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

export default connect(mapStateToProps, mapDispatchToProps)(TitleBarControl);
