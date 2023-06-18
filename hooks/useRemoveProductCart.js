import { removeProductCart } from "@/store/slices/cartSlice";
import { useDispatch } from "react-redux";

const useRemoveProductCart = (customerID, productID) => {
  const dispatch = useDispatch();
  return (customerID, productID) => {
    dispatch(removeProductCart({ customerID, productID }));
  };
};
export default useRemoveProductCart;
