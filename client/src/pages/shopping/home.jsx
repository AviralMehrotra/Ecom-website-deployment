import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.png";
import bannerTwo from "../../assets/banner-2.png";
import bannerThree from "../../assets/banner-3.png";
import bajaj from "../../assets/Icons/bajaj.jpg";
import havells from "../../assets/Icons/havells.jpg";
import maharaja from "../../assets/Icons/maharaja.png";
import phillips from "../../assets/Icons/phillips.png";
import sujata from "../../assets/Icons/sujata.png";
import crompton from "../../assets/Icons/crompton.jpg";
import eureka from "../../assets/Icons/eureka.png";
import indo from "../../assets/Icons/indo.jpg";
import kent from "../../assets/Icons/kent.png";
import livpure from "../../assets/Icons/livpure.png";
import luminous from "../../assets/Icons/luminous.png";
import symphony from "../../assets/Icons/symphony.png";
import vansal from "../../assets/Icons/vansal.jpg";
import vguard from "../../assets/Icons/vguard.png";
import microtek from "../../assets/Icons/microtek.png";
import {
  BatteryCharging,
  Cctv,
  ChevronLeftIcon,
  ChevronRightIcon,
  CookingPot,
  Droplets,
  Lightbulb,
  Power,
  Snowflake,
  Sparkles,
  Sun,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping/product-details";

const categoriesWithIcon = [
  { id: "kitchenAppl", label: "Kitchen Appliances", icon: CookingPot },
  { id: "battery", label: "Battery and Inverters", icon: Power },
  { id: "summerProd", label: "Summer Essentials", icon: Sun },
  { id: "winterProd", label: "Winter Essentials", icon: Snowflake },
  { id: "securitySystem", label: "Security Systems", icon: Cctv },
  { id: "lighting", label: "Lighting", icon: Lightbulb },
  { id: "purifier", label: "Water Purifier", icon: Droplets },
  { id: "personalCare", label: "Personal Care", icon: Sparkles },
];

const brandsWithIcon = [
  { id: "bajaj", label: "Bajaj", icon: bajaj },
  { id: "havells", label: "Havells", icon: havells },
  { id: "sujata", label: "Sujata", icon: sujata },
  { id: "maharaja", label: "Maharaja", icon: maharaja },
  { id: "phillips", label: "Phillips", icon: phillips },
  { id: "microtek", label: "Microtek", icon: microtek },
  { id: "livpure", label: "Livpure", icon: luminous },
  { id: "luminous", label: "Luminous", icon: livpure },
  { id: "indo", label: "Indo", icon: indo },
  { id: "symphony", label: "Symphony", icon: symphony },
  { id: "crompton", label: "Crompton", icon: crompton },
  { id: "vguard", label: "V-Guard", icon: vguard },
  { id: "vansal", label: "Vansal", icon: vansal },
  { id: "kent", label: "Kent", icon: kent },
  { id: "eureka", label: "Eureka", icon: eureka },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const slides = [bannerOne, bannerTwo, bannerThree];

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [slides]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "title-atoz",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[200px] lg:h-[700px] md:h-[500px] sm:h-[300px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          {/*here below grid-cols-5 defines how many icons can be there if you want to add more icons to home you can increase it*/}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={categoryItem.id}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          {/*here below grid-cols-5 defines how many icons can be there if you want to add more icons to home you can increase it*/}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={brandItem.id}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {/* <brandItem.icon className="w-12 h-12 mb-4 text-primary" /> */}
                  <img
                    src={brandItem.icon}
                    alt={`${brandItem.label} Icon`}
                    className="w-[15vh] h-12 mb-4 object-contain"
                  />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem?._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
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
