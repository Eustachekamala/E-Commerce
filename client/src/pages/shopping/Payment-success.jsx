import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-blue-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden text-center">
                <div className="p-8">
                    {/* Success Icon */}
                    <div className="flex items-center justify-center">
                        <CheckCircle className="h-16 w-16 text-green-600" />
                    </div>

                    {/* Success Message */}
                    <h1 className="mt-6 text-2xl font-bold text-gray-800">
                        Payment Successful!
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Thank you for your purchase. Your payment has been processed successfully.
                    </p>

                    {/* Button to Redirect */}
                    <div className="mt-8">
                        <Button
                            onClick={() => navigate("/shop/account")}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccessPage;