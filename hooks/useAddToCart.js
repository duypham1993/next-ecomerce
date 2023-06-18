import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/router";

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const router = useRouter();

  return (id, qty, setShow) => {
    if (currentUser?._id) {
      const userCart = {
        customerID: currentUser._id,
        product: {
          _id: id,
          qty: qty,
        },
      };

      qty > 0 &&
        dispatch(addToCart(userCart))
          .unwrap()
          .then(() => {
            setShow(true);
          });
    } else {
      router.push("/login");
    }
  };
};
