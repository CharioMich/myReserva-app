import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


/**
 * axiosPrivate instance of axios. In useAxiosPrivate.ts file, an axios interceptor gets attached to this instance
 * so we can handle the refresh-token logic and functionality.
 */
export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: {"Content-Type": "application/x-www-form-urlencoded"},
  headers: { 'Content-Type': 'application/json', },
  withCredentials: true,
});