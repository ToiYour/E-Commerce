import { useAuth } from "@/hooks/auth";
import { useCurrentRouteAndNavigation } from "@/hooks/router";
import { cn, ToastError } from "@/lib/utils";
import {
  dislikeOrUndislikeComment,
  likeOrUnlikeComment,
} from "@/services/comment";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
type LikeDislikeAndReplyButtonsType = {
  isReply?: boolean;
  likes?: string[];
  dislikes?: string[];
  commentId: string;
  setReply: (reply: { isEdit: boolean; isReply: boolean; id: string }) => void;
};
const LikeDislikeAndReplyButtons = (props: LikeDislikeAndReplyButtonsType) => {
  const [loading, setLoading] = useState({
    loadingUp: false,
    loadingDown: false,
  });
  const currentRouteAndNavigation = useCurrentRouteAndNavigation();
  const queryClient = useQueryClient();
  const { authUser, isLoggedIn } = useAuth();
  const handleLikeComment = async (action: string) => {
    if (!isLoggedIn) {
      return currentRouteAndNavigation();
    }
    let payload;
    if (props.isReply) {
      payload = { commentReplyId: props?.commentId as string };
    } else {
      payload = { commentId: props?.commentId };
    }
    try {
      setLoading({
        loadingUp: true,
        loadingDown: false,
      });
      await likeOrUnlikeComment(payload, action);
      queryClient.invalidateQueries({ queryKey: ["COMMENTS_BY_PRODUCT_ID"] });
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error?.response?.data?.message);
      }
    } finally {
      setLoading({
        loadingUp: false,
        loadingDown: false,
      });
    }
  };
  const handleDislikeComment = async (action: string) => {
    if (!isLoggedIn) {
      return currentRouteAndNavigation();
    }
    let payload;
    if (props.isReply) {
      payload = { commentReplyId: props?.commentId as string };
    } else {
      payload = { commentId: props?.commentId };
    }
    try {
      setLoading({
        loadingUp: false,
        loadingDown: true,
      });
      await dislikeOrUndislikeComment(payload, action);
      queryClient.invalidateQueries({ queryKey: ["COMMENTS_BY_PRODUCT_ID"] });
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error?.response?.data?.message);
      }
    } finally {
      setLoading({
        loadingUp: false,
        loadingDown: false,
      });
    }
  };
  return (
    <div className="flex items-center gap-3">
      <div className="">
        <button
          disabled={loading.loadingUp}
          onClick={() => {
            const action = props.likes?.includes(authUser?._id as string)
              ? "unlike"
              : "like";
            handleLikeComment(action);
          }}
          className={cn(
            "hover:bg-gray-100 rounded-xl p-1",
            loading.loadingUp && "animate-pulse"
          )}
        >
          <ThumbsUp
            size={16}
            strokeWidth={1.5}
            className={cn(
              props.likes?.includes(authUser?._id as string) &&
                "fill-[#ee4d2d] text-[#ee4d2d]"
            )}
          />
        </button>
        <span className="text-xs text-[#aaa] ml-0.5">
          {props.likes?.length || ""}
        </span>
      </div>
      <div>
        <button
          disabled={loading.loadingDown}
          onClick={() => {
            const action = props.likes?.includes(authUser?._id as string)
              ? "unlike"
              : "like";
            handleDislikeComment(action);
          }}
          className={cn(
            "hover:bg-gray-100 rounded-xl p-1",
            loading.loadingDown && "animate-pulse"
          )}
        >
          <ThumbsDown
            size={16}
            strokeWidth={1.5}
            className={cn(
              props.dislikes?.includes(authUser?._id as string) &&
                "fill-[#ee4d2d] text-[#ee4d2d]"
            )}
          />
        </button>
        <span className="text-xs text-[#aaa] ml-0.5">
          {props.dislikes?.length || ""}
        </span>
      </div>
      <div>
        <button
          onClick={() =>
            props.setReply({
              isEdit: false,
              isReply: true,
              id: props.commentId,
            })
          }
          className="text-sm font-medium hover:bg-gray-100 rounded-xl py-1 px-2"
        >
          Phản hồi
        </button>
      </div>
    </div>
  );
};

export default LikeDislikeAndReplyButtons;
