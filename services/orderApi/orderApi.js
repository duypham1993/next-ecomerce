import privateRequest from "@/share/axios/requestMethod";

export const getUserOrders = async (userId) => {
  const res = await privateRequest.get(`/order/client/${userId}`);
  return res.data;
};

export const getCurrentOrder = async (id) => {
  const res = await privateRequest.get(`/order/client/current/${id}`);
  return res.data;
};
