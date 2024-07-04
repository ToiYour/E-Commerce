import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Breadcrumd from "../Breadcrumd";
import QuantityCart from "./QuantityCart";

import GoodsClassification from "./GoodsClassification";
import { useCart } from "@/hooks/cart";
import { cn, formatMoney, ToastError } from "@/lib/utils";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IVariantsDetail } from "@/interfaces/variant";
import { Ticket } from "lucide-react";
import Voucher from "./Voucher";
import { removeItemsCart } from "@/services/cart";
import { ICart } from "@/interfaces/cart";
import { AxiosError } from "axios";

const Carts = () => {
  const { cartState, setCartState } = useCart();
  const [purchase, setPurchase] = useState({
    state: [] as string[],
    voucherId: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [totalPayment, setTotalPayment] = useState({
    totalQuantity: 0,
    totalPrice: 0,
  });
  const [discount, setDiscount] = useState({
    value: 0,
    isPercentage: false,
    id: "",
  });
  const navigate = useNavigate();
  const [URLSearchParams] = useSearchParams();
  const itemKeys = URLSearchParams.get("itemKeys");
  const handleCheckAll: ChangeEventHandler<HTMLInputElement> = (e) => {
    const itemsCheckbox = Array.from(
      document.querySelectorAll(".cart-wrapper input[type=checkbox]")
    ) as HTMLInputElement[];
    itemsCheckbox.forEach((item) => {
      if (e.target.checked) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
    handleTotalPayment();
  };
  const handleCheckboxItem = () => {
    const listItemCheckbox = Array.from(
      document.querySelectorAll(".cart-body .item-checkbox")
    ) as HTMLInputElement[];
    const checkboxAll = Array.from(
      document.querySelectorAll(".cart-wrapper .item-cart-checkbox-all")
    ) as HTMLInputElement[];
    const isCheckAll = listItemCheckbox.every((item) => item.checked === true);
    checkboxAll.forEach((item) => {
      if (isCheckAll) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
    handleTotalPayment();
  };
  const handleTotalPayment = () => {
    const allCheckboxes = Array.from(
      document.querySelectorAll(".cart-body .item-checkbox")
    ) as HTMLInputElement[];
    const checkedCheckboxes = allCheckboxes.filter((checkbox) => {
      if (checkbox.checked) {
        return checkbox.value;
      }
    });

    const valueCheckboxes = checkedCheckboxes.map((checked) => checked.value);
    if (valueCheckboxes.length <= 0 && isChecked) {
      setDiscount({
        value: 0,
        isPercentage: false,
        id: "",
      });
      setPurchase({ state: [], voucherId: "" });
      setIsChecked(false);
    } else if (valueCheckboxes.length > 0) {
      setPurchase((prev) => ({
        ...prev,
        voucherId: discount.id,
        state: valueCheckboxes as string[],
      }));
      setIsChecked(true);
    }

    const totalPayment = cartState?.items.reduce(
      (result, item) => {
        if (valueCheckboxes.includes(item._id)) {
          return {
            totalQuantity: result.totalQuantity + item.quantity,
            totalPrice:
              result.totalPrice +
              (item.quantity * Number(item.productId.price) +
                Number(item.selectedVariant.extra_price)),
          };
        }
        return result;
      },
      {
        totalQuantity: 0,
        totalPrice: 0,
      }
    );
    const totalDiscount = discount.isPercentage
      ? Number(totalPayment?.totalPrice || 0) -
        (Number(totalPayment?.totalPrice || 0) * discount.value) / 100
      : Number(totalPayment?.totalPrice) - discount.value;
    const result = {
      ...totalPayment,
      totalPrice: totalDiscount,
    };

    setTotalPayment(result as { totalPrice: number; totalQuantity: number });
  };
  useEffect(() => {
    handleTotalPayment();
  }, [cartState, discount]);
  const handleRemoveItemsCart = async (id?: string) => {
    try {
      if (id) {
        const { data } = await removeItemsCart(id);
        setCartState?.(data?.data as ICart);
      } else {
        const { data } = await removeItemsCart(purchase.state);
        setCartState?.(data?.data as ICart);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.message);
      }
    }
  };
  const handlePurchase = () => {
    if (purchase.state.length <= 0) {
      ToastError("Bạn vẫn chưa chọn sản phẩm nào để mua.");
      return;
    }
    const discountParams =
      purchase.voucherId != "" ? `&discount=${purchase.voucherId}` : "";
    const url = `/checkout?state=${purchase.state.join(",")}${discountParams}`;
    navigate(url);
  };
  return (
    <div>
      <Breadcrumd
        breadcrumbs={[
          {
            title: "Trang chủ",
            urlLink: `/`,
          },
        ]}
        page="Giỏ hàng"
      />
      <div className="bg-gray-50 py-10">
        {Number(cartState?.items?.length) <= 0 ? (
          <div className="flex flex-col items-center justify-center">
            <img src="images/no-cart.png" alt="" className="w-28" />
            <span className="text-[#00000066] font-semibold">
              Giỏ hàng của bạn còn trống
            </span>
            <Link
              to={"/shop"}
              className="px-5 py-1.5 rounded text-white bg-[#ee4d2d] mt-3"
            >
              Mua ngay
            </Link>
          </div>
        ) : (
          <div className="cart-wrapper max-w-screen-xl mx-auto">
            <Table>
              <TableHeader className="bg-white border-b-8 border-gray-50 ">
                <TableRow className="hover:bg-white">
                  <TableHead className="w-10">
                    <input
                      onChange={handleCheckAll}
                      type="checkbox"
                      name=""
                      id=""
                      className="item-cart-checkbox-all size-4 mt-1.5 accent-[#ee4d2d]"
                    />
                  </TableHead>
                  <TableHead className="">Sản phẩm</TableHead>
                  <TableHead>Đơn giá</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="cart-body bg-white *:hover:bg-white">
                {cartState?.items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <input
                        defaultChecked={item._id == itemKeys}
                        onChange={handleCheckboxItem}
                        type="checkbox"
                        name=""
                        id=""
                        value={item._id}
                        className="item-checkbox size-4 mt-1.5 accent-[#ee4d2d]"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 ">
                        <a href="">
                          <img
                            src={item.productId.images?.[0]}
                            alt=""
                            className="size-20 object-cover"
                          />
                        </a>
                        <div className="">
                          <Link
                            to={`/shop/${item.productId.slug}`}
                            className="line-clamp-2 w-52"
                          >
                            {item.productId.name}
                          </Link>

                          <div className="cursor-pointer">
                            <GoodsClassification
                              id={item._id}
                              productId={item.productId._id as string}
                              varians={
                                item.productId.variants as IVariantsDetail[]
                              }
                              selectedVariants={
                                item.selectedVariant as IVariantsDetail
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatMoney(item.productId.price || 0)}
                    </TableCell>
                    <TableCell>
                      <QuantityCart
                        maxTotal={item.selectedVariant.stock || 0}
                        defaultQuantity={item.quantity}
                        itemId={item._id}
                      />
                    </TableCell>
                    <TableCell className="text-[#ee4d2d]">
                      {formatMoney(
                        ((item.productId.price as number) +
                          (item.selectedVariant.extra_price || 0)) *
                          item.quantity || 0
                      )}
                    </TableCell>
                    <TableCell
                      className="w-24 cursor-pointer"
                      onClick={() => handleRemoveItemsCart(item._id)}
                    >
                      Xoá
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="sticky bottom-0  bg-white px-5  border-t border-gray-100 shadow-[0px_-3px_5px_#0000000f] ">
              <div className="flex items-center justify-end py-3 gap-20 border-b border-gray-100 border-dashed">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Ticket color="#ee4d2d" strokeWidth={1.2} />
                    <p className="text-[#222]">Toinh Voucher</p>
                  </div>
                  <span
                    className={cn(
                      "text-[#ee4d2d] text-sm mt-0.5",
                      !discount.value && "hidden"
                    )}
                  >
                    Giảm{" "}
                    {discount?.isPercentage
                      ? `${discount.value}%`
                      : formatMoney(discount?.value)}{" "}
                    cho toàn bộ đơn hàng
                  </span>
                </div>
                <Voucher
                  defaultVoucher={discount.id}
                  setDiscount={setDiscount}
                  totalPriceOrder={totalPayment.totalPrice}
                />
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-5">
                  <input
                    onChange={handleCheckAll}
                    type="checkbox"
                    name=""
                    id="checkboxAllCart"
                    className="item-cart-checkbox-all size-4  accent-[#ee4d2d]"
                  />
                  <label htmlFor="checkboxAllCart" className="cursor-pointer">
                    Chọn tất cả ({cartState?.totalQuantity})
                  </label>
                  <button onClick={() => handleRemoveItemsCart()}>Xoá</button>
                </div>
                <div className="flex items-center gap-5">
                  <p>
                    Tổng thanh toán ({totalPayment?.totalQuantity || 0} sản
                    phẩm):{" "}
                    <span className="text-[#ee4d2d]">
                      {formatMoney(totalPayment?.totalPrice || 0)}
                    </span>
                  </p>
                  <button
                    onClick={handlePurchase}
                    className="px-9 py-2 bg-[#ee4d2d] text-white font-light text-base rounded"
                  >
                    Mua Hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carts;
