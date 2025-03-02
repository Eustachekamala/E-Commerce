import {
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  MapPin,
  Package,
  Phone,
  User,
} from "lucide-react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import PropTypes from "prop-types";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  // Determine the icon and color based on order status
  const orderStatusIcon =
    orderDetails?.orderStatus === "confirmed" ? (
      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
    ) : (
      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
    );

  return (
    <DialogContent className="w-full max-w-[95%] sm:max-w-[400px] bg-white rounded-lg shadow-lg mr-2 sm:mr-0">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold mt-2 flex justify-between">
          Order Details
          <div className="flex items-center space-x-2">
            {orderDetails?.paymentStatus === "paid" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Clock className="h-4 w-4 text-yellow-600" />
            )}
            <span
              className={`${
                orderDetails?.paymentStatus === "paid"
                  ? "text-green-600"
                  : "text-yellow-600"
              } text-sm`}
            >
              Payment Status: {orderDetails?.paymentStatus}
            </span>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="grid gap-3 p-2">
        {/* Order Summary Section */}
        <div className="grid gap-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <h2 className="text-base font-semibold">Order Summary</h2>
            <div className="flex items-center space-x-2 mt-1 sm:mt-0">
              {orderStatusIcon}
              <Badge
                className={`${
                  orderDetails?.orderStatus === "confirmed"
                    ? "text-white bg-green-600 hover:bg-green-700"
                    : "bg-yellow-600 hover:bg-yellow-700 text-white"
                } text-sm`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-medium text-gray-700">Order ID</p>
              </div>
              <Label className="text-sm text-gray-900 mt-1 sm:mt-0">
                {orderDetails?._id}
              </Label>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-medium text-gray-700">Order Date</p>
              </div>
              <Label className="text-sm text-gray-900 mt-1 sm:mt-0">
                {orderDetails?.orderDate.split("T")[0]}
              </Label>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <p className="text-sm font-medium text-gray-700">Order Price</p>
              </div>
              <Label className="text-sm text-gray-900 mt-1 sm:mt-0">
                $ {orderDetails?.totalAmount}
              </Label>
            </div>
          </div>
        </div>

        <Separator className="my-2" />

        {/* Order Details Section */}
        <div className="grid gap-2">
          <h3 className="text-base font-semibold">Order Details</h3>
          <ul className="grid gap-1">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item) => (
                  <li
                    key={item?._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-1 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{item?.title}</span>
                    <span className="text-sm text-gray-700">
                      {item?.quantity}
                    </span>
                    <span className="text-sm font-medium text-gray-900 mt-1 sm:mt-0">
                      $ {item?.price}
                    </span>
                  </li>
                ))
              : null}
          </ul>
        </div>

        {/* Total Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 bg-gray-50 rounded-lg">
          <p className="text-sm font-semibold text-gray-700">Total</p>
          <Label className="text-base font-bold text-gray-900 mt-1 sm:mt-0">
            $ {orderDetails?.totalAmount}
          </Label>
        </div>

        {/* Shopping Info Section */}
        <div className="grid gap-2">
          <h3 className="text-base font-semibold">Shopping Info</h3>
          <div className="grid gap-1 bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{user?.userName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                {orderDetails?.addressInfo?.address}, {orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.pincode}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                {orderDetails?.addressInfo?.phone}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                Payment Method: {orderDetails?.paymentMethod}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

ShoppingOrderDetailsView.propTypes = {
  orderDetails: PropTypes.any,
};

export default ShoppingOrderDetailsView;