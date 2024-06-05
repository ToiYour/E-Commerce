import Address from "@/components/Address";
import ButtonLoading from "@/components/ButtonLoading";
import { useAuth } from "@/hooks/auth";
import { ICustomer } from "@/interfaces/customer";
import { ToastError, ToastSuccess } from "@/lib/utils";
import { changeProfileInformation } from "@/services/auth";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
const AddressAccount = () => {
  const { authUser: account, setAuthUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ICustomer>({ defaultValues: account });
  const onSubmit: SubmitHandler<ICustomer> = async (newData: ICustomer) => {
    try {
      const { data } = await changeProfileInformation(newData);
      setAuthUser?.(data.user);
      ToastSuccess(data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.message);
      }
    }
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
          resendAddress={() => reset(account)}
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
        <button disabled={isSubmitting} className="button-main">
          {isSubmitting ? <ButtonLoading /> : "Lưu"}
        </button>
      </div>
    </form>
  );
};

export default AddressAccount;
