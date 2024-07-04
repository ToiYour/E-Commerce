import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/auth";
import { cn, SwalWarningConfirm, ToastSuccess } from "@/lib/utils";
import { deleteCommentById, deleteCommentReplyById } from "@/services/comment";
import { useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
type ActionDropDownType = {
  setId: (val: { id: string; isEdit: boolean; isReply: boolean }) => void;
  commentId: string;
  isReply?: boolean;
  userId?: string;
};
const ActionDropDown = (props: ActionDropDownType) => {
  const { authUser, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const handleDeleteComment = async () => {
    try {
      let data;
      const response = await SwalWarningConfirm(
        "Xóa bình luận",
        "Xóa bình luận của bạn vĩnh viễn?"
      );
      if (response.isConfirmed) {
        if (props.isReply) {
          data = await deleteCommentReplyById(props.commentId);
        } else {
          data = await deleteCommentById(props.commentId);
        }
        ToastSuccess(data?.data?.message);
      }
    } catch (error) {
      //
    } finally {
      queryClient.invalidateQueries({ queryKey: ["COMMENTS_BY_PRODUCT_ID"] });
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
            onClick={() =>
              props.setId({
                id: props?.commentId,
                isEdit: true,
                isReply: false,
              })
            }
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              authUser?._id != props.userId && "hidden"
            )}
          >
            <Pencil size={18} /> Sửa
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteComment}
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
