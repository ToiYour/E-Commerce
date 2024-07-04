import TimeAgoVi from "@/components/TimeAgoVi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ICommentReply } from "@/interfaces/comment";
import { useState } from "react";
import ActionDropDown from "./ActionDropDown";
import EditComment from "./EditComment";
import LikeDislikeAndReplyButtons from "./LikeDislikeAndReplyButtons";
import SendReply from "./SendReply";
type CommentReplyType = {
  comments?: ICommentReply[];
  commentId?: string;
};
const CommentReply = (props: CommentReplyType) => {
  const [updateFeedbackState, setUpdateFeedbackState] = useState({
    isEdit: false,
    isReply: false,
    id: "",
  });
  if (props?.comments?.length == 0) {
    return null;
  }
  return (
    <Accordion type="single" collapsible className="w-full ">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="flex-none py-0  text-sm outline-none border-none">
          {props.comments?.length} phản hồi
        </AccordionTrigger>
        <AccordionContent className="">
          <div>
            <section className="space-y-5 mt-3">
              {props?.comments?.map((comment) => (
                <div key={comment._id} className="flex items-start gap-3">
                  <div className="size-6 min-w-6 max-w-6 ">
                    <img
                      src={comment?.userId?.avatar as string}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {updateFeedbackState.isEdit &&
                  updateFeedbackState.id == comment._id ? (
                    <EditComment
                      isReply={true}
                      commentId={comment?._id as string}
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
                            isReply={true}
                            commentId={comment?._id as string}
                            setId={setUpdateFeedbackState}
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-medium text-sm">
                            {comment?.userId?.name?.last_name}{" "}
                            {comment?.userId?.name?.first_name}
                          </p>
                          <span className="text-xs text-[#aaa]">
                            <TimeAgoVi date={comment?.createdAt} />
                          </span>
                        </div>
                        <p className="text-sm font-light">
                          <span className="text-blue-500 font-medium">
                            {comment?.parentReply?.userId?.name?.last_name}{" "}
                            {comment?.parentReply?.userId?.name?.first_name}
                          </span>{" "}
                          {comment?.comment}
                        </p>
                      </div>
                      <LikeDislikeAndReplyButtons
                        isReply={true}
                        likes={comment.likes as string[]}
                        dislikes={comment.dislikes as string[]}
                        commentId={comment?._id as string}
                        setReply={setUpdateFeedbackState}
                      />
                      <div className="">
                        {updateFeedbackState.isReply &&
                          updateFeedbackState.id == comment?._id && (
                            <SendReply
                              commentId={props.commentId}
                              isReply={true}
                              parentReply={comment._id as string}
                              setReply={setUpdateFeedbackState}
                            />
                          )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CommentReply;
