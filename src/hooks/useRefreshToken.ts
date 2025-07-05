import axios from "../api/axios.ts";
import useAuth from "./useAuth.ts";
import {setCookie} from "../utils/cookie.ts";

type RefreshResponse = {
  accessToken: string;
};

const useRefreshToken = () => {
  const { setAccessToken, logoutUser } = useAuth();

  return async () => {
    try {
      const freshToken = await axios.post<RefreshResponse>(import.meta.env.VITE_API_URL + "/auth/refresh-token",
        {}, // empty body
        {
          withCredentials: true
        },
      );

      const newAccessToken = freshToken.data?.accessToken;

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        setCookie("access_token", newAccessToken, {
          // expires: new Date(Date.now() + 60 * 60 * 1000),
          expires: new Date(Date.now() + 20 * 1000),  // 20 sec
          sameSite: "lax",
          secure: false,
          path: "/"
        });
        console.log("REFRESH TOKEN - new access token:", newAccessToken);
        return newAccessToken;
      } else {
        throw new Error("No access token returned from API");
      }
    } catch (err) {
      console.error("Token refresh failed. Login required. Error: ", err);
      logoutUser();
    }
    return '';
  };
}

export default useRefreshToken;