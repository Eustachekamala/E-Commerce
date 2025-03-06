import ShoppingProductTile from "@/components/shopping/Product-title";
import ProductDetailsDialog from "@/components/shopping/ProductDetails";
import { Input } from "@/components/ui/input";
import { addtoCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResult, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

function Search() {
  const [keyword, setKeyword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { productDetails } = useSelector(state => state.shoppingProducts)
  const dispatch = useDispatch();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { searchResults } = useSelector((state) => state.shoppingSearch);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      const delayDebounceFn = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResult(keyword));
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    } else {
      dispatch(resetSearchResults());
    }
  }, [keyword, dispatch, setSearchParams]);

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast(`Only ${getQuantity} quantity can be added for this item`, {
            style: {
              backgroundColor: "white",
              color: "red",
            },
          });
          return;
        }
      }
    }

    dispatch(
      addtoCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    )
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast.success("Product added to the cart successfully", {
            style: {
              background: "white",
              color: "green",
            },
          });
        } else {
          toast.error("Failed to add product to cart", {
            style: {
              background: "white",
              color: "red",
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        toast.error("An error occurred while adding to cart", {
          style: {
            background: "white",
            color: "red",
          },
        });
      });
  }

   useEffect(() =>{
          if(productDetails !== null){
              setOpenDetailsDialog(true)
          }
      },[productDetails])
  
  
      const handleGetProductDetails = (getCurrentProductId) => {
          dispatch(fetchProductDetails(getCurrentProductId))
      }

  return (
    <div className="container mx-auto md:px-6 px-4 py-20">
      {/* Search Input Section */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-2xl flex items-center shadow-lg rounded-lg overflow-hidden">
          <Input
            value={keyword}
            className="py-4 px-6 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search Products..."
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>
      </div>

      {/* Search Results Section */}
      <div className="grid grid-cols-2 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((item) => (
            <ShoppingProductTile
              handleAddToCart={handleAddToCart}
              handleGetProductDetails={handleGetProductDetails}
              key={item._id}
              product={item}
            />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center h-64">
            <h1 className="text-3xl font-bold text-gray-500">
              No results found
            </h1>
          </div>
        )}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default Search;
