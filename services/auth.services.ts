// import { decodedToken } from '@/utils/jwt.client';
import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import { authKey } from '@/constants/storageKey.constant';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/localStorage';
import { decodedToken } from '@/utils/jwt';
import { getBaseURL } from '@/helpers/config/envConfig';

export const storeUserInfo = ({ accessToken }: any) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getSingleUserInfo = ({ userId }: any) => {};

// ! get logged in user info
export const getLoggedInUser = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    const { _id }: any = decodedData;
    return decodedData;
  } else {
    return '';
  }
};

// export const loggedInUser = () =>{
// const
// }

export const getCartItems = () =>{
  const items = getFromLocalStorage("cartList")
  console.log('items', items);
}

// ! return truthy or falsy value to check, is there anyone loggedIn
export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};


export const getNewAccessToken = async () => {
  console.log('getNewAccessToken is hitted');
  return await axiosInstance({
    url: `${getBaseURL()}/auth/refresh-token`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};