import { IColor } from "@/interfaces/color";
import { IVariantsDetail } from "@/interfaces/variant";
import { cn } from "@/lib/utils";
import { getAllColor } from "@/services/variants/color";
import { useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface IPropsListColor {
  varians: IVariantsDetail[];
  setColorId: (colorId: string) => void;
  defaultColor?: string;
}
const ListColor = ({ varians, setColorId, defaultColor }: IPropsListColor) => {
  const { slug } = useParams();
  const isVariantColors = Array.from(
    new Set(varians.map((v) => v?.colorId?._id))
  );
  const [colors, setColor] = useState<IColor[]>([]);
  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      const checkedRadio = document.querySelector(
        '.list-color .color-item input[type="radio"]:checked'
      ) as HTMLInputElement;
      if (checkedRadio) {
        checkedRadio.checked = false;
        setColorId("");
      }
    };
  }, [slug]);

  useEffect(() => {
    queryClient
      .ensureQueryData({
        queryKey: ["GET_FILTER_COLORS"],
        queryFn: async () => {
          const { data } = await getAllColor("");
          return data?.data?.docs;
        },
      })
      .then((data) => {
        setColor(data);
        if (defaultColor) {
          setColorId("");
        }
      });
  }, [queryClient]);
  useEffect(() => {
    if (defaultColor) {
      setColorId(defaultColor);
    }
    return () => {
      setColorId("");
    };
  }, []);

  return (
    <div className="list-color flex items-center gap-2 flex-wrap">
      {colors?.map(
        (color) =>
          color.status && (
            <label
              key={color._id}
              htmlFor={color._id}
              className={cn(
                " color-item relative max-w-32 max-h-[43px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d] has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]",
                isVariantColors.includes(color._id) || "disabled"
              )}
            >
              <input
                className="peer"
                onChange={(event) => setColorId(event.target.value)}
                type="radio"
                hidden
                defaultChecked={color._id === defaultColor}
                name="choose-color"
                id={color._id}
                value={color._id}
              />
              <span
                style={{ backgroundColor: color.hex }}
                className={`color shadow-md w-5 h-5 rounded-full bg-orange-300`}
              />
              <span className="caption1 capitalize">{color.name}</span>
              <span className="selection-box-tick hidden absolute bottom-0 right-0 peer-checked:block">
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
