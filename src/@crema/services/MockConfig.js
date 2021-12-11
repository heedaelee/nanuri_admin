import axios from './ApiConfig';

const MockAdapter = require('axios-mock-adapter');

// All requests using this instance will have a 0.2 seconds delay:
export default new MockAdapter(axios, {delayResponse: 200});
