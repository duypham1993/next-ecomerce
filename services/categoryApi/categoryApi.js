import { publicRequest } from "@/share/axios/requestMethod";

export const getCategories = async () => {
  const res = await publicRequest.get("/category/client");
  return res.data;
};
