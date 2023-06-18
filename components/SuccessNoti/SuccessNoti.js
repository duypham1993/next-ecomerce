import { AiFillCheckCircle } from "react-icons/ai";
import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

const SuccessNoti = ({ show, handleClose }) => {
  useEffect(() => {
    const autoClose = setTimeout(handleClose, 2000);
    return () => clearTimeout(autoClose);
  }, [show]);

  return (
    <Transition show={show}>
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
              <Dialog.Panel className=" w-full max-w-sm transform  overflow-hidden rounded bg-white p-6 text-center align-middle text-green shadow transition-all">
                <AiFillCheckCircle className="mx-auto text-3xl" />
                <p className="mt-2 text-lg">
                  Sản phẩm đã được thêm vào giỏ hàng
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SuccessNoti;
