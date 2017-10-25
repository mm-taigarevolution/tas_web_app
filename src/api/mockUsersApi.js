import delay from '../common/delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const authenticatedUser = {
    uid: 'G543534534534t43',
    firstName: 'Dick',
    lastName: 'Steel',
    address: '21st Sunride Avenue',
    postalCode: '99999',
    city: 'Munasjoki',
    country: 'Finland'
};

class UsersApi {
  static authenticateUser(method) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(authenticatedUser);
      }, delay);
    });
  }
}

export default UsersApi;
