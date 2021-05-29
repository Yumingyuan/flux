import axios from 'axios';
import toast from 'react-hot-toast';
// import config from '../config';
// import { handleResponse } from './response';

const API = axios.create({
//   baseURL: config.apiUrl,
  responseType: 'json',
});

// API.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;

API.interceptors.response.use(
  (response) => {
    let datarespo = response.data;
    // // console.log(response.data);
    // datarespo.message = response.data.message ? response.data.message : 'Success';
    return Promise.resolve(datarespo);
  },
  // (error) => handleResponse(error)
  (error) => {
    if (error.message === 'Network Error') {
      const errorMessage = {
        response: {
          data: {
            message:
              'Network Error. Please check if you are connected to the internet.',
          },
        },
      };
    //   return handleResponse(errorMessage);
      let errMessage = 'Network Error. Please check if you are connected to the internet.'
      // toast.success(errMessage);
      return Promise.reject(errMessage);
    }else{
      // return handleResponse(error);
      let errMessage = error.response.data.message || error.response.data.error;
      return Promise.reject(errMessage);
    }

  }
);

export default API;
