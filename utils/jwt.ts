// utils/jwt.client.ts
'use client';

import { jwtDecode } from 'jwt-decode';

export const decodedToken = <T = any>(token: string): T => {
  return jwtDecode<T>(token);
};
