import { getNewAccessToken } from '@/services/auth.services';
import { tagTypes } from '../tag-types';
import { baseAPI } from './baseApi';
import { getFromLocalStorage } from '@/utils/localStorage';
import { authKey } from '@/constants/storageKey.constant';
 
const AuthURL = `/v1/auth`;
 
export const authApi: any = baseAPI.injectEndpoints({
  endpoints: build => ({
    //** user login api */
    userLogin: build.mutation({
      query: loginData => ({
        url: `${AuthURL}/login`,
        method: 'POST',
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //** user log out */
    userLogout: build.mutation({
      query: data => ({
        url: `${AuthURL}/logout`,
        method: 'POST',
        // data: data,
         headers: {
          "Authorization": `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //** User registration */
    userRegister: build.mutation({
      query: data => ({
        url: `${AuthURL}/register`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //** forgot password */
    forgotPassword: build.mutation({
      query: email => ({
        url: `${AuthURL}/forgot-password`,
        method: 'POST',
        data: email,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    //** reset password */
    resetPassword: build.mutation({
      query: resetPasswordPayload => ({
        url: `${AuthURL}/reset-password`,
        method: 'POST',
        data: resetPasswordPayload,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    //** change password */
    changePassword: build.mutation({
      query: data => ({
        url: `${AuthURL}/change-password`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUserLogoutMutation,
} = authApi;