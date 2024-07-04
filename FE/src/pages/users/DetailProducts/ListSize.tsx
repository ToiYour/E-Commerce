import { ISize } from "@/interfaces/size";
import { IVariantsDetail } from "@/interfaces/variant";
import { cn } from "@/lib/utils";
import { getAllSize } from "@/services/variants/size";
import { useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface IPropsListSize {
  varians: IVariantsDetail[];
  setSizeId: (sizeId: string) => void;
  defaultSize?: string;
}
const ListSize = ({ varians, setSizeId, defaultSize }: IPropsListSize) => {
  const { slug } = useParams();
  const isVariantSizes = Array.from(
    new Set(varians.map((v) => v?.sizeId?._id))
  );
  const [listSize, setListSize] = useState<ISize[]>([]);
  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      const checkedRadio = document.querySelector(
        '.list-size .size-item input[type="radio"]:checked'
      ) as HTMLInputElement;
      if (checkedRadio) {
        checkedRadio.checked = false;
        setSizeId("");
      }
    };
  }, [slug]);
  useEffect(() => {
    queryClient
      .ensureQueryData({
        queryKey: ["GET_FILTER_SIZES"],
        queryFn: async () => {
          const { data } = await getAllSize("");
          return data?.data?.docs;
        },
      })
      .then((data) => {
        setListSize(data);
        if (defaultSize) {
          setSizeId("");
        }
      });
  }, [queryClient]);
  useEffect(() => {
    if (defaultSize) {
      setSizeId(defaultSize);
    }
    return () => {
      setSizeId("");
    };
  }, []);
  return (
    <div className=" list-size flex items-center gap-2 flex-wrap ">
      {listSize?.map(
        (size) =>
          size.status && (
            <label
              key={size._id}
              htmlFor={size._id}
              className={cn(
                " size-item max-w-[95px] max-h-[43px]   relative overflow-hidden flex items-center border border-line  py-2.5 px-11 gap-2 rounded bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d] has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]",
                isVariantSizes.includes(size?._id as string) || "disabled"
              )}
            >
              <input
                className="peer"
                defaultChecked={size._id === defaultSize}
                onChange={(event) => setSizeId(event.target.value)}
                type="radio"
                name="size"
                hidden
                value={size._id}
                id={size._id}
              />
              <div className="caption1 capitalize">{size.name}</div>
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

export default memo(ListSize);
