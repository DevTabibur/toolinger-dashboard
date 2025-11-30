import { tagTypes } from '../tag-types';
import { baseAPI } from './baseApi';

const paymentURL = `/v1/payment`;

export const paymentApi = baseAPI.injectEndpoints({
  endpoints: build => ({
    //** get payment */
    getPayment:build.query({
      query:() =>({
        url:`${paymentURL}`,
        method:"GET"
      }),
      providesTags:[tagTypes.payment]
    })
  }),
});

export const {useGetPaymentQuery} = paymentApi;
    