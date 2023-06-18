import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { cityData } from "@/data/city";

const FormAddress = ({
  inputs,
  address,
  handleOnChange,
  handleAddress,
  handleOnSubmit,
  checkDefault,
}) => {
  const { isSubmitting } = useSelector((state) => state.address);
  const city = cityData.map((item) => {
    return { value: item.name, label: item.name };
  });

  const district = cityData.find(
    (item) => item.name === address.city[0]?.value
  );
  const arrDistrict = district?.districts.map((item) => {
    return { value: item.name, label: item.name };
  });
  const wards = district?.districts.find(
    (item) => item.name === address.district[0]?.value
  );
  const arrWards = wards?.wards.map((item) => {
    return { value: item.name, label: item.name };
  });
  const currentUser = useSelector((state) => state.auth.currentUser);
  const customerID = currentUser?._id;
  const [formErrors, setFormErrors] = useState({});

  const onChangeInputs = (e) => {
    const { value, name } = e.target;

    if (value) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
    handleOnChange(e);
  };

  const onChangeAddress = (name, value) => {
    if (value) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
    handleAddress(name, value);
  };

  const validateForm = (inputs) => {
    let error = {};
    const messError = "Vui lòng điền vào mục này!";
    const formatPhone = /^\d{10,12}$/;

    if (!inputs.name.trim()) {
      error.name = messError;
    }

    if (!inputs.address.city.length) {
      error.city = messError;
    }

    if (!inputs.address.district.length) {
      error.district = messError;
    }

    if (!inputs.address.wards.length) {
      error.wards = messError;
    }

    if (!inputs.address.street.trim()) {
      error.street = messError;
    }

    if (inputs.phone && !formatPhone.test(inputs.phone)) {
      error.phone = "Số điện thoại không hợp lệ!";
    }

    if (!inputs.phone.trim()) {
      error.phone = messError;
    }

    return error;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const deliveryAddress = {
      customerID: customerID,
      name: inputs.name,
      address: {
        city: address.city[0].value,
        district: address.district[0].value,
        wards: address.wards[0].value,
        street: inputs.street,
      },
      phone: inputs.phone,
      note: inputs.note,
      isDefault: inputs.isDefault,
    };

    setFormErrors(validateForm(deliveryAddress));
    !Object.keys(validateForm(deliveryAddress)).length &&
      handleOnSubmit(deliveryAddress);
  };

  return (
    <form className="py-3" onSubmit={(e) => submitForm(e)}>
      <div className="px-3 py-2">
        <input
          type="text"
          placeholder="Họ và tên"
          name="name"
          value={inputs.name}
          className={`input--df p-2 ${formErrors.name ? "input--error" : ""}`}
          onChange={(e) => onChangeInputs(e)}
        />
      </div>
      <div className="px-3 py-2">
        <Select
          className={`custom-select ${
            formErrors.city && "custom-select--error"
          }`}
          classNamePrefix="react-select"
          isClearable={true}
          isSearchable={true}
          name="city"
          value={address.city}
          onChange={(item) => onChangeAddress("city", item)}
          options={city}
          placeholder="Tỉnh/Thành phố"
        />
      </div>
      <div className="px-3 py-2">
        {arrDistrict?.length ? (
          <Select
            className={`custom-select ${
              formErrors.district && "custom-select--error"
            }`}
            classNamePrefix="react-select"
            isClearable={true}
            isSearchable={true}
            name="district"
            options={arrDistrict}
            onChange={(item) => onChangeAddress("district", item)}
            value={address.district}
            placeholder="Quận/Huyện"
            id="district"
          />
        ) : (
          <Select
            className={`custom-select ${
              formErrors.district && "custom-select--error"
            }`}
            classNamePrefix="react-select"
            isDisabled={true}
            value={address.district}
            id="district"
            isClearable={true}
            isSearchable={true}
            onChange={(item) => onChangeAddress("district", item)}
            options={city}
            placeholder="Quận/Huyện"
          />
        )}
      </div>
      <div className="px-3 py-2">
        {arrWards?.length ? (
          <Select
            className={`custom-select ${
              formErrors.wards && "custom-select--error"
            }`}
            classNamePrefix="react-select"
            id="wards"
            isClearable={true}
            isSearchable={true}
            options={arrWards}
            placeholder="Phường/Xã"
            onChange={(item) => onChangeAddress("wards", item)}
            value={address.wards}
          />
        ) : (
          <Select
            className={`custom-select ${
              formErrors.wards && "custom-select--error"
            }`}
            classNamePrefix="react-select"
            isDisabled={true}
            value={address.wards}
            id="wards"
            onChange={(item) => onChangeAddress("wards", item)}
            isClearable={true}
            isSearchable={true}
            options={city}
            placeholder="Phường/Xã"
          />
        )}
      </div>
      <div className="px-3 py-2">
        <input
          className={`input--df p-2 ${formErrors.street ? "input--error" : ""}`}
          type="text"
          name="street"
          placeholder="Địa chỉ cụ thể"
          value={inputs.street}
          onChange={(e) => onChangeInputs(e)}
        />
      </div>
      <div className="px-3 py-2">
        <input
          className={`input--df p-2 ${formErrors.phone ? "input--error" : ""}`}
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={inputs.phone}
          onChange={(e) => onChangeInputs(e)}
        />
      </div>
      <div className="px-3 py-2">
        <input
          className="input--df p-2"
          type="text"
          name="note"
          placeholder="Ghi chú"
          value={inputs.note}
          onChange={(e) => onChangeInputs(e)}
        />
      </div>
      <div className="flex items-center px-3 py-2">
        <input
          disabled={checkDefault ? true : false}
          type="checkbox"
          id="isDefault"
          name="isDefault"
          checked={inputs.isDefault}
          onChange={(e) => onChangeInputs(e)}
          className="cursor-pointer"
        />
        <label htmlFor="isDefault" className="cursor-pointer select-none pl-1">
          Đặt làm địa chỉ mặc định
        </label>
      </div>
      <div className="mt-2 flex justify-center py-2">
        {isSubmitting ? (
          <button
            disabled
            className="btn--df btn--green btn-spinner w-1/4 cursor-wait py-2 px-4"
          >
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </span>
          </button>
        ) : (
          <button className="btn--df btn--green w-1/4 py-2 px-4">
            Hoàn Thành
          </button>
        )}
      </div>
    </form>
  );
};

export default FormAddress;
