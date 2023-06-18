import privateRequest from "@/share/axios/requestMethod";
import { updateLocalAccessToken } from "./localStorage";

export const refreshToken = async () => {
  const res = await privateRequest.get("/refreshToken/client");
  updateLocalAccessToken(res.data.accessToken);
  return res.data.accessToken;
};
