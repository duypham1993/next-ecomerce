import { chooseAddress } from "@/store/slices/addressSlice";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAddress from "../AddAddress/AddAddress";
import AddressItemOrderPage from "./AddressItemOrderPage";

const DeliveryAddress = ({ address }) => {
  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.address.addressList);
  const [show, setShow] = useState(false);
  const [choose, setChoose] = useState(address._id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnChange = (e) => {
    setChoose(e.target.value);
  };

  const handleOnSubmit = () => {
    dispatch(chooseAddress(choose));
    handleClose();
  };

  return (
    <div>
      <div className="pb-2">
        <span>Họ tên người nhận: </span>
        <span>{address.name}</span>
      </div>
      <div className="pb-2">
        <span>Số điện thoại: </span>
        <span>{address.phone}</span>
      </div>
      <div className="pb-3">
        <span>Địa chỉ giao hàng: </span>
        <span>
          {`${address.address?.street}, ${address.address?.wards}, ${address.address?.district}, ${address.address?.city}`}
        </span>
      </div>
      <div>
        <button className="btn--df btn--green px-3 py-2" onClick={handleShow}>
          THAY ĐỔI
        </button>
        <Transition appear show={show} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={handleClose}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white text-left align-middle shadow transition-all">
                    <Dialog.Title
                      as="h3"
                      className="border border-gray-200 px-6 py-4 text-lg font-medium leading-6"
                    >
                      ĐỊA CHỈ CỦA TÔI
                    </Dialog.Title>
                    <div>
                      {addressList.map((address, index) => (
                        <AddressItemOrderPage
                          key={index}
                          index={index}
                          address={address}
                          choose={choose}
                          handleOnChange={handleOnChange}
                        />
                      ))}
                      <div className="my-4 px-6">
                        <AddAddress />
                      </div>

                      <div className="flex items-center justify-end bg-gray-100 px-6 py-3">
                        <button
                          className="btn--df btn--close mr-2 px-3 py-2"
                          onClick={handleClose}
                        >
                          HUỶ
                        </button>
                        <button
                          className="btn--df btn--green px-3 py-2"
                          onClick={(e) => handleOnSubmit()}
                        >
                          XÁC NHẬN
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default DeliveryAddress;
