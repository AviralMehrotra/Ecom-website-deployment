import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  function handleAddToCart(getCurrentProductId) {
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
          title: "Product added to cart",
        });
      }
    });
  }
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] max-h-[95vh] sm:max-w-[80vw] sm:max-h-[70vw] lg:max-w-[70vw] lg:max-h-[95vh] overflow-auto">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="">
            <DialogTitle className="text-3xl font-extrabold">
              {productDetails?.title}
            </DialogTitle>
            {/* <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1> */}
            <p className="text-muted-foreground text-l mb-5 mt-4 overflow-auto">
              {productDetails?.description}
            </p>
            <div className="flex items-center justify-between">
              <p
                className={` text-3xl font-bold text-primary ${
                  productDetails?.salePrice > 0 ? "line-through" : ""
                }`}
              >
                ₹{productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-3xl font-bold text-muted-foreground">
                  ₹{productDetails?.salePrice}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
              </div>
              <span className="text-muted-foreground">(4.5)</span>
            </div>
            <div className="mt-5 mb-5">
              <Button
                className="w-full"
                onClick={() => handleAddToCart(productDetails?._id)}
              >
                Add to Cart
              </Button>
            </div>
            <Separator />
            <div className="max-h-[300px] overflow-auto">
              <h2 className="text-xl font-bold mb-4 mt-2">Reviews</h2>
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex item-center gap-2">
                      <h3 className="font-semibold">Aviral Mehrotra</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                    </div>
                    <p className="text-muted-foreground">Nice Product</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex item-center gap-2">
                      <h3 className="font-semibold">Aviral Mehrotra</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                    </div>
                    <p className="text-muted-foreground">Nice Product</p>
                  </div>
                </div>
                {/* <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex item-center gap-2">
                      <h3 className="font-semibold">Aviral Mehrotra</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                    </div>
                    <p className="text-muted-foreground">Nice Product</p>
                  </div>
                </div> */}
              </div>
              <div className="mt-6 flex gap-2">
                <Input placeholder="Write a review..." />
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductDetailsDialog;