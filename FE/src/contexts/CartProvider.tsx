import LoadingFixed from "@/components/LoadingFixed";
import { useAuth } from "@/hooks/auth";
import { ICart } from "@/interfaces/cart";
import { getMyShoppingCart } from "@/services/cart";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
type GroupedVariants = {
  [productId: string]: {
    colorId: string[];
    sizeId: string[];
  };
};
type CartContextType = {
  cartState?: ICart | undefined;
  setCartState?: Dispatch<SetStateAction<ICart | undefined>>;
  variantExits?: GroupedVariants;
};

export const CartContext = createContext<CartContextType>({});
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const [variantExits, setVariantExits] = useState<GroupedVariants>();
  const [cartState, setCartState] = useState<ICart | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        try {
          const { data } = await getMyShoppingCart();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const groupedVariants = data?.data?.items?.reduce(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (acc: any, item: any) => {
              const productId = item.productId._id;
              const colorId = item.selectedVariant.colorId._id;
              const sizeId = item.selectedVariant.sizeId._id;

              if (!acc[productId]) {
                acc[productId] = {
                  colorId: [],
                  sizeId: [],
                };
              }

              if (!acc[productId].colorId.includes(colorId)) {
                acc[productId].colorId.push(colorId);
              }

              if (!acc[productId].sizeId.includes(sizeId)) {
                acc[productId].sizeId.push(sizeId);
              }

              return acc;
            },
            {}
          );
          setVariantExits(groupedVariants);
          setCartState(data.data);
        } catch (error) {
          // if (error instanceof AxiosError) {
          //   ToastError(error.message);
          // }
        }
      } else {
        setCartState(undefined);
      }
    })();
    setLoading(false);
  }, [isLoggedIn]);
  const value = { cartState, setCartState, variantExits };
  if (loading) {
    return <LoadingFixed />;
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
