const config = {
  apiUrl: 'http://twitelum-api.herokuapp.com',
  endpoints: {
    tweets: {
      read: {
        method: 'GET',
        action: '/tweets'
      },
      create: {
        method: 'POST',
        action: '/tweets'
      }
    }
  }
};

export default config;
