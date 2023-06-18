import { useState, useEffect, useRef, Children } from "react";

const Dropdown = ({ children, btnText, btnClass, dropdownClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        document.removeEventListener("mousedown", handleOutsideClick);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={
        dropdownClass
          ? `${dropdownClass} relative inline-block`
          : "relative inline-block"
      }
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          btnClass
            ? `${btnClass} dropdown-button flex items-center justify-center`
            : "dropdown-button items-center justify-center"
        }
      >
        {btnText}
      </button>
      {isOpen && (
        <div className="dropdown-list absolute right-0 z-50 min-w-[200px] rounded border border-gray-300 bg-white p-3 shadow-sm">
          {Children.map(children, (child) => (
            <div
              onClick={() => handleItemClick()}
              className="dropdown-item mb-1"
            >
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
