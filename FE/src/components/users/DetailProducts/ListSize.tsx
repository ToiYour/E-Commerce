import { getAllSize } from "@/api/variants/size";
import { ISize } from "@/interfaces/size";
import { IVariantsDetail } from "@/interfaces/variant";
import { useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { ChangeEvent, memo, useEffect, useState } from "react";
interface IPropsListSize {
  varians: IVariantsDetail[];
  setSizeId: (sizeId: string) => void;
}
const ListSize = ({ varians, setSizeId }: IPropsListSize) => {
  const isVariantSizes = Array.from(
    new Set(varians.map((v) => v?.sizeId?._id as string))
  );
  const [listSize, setListSize] = useState<ISize[]>([]);
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient
      .ensureQueryData({
        queryKey: ["GET_FILTER_SIZES"],
        queryFn: async () => {
          const { data } = await getAllSize("");
          return data?.data?.docs;
        },
      })
      .then((data) => setListSize(data));
  }, [queryClient]);
  const handleActive = (event: ChangeEvent<HTMLInputElement>) => {
    const item = event.target as HTMLInputElement;
    const colorActive = document.querySelector(
      ".list-size .size-item.active"
    ) as HTMLElement;
    colorActive && colorActive.classList.remove("active");
    if (item.checked) {
      setSizeId(item.value);
      item.closest(".size-item")?.classList.add("active");
    }
  };
  return (
    <div className=" list-size flex items-center gap-2 flex-wrap ">
      {listSize?.map((size) => (
        <label
          key={size._id}
          htmlFor={size._id}
          className={`size-item ${
            isVariantSizes.includes(size?._id as string) || "disabled"
          } max-w-[95px] max-h-[43px]   relative overflow-hidden flex items-center border border-line  py-2.5 px-11 gap-2 rounded`}
        >
          <input
            onChange={(event) => handleActive(event)}
            type="radio"
            name="size"
            hidden
            value={size._id}
            id={size._id}
          />
          <div className="size text-[#333]">{size.name}</div>
          <span className="selection-box-tick hidden absolute bottom-0 right-0 ">
            <Check
              size={12}
              color="#fff"
              strokeWidth={2}
              className="-rotate-2"
            />
          </span>
        </label>
      ))}
    </div>
  );
};

export default memo(ListSize);
