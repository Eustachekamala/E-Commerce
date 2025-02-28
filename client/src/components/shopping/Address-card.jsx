import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import PropTypes from "prop-types";

function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress }) {
  // Construct the Google Maps URL for the address
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${addressInfo.address}, ${addressInfo.city}, ${addressInfo.pincode}`
  )}`;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        {/* Google Maps Link */}
        <div className="space-y-1">
          <Label className="font-semibold">Location: {" "}</Label>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            View on Google Maps
          </a>
        </div>

        {/* Address Details */}
        <div className="space-y-1">
          <Label className="font-semibold">Address:</Label>
          <p className="text-sm text-gray-700">
            {addressInfo?.address}, {addressInfo?.city}, {addressInfo?.pincode}
          </p>
        </div>

        {/* Contact Details */}
        <div className="space-y-1">
          <Label className="font-semibold">Contact:</Label>
          <p className="text-sm text-gray-700">{addressInfo?.phone}</p>
        </div>

        {/* Additional Notes */}
        <div className="space-y-1">
          <Label className="font-semibold">Notes:</Label>
          <p className="text-sm text-gray-700">{addressInfo?.notes}</p>
        </div>
      </CardContent>

      {/* Footer with Edit and Delete Buttons */}
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

AddressCard.propTypes = {
  addressInfo: PropTypes.object.isRequired,
  handleDeleteAddress: PropTypes.func.isRequired,
  handleEditAddress: PropTypes.func.isRequired,
};

export default AddressCard;