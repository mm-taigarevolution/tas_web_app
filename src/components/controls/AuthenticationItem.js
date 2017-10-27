import React from 'react';
import PropTypes from 'prop-types';
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

const AuthenticationItem = ({isBusy, onGoogleAuthRequired, onFacebookAuthRequired}) => {
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
                      onClick={onGoogleAuthRequired}>Google login</Button>
            </Row>
            <Row>
              <Button style={buttonStyle}
                      color="primary"
                      disabled={isBusy}
                      onClick={onFacebookAuthRequired}>Facebook login</Button>
            </Row>
          </Container>
        </CardBody>
        <CardFooter>
          {isBusy &&
            <p>Loading...</p>
          }
        </CardFooter>
      </Card>
  );
};

AuthenticationItem.propTypes = {
  isBusy: PropTypes.bool.isRequired,
  onGoogleAuthRequired: PropTypes.func.isRequired,
  onFacebookAuthRequired: PropTypes.func.isRequired,
};

export default AuthenticationItem;
