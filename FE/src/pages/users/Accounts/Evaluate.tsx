import ButtonLoading from "@/components/ButtonLoading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICartItem } from "@/interfaces/cart";
import { cn, ToastError, ToastSuccess, upLoadFiles } from "@/lib/utils";
import { createProductReviews } from "@/services/reviews";
import { AxiosError } from "axios";
import { CircleX, Star } from "lucide-react";
import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
const Ratings = [
  {
    value: 1,
    text: "Tệ",
  },
  {
    value: 2,
    text: "Không hài lòng",
  },
  {
    value: 3,
    text: "Bình thường",
  },
  {
    value: 4,
    text: "Hài lòng",
  },
  {
    value: 5,
    text: "Tuyệt vời",
  },
];

const Evaluate = ({
  orderItems,
  orderId,
}: {
  orderItems: ICartItem[];
  orderId: string;
}) => {
  const [starNumber, setStarNumber] = useState(5);
  const [review, setReview] = useState("");
  const [arrImages, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onChangeImage = (imageList: ImageListType) => {
    // data for submit
    setImages(imageList as never[]);
  };
  const onSubmit = async () => {
    try {
      setLoading(true);
      const images = await upLoadFiles(
        arrImages as { dataURL: string; file: File }[]
      );
      const purchasedProduct = orderItems.map((item) => ({
        productId: item?.productId?._id || "",
        selectedVariant: item?.selectedVariant?._id || "",
      }));
      const { data } = await createProductReviews({
        orderId,
        images,
        purchasedProduct: purchasedProduct as [
          {
            productId: string;
            selectedVariant: string;
          }
        ],
        review,
        starNumber,
      });
      ToastSuccess(data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.message);
      }
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <button className="py-2 px-12 rounded bg-[#ee4d2d] hover:bg-[#d73211] text-white">
          Đánh giá
        </button>
      </DialogTrigger>
      <DialogContent className="w-11/12 rounded">
        <DialogHeader>
          <h2 className="text-xl">Đánh giá sản phẩm</h2>
          <span className="text-xs text-red-600">
            *Lưu ý: Demo đánh giá toàn bộ sản phẩm trong đơn hàng
          </span>
        </DialogHeader>
        <div className="space-y-5">
          <section>
            {orderItems?.map?.((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <div className="size-14 min-w-14 min-h-14">
                  <img
                    src={item?.productId?.images?.[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="">
                  <p className="text-sm text-[#000000cc]">
                    {item?.productId?.name}
                  </p>
                  <span className="text-xs text-[#00000042]">
                    Phân loại hàng: {item?.selectedVariant?.colorId?.name},
                    Size: {item?.selectedVariant?.sizeId?.name}
                  </span>
                </div>
              </div>
            ))}
          </section>
          <section className="flex items-center gap-5">
            <p>Chất lượng sản phẩm</p>
            <ul className="flex items-center gap-2">
              {Ratings.map((star) => (
                <li
                  key={star.value + star.text}
                  className="cursor-pointer transition-all"
                  onClick={() => setStarNumber(star.value)}
                >
                  <Star
                    size={26}
                    color="#eda500"
                    className={cn(starNumber >= star.value && "fill-[#eda500]")}
                    strokeWidth={1.5}
                  />
                </li>
              ))}
              <li
                className={cn(
                  starNumber >= 4 ? "text-[#eda500]" : "text-black"
                )}
              >
                {Ratings[starNumber - 1].text}
              </li>
            </ul>
          </section>
          <section className="py-2 px-5 bg-gray-100">
            <textarea
              name=""
              id=""
              onChange={(e) => setReview(e.target.value)}
              className="resize-none w-full p-1 outline-none border-none"
              placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người khác nhé."
            ></textarea>
            <ImageUploading multiple value={arrImages} onChange={onChangeImage}>
              {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
                // write your building UI
                <div className="upload__image-wrapper mt-1 flex items-end gap-2 flex-wrap">
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="size-14 max-h-14 max-w-14 image-item relative"
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
                  <div className="col-span-2 max-h-16 rounded  border border-red-500 text-red-500 bg-white px-3 py-1.5">
                    <div
                      onClick={onImageUpload}
                      {...dragProps}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <span className=" font-medium text-xs whitespace-nowrap">
                        Thêm hình ảnh
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </ImageUploading>
          </section>
          <div className="flex items-center justify-end">
            <button
              disabled={loading}
              onClick={onSubmit}
              className="rounded py-1.5 px-7 text-white bg-[#ee4d2d]"
            >
              {loading ? <ButtonLoading /> : "Hoàn thành"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Evaluate;
