import LoadingData from "@/components/LoadingData";
import TimeAgoVi from "@/components/TimeAgoVi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IComment } from "@/interfaces/comment";
import { getCommentByProductId } from "@/services/comment";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ActionDropDown from "./ActionDropDown";
import CommentReply from "./CommentReply";
import EditComment from "./EditComment";
import LikeDislikeAndReplyButtons from "./LikeDislikeAndReplyButtons";
import SendComment from "./SendComment";
import SendReply from "./SendReply";
type ResponComment = {
  data: IComment[];
  totalComment?: number;
};
const Comment = () => {
  const { slug } = useParams();
  const [SearchParams, setSearchParams] = useSearchParams();
  const colum = SearchParams.get("colum");
  const sort = SearchParams.get("sort");
  const [updateFeedbackState, setUpdateFeedbackState] = useState({
    isEdit: false,
    isReply: false,
    id: "",
  });
  const { data: comments, isLoading } = useQuery<ResponComment>({
    queryKey: ["COMMENTS_BY_PRODUCT_ID", slug, location.search],
    queryFn: async () => {
      const query = colum && sort ? `colum=${colum}&sort=${sort}` : "";
      const { data } = await getCommentByProductId(slug as string, query);
      return data.data;
    },
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-5">
        <p className="font-medium">{comments?.totalComment || 0} bình luận</p>
        <Select
          onValueChange={(value) => {
            setSearchParams({ colum: "createdAt", sort: value });
          }}
        >
          <SelectTrigger className="flex items-center gap-2 border-none outline-none focus:outline-none w-max font-medium">
            <ArrowDownUp size={18} />
            <SelectValue placeholder="Sắp xếp theo" className="font-medium" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sắp xếp bình luận</SelectLabel>
              <SelectItem value="desc" className="font-medium">
                Mới nhất
              </SelectItem>
              <SelectItem value="asc" className="font-medium">
                Cũ nhất
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <SendComment />
      <section className="space-y-5 w-full">
        {isLoading ? (
          <LoadingData />
        ) : (
          comments?.data?.map((comment) => (
            <div key={comment?._id} className="flex items-start gap-3 w-full">
              <div className="size-10 min-w-10 max-w-10 ">
                <img
                  src={comment?.userId?.avatar as string}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {updateFeedbackState.isEdit &&
              updateFeedbackState.id == comment?._id ? (
                <EditComment
                  commentId={comment?._id}
                  isReply={false}
                  defaultValue={comment?.comment as string}
                  setId={setUpdateFeedbackState}
                />
              ) : (
                <div className="flex flex-col gap-1 w-full">
                  <div className="relative">
                    {/* Actions  */}
                    <div className="absolute right-0 top-0">
                      <ActionDropDown
                        userId={comment?.userId?._id}
                        setId={setUpdateFeedbackState}
                        commentId={comment?._id as string}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="font-medium">
                        {comment?.userId?.name?.last_name}{" "}
                        {comment?.userId?.name?.first_name}
                      </p>
                      <span className="text-xs text-[#aaa]">
                        <TimeAgoVi date={comment.createdAt} />
                      </span>
                    </div>
                    <p className="text-sm">{comment?.comment}</p>
                  </div>
                  <div>
                    <LikeDislikeAndReplyButtons
                      likes={comment.likes as string[]}
                      dislikes={comment.dislikes as string[]}
                      commentId={comment?._id as string}
                      setReply={setUpdateFeedbackState}
                    />
                    <div className="">
                      {updateFeedbackState.isReply &&
                        updateFeedbackState.id == comment?._id && (
                          <SendReply
                            commentId={comment?._id}
                            setReply={setUpdateFeedbackState}
                          />
                        )}
                      <div className="">
                        <CommentReply
                          comments={comment?.replies}
                          commentId={comment?._id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Comment;
