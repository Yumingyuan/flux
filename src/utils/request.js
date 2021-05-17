const axios = require('axios');
const https = require('https');
const to = require('await-to-js').default;
const httpContext = require('express-http-context');

const makeRequest = async (url, method, payload, headers = {}, meta, reject_unauthorized = true) => {
    headers['Content-Type'] = headers['Content-Type'] ? headers['Content-Type'] : 'application/json';
    let _err = null;
    let _res = null;
  
    let httpsAgent;
    if (!reject_unauthorized) {
      httpsAgent = new https.Agent({ rejectUnauthorized: false });
    }
    // const reqId = httpContext.get('reqId');
  
    [_err, _res] = await to(
      axios({
        method: method,
        url: url,
        data: payload,
        headers: headers,
        httpsAgent
      })
    );
  
    let host = null;
    let responseBody = null;
    if (!_res || !_res.status) {
      let message = '';
      if (_err && _err.response && _err.response.data) {
        responseBody = _err.response.data.data || _err.response.data || _res.data;
        message = _err.response.data.Message;
      } else {
        message = _err.message ? _err.message : _res.data.data.ResponseData.ResponseMessage;
      }
  
      // host = _err.request.res.client.servername;
      host = _err.request && _err.request.res ? _err.request.res.client.servername : '';
      // console
      const m = _err.response ? _err.response.data : _err.response;
      const statusCode = _err.response ? _err.response.status : 400;
      console.info(message, method, url, payload, responseBody, statusCode, host, m, 'FAILED');
      return {
        success: false,
        message,
        data: responseBody,
        statusCode,
        meta: m
      };
    }
    if(_res && _res.data.status !== 'success'){
      const statusCode = 400;
      console.log('ooloo');
      return {
        success: false,
        message: _res.data.Message,
        data: _res.data,
        statusCode,
        meta: _res.data
      }
    };
    host = _res.request.res.client.servername;
    responseBody = _res.data.data || _res.data;
    return { success: true, message: 'success', data: responseBody, statusCode: _res.status };
};

module.exports = {
    makeRequest
}