import { useAuth } from "@/hooks/auth";
import { IMessage } from "@/interfaces/message";
import { cn } from "@/lib/utils";
import TimeAgoVi from "./TimeAgoVi";

const Message = ({ data }: { data?: IMessage }) => {
  const { authUser } = useAuth();
  return (
    <>
      <div className="chat-message">
        <div
          className={cn(
            "flex items-end",
            data?.sender?._id == authUser?._id && "justify-end"
          )}
        >
          <div
            className={cn(
              data?.sender?._id == authUser?._id ? "order-1" : "order-2",
              "flex flex-col space-y-2 text-xs max-w-xs mx-2  items-start"
            )}
          >
            <div>
              <span
                className={cn(
                  "px-4 py-2 rounded-lg inline-block  ",
                  data?.sender?._id == authUser?._id
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-300 text-gray-600 rounded-bl-none"
                )}
              >
                {data?.message}
              </span>
            </div>
          </div>
          <img
            src={data?.sender?.avatar as string}
            alt="My profile"
            className={cn(
              data?.sender?._id == authUser?._id ? "order-2" : "order-1",
              "w-7 h-7 rounded-full "
            )}
          />
        </div>
        <span
          className={cn(
            "text-xs flex items-center px-8 pt-0.5 text-gray-400",
            data?.sender?._id == authUser?._id ? "justify-end" : "justify-start"
          )}
        >
          <TimeAgoVi date={data?.createdAt as string} />
        </span>
      </div>
    </>
  );
};

export default Message;
