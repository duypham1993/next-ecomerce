import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutUser from "@/components/LayoutUser";
import { getAddressList } from "@/store/slices/addressSlice";
import AddressItem from "@/components/Address/AddressItem/AddressItem";
import AddAddress from "@/components/Address/AddAddress/AddAddress";

const Addresses = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { addressList, isLoading } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(getAddressList(currentUser._id));
  }, []);

  return (
    <LayoutUser>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="col-span-full md:my-3">
          <AddAddress />
        </div>
        {addressList?.map((address, index) => {
          return (
            <div key={index}>
              <AddressItem address={address} id={currentUser._id} />
            </div>
          );
        })}
      </div>
    </LayoutUser>
  );
};

export default Addresses;
