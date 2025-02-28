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

  // Only check address limit when adding a new address (not editing)
  if (currentEditedId === null && addressList.length >= 3) {
    toast.error("You can add just 3 addresses", {
      style: {
        background: "white",
        color: "red",
      },
    });
    return;
  }

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
              color: "green",
            },
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Failed to update address", {
          style: {
            background: "white",
            color: "red",
          },
        });
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
              color: "green",
            },
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Failed to add address", {
          style: {
            background: "white",
            color: "red",
          },
        });
      });
  }
};

  const handleDeleteAddress = (getCurrentAddress) => {
    setIsLoading(true);
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    )
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddress(user?.id));
          toast.success("Address deleted successfully", {
            style: {
              background: "white",
              color: "green",
            },
          });
        }
      })
      .catch(() => {
        toast.error("Failed to delete address", {
          style: {
            background: "white",
            color: "red",
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch, user?.id]);

  return (
    <Card className="p-4 sm:p-6">
      {/* Address List Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Your Addresses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addressList && addressList.length > 0 ? (
            addressList.map((address) => (
              <AddressCard
                key={address._id}
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
            buttonText={currentEditedId !== null ? "Edit" : "Add"}
            onSubmit={handleManageAddress}
            isButtonDisabled={!isFormValid() || isLoading}
          />
        </CardContent>
      </div>
    </Card>
  );
}

export default Address;