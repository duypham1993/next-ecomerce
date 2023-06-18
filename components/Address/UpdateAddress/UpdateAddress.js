import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import FormAddress from "../FormAddress/FormAddress";
import { Dialog, Transition } from "@headlessui/react";
import { updateAddress } from "@/store/slices/addressSlice";
import { AiOutlineEdit } from "react-icons/ai";

const UpdateAddress = ({ deliveryAddress, isOrderPage }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [checkDefault, setCheckDefault] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    street: "",
    phone: "",
    note: "",
    isDefault: false,
  });
  const [address, setAddress] = useState({
    city: [],
    district: [],
    wards: [],
  });
  const cityRef = useRef("");
  const districtRef = useRef("");

  // sclear district and wards if city change
  useEffect(() => {
    setAddress({ ...address, district: [], wards: [] });
  }, [cityRef.current]);
  // clear wards if district change
  useEffect(() => {
    setAddress({ ...address, wards: [] });
  }, [districtRef.current]);

  useEffect(() => {
    if (Object.keys(deliveryAddress).length) {
      setInputs({
        name: deliveryAddress.name,
        street: deliveryAddress.address.street,
        phone: deliveryAddress.phone,
        note: deliveryAddress.note,
        isDefault: deliveryAddress.isDefault,
      });

      setAddress({
        city: [
          {
            label: deliveryAddress.address.city,
            value: deliveryAddress.address.city,
          },
        ],
        district: [
          {
            label: deliveryAddress.address.district,
            value: deliveryAddress.address.district,
          },
        ],
        wards: [
          {
            label: deliveryAddress.address.wards,
            value: deliveryAddress.address.wards,
          },
        ],
      });

      setCheckDefault(deliveryAddress.isDefault);
    }
  }, [deliveryAddress]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setInputs({ ...inputs, [name]: checked });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleAddress = (name, value) => {
    if (name === "city") {
      cityRef.current = address.city;
    }
    if (name === "district") {
      districtRef.current = address.district;
    }

    if (value) {
      setAddress({
        ...address,
        [name]: [value],
      });
    } else {
      setAddress({
        ...address,
        [name]: [],
      });
    }
  };

  const handleOnSubmit = (address) => {
    dispatch(
      updateAddress({ id: deliveryAddress._id, updatedAddress: address })
    )
      .unwrap()
      .then(() => {
        setShow(false);
      });
  };

  return (
    <>
      {isOrderPage ? (
        <button
          className="transtion border-0 bg-transparent text-green duration-300 hover:text-green"
          onClick={handleShow}
        >
          <span className="ps-1">Cập nhật</span>
        </button>
      ) : (
        <button
          className="text-gray flex items-center border-0 bg-transparent transition duration-300 hover:text-green"
          onClick={handleShow}
        >
          <AiOutlineEdit />
          <span className="pl-1">Cập nhật</span>
        </button>
      )}

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white text-left align-middle shadow transition-all">
                  <div className="border-b border-gray-100 py-4 px-5 text-xl">
                    Cập nhật địa chỉ{" "}
                  </div>
                  <div className="px-2">
                    <FormAddress
                      inputs={inputs}
                      address={address}
                      handleOnChange={handleOnChange}
                      handleAddress={handleAddress}
                      handleOnSubmit={handleOnSubmit}
                      checkDefault={checkDefault}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UpdateAddress;
