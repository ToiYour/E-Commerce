import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/auth";
import { cn, SwalWarningConfirm, ToastError, ToastSuccess } from "@/lib/utils";
import { removeByIdReviews } from "@/services/reviews";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EllipsisVertical, Trash } from "lucide-react";
type ActionDropDownType = {
  reviewId: string;
  userId: string;
};
const ActionDropDown = (props: ActionDropDownType) => {
  const { authUser, isLoggedIn } = useAuth();
  const QueryClient = useQueryClient();
  const handleDelete = async () => {
    try {
      const response = await SwalWarningConfirm(
        "Xóa đánh giá",
        "Xóa đánh giá của bạn vĩnh viễn?"
      );
      if (response.isConfirmed) {
        const { data } = await removeByIdReviews(props.reviewId);
        ToastSuccess(data?.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error?.response?.data?.message);
      }
    } finally {
      QueryClient.invalidateQueries({
        queryKey: ["GET_PRODUCT_REVIEWS_BY_SLUG"],
      });
    }
  };
  if (
    !isLoggedIn ||
    !authUser ||
    (!authUser.role && authUser?._id !== props.userId)
  ) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <EllipsisVertical size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleDelete}
            className={cn(
              "hidden  items-center gap-2 cursor-pointer",
              (authUser?._id == props.userId || authUser?.role) && "flex"
            )}
          >
            <Trash size={18} /> Xoá
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDropDown;
