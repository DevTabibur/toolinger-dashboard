

import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '@/helpers/config/envConfig';
import { tagTypesList } from '../tag-types';

//**  */ Define a service using a base URL and expected endpoints

export const baseAPI = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: getBaseURL() }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});