import { accountMe, logOut, updateCustomer } from "@/api/customer";
import Address from "@/components/Address";
import ButtonLoading from "@/components/ButtonLoading";
import LoadingFixed from "@/components/LoadingFixed";
import { ICustomer } from "@/interfaces/customer";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
  upLoadFileOne,
} from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const AddressAccount = () => {
  const [isLoadSubmit, setIsLoadSubmit] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICustomer>();
  const mutationCustomer = useMutation({
    mutationFn: async (newData: ICustomer) => {
      if (newData.avatar?.[0]) {
        const linkImage = await upLoadFileOne(newData.avatar?.[0] as File);
        newData.avatar = linkImage;
        await updateCustomer(account?._id as string, newData);
      } else {
        await updateCustomer(account?._id as string, newData);
      }
    },
    onError: (error) => {
      setIsLoadSubmit(false);
      const axiosError = error as AxiosError;
      ToastError("Có lỗi khi cập nhập khách hàng!");
      axiosError?.response?.data &&
        ToastWarning(axiosError?.response?.data as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ACCOUNT_BY_TOKEN"] });
      setIsLoadSubmit(false);
      ToastSuccess("Cập nhập khách hàng thành công!");
    },
  });
  const {
    data: account,
    isLoading,
    error,
  } = useQuery<ICustomer>({
    retryOnMount: false,
    retry: false,
    queryKey: ["GET_ACCOUNT_BY_TOKEN"],
    queryFn: async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        const { data } = await accountMe();
        reset(data.account);
        return data.account;
      }
      return null;
    },
  });
  if (isLoading) {
    return <LoadingFixed />;
  }
  if (error) {
    const { response } = error as AxiosError<{ message: string }>;
    logOut();
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
    queryClient.invalidateQueries({ queryKey: ["GET_ACCOUNT_BY_TOKEN"] });
    ToastError(response?.data.message as string);
  }

  const onSubmit: SubmitHandler<ICustomer> = async (newData: ICustomer) => {
    setIsLoadSubmit(true);
    await mutationCustomer.mutate(newData);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-content w-full bg-white p-10 border border-gray-100   rounded shadow"
    >
      <h2 className="pb-10 text-2xl">Địa chỉ của tôi</h2>
      <div className="grid grid-cols-6 gap-6">
        <Address
          register={register}
          errors={errors}
          address={account?.address}
        />
        <div className="col-span-6">
          <label
            htmlFor="PasswordConfirmation"
            className="block text-sm font-medium text-gray-700"
          >
            Địa chỉ cụ thể
          </label>
          <textarea
            {...register("address.specific")}
            className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          ></textarea>
        </div>
      </div>
      <div className="block-button lg:mt-5 mt-3">
        <button disabled={isLoadSubmit} className="button-main">
          {isLoadSubmit ? <ButtonLoading /> : "Lưu"}
        </button>
      </div>
    </form>
  );
};

export default AddressAccount;
