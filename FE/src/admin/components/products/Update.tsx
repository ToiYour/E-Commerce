import { updateProduct } from "@/api/products";
import ButtonLoading from "@/components/ButtonLoading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICategory } from "@/interfaces/category";
import { IColor } from "@/interfaces/color";
import { IFormProduct, IProduct } from "@/interfaces/product";
import { ISize } from "@/interfaces/size";
import { IVariant } from "@/interfaces/variant";
import { upLoadFiles, upLoadVariants } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { CircleX, ImageUp, Plus, X } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Flip, toast } from "react-toastify";
const Add = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [colors, sizes, categorys, prevProduct] = useLoaderData() as [
    IColor[],
    ISize[],
    ICategory[],
    IProduct
  ];
  // Biến lưu trữ biến thể sản phẩm
  const prevVariants = prevProduct.variants.map((variant) => ({
    colorId: variant?.colorId?._id,
    sizeId: variant?.sizeId?._id,
    extra_price: variant.extra_price,
    stock: variant.stock,
  }));
  // Biến lưu trữ data giá trị mặc định input
  const preFormData = {
    category: prevProduct.category,
    desc: prevProduct.desc,
    images: prevProduct.images,
    name: prevProduct.name,
    price: prevProduct.price,
    variants: prevVariants,
  };
  const [prevImages, setPrevImages] = useState(preFormData.images as string[]);
  const [arrImages, setImages] = useState([]);
  const onChangeImage = (imageList: ImageListType) => {
    // data for submit
    setImages(imageList as never[]);
  };
  const [isLoadSubmit, setIsLoadSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormProduct>({
    defaultValues: preFormData as IFormProduct,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });
  // Sử lý thêm mới sản phẩm
  const mutationProduct = useMutation({
    mutationFn: async (newData: IFormProduct) => {
      let images: string[];
      if (arrImages.length > 0) {
        images = (await upLoadFiles(
          arrImages as { dataURL: string; file: File }[]
        )) as string[];
        images?.unshift(...prevImages);
      } else {
        images = prevImages;
      }

      const variants = await upLoadVariants(newData.variants as IVariant[]);
      const payload = {
        name: newData.name,
        category: newData.category,
        desc: newData.desc,
        price: newData.price,
        images,
        variants,
      };
      await updateProduct(id as string, payload as IProduct);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi khi cập nhập sản phẩm!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    },
    onSuccess: () => {
      setIsLoadSubmit(false);
      toast.success("Cập nhập sản phẩm thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
      navigate("/admin/products");
    },
  });
  const onSubmit: SubmitHandler<IFormProduct> = async (
    newData: IFormProduct
  ) => {
    const errorVariants =
      newData.variants &&
      newData.variants.every((val) => val.sizeId == "" || val.colorId == "");
    if (errorVariants || (arrImages.length == 0 && prevImages.length == 0)) {
      errorVariants &&
        toast.warn("Bạn chưa nhập biến thể cho sản phẩm!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      arrImages.length == 0 &&
        prevImages.length == 0 &&
        toast.warn("Bạn chưa nhập ảnh cho sản phẩm!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
    } else {
      setIsLoadSubmit(true);
      await mutationProduct.mutate(newData);
      console.log(newData);
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
              <Link to={"/admin/products"}>Sản phẩm</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cập nhập</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto ">
          <h1 className="text-center text-2xl font-bold text-muted-foreground sm:text-3xl">
            Cập nhập sản phẩm
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-x-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Tên sản phẩm{" "}
                </label>
                <input
                  {...register("name", {
                    required: "Vui lòng nhập tên sản phẩm",
                  })}
                  type="text"
                  id="name"
                  className="mt-1 p-2 w-full rounded-md border-2 border-gray-200  sm:text-sm"
                />
                <p className="text-red-500">{errors.name?.message}</p>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Danh mục sản phẩm
                </label>
                <select
                  {...register("category", {
                    required: "Vui lòng chọn danh mục sản phẩm",
                  })}
                  className="mt-1 w-full px-1 py-2 rounded border-2 border-gray-300 text-gray-700 sm:text-sm"
                >
                  <option value="" hidden>
                    --Chọn danh mục--
                  </option>
                  {categorys?.map((category: ICategory) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p className="text-red-500">{errors.category?.message}</p>
              </div>
            </div>
            <div className="grid">
              <div>
                <label
                  htmlFor="OrderNotes"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Mô tả{" "}
                </label>
                <textarea
                  {...register("desc", { required: "Vui lòng nhập mô tả" })}
                  id="OrderNotes"
                  className=" p-2 mt-2 w-full rounded-lg border-2 border-gray-200 align-top  sm:text-sm"
                  rows={4}
                  placeholder="Enter any additional order notes..."
                  defaultValue={""}
                />
                <p className="text-red-500">{errors.desc?.message}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Giá sản phẩm{" "}
                </label>
                <input
                  {...register("price", {
                    required: "Vui lòng chọn giá sản phẩm",
                  })}
                  type="text"
                  id="name"
                  className="mt-1 p-2 w-full rounded-md border-2 border-gray-200  sm:text-sm"
                />
                <p className="text-red-500">{errors.price?.message}</p>
              </div>

              <div className="">
                <label
                  htmlFor=""
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Biến thể sản phẩm
                </label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Biến thể sản phẩm
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Biến thể sản phẩm</DialogTitle>
                      <DialogDescription>
                        Thông tin sản phẩm bổ sung
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid  gap-3 max-h-[calc(100vh-400px)] overflow-auto">
                      {fields.map((field, index) => (
                        <fieldset
                          className="flex flex-col border-2 rounded-md p-3 border-gray-300 relative"
                          key={field.id}
                        >
                          <legend>Biến thể</legend>
                          <X
                            onClick={() => remove(index)}
                            className="absolute -top-2 right-2 cursor-pointer"
                            size={20}
                            strokeWidth={0.75}
                          />
                          <div className="">
                            <div>
                              <label
                                htmlFor={`variants.${index}.size`}
                                className="block text-xs font-medium text-gray-700"
                              >
                                {" "}
                                Size{" "}
                              </label>
                              <select
                                id={`variants.${index}.sizeId`}
                                {...register(
                                  `variants.${index}.sizeId` as const,
                                  {
                                    required: "Vui lòng chọn size",
                                  }
                                )}
                                className="mt-1.5 w-full p-1 rounded border-2 border-gray-300 text-gray-700 sm:text-sm"
                              >
                                <option value="" hidden>
                                  --Chọn size--
                                </option>
                                {sizes?.map((size: ISize) => (
                                  <option key={size._id} value={size._id}>
                                    {size.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {/* Màu */}
                            <div>
                              <label
                                htmlFor={`variants.${index}.color`}
                                className="block text-xs font-medium text-gray-700"
                              >
                                {" "}
                                Màu{" "}
                              </label>
                              <select
                                id={`variants.${index}.colorId`}
                                {...register(
                                  `variants.${index}.colorId` as const,
                                  {
                                    required: "Vui lòng chọn Màu",
                                  }
                                )}
                                className="mt-1.5 w-full p-1 rounded border-2 border-gray-300 text-gray-700 sm:text-sm"
                              >
                                <option value="" hidden>
                                  --Chọn màu--
                                </option>
                                {colors?.map((color: IColor) => (
                                  <option key={color._id} value={color._id}>
                                    {color.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {/* Giá */}
                            <div>
                              <label
                                htmlFor={`variants.${index}.extra_price`}
                                className="block text-xs font-medium text-gray-700"
                              >
                                {" "}
                                Giá{" "}
                              </label>
                              <input
                                {...register(
                                  `variants.${index}.extra_price` as const,
                                  { required: "Vui lòng chọn giá" }
                                )}
                                min={0}
                                type="number"
                                id={`variants.${index}.extra_price`}
                                className="mt-1 p-1 border-2 w-full rounded-md border-gray-300 sm:text-sm"
                              />
                            </div>
                            {/* Só lượng */}
                            <div>
                              <label
                                htmlFor={`variants.${index}.stock`}
                                className="block text-xs font-medium text-gray-700"
                              >
                                {" "}
                                Số lượng{" "}
                              </label>
                              <input
                                {...register(
                                  `variants.${index}.stock` as const,
                                  {
                                    required: "Vui lòng chọn số lượng",
                                  }
                                )}
                                min={0}
                                type="number"
                                id={`variants.${index}.stock`}
                                className="mt-1 p-1 border-2 w-full rounded-md border-gray-300 sm:text-sm"
                              />
                            </div>
                          </div>
                        </fieldset>
                      ))}
                      <div
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() =>
                          append({
                            sizeId: "",
                            colorId: "",
                            extra_price: 0,
                            stock: 0,
                          })
                        }
                      >
                        <Plus strokeWidth={0.85} />
                        Thêm biến thể khác
                      </div>
                    </div>

                    <DialogFooter>
                      <DialogClose className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-sky-500 hover:bg-sky-300">
                        Xong
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <p className="text-red-500">{errors.variants?.message}</p>
              </div>
            </div>
            <div className="grid ">
              <div className="">
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ảnh sản phẩm
                </label>
                <ImageUploading
                  multiple
                  value={arrImages}
                  maxNumber={8}
                  onChange={onChangeImage}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemove,
                    dragProps,
                    errors,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper mt-1 flex flex-wrap justify-start items-center gap-3">
                      <div className="max-h-16 flex items-center gap-2">
                        {/* Ảnh cũ */}
                        {prevImages?.map((image, index) => (
                          <div key={index} className="image-item relative">
                            <img
                              src={image}
                              alt=""
                              className=" w-16 max-h-16 min-h-16 object-cover rounded "
                            />

                            <div className="image-item__btn-wrapper absolute top-1 right-1">
                              <button
                                type="button"
                                className=""
                                onClick={() => {
                                  const newPrevImages = [...prevImages];
                                  newPrevImages?.splice(index, 1);

                                  setPrevImages(newPrevImages);
                                }}
                              >
                                <CircleX color="#8c8787" size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                        {/* Ảnh mới */}
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item relative">
                            <img
                              src={image.dataURL}
                              alt=""
                              className=" w-16 max-h-16 min-h-16 object-cover rounded "
                            />

                            <div className="image-item__btn-wrapper absolute top-1 right-1">
                              <button
                                type="button"
                                className=""
                                onClick={() => onImageRemove(index)}
                              >
                                <CircleX color="#8c8787" size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-md w-min border border-gray-100 bg-white p-3 shadow-md">
                        <div
                          onClick={onImageUpload}
                          {...dragProps}
                          className="flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <ImageUp color="#8c8787" size={20} />
                          <span className="text-gray-600 font-medium text-xs whitespace-nowrap">
                            Chọn ảnh
                          </span>
                        </div>
                      </div>
                      <span className="text-red-500">
                        {errors?.maxNumber
                          ? "Bạn không thể chọn thêm ảnh, số ảnh đã đạt mức giới hạn"
                          : ""}
                      </span>
                    </div>
                  )}
                </ImageUploading>
                <p className="text-red-500">{errors.images?.message}</p>
              </div>
            </div>

            <button
              disabled={isLoadSubmit}
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              {isLoadSubmit ? <ButtonLoading /> : "Cập nhập"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
