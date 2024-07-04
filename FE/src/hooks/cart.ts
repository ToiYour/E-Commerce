import { CartContext } from "@/contexts/CartProvider";
import { ToastError, ToastSuccess } from "@/lib/utils";
import { addToCartAPI } from "@/services/cart";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
type AddToCartOrBuyNowType = {
  colorId: string;
  sizeId: string;
  quantity: number;
};
export const useCart = () => {
  return useContext(CartContext);
};
export const useAddToCartOrBuyNow = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const { setCartState } = useCart();
  const navigate = useNavigate();

  const handleAddToCartOrBuyNow = async (
    action: string,
    payload: AddToCartOrBuyNowType
  ) => {
    setLoading(true);
    try {
      const { data } = await addToCartAPI({ ...payload, slug: slug as string });
      setCartState?.(data.data);

      if (action === "buyNow") {
        navigate(`/cart?itemKeys=${data.data.items[0]._id}`);
      } else {
        ToastSuccess(data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
    return loading;
  };

  return { handleAddToCartOrBuyNow, loading };
};
