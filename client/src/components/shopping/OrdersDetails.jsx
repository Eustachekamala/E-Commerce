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
import { DialogContent } from "../ui/dialog";

function ShoppingOrderDetailsView() {
  return (
    <DialogContent className="w-full max-w-[95%] sm:max-w-[500px] bg-white rounded-lg shadow-lg mr-2 sm:mr-0">
      <div className="grid gap-4 sm:gap-2 p-4 sm:p-2">
        {/* Order Summary Section */}
        <div className="grid gap-3 sm:gap-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold">Order Summary</h2>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-300" />
              <Label className="text-sm sm:text-base text-orange-300">
                In Process
              </Label>
            </div>
          </div>

          <div className="grid gap-2 sm:gap-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-gray-500" />
                <p className="text-sm sm:text-base font-medium text-gray-700">
                  Order ID
                </p>
              </div>
              <Label className="text-sm sm:text-base text-gray-900 mt-1 sm:mt-0">
                123456
              </Label>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <p className="text-sm sm:text-base font-medium text-gray-700">
                  Order Date
                </p>
              </div>
              <Label className="text-sm sm:text-base text-gray-900 mt-1 sm:mt-0">
                28/02/2025
              </Label>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <p className="text-sm sm:text-base font-medium text-gray-700">
                  Order Price
                </p>
              </div>
              <Label className="text-sm sm:text-base text-gray-900 mt-1 sm:mt-0">
                $ 2000
              </Label>
            </div>
          </div>
        </div>
        <Separator className="my-3 sm:my-2" />
        {/* Order Details Section */}
        <div className="grid gap-3 sm:gap-4">
          <h3 className="text-lg sm:text-xl font-semibold">Order Details</h3>
          <ul className="grid gap-2 sm:gap-3">
            <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-1.5 bg-gray-50 rounded-lg">
              <span className="text-sm sm:text-base text-gray-700">
                Product One
              </span>
              <span className="text-sm sm:text-base font-medium text-gray-900 mt-1 sm:mt-0">
                $ 2000
              </span>
            </li>
          </ul>
        </div>
        {/* Total Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-3 bg-gray-50 rounded-lg">
          <p className="text-sm sm:text-base font-semibold text-gray-700">
            Total
          </p>
          <Label className="text-lg sm:text-xl font-bold text-gray-900 mt-1 sm:mt-0">
            $ 2000
          </Label>
        </div>

        {/* Shopping Info Section */}
        <div className="grid gap-3 sm:gap-4">
          <h3 className="text-lg sm:text-xl font-semibold">Shopping Info</h3>
          <div className="grid gap-2 sm:gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm sm:text-base text-gray-700">
                Eustache kamala
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm sm:text-base text-gray-700">
                123 Main St, Springfield
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm sm:text-base text-gray-700">
                Springfield, IL
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm sm:text-base text-gray-700">62701</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm sm:text-base text-gray-700">
                +1 234 567 890
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <span className="text-sm sm:text-base text-gray-700">
                Payment Method: PayPal
              </span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
