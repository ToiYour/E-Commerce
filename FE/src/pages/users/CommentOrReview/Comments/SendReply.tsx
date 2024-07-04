import ButtonLoading from "@/components/ButtonLoading";
import { useAuth } from "@/hooks/auth";
import { cn, ToastError } from "@/lib/utils";
import { createCommentReply } from "@/services/comment";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
type SendReply = {
  commentId?: string;
  isReply?: boolean;
  parentReply?: string;
  setReply: (reply: { isEdit: boolean; isReply: boolean; id: string }) => void;
};
const SendReply = (props: SendReply) => {
  const { authUser } = useAuth();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [isContentEmpty, setIsContentEmpty] = useState({
    isEmpty: true,
    focus: true,
  });
  useEffect(() => {
    const element = contentEditableRef.current as HTMLDivElement;
    element && element.focus();
  }, []);
  const handleContentChange = () => {
    const content = contentEditableRef.current?.textContent?.trim();
    const isEmpty = !(content && content.length > 0) as boolean;
    setIsContentEmpty({ isEmpty, focus: true });
  };

  const sendComment = async () => {
    if (contentEditableRef.current) {
      setLoading(true);
      const payload = {
        comment: contentEditableRef.current?.innerText,
        parentComment: props?.commentId,
        parentReply: props?.parentReply,
      };

      try {
        await createCommentReply(payload);
      } catch (error) {
        if (error instanceof AxiosError) {
          ToastError(error.response?.data.message);
        }
      } finally {
        queryClient.invalidateQueries({ queryKey: ["COMMENTS_BY_PRODUCT_ID"] });
        contentEditableRef.current.textContent = "";
        setLoading(false);
        setIsContentEmpty({ isEmpty: true, focus: false });
        props.setReply({ id: "", isEdit: false, isReply: false });
      }
    }
  };
  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="size-6 min-w-6 max-w-6 ">
          <img
            src={authUser?.avatar as string}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="w-[95%]">
          <div
            ref={contentEditableRef}
            contentEditable="true"
            data-placeholder="Viết bình luận..."
            className={cn(
              "w-full outline-none border-b border-gray-300 text-sm transition-all focus:border-[#ee4d2d]",
              !isContentEmpty.isEmpty && "boder-b-2 border-[#ee4d2d]"
            )}
            onInput={handleContentChange}
            onFocus={() =>
              setIsContentEmpty((prev) => ({
                ...prev,
                isEmpty:
                  contentEditableRef.current?.textContent?.trim().length === 0,
                focus: true,
              }))
            }
          ></div>
          <div
            className={cn(
              " items-center justify-end gap-3 *:px-3 *:py-0.5 *:rounded mt-3",
              isContentEmpty.focus ? "flex" : "hidden"
            )}
          >
            <button
              onMouseDown={() =>
                props.setReply({ id: "", isEdit: false, isReply: false })
              }
              className="hover:bg-gray-100"
            >
              Huỷ
            </button>
            <button
              onMouseDown={sendComment}
              disabled={isContentEmpty.isEmpty || loading}
              className="text-white bg-[#ee4d2d]"
            >
              {loading ? <ButtonLoading /> : "Phản hồi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendReply;
