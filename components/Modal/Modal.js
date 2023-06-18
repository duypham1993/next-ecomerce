import { useEffect, useRef } from "react";

const Modal = ({ show, handleClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
    document.body.style.paddingRight = show ? "15px" : "0";

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
        document.removeEventListener("mousedown", handleOutsideClick);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show]);

  return (
    <>
      {show && (
        <div
          className={`modal fixed inset-0 z-[1000] h-full w-full transition duration-300 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="fixed inset-0 h-screen w-screen bg-black opacity-60"></div>
          <div
            className="modal__body relative top-1/2 mx-auto w-full max-w-[500px] -translate-y-1/2 text-center"
            ref={modalRef}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
