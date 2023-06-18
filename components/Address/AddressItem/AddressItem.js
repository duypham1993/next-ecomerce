import { useDispatch } from "react-redux";
import { Fragment, useState } from "react";
import UpdateAddress from "../UpdateAddress/UpdateAddress";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteAddress } from "@/store/slices/addressSlice";

const AddressItem = ({ address, id }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    dispatch(deleteAddress(address._id));
    setShow(false);
  };

  return (
    <div className="mb-4 bg-white shadow">
      <div className="px-4 pt-4 pb-2">
        <span>Họ tên: </span>
        <span>{address.name}</span>
      </div>
      <div className="px-4 pb-2">
        <span>Số điện thoại: </span>
        <span>{address.phone}</span>
      </div>
      <div className="px-4 pb-3">
        <span>Địa chỉ giao hàng: </span>
        <span>
          {`${address.address?.street}, ${address.address?.wards}, ${address.address?.district}, ${address.address?.city}`}
        </span>
      </div>
      <div className="flex items-center justify-between border-t px-4 py-2">
        <div className="flex items-center">
          <UpdateAddress deliveryAddress={address} />
          {!address.isDefault && (
            <>
              <button
                className="text-gray transtion-all ml-4 flex items-center bg-white p-0 duration-300 hover:text-red-100"
                onClick={handleShow}
              >
                <AiOutlineDelete />
                <span className="pl-1">Xoá</span>
              </button>
              <Transition appear show={show} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  onClose={handleClose}
                >
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <div className="fs-4 mb-4">
                            Bạn có chắc muốn xoá địa chỉ này?
                          </div>
                          <div className="d-flex justify-content-end align-items-center">
                            <button
                              className="btn-df text-gray me-4 border-0"
                              onClick={handleClose}
                            >
                              Huỷ bỏ
                            </button>
                            <button
                              className="btn-df btn-df--green"
                              onClick={() => handleDelete()}
                            >
                              Xoá
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </>
          )}
        </div>

        {address.isDefault && (
          <span className="text-xs font-bold text-green">Mặc định</span>
        )}
      </div>
    </div>
  );
};

export default AddressItem;
