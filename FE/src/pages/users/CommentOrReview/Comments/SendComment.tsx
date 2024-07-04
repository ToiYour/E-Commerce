import ButtonLoading from "@/components/ButtonLoading";
import { useAuth } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { createComment } from "@/services/comment";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const SendComment = () => {
  const { authUser, isLoggedIn } = useAuth();
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [isContentEmpty, setIsContentEmpty] = useState({
    isEmpty: true,
    focus: false,
  });
  const queryClient = useQueryClient();
  const handleContentChange = () => {
    const content = contentEditableRef.current?.textContent?.trim();
    const isEmpty = !(content && content.length > 0) as boolean;
    setIsContentEmpty({ isEmpty, focus: true });
  };
  const clearComment = () => {
    if (contentEditableRef.current) {
      contentEditableRef.current.textContent = "";
      setIsContentEmpty({ isEmpty: true, focus: false });
    }
  };
  const sendComment = async () => {
    if (contentEditableRef.current) {
      try {
        setLoading(true);
        const payload = {
          slug: slug as string,
          comment: contentEditableRef.current?.innerText as string,
        };
        await createComment(payload);
      } catch (error) {
        //
      } finally {
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ["COMMENTS_BY_PRODUCT_ID"] });
        contentEditableRef.current.textContent = "";
        setIsContentEmpty({ isEmpty: true, focus: false });
      }
    }
  };
  return (
    <div>
      <div className="flex items-start gap-3">
        {isLoggedIn ? (
          <>
            <div className="size-10 min-w-10 max-w-10 ">
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
                  "w-full outline-none border-b border-gray-300 text-sm",
                  (isContentEmpty.focus || !isContentEmpty.isEmpty) &&
                    "boder-b-2 border-[#ee4d2d]"
                )}
                onInput={handleContentChange}
                onFocus={() =>
                  setIsContentEmpty((prev) => ({
                    ...prev,
                    isEmpty:
                      contentEditableRef.current?.textContent?.trim().length ===
                      0,
                    focus: true,
                  }))
                }
                onBlur={() =>
                  setIsContentEmpty((prev) => ({
                    ...prev,
                    isEmpty:
                      contentEditableRef.current?.textContent?.trim().length ===
                      0,
                    focus: false,
                  }))
                }
              ></div>
              <div
                className={cn(
                  " items-center justify-end gap-3 *:px-5 *:py-1.5 *:rounded mt-3",
                  isContentEmpty.focus ? "flex" : "hidden"
                )}
              >
                <button
                  onMouseDown={clearComment}
                  className="hover:bg-gray-100"
                >
                  Huỷ
                </button>
                <button
                  onMouseDown={sendComment}
                  disabled={isContentEmpty.isEmpty || loading}
                  className="text-white bg-[#ee4d2d]"
                >
                  {loading ? <ButtonLoading /> : "Bình luận"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <h3 className="bg-[#0000003d] w-full px-5 py-1 rounded-lg">
            Đăng nhập để sử dụng tính năng bình luận
          </h3>
        )}
      </div>
    </div>
  );
};

export default SendComment;
