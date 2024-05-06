import { getCommune, getDistrict, getProvince } from "@/api/address";
import { ICommune, IDistrict, IProvince } from "@/interfaces/address";
import { ICustomer } from "@/interfaces/customer";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
const Address = ({
  register,
  errors,
  checkNul = false,
  address,
}: {
  checkNul?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<ICustomer>;
  address?: {
    provinceName?: string;
    districtsName?: string;
    CoummuneName?: string;
  };
}) => {
  const [provinces, setProvince] = useState<IProvince[]>([]);
  const [districts, setDistrict] = useState<IDistrict[]>([]);
  const [communes, setCommune] = useState<ICommune[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await getProvince();
      setProvince(data);
    })();
  }, []);
  useEffect(() => {
    const selectProvince = document.querySelector(
      ".address-province"
    ) as HTMLSelectElement;
    for (let index = 0; index < selectProvince.options.length; index++) {
      if (selectProvince.options[index].value == address?.provinceName) {
        selectProvince.options[index].selected = true;
        break;
      }
    }
  }, [provinces]);

  const makeProvince: React.ChangeEventHandler<HTMLSelectElement> = async (
    e
  ) => {
    const idProvince = e.target.options[e.target.selectedIndex]?.dataset
      .id as string;
    const { data } = await getDistrict(idProvince);
    setDistrict(data);
  };
  const makeDistrict: React.ChangeEventHandler<HTMLSelectElement> = async (
    e
  ) => {
    const idDistrict = e.target.options[e.target.selectedIndex]?.dataset
      .id as string;
    const { data } = await getCommune(idDistrict);
    setCommune(data);
  };
  return (
    <>
      <div className="col-span-6 sm:col-span-2">
        <label htmlFor="" className="block text-sm font-medium text-gray-700">
          Tình thành
        </label>
        <div className="relative">
          <select
            {...register("address.province", {
              ...(checkNul && { required: "Vui lòng nhập tỉnh thành" }),
            })}
            onChange={makeProvince}
            className="address-province mt-1.5 w-full rounded border p-1 border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="" hidden>
              --Chọn tỉnh thành--
            </option>
            {provinces?.map((p) => (
              <option key={p.idProvince} value={p.name} data-id={p.idProvince}>
                {p.name}
              </option>
            ))}
          </select>
          <div
            className={`${
              provinces.length > 0 ? "hidden" : ""
            } absolute top-1/3 right-1 bg-white px-2`}
          >
            <RotateCw className="animate-spin " size={16} color={"#ccc"} />
          </div>
        </div>
        {errors?.address?.province && (
          <p className="text-red-500">{errors?.address?.province?.message}</p>
        )}
      </div>
      <div className="col-span-6 sm:col-span-2">
        <label htmlFor="" className="block text-sm font-medium text-gray-700">
          Quận huyện
        </label>
        <div className="relative">
          <select
            {...register("address.district")}
            onChange={makeDistrict}
            className="address-district mt-1.5 w-full rounded border p-1 border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="" hidden>
              --Chọn quận huyện--
            </option>
            {districts?.map((d) => (
              <option key={d.idDistrict} value={d.name} data-id={d.idDistrict}>
                {d.name}
              </option>
            ))}
          </select>
          <div
            className={`${
              districts.length > 0 ? "hidden" : ""
            } absolute top-1/3 right-1 bg-white px-2`}
          >
            <RotateCw className="animate-spin " size={16} color={"#ccc"} />
          </div>
        </div>
      </div>
      <div className="col-span-6 sm:col-span-2">
        <label htmlFor="" className="block text-sm font-medium text-gray-700">
          Phường xã
        </label>
        <div className="relative">
          <select
            {...register("address.commune")}
            className="address-commune mt-1.5 w-full rounded border p-1 border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="" hidden>
              --Chọn phường xã--
            </option>
            {communes?.map((c) => (
              <option key={c.idCommune} value={c.name} data-id={c.idCommune}>
                {c.name}
              </option>
            ))}
          </select>
          <div
            className={`${
              communes.length > 0 ? "hidden" : ""
            } absolute top-1/3 right-1 bg-white px-2`}
          >
            <RotateCw className="animate-spin " size={16} color={"#ccc"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
