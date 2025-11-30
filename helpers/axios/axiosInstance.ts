import { authKey } from '@/constants/storageKey.constant';
import { ResponseSuccessType } from '@/types';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/localStorage';
import axios from 'axios';
import {
  getNewAccessToken,
  removeUserInfo,
} from '@/services/auth.services';

//! ===================================================================================================================================>>>

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

// ** Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // ! Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // ! Do something with request error
    return Promise.reject(error);
  },
);

// ** Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    // console.log('🚀 ~ instance response:', response);
    const responseObject: ResponseSuccessType = {
      data: response?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    // console.log('🚀 axiosInstanceError =>', error);
    // console.log('statusCode=>', error?.response?.data?.status);

    //! thats the error message demo type => error?.response?.data
    // const config = error?.config;
    // console.log('config sent' , config?.sent);

    const config = error?.config;
    console.log('config sent', config?.sent);
    console.log('status=>', error?.response?.status);
    console.log('message', error?.response?.data?.message);

    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken;
      console.log('Get New accessToken', accessToken);
      config.headers['Authorization'] = accessToken;
      setToLocalStorage(authKey, accessToken);
      return instance(config);
    } else {
      if (
        error?.response?.status === 403 ||
        error?.response?.data?.message ===
          'Validation Error:-> refreshToken : Refresh Token is required'
      ) {
        removeUserInfo(authKey);
      }
      

      return Promise.reject(error);
    }

  },
);

export { instance };