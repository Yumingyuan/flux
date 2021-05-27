const axios = require('axios');
const config = require('./config');

const API = axios.create({
  // baseURL: config.apiUrl,
	responseType: 'json'
});

const GiftCardAPI = axios.create({
	baseURL:config.giftCardURL,
	responseType: 'json',
	headers: { 'Authorization': `${config.giftCardKEY}`}
});

const Flutter = axios.create({
	baseURL: config.flutterURL,
	responseType: 'json',
	headers: { 'Authorization': `Bearer ${config.flutterKEY}`}
});

const Query = (query) => axios({
  url: 'https://graphql.avascan.info',
  method: 'post',
  data: {
    query
  }
});


const CoinGecko = axios.create({
	baseURL: config.coinGeckoURL,
	responseType: 'json'
});
// Flutter.defaults.headers.common['Authorization'] = `Bearer ${config.flutterKEY}`;

module.exports = { API, Flutter, GiftCardAPI, CoinGecko, Query };