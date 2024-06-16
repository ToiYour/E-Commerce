import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { downloadExcel } from "react-export-table-to-excel";
import axios from "axios";
import { IVariant } from "@/interfaces/variant";
import { createVariant } from "@/services/variant";
import { Flip, toast } from "react-toastify";
import Swal from "sweetalert2";
import { ReactNode } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatMoney = (value: number) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(value);
};
export const handleDownloadExcel = (
  header: string[],
  body: { [key: string]: string | number | boolean }[],
  fileName: string,
  sheet: string
) => {
  downloadExcel({
    fileName,
    sheet,
    tablePayload: {
      header,
      body,
    },
  });
};
export const upLoadFiles = async (
  files: { dataURL: string; file: File }[] | File
) => {
  if (files) {
    const CLOUND_NAME = process.env.CLOUND_NAME;
    const PRESET_NAME = process.env.PRESET_NAME;
    const FOLDER_NAME = process.env.FOLDER_NAME;

    const api = `https://api.cloudinary.com/v1_1/${CLOUND_NAME}/image/upload`;
    const uploadSingleFile = async (file: File) => {
      const formData = new FormData();
      formData.append("upload_preset", PRESET_NAME as string);
      formData.append("folder", FOLDER_NAME as string);
      formData.append("file", file);
      const { data } = await axios.post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.url;
    };
    if (files instanceof File) {
      return uploadSingleFile(files);
    } else {
      const urls: string[] = [];
      for (const fileObj of files) {
        const url = await uploadSingleFile(fileObj.file);
        urls.push(url);
      }
      return urls;
    }
  }
};
export const transformationCloudinary = (
  url: string,
  transformation: string
) => {
  const arrUrl = url.split("/upload/");
  return `${arrUrl[0]}/upload/${transformation}/${arrUrl[1]}`;
};
export const upLoadVariants = async (data: IVariant[]) => {
  if (data) {
    const variantIds: string[] = [];
    for (const variant of data) {
      const { data } = await createVariant(variant);
      variantIds.push(data?.data._id);
    }
    return variantIds;
  }
};
export const ToastSuccess = (title: string) => {
  toast.success(title, {
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
};
export const ToastWarning = (title: string) => {
  toast.warning(title, {
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
};
export const ToastError = (title: string) => {
  toast.error(title, {
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
};
export const ToastCustom = (title: ReactNode) => {
  toast.error(title, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
  });
};
export const SwalWarningConfirm = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Huỷ",
    confirmButtonText: "Đồng ý xoá nó!",
  });
};
export const statusOrder = [
  { key: "all", value: "Tất cả" },
  { key: "waitForConfirmation", value: "Chờ xác nhận" },
  { key: "waitingForDelivery", value: "Chờ lấy hàng" },
  { key: "waitForShip", value: "Chờ giao hàng" },
  { key: "done", value: "Đã giao" },
  { key: "canceled", value: "Đã huỷ" },
];
