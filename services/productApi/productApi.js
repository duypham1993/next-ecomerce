import { publicRequest } from "@/share/axios/requestMethod";

export const getFiltersOfProduct = async (query) => {
  const res = await publicRequest.get(`/product/client/filters?${query}`);
  return res.data;
};

export const getProductsOfCategory = async (params) => {
  const res = await publicRequest.get(
    `/product/category/${params.id}?${params.url}`
  );
  return res.data;
};

export const getProductDetail = async (id) => {
  const res = await publicRequest.get(`/product/client/detail/${id}`);
  return res.data;
};

export const getAllProducts = async () => {
  const res = await publicRequest.get("/product");
  return res.data;
};

export const getProductsForSearchPage = async (params) => {
  const res = await publicRequest.get(`product/client/search?${params}`);
  return res.data;
};
