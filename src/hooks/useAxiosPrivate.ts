import {axiosPrivate} from "../api/axios.ts";
import useRefreshToken from "./useRefreshToken.ts";
import useAuth from "./useAuth.ts";
import {useEffect} from "react";
import {setCookie} from "../utils/cookie.ts";

/**
 * Attaches interceptor to the axiosPrivate instance so we can make calls sending the refresh token without exposing it
 */
export default function useAxiosPrivate()  {
  const refresh = useRefreshToken();
  const authContext = useAuth();
  // const accessToken = getCookie("access_token");

  useEffect(() => {
    // REQUEST INTERCEPTOR
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {         // onFulfilled
        if (!config.headers['Authorization']) {     // First request attempt. Authorization headers do not exist
          config.headers['Authorization'] = `Bearer ${authContext?.accessToken}`;
          // config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)   // onRejected
    );

    // RESPONSE INTERCEPTOR
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,                // onFulfilled -> if the response is ok -> return the response
      async (error) => {      // onRejected ->  if error (token expired) get into this function
        const prevRequest = error?.config;  // get the previous request from axios config property
        if (error?.response?.status === 401 && !prevRequest?.sent) {    // if the request failed due to an expired access token (403) | !prevRequest?.sent -> prevent an endless loop. Only retry to send the request once
          prevRequest.sent = true;                                      // sent = true so we can only resent it once if it fails again (will stop above && !prevRequest?.sent)
          const newAccessToken = await refresh();                 // get a new access token using the refresh token through useRefreshToken
          setCookie('access_token', newAccessToken);
          prevRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;    // Set the new access token into the headers of the last (prev) request
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => { // Clean-up function to remove interceptor once used, otherwise they stay on each request and accumulate/chain endlessly
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [authContext.accessToken, authContext, refresh]);

  return axiosPrivate;
}
