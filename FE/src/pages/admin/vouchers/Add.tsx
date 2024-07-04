import ButtonLoading from "@/components/ButtonLoading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IDiscount } from "@/interfaces/order";
import { ToastError, ToastSuccess } from "@/lib/utils";
import { createDiscount } from "@/services/orders/discount";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const Add = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IDiscount>({
    defaultValues: {
      isPercentage: false, // Set default values for radio buttons
      isPublic: true,
    },
  });
  const onSubmit = async (payload: IDiscount) => {
    try {
      const { data } = await createDiscount(payload);
      ToastSuccess(data.message);
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.message);
      }
    }
  };

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Breadcrumb className="hidden md:flex mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/admin"}>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/admin/voucher"}>Mã giảm giá</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Thêm mới</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="sm:px-6 lg:px-8">
        <div className="">
          <h1 className="text-center text-2xl font-bold text-muted-foreground sm:text-3xl">
            Thêm mã giảm giá
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="  mb-0 mt-6 space-y-4 rounded-lg p-4 border border-gray-200 sm:p-6 lg:p-8"
          >
            <div className="grid grid-cols-6 gap-5">
              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Mã giảm giá
                </label>
                <input
                  {...register("code", {
                    required: "Vui lòng tạo mã giảm giá",
                    minLength: {
                      value: 6,
                      message: "Mã giảm giá ít nhất 6 ký tự",
                    },
                  })}
                  type="text"
                  id=""
                  className="mt-1 p-2 w-full rounded-md border-2 border-gray-200 shadow-sm sm:text-sm"
                />
                {errors.code && (
                  <p className="text-red-500">{errors.code.message}</p>
                )}
              </div>
              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Giảm giá (Số tiền hoặc %)
                </label>
                <input
                  {...register("value", {
                    required: "Vui lòng nhập giá trị mã giảm giá",
                  })}
                  type="text"
                  className="mt-1 p-2 w-full rounded-md border-2 border-gray-200 shadow-sm sm:text-sm"
                />
                {errors.value && (
                  <p className="text-red-500">{errors.value.message}</p>
                )}
              </div>

              <div className="col-span-6 md:col-span-3 flex items-center justify-between">
                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700"
                  >
                    Giảm theo
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <label
                      htmlFor="isPercentage_Price"
                      className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                    >
                      Số tiền
                      <input
                        {...register("isPercentage")}
                        type="radio"
                        name="isPercentage"
                        value="false"
                        id="isPercentage_Price"
                        hidden
                        defaultChecked
                      />
                    </label>

                    <label
                      htmlFor="isPercentage_Percentage"
                      className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                    >
                      Phần trăm
                      <input
                        {...register("isPercentage")}
                        type="radio"
                        name="isPercentage"
                        value="true"
                        id="isPercentage_Percentage"
                        hidden
                      />
                    </label>
                  </div>

                  {errors.isPercentage && (
                    <p className="text-red-500">
                      {errors.isPercentage.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hiện thị
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <label
                      htmlFor="isPublic_Private"
                      className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                    >
                      Riêng tư
                      <input
                        {...register("isPublic")}
                        type="radio"
                        name="isPublic"
                        value="false"
                        id="isPublic_Private"
                        hidden
                      />
                    </label>

                    <label
                      htmlFor="isPublic_Public"
                      className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                    >
                      Công khai
                      <input
                        {...register("isPublic")}
                        type="radio"
                        name="isPublic"
                        value="true"
                        id="isPublic_Public"
                        hidden
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Tối thiểu giá đơn hàng
                </label>
                <input
                  {...register("minOrderAmount", {
                    required: "Vui lòng nhập giá tối thiểu áp dụng mã",
                  })}
                  type="text"
                  className="mt-1 p-2 w-full rounded-md border-2 border-gray-200 shadow-sm sm:text-sm"
                />
                {errors.minOrderAmount && (
                  <p className="text-red-500">
                    {errors.minOrderAmount.message}
                  </p>
                )}
              </div>
              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Ngày hết hạn
                </label>
                <input
                  {...register("expiryDate", {
                    required: "Vui lòng nhập ngày hết hạn mã",
                  })}
                  type="date"
                  className="mt-1 p-2 w-full rounded-md border-2 border-gray-200 shadow-sm sm:text-sm"
                />
                {errors.expiryDate && (
                  <p className="text-red-500">{errors.expiryDate.message}</p>
                )}
              </div>
              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Tối đa lượt sử dụng
                </label>
                <input
                  {...register("maxUsagePerUser", {
                    required: "Vui lòng nhập tối đa lượt sử dụng",
                  })}
                  type="number"
                  className="mt-1 p-2 w-full rounded-md border-2 border-gray-200 shadow-sm sm:text-sm"
                />
                {errors.maxUsagePerUser && (
                  <p className="text-red-500">
                    {errors.maxUsagePerUser.message}
                  </p>
                )}
              </div>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="col-span-3 block w-full rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white"
            >
              {isSubmitting ? <ButtonLoading /> : "Thêm mã giảm giá"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
