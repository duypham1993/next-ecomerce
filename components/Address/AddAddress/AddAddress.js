import { Fragment, useEffect, useRef, useState } from "react";
import FormAddress from "../FormAddress/FormAddress";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { createAddress } from "@/store/slices/addressSlice";

const AddAddress = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
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
  const cityRef = useRef(null);
  const districtRef = useRef(null);

  // clear district and wards if city change
  useEffect(() => {
    setAddress({
      ...address,
      district: [],
      wards: [],
    });
  }, [cityRef.current]);

  // clear wards if district change
  useEffect(() => {
    setAddress({ ...address, wards: [] });
  }, [districtRef.current]);

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

  const handleOnSubmit = (deliveryAddress) => {
    dispatch(createAddress(deliveryAddress))
      .unwrap()
      .then(() => {
        setShow(false);
        setInputs({
          name: "",
          street: "",
          phone: "",
          note: "",
          isDefault: false,
        });
        setAddress({
          city: [],
          district: [],
          wards: [],
        });
      });
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="border border-green bg-transparent py-1 px-2 text-green transition duration-300 hover:bg-green hover:text-white"
      >
        Thêm địa chỉ mới
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
                    Địa chỉ mới
                  </div>
                  <div className="px-2">
                    <FormAddress
                      inputs={inputs}
                      address={address}
                      handleOnChange={handleOnChange}
                      handleAddress={handleAddress}
                      handleOnSubmit={handleOnSubmit}
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

export default AddAddress;
