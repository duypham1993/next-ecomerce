import UpdateAddress from "../UpdateAddress/UpdateAddress";

const AddressItemOrderPage = ({ address, index, choose, handleOnChange }) => {
  return (
    <div className="border-t px-6 first:border-t-0">
      <div className="my-4 flex justify-between">
        <div className="flex">
          <div className="pr-3 pt-1">
            <input
              type="radio"
              name="choose"
              value={address._id}
              id={index}
              checked={choose === address._id}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <label htmlFor={index}>
            <div>
              <span className="font-bold">{address.name}</span>
              <span> | {address.phone}</span>
            </div>
            <div>
              <span>
                {`${address.address.street}, ${address.address.wards}, ${address.address.district}, ${address.address.city}`}
              </span>
            </div>
            {address.isDefault && (
              <div className="pt-2">
                <span className="inline-block border border-green py-1 px-2 text-green">
                  Mặc định
                </span>
              </div>
            )}
          </label>
        </div>
        <div className="w-1/4 sm:w-1/6">
          <UpdateAddress deliveryAddress={address} isOrderPage={true} />
        </div>
      </div>
    </div>
  );
};

export default AddressItemOrderPage;
