import { XCircle } from "lucide-react"; 
import { Button } from "@/components/ui/button"; 
import { useNavigate } from "react-router-dom"; 

function PaymentFaildPage() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-50 to-pink-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden text-center">
                <div className="p-8">
                    {/* Error Icon */}
                    <div className="flex items-center justify-center">
                        <XCircle className="h-16 w-16 text-red-600" />
                    </div>

                    {/* Error Message */}
                    <h1 className="mt-6 text-2xl font-bold text-gray-800">
                        Payment Failed!
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Unfortunately, your payment could not be processed. Please try again or contact support.
                    </p>

                    {/* Button to Redirect */}
                    <div className="mt-8">
                        <Button
                            onClick={() => navigate("/shop/checkout")}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentFaildPage;