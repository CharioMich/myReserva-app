import axios from "../api/axios.ts";
import useAuth from "./useAuth.ts";

type RefreshResponse = {
  accessToken: string;
};

const useRefreshToken = () => {
  const { setAccessToken, logoutUser } = useAuth();

  return async (): Promise<void> => {
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
        // console.log("REFRESH TOKEN - new access token:", newAccessToken);
      } else {
        throw new Error("No access token returned from API");
      }
    } catch (err) {
      console.error("Token refresh failed. Login required. Error: ", err);
      logoutUser();
    }
  };
}

export default useRefreshToken;