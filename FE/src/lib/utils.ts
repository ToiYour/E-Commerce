import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { downloadExcel } from "react-export-table-to-excel";
import axios from "axios";
import { IVariant } from "@/interfaces/variant";
import { createVariant } from "@/api/variant";
import { Flip, toast } from "react-toastify";
import Swal from "sweetalert2";

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
export const upLoadFiles = async (files: { dataURL: string; file: File }[]) => {
  if (files) {
    const CLOUND_NAME = "dlzhmxsqp";
    const PRESET_NAME = "yhlsqnix";
    const FOLDER_NAME = "e_commerce";

    const api = `https://api.cloudinary.com/v1_1/${CLOUND_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    const urls: string[] = [];
    for (const file of files) {
      formData.append("file", file.file as File);
      const { data } = await axios.post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      urls.push(data.url);
    }
    return urls;
  }
};
export const upLoadFileOne = async (files: File) => {
  if (typeof files !== "string") {
    const CLOUND_NAME = "dlzhmxsqp";
    const PRESET_NAME = "yhlsqnix";
    const FOLDER_NAME = "e_commerce";

    const api = `https://api.cloudinary.com/v1_1/${CLOUND_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    formData.append("file", files as File);
    const { data } = await axios.post(api, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.url;
  }
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
