import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./OrdersDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shoppingOrder);

  // Fetch order details and open the dialog
  const handleFetchOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId)).then(() => {
      setOpenDetailsDialog(true);
    });
  };

  // Fetch all orders for the user
  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id));
  }, [dispatch, user?.id]);

  // Reset order details when the dialog is closed
  const handleDialogClose = () => {
    setOpenDetailsDialog(false);
    dispatch(resetOrderDetails());
  };

  console.log(orderDetails);
  

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-semibold">
          Order History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        {/* Table for Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Order ID
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Order Date
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Order Status
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Order Price
                </TableHead>
                <TableHead className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="px-4 py-3 text-sm text-gray-700">
                      {orderItem?._id}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-700">
                      {orderItem?.orderDate.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-600"
                            : "bg-yellow-600"
                        } p-1`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-700">
                      ${orderItem?.totalAmount}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <Button
                        className="text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2"
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Cards for Mobile */}
        <div className="sm:hidden space-y-4">
          {orderList && orderList.length > 0 ? (
            orderList.map((orderItem, index) => (
              <Card key={index} className="p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">Order ID</p>
                    <p className="text-sm text-gray-900">{orderItem?._id}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">Order Date</p>
                    <p className="text-sm text-gray-900">
                      {orderItem?.orderDate.split("T")[0]}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">Order Status</p>
                    <Badge
                      className={`${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-600"
                          : "bg-yellow-600"
                      } p-1 text-sm`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">Order Price</p>
                    <p className="text-sm text-gray-900">${orderItem?.totalAmount}</p>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className="text-sm px-3 py-1.5"
                      onClick={() => handleFetchOrderDetails(orderItem?._id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-600 py-4">No orders found.</p>
          )}
        </div>
      </CardContent>

      {/* Dialog for Order Details */}
      <Dialog open={openDetailsDialog} onOpenChange={handleDialogClose}>
        <ShoppingOrderDetailsView orderDetails={orderDetails} />
      </Dialog>
    </Card>
  );
}

export default ShoppingOrders;