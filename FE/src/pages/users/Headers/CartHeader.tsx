import { useAuth } from "@/hooks/auth";
import { useCart } from "@/hooks/cart";
import { cn, formatMoney } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CartHeader = () => {
  const navigate = useNavigate();
  const { cartState } = useCart();
  const { isLoggedIn } = useAuth();
  return (
    <div
      onClick={(e) => {
        const element = e.target as HTMLElement;
        if (
          element.classList.contains("ph-handbag") ||
          element.classList.contains("cart-quantity")
        ) {
          isLoggedIn ? navigate("/cart") : navigate("buyer/login");
        }
      }}
      className="group max-md:hidden cart-icon flex items-center relative cursor-pointer "
    >
      <ShoppingCart className="ph-bold ph-handbag" />
      <span className="quantity cart-quantity absolute left-3 -top-2.5 border-2 border-white text-xs  text-white bg-[#ee4d2d] px-1 py-0.5 min-w-4 min-h-4 flex items-center justify-center rounded-full">
        {cartState?.totalQuantity || 0}
      </span>

      <div
        className={cn(
          "hidden group-hover:block absolute top-9 w-96 h-auto max-h-80 shadow-lg bg-white right-0 rounded-t after:content-[''] after:absolute after:inset-x-0 after:h-5 after:-top-5"
        )}
      >
        {!cartState?.totalQuantity ? (
          <div className="w-full h-full flex items-center justify-center">
            <div>
              <img
                src="/images/no-cart.png"
                alt=""
                className="w-28 h-auto mx-auto"
              />
              <p className="text-center text-[#00000042] text-base">
                Chưa có sản phẩm
              </p>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-[#00000042] text-sm h-10 leading-10 px-3">
              Sản phẩm mới thêm
            </h3>
            <div
              className={cn(
                "flex flex-col  overflow-hidden px-3",
                cartState.items.length > 3 ? "h-[230px]" : "h-auto"
              )}
            >
              <ul className="flex-grow py-2 overflow-y-auto scrollbar-css">
                {cartState?.items.map((item) => (
                  <li
                    key={item._id}
                    className="hover:bg-gray-50 mb-2 last:mb-0"
                  >
                    <Link
                      to={`/shop/${item.productId.slug}`}
                      className="flex items-start justify-between"
                    >
                      <div className="flex items-start gap-2">
                        <div className="size-10">
                          <img
                            src={item.productId.images?.[0]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="flex-1 line-clamp-1 text-base">
                          {item.productId.name}
                        </p>
                      </div>
                      <span className="text-[#ee4d2d]">
                        {formatMoney(item.productId.price || 0)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex-shrink-0 flex items-center justify-end pt-3 pb-2">
                <Link
                  to={"/cart"}
                  className="capitalize font-medium text-white bg-[#ee4d2d] px-5 py-1 rounded-sm"
                >
                  Xem giỏ hàng
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartHeader;
