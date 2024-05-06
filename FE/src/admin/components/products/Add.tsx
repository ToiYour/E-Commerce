import { createProduct } from "@/api/products";
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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICategory } from "@/interfaces/category";
import { IColor } from "@/interfaces/color";
import { IFormProduct, IProduct } from "@/interfaces/product";
import { ISize } from "@/interfaces/size";
import { IVariant } from "@/interfaces/variant";
import { upLoadFiles, upLoadVariants } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { CircleX, ImageUp, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";
const Add = () => {
  const [colors, sizes, categorys] = useLoaderData() as [
    IColor[],
    ISize[],
    ICategory[]
  ];

  const [arrImages, setImages] = useState([]);
  const onChangeImage = (imageList: ImageListType) => {
    // data for submit
    setImages(imageList as never[]);
  };
  const navigate = useNavigate();
  const [isLoadSubmit, setIsLoadSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormProduct>({
    defaultValues: {
      variants: [
        {
          sizeId: "6629ae6434d377755e010a99",
          colorId: "6634f25ebaaabbaf775cc484",
          extra_price: 0,
          stock: 0,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });
  // Sử lý thêm mới sản phẩm
  const mutationProduct = useMutation({
    mutationFn: async (newData: IFormProduct) => {
      const images = await upLoadFiles(
        arrImages as { dataURL: string; file: File }[]
      );
      const variants = await upLoadVariants(newData.variants as IVariant[]);
      const payload = {
        name: newData.name,
        category: newData.category,
        desc: newData.desc,
        price: newData.price,
        images,
        variants,
      };
      await createProduct(payload as IProduct);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi khi thêm mới sản phẩm!", {
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
      toast.success("Thêm mới sản phẩm thành công!", {
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
    if (errorVariants || arrImages.length == 0) {
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
            <BreadcrumbPage>Thêm mới</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="px-4  sm:px-6 lg:px-8">
        <div className="mx-auto ">
          <h1 className="text-center text-2xl font-bold text-muted-foreground sm:text-3xl">
            Thêm mới sản phẩm
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-0 mt-2 space-y-4  sm:p-6 lg:p-8"
          >
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Thông tin chi tiết sản phẩm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tên sản phẩm
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
                      <div className="grid gap-3">
                        <label
                          htmlFor="OrderNotes"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mô tả
                        </label>
                        <textarea
                          {...register("desc", {
                            required: "Vui lòng nhập mô tả",
                          })}
                          id="OrderNotes"
                          className="min-h-32 p-2 mt-2 w-full rounded-lg border-2 border-gray-200 align-top  sm:text-sm"
                          rows={4}
                          placeholder="Enter any additional order notes..."
                          defaultValue={""}
                        />
                        <p className="text-red-500">{errors.desc?.message}</p>
                      </div>
                      <div className="grid gap-3">
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
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Biến thể</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Size</TableHead>
                          <TableHead>Màu</TableHead>
                          <TableHead>Giá</TableHead>
                          <TableHead>Số lượng</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fields.map((field, index) => (
                          <TableRow className="">
                            <TableCell>
                              <label
                                htmlFor={`variants.${index}.size`}
                                className="sr-only block text-xs font-medium text-gray-700"
                              >
                                Size
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
                            </TableCell>
                            <TableCell>
                              <label
                                htmlFor={`variants.${index}.color`}
                                className="sr-only block text-xs font-medium text-gray-700"
                              >
                                Màu
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
                            </TableCell>
                            <TableCell>
                              <label
                                htmlFor={`variants.${index}.extra_price`}
                                className="sr-only block text-xs font-medium text-gray-700"
                              >
                                Giá
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
                            </TableCell>
                            <TableCell>
                              <label
                                htmlFor={`variants.${index}.stock`}
                                className="sr-only block text-xs font-medium text-gray-700"
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
                            </TableCell>
                            <TableCell>
                              <X
                                onClick={() => remove(index)}
                                className=""
                                size={20}
                                strokeWidth={0.75}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button
                      onClick={() =>
                        append({
                          sizeId: "",
                          colorId: "",
                          extra_price: 0,
                          stock: 0,
                        })
                      }
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="gap-1"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      Thêm biến thể
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Danh mục sản phẩm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >
                          Danh mục
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
                        <p className="text-red-500">
                          {errors.category?.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Ảnh sản phẩm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="">
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
                          <div className="upload__image-wrapper mt-1 grid grid-cols-8  gap-2">
                            {imageList.map((image, index) => (
                              <div
                                key={index}
                                className="col-span-2 max-h-16 image-item relative"
                              >
                                <img
                                  src={image.dataURL}
                                  alt=""
                                  className=" w-full h-full object-cover rounded "
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
                            <div className="col-span-2 max-h-16 rounded-md  border border-gray-100 bg-white p-3 shadow-md">
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
                            <span className="text-red-500 text-center col-span-6">
                              {errors?.maxNumber
                                ? "Bạn không thể chọn thêm ảnh, số ảnh đã đạt mức giới hạn"
                                : ""}
                            </span>
                          </div>
                        )}
                      </ImageUploading>
                      <p className="text-red-500">{errors.images?.message}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <button
              disabled={isLoadSubmit}
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              {isLoadSubmit ? <ButtonLoading /> : "Thêm mới"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
