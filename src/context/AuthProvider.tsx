import {type ReactNode, useState, useEffect} from "react";
import {jwtDecode} from "jwt-decode";

// Custom imports
import { getCookie, setCookie, removeCookie } from "../utils/cookie.ts";
import type {LoginFields, userDetails} from "../types/types.ts";
import {login} from "../api/login.ts";
import {AuthContext} from "./AuthContext.ts";
import type {AuthContextProps} from "./AuthContext.ts";


export const AuthProvider = ({children}: {children: ReactNode}) => {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<userDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // load user from API or local storage on mount of component
  useEffect(() => {
    // fetch user data or load from storage
    const token = getCookie("access_token");

    setAccessToken(token ?? null);

    if (token) {
      try {
        const decoded = jwtDecode<string>(token);
        console.log("DECODED", decoded);
        // TODO API call to get user data. Then setUserDetails(fetchedUserData). This way we initialize the AuthContext ???????????????
      } catch {
        // Call refresh token ??? TODO
        setUserId(null);
      }
    } else {
      setUserId(null);
      logoutUser();
      // navigate to login ??? TODO
    }
    setLoading(false);
  }, []);

  /**
   * LOGIN
   */
  const loginUser = async (fields: LoginFields): Promise<userDetails> => {

    const res = await login(fields);

    setCookie("access_token", res?.data.access_token, {
      expires: 1,
      sameSite: "strict",
      secure: false,
      path: "/",
    });

    setAccessToken(res?.data.access_token);
    setUserDetails(res?.data.user);

    // console.log("loginUser - AuthProvider: ", res?.data.accessToken); // TODO
    return res?.data.user;
  };


  /**
   * LOGOUT
   */
  const logoutUser = () => {
    removeCookie("access_token");
    setAccessToken(null);
    setUserId(null);
    setUserDetails(null);
    // TODO Call api /logout route
  }


  const contextValue: AuthContextProps = {
    isAuthenticated: !!accessToken,
    accessToken,
    setAccessToken,
    userDetails,
    loginUser,
    logoutUser,
    loading
  };

  return (
    <>
      <AuthContext.Provider value={contextValue}>
        {/*{!loading && children}*/}
        {children}
      </AuthContext.Provider>
    </>
  )
}