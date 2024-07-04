import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IVariantsDetail } from "@/interfaces/variant";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ListColor from "../DetailProducts/ListColor";
import ListSize from "../DetailProducts/ListSize";
import { updateVariantItemCart } from "@/services/cart";
import { useCart } from "@/hooks/cart";
import { ICart } from "@/interfaces/cart";
import { ToastError, ToastSuccess } from "@/lib/utils";
import { AxiosError } from "axios";
type GoodsClassificationType = {
  id: string;
  productId: string;
  varians: IVariantsDetail[];
  selectedVariants: IVariantsDetail;
};
const GoodsClassification = ({
  id,
  productId,
  varians,
  selectedVariants,
}: GoodsClassificationType) => {
  const { setCartState } = useCart();
  const [chooseColorId, setChooseColorId] = useState(""); // Id màu biến thể sản phẩm
  const [chooseSizeId, setChooseSizeId] = useState(""); //Id size biến thể sản phẩm
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const listSizeExist = [""];
    const listColorExist = [""];
    varians.forEach((variant) => {
      handleSizeDisabled(variant, listSizeExist);
      handleColorDisabled(variant, listColorExist);
    });
  }, [chooseSizeId, chooseColorId, open]);
  const handleSizeDisabled = (
    variant: IVariantsDetail,
    listSizeExist: string[]
  ) => {
    const elementLabelSize = document.querySelector(
      `label[for="${variant.sizeId?._id}"]`
    ) as HTMLLabelElement;
    if (chooseColorId != "") {
      if (variant.colorId?._id == chooseColorId) {
        elementLabelSize && elementLabelSize.classList.remove("disabled");
        listSizeExist.push(variant.sizeId?._id as string);
      } else if (
        variant.colorId?._id != chooseColorId &&
        !listSizeExist.includes(variant.sizeId?._id as string)
      ) {
        elementLabelSize && elementLabelSize?.classList?.add("disabled");
      }
    }
  };
  const handleColorDisabled = (
    variant: IVariantsDetail,
    listColorExist: string[]
  ) => {
    const elementLabelColor = document.querySelector(
      `label[for="${variant.colorId?._id}"]`
    ) as HTMLLabelElement; // element label màu sắc
    if (chooseSizeId != "") {
      // nếu chooseSizeId được chọn thì sét điều kiện if
      if (variant.sizeId?._id == chooseSizeId) {
        elementLabelColor && elementLabelColor.classList.remove("disabled");
        listColorExist.push(variant.colorId?._id as string);
      } else if (
        variant.sizeId?._id != chooseSizeId &&
        !listColorExist.includes(variant.colorId?._id as string)
      ) {
        elementLabelColor && elementLabelColor.classList.add("disabled");
      }
    }
  };
  const changeVariant = async (defaultSize: string, defaultColor: string) => {
    try {
      const { data } = await updateVariantItemCart({
        colorId: chooseColorId || defaultColor,
        itemId: id,
        productId,
        sizeId: chooseSizeId || defaultSize,
      });
      ToastSuccess(data?.message);
      setCartState?.(data?.data as ICart);
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error?.response?.data?.message);
      }
    } finally {
      setOpen(false);
    }
  };
  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="text-start text-[#0000008a] outline-none"
        >
          <p className="flex items-center gap-1">
            Phân loại hàng: <ChevronDown size={16} className="mt-1.5" />
          </p>
          <span>
            {selectedVariants.colorId?.name}, Size{" "}
            {selectedVariants.sizeId?.name}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="focus:bg-white">
          <span className="text-[#0000008a] font-medium mr-2">Kích Cỡ:</span>
          <ListSize
            setSizeId={setChooseSizeId}
            varians={varians}
            defaultSize={selectedVariants.sizeId?._id as string}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-white">
          <span className="text-[#0000008a] font-medium mr-2">Màu Sắc:</span>
          <ListColor
            setColorId={setChooseColorId}
            varians={varians}
            defaultColor={selectedVariants.colorId?._id as string}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-white *:cursor-pointer  *:py-2 *:px-5 *:rounded *:uppercase *:font-medium flex items-center justify-end gap-2">
          <button className="hover:bg-gray-100 " onClick={() => setOpen(false)}>
            Trở lại
          </button>

          <button
            className="bg-[#ee4d2d] text-white "
            onClick={() =>
              changeVariant(
                selectedVariants?.sizeId?._id as string,
                selectedVariants?.colorId?._id as string
              )
            }
          >
            Xác nhận
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GoodsClassification;
