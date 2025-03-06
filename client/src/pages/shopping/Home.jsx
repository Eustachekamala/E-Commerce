import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Shirt,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping/Product-title";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addtoCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping/ProductDetails";

const categoriesWithIcons = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcons = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: CloudLightning },
  { id: "puma", label: "Puma", icon: BabyIcon },
  { id: "levi", label: "Levi's", icon: WatchIcon },
  { id: "zara", label: "Zara", icon: UmbrellaIcon },
  { id: "h&m", label: "H&M", icon: UmbrellaIcon },
];

function ShoppingHome() {
  const { user } = useSelector((state) => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerOne, bannerTwo, bannerThree];
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { productList, productDetails } = useSelector((state) => state.shoppingProducts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  function handleAddToCart(getCurrentProductId) {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen py-16">
      {/* Image Slider Section */}
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Banner ${index + 1}`}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white/90"
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white/90"
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Category Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categoriesWithIcons.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
              >
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <categoryItem.icon className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-4 text-primary" />
                  <span className="text-sm sm:text-base font-bold">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brandsWithIcons.map((brandItem) => (
              <Card
                key={brandItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
              >
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <brandItem.icon className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-4 text-primary" />
                  <span className="text-sm sm:text-base font-bold">
                    {brandItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Feature Products
        </h2>
        <div className="grid grid-cols-2 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddToCart={handleAddToCart}
                  key={productItem.id}
                  product={productItem}
                />
              ))
            : null}
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
