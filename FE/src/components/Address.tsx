import { getCommune, getDistrict, getProvince } from "@/api/address";
import { ICommune, IDistrict, IProvince } from "@/interfaces/address";
import { ICustomer } from "@/interfaces/customer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RotateCw } from "lucide-react";
import { useCallback, useState } from "react";
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
    province?: string;
    district?: string;
    commune?: string;
  };
}) => {
  const queryClient = useQueryClient();
  const [districtId, setDistrictId] = useState("");
  const [communeId, setCommuneId] = useState("");
  const { data: provinces } = useQuery({
    queryKey: ["GET_PROVINCES"],
    queryFn: async () => {
      const { data } = await getProvince();
      return data as IProvince[];
    },
  });
  const { data: districts } = useQuery({
    queryKey: ["GET_DISTRICTTS", districtId],
    queryFn: async () => {
      const id =
        districtId || JSON.parse(address?.province as string).idProvince;
      const { data } = await getDistrict(id);
      return data as IDistrict[];
    },
  });
  const { data: communes } = useQuery({
    queryKey: ["GET_COMMUNES", communeId],
    queryFn: async () => {
      const { data } = await getCommune(
        communeId || JSON.parse(address?.district as string).idDistrict
      );
      if (address && communeId == "") {
        queryClient.invalidateQueries({ queryKey: ["GET_BY_ID_CUSTOMER"] });
      }
      return data as ICommune[];
    },
  });

  const makeProvince: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    async (e) => {
      console.log(JSON.parse(e.target.value).idProvince);

      setDistrictId(JSON.parse(e.target.value).idProvince);
    },
    []
  );
  const makeDistrict: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    async (e) => {
      setCommuneId(JSON.parse(e.target.value).idDistrict);
    },
    []
  );
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
              <option
                key={p.idProvince}
                value={JSON.stringify(p)}
                data-id={p.idProvince}
              >
                {p.name}
              </option>
            ))}
          </select>
          <div
            className={`${
              provinces && provinces?.length > 0 ? "hidden" : ""
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
              <option
                key={d.idDistrict}
                value={JSON.stringify(d)}
                data-id={d.idDistrict}
              >
                {d.name}
              </option>
            ))}
          </select>
          <div
            className={`${
              districts && districts?.length > 0 ? "hidden" : ""
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
              <option
                key={c.idCommune}
                value={JSON.stringify(c)}
                data-id={c.idCommune}
              >
                {c.name}
              </option>
            ))}
          </select>
          <div
            className={`${
              communes && communes?.length > 0 ? "hidden" : ""
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
