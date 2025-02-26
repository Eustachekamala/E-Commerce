import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";

function UserCartItemsContent({ cartItems }) {
  return (
    <div className="flex items-center space-x-4">
      <img
        className="w-20 h-20 rounded object-cover"
        src={cartItems?.image}
        alt={cartItems?.title}
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            className="w-8 h-8 rounded-full"
            variant="outline"
            size="icon"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItems?.quantity}</span>
          <Button
            className="w-8 h-8 rounded-full"
            variant="outline"
            size="icon"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-semibold">
          {" "}
          ${(
            (cartItems?.salePrice > 0
              ? cartItems?.salePrice
              : cartItems?.price) * cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash className="cursor-pointer mt-1" size={20}/>
      </div>
    </div>
  );
}

UserCartItemsContent.propTypes = {
  cartItems: PropTypes.array,
};

export default UserCartItemsContent;
