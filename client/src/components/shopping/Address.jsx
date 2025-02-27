import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/Form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  fetchAllAddress,
  deleteAddress,
  updateAddress,
} from "@/store/shop/address-slice";
import { toast } from "sonner";
import AddressCard from "./Address-card";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address() {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shoppingAddress);
  const [isLoading, setIsLoading] = useState(false);

  const handleManageAddress = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (currentEditedId !== null) {
      // Editing an existing address
      dispatch(
        updateAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        })
      )
        .then((data) => {
          setIsLoading(false);
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.success("Address updated successfully", {
              style: {
                background: "white",
                color: "black",
              },
            });
          }
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("Failed to update address");
        });
    } else {
      // Adding a new address
      dispatch(
        addAddress({
          ...formData,
          userId: user?.id,
        })
      )
        .then((data) => {
          setIsLoading(false);
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setFormData(initialAddressFormData);
            toast.success("Address created successfully", {
              style: {
                background: "white",
                color: "black",
              },
            });
          }
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("Failed to add address");
        });
    }
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        toast.success("Address deleted successfully", {
          style: {
            background: "white",
            color: "black",
          },
        });
      }
    });
  };

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch, user?.id]);

  return (
    <Card className="p-4 sm:p-6">
      {/* Address List Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Your Addresses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {addressList && addressList.length > 0 ? (
            addressList.map((address) => (
              <AddressCard
                key={address.id}
                addressInfo={address}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
              />
            ))
          ) : (
            <p className="text-gray-500">
              No addresses found. Add a new address below.
            </p>
          )}
        </div>
      </div>

      <div>
        <CardHeader className="text-xl font-bold mb-4 p-0">
          <CardTitle>
            {currentEditedId !== null ? "Edit Address" : "Add New Address"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
            onSubmit={handleManageAddress}
            isButtonDisabled={!isFormValid() || isLoading}
            />
        </CardContent>
      </div>
    </Card>
  );
}

export default Address;
