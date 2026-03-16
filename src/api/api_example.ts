import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { storageToken } from '@database/database';

// Get base URL based on environment
const getBaseURL = () => {
  if (__DEV__) {
    // Development mode
    return 'you-development-base-url';
  }
  // Production mode
  return 'you-base-url';
};

const api: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  try {
    const jsonToken = storageToken.getString('token');
    if (jsonToken) {
      const loggedInUserAuthToken = JSON.parse(jsonToken);
      config.headers!.Authorization = `Bearer ${loggedInUserAuthToken}`;
    }
  } catch (error) {
    console.error('api error =>', error);
  }

  return config;
});

export default api;
