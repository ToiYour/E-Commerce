import { getCommune, getDistrict, getProvince } from "@/api/address";
import { ICommune, IDistrict, IProvince } from "@/interfaces/address";
import { RotateCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
const Address = ({ register }: { register: UseFormRegister<FieldValues> }) => {
  const provinceRef = useRef(null);
  const districtRef = useRef(null);
  const [provinces, setProvince] = useState<IProvince[]>([]);
  const [districts, setDistrict] = useState<IDistrict[]>([]);
  const [communes, setCommune] = useState<ICommune[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await getProvince();
      setProvince(data);
    })();
  }, []);
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
  //   return (
  //     <>
  //       <select {...register("address.province")} className="col-span-2">
  //         <option value="" hidden>
  //           --Chọn tỉnh thành--
  //         </option>
  //         <option value="Thành phố Hà Nội">Thành phố Hà Nội</option>
  //       </select>
  //       <select {...register("address.district")} className="col-span-2">
  //         <option value="" hidden>
  //           --Chọn quận huyện--
  //         </option>
  //         <option value="Quận Ba Đình">Quận Ba Đình</option>
  //       </select>
  //       <select {...register("address.commune")} className="col-span-2">
  //         <option value="" hidden>
  //           --Chọn phường xã--
  //         </option>
  //         <option value="Phường Kim Mã">Phường Kim Mã</option>
  //       </select>
  //     </>
  //   );
  return (
    <>
      <div className="col-span-6 sm:col-span-2">
        <label htmlFor="" className="block text-sm font-medium text-gray-700">
          Tình thành
        </label>
        <div className="relative">
          <select
            {...register("address.province")}
            // ref={provinceRef}
            // onChange={makeProvince}
            className="mt-1.5 w-full rounded border p-1 border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="" hidden>
              --Chọn tỉnh thành--
            </option>
            <option value="Thành phố Hà Nội">Thành phố Hà Nội</option>
            {/* {provinces?.map((p) => (
              <option key={p.idProvince} value={p.name} data-id={p.idProvince}>
                {p.name}
              </option>
            ))} */}
          </select>
          <div
            className={`${
              provinces.length > 0 ? "hidden" : ""
            } absolute top-1/3 right-1 bg-white px-2`}
          >
            <RotateCw className="animate-spin " size={16} color={"#ccc"} />
          </div>
        </div>
      </div>
      <div className="col-span-6 sm:col-span-2">
        <label htmlFor="" className="block text-sm font-medium text-gray-700">
          Quận huyện
        </label>
        <div className="relative">
          <select
            {...register("address.district")}
            // ref={districtRef}
            // onChange={makeDistrict}
            className="mt-1.5 w-full rounded border p-1 border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="" hidden>
              --Chọn quận huyện--
            </option>
            <option value="Quận Ba Đình">Quận Ba Đình</option>
            {/* {districts?.map((d) => (
              <option key={d.idDistrict} value={d.name} data-id={d.idDistrict}>
                {d.name}
              </option>
            ))} */}
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
            className="mt-1.5 w-full rounded border p-1 border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="" hidden>
              --Chọn phường xã--
            </option>
            <option value="Phường Kim Mã">Phường Kim Mã</option>
            {/* {communes?.map((c) => (
              <option key={c.idCommune} value={c.name} data-id={c.idCommune}>
                {c.name}
              </option>
            ))} */}
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
