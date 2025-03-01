import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { capturePaymentOrder } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react"; // For a loading spinner

function PaypalReturnPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");

    useEffect(() => {
        if (paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
            dispatch(capturePaymentOrder({ paymentId, payerId, orderId })).then((data) => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem("currentOrderId");
                    window.location.href = "/shop/payment-success";
                } else {
                    window.location.href = "/shop/payment-failed";
                }
            }).catch(() => {
                window.location.href = "/shop/payment-failed";
            });
        }
    }, [paymentId, payerId, dispatch]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-4">
            <Card className="w-full max-w-md shadow-lg rounded-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <CardTitle className="text-white text-2xl font-bold text-center">
                        Processing Payment...
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                        <p className="text-gray-600 text-center">
                            Please wait while we process your payment. This may take a few seconds.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default PaypalReturnPage;