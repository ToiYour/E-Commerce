import { getAllColor } from "@/services/variants/color";
import { IColor } from "@/interfaces/color";
import { IVariantsDetail } from "@/interfaces/variant";
import { useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { ChangeEvent, memo, useEffect, useState } from "react";
interface IPropsListColor {
  varians: IVariantsDetail[];
  setColorId: (colorId: string) => void;
}
const ListColor = ({ varians, setColorId }: IPropsListColor) => {
  const isVariantColors = Array.from(
    new Set(varians.map((v) => v?.colorId?._id))
  );
  const [colors, setColor] = useState<IColor[]>([]);
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient
      .ensureQueryData({
        queryKey: ["GET_FILTER_COLORS"],
        queryFn: async () => {
          const { data } = await getAllColor("");
          return data?.data?.docs;
        },
      })
      .then((data) => setColor(data));
  }, [queryClient]);
  const handleActive = (event: ChangeEvent<HTMLInputElement>) => {
    const item = event.target as HTMLInputElement;
    const colorActive = document.querySelector(
      ".list-color .color-item.active"
    ) as HTMLElement;
    colorActive && colorActive.classList.remove("active");
    if (item.checked) {
      const colorId = item.value as string;
      setColorId(colorId);

      item.closest(".color-item")?.classList.add("active");
    }
  };
  return (
    <div className="list-color flex items-center gap-2 flex-wrap">
      {colors?.map(
        (color) =>
          color.status && (
            <label
              key={color._id}
              htmlFor={color._id}
              className={` color-item  ${
                isVariantColors.includes(color._id) || "disabled"
              }  relative max-w-32 max-h-[43px] overflow-hidden flex items-center border border-solid border-line cursor-pointer py-3 px-4 gap-2 rounded  bg-white `}
            >
              <input
                onChange={(event) => handleActive(event)}
                type="radio"
                hidden
                name="choose-color"
                id={color._id}
                value={color._id}
              />
              <span
                style={{ backgroundColor: color.hex }}
                className={`color shadow-md w-5 h-5 rounded-full bg-orange-300`}
              />
              <span className="caption1 capitalize">{color.name}</span>
              <span className="selection-box-tick hidden absolute bottom-0 right-0 ">
                <Check
                  size={12}
                  color="#fff"
                  strokeWidth={2}
                  className="-rotate-2"
                />
              </span>
            </label>
          )
      )}
    </div>
  );
};

export default memo(ListColor);
