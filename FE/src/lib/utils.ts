import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { downloadExcel } from "react-export-table-to-excel";
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
