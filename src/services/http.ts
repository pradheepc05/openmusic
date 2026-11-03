import axios from 'axios';

export const http = axios.create({
  timeout: 15_000,
  headers: { Accept: 'application/json' },
});

http.interceptors.response.use(
  (r) => r,
  (err) => {
    const message =
      err?.response?.data?.error?.message ??
      err?.response?.data?.message ??
      err?.message ??
      'Network error';
    return Promise.reject(new Error(message));
  },
);