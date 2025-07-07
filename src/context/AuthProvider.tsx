import {type ReactNode, useState, useEffect} from "react";
// import {jwtDecode} from "jwt-decode";

// Custom imports
import { getCookie, setCookie, removeCookie } from "../utils/cookie.ts";
import { getCurrentUser } from "../api/users.ts";
import type {LoginFields, userDetails} from "../types/types.ts";
import {login} from "../api/login.ts";
import {logout} from "../api/logout.ts";
import {AuthContext} from "./AuthContext.ts";
import type {AuthContextProps} from "./AuthContext.ts";


export const AuthProvider = ({children}: {children: ReactNode}) => {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<userDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // load user from API or cookie, on mount of component
  useEffect(() => {
    const token = getCookie("access_token");

    setAccessToken(token ?? null);

    if (token) {
      try {
        // const decoded = jwtDecode<string>(token);
        // Call API to get user data. Then set the state in the authContext ( setUserDetails() ). This way we re-initialize the AuthContext if the user comes back after he leaves the page without logout
        const populateUser = async () => {
          const user = await getCurrentUser();
          if (user) {
            setUserDetails(user);
          }
        }
        populateUser();
      } catch (error) {
        console.log("User not found: ", error);
      }
    } else {
      // logoutUser(); // Comment-out to silence errors when app runs
    }
    setLoading(false);
  }, []); // [userDetails, accessToken]


  /**
   * LOGIN
   */
  const loginUser = async (fields: LoginFields): Promise<userDetails> => {

    const res = await login(fields);

    // const expiry = new Date(Date.now() + 60 * 60 * 1000); // 60 mins
    const expiry = new Date(Date.now() + 20 * 1000); // 20 sec
    setCookie("access_token", res?.data.accessToken, {
      expires: expiry,
      sameSite: "lax", // strict when in production
      secure: false,   // true when in production
      path: "/",
    });

    setAccessToken(res?.data.accessToken);
    setUserDetails(res?.data.user);

    return res?.data.user;
  };


  /**
   * LOGOUT
   */
  const logoutUser = () => {
    logout();
    removeCookie("access_token");
    setAccessToken(null);
    setUserDetails(null);
  }


  const contextValue: AuthContextProps = {
    isAuthenticated: !!accessToken,
    accessToken,
    setAccessToken,
    setUserDetails,
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