import delay from '../common/delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const loggedInUser = {
    userId: 'G543534534534t43',
    firstName: 'Dick',
    lastName: 'Steel',
    address: '21st Sunride Avenue',
    postalCode: '99999',
    city: 'Munasjoki',
    country: 'Finland'
};

const loggedOutUser = {
    userId: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    country: ''
};

class UsersApi {
  static loginUser(method) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(loggedInUser);
      }, delay.mockApiTimeout);
    });
  }
  
  static logoutUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(loggedOutUser);
      }, delay.mockApiTimeout);
    });
  }
}

export default UsersApi;
