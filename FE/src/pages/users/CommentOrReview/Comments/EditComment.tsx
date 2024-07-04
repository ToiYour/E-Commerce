import { cn, ToastError } from "@/lib/utils";
import { updateCommentById, updateCommentReplyById } from "@/services/comment";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

type EditComment = {
  commentId: string;
  isReply: boolean;
  defaultValue: string;
  setId: (props: { isEdit: boolean; isReply: boolean; id: string }) => void;
};
const EditComment = (props: EditComment) => {
  const queryClient = useQueryClient();
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [isContentEmpty, setIsContentEmpty] = useState({
    isEmpty: true,
    focus: false,
  });
  useEffect(() => {
    const element = contentEditableRef.current;
    if (element) {
      element.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, []);
  const handleContentChange = () => {
    const content = contentEditableRef.current?.textContent?.trim();
    const isEmpty = !(content && content.length > 0) as boolean;
    setIsContentEmpty({ isEmpty, focus: true });
  };

  const saveComment = async () => {
    if (contentEditableRef.current) {
      try {
        if (props.isReply) {
          const payload = {
            commentReplyId: props.commentId,
            comment: contentEditableRef.current?.innerText,
          };
          await updateCommentReplyById(payload);
        } else {
          const payload = {
            commentId: props.commentId,
            comment: contentEditableRef.current?.innerText,
          };
          await updateCommentById(payload);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          ToastError(error?.response?.data?.message);
        }
      } finally {
        queryClient.invalidateQueries({ queryKey: ["COMMENTS_BY_PRODUCT_ID"] });
        contentEditableRef.current.textContent = "";
        props.setId({
          id: "",
          isEdit: false,
          isReply: false,
        });
        setIsContentEmpty({ isEmpty: true, focus: false });
      }
    }
  };
  return (
    <div className="w-[95%]">
      <div
        ref={contentEditableRef}
        contentEditable="true"
        data-placeholder="Viết bình luận..."
        className={cn(
          "w-full outline-none border-b border-gray-300 text-sm",
          (isContentEmpty.focus || !isContentEmpty.isEmpty) &&
            "boder-b-2 border-[#ee4d2d]"
        )}
        autoFocus
        onInput={handleContentChange}
        onFocus={() =>
          setIsContentEmpty((prev) => ({
            ...prev,
            isEmpty:
              contentEditableRef.current?.textContent?.trim().length === 0,
            focus: true,
          }))
        }
        dangerouslySetInnerHTML={{ __html: props?.defaultValue }}
      ></div>
      <div
        className={cn(
          " items-center justify-end gap-3 *:px-5 *:py-1.5 *:rounded mt-3",
          isContentEmpty.focus ? "flex" : "hidden"
        )}
      >
        <button
          onMouseDown={() =>
            props.setId({ id: "", isEdit: false, isReply: false })
          }
          className="hover:bg-gray-100"
        >
          Huỷ
        </button>
        <button
          onMouseDown={saveComment}
          disabled={isContentEmpty.isEmpty}
          className="text-white bg-[#ee4d2d]"
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default EditComment;
