import { useAuth } from "@/hooks/auth";
import { IConversation } from "@/interfaces/conversation";
import { cn } from "@/lib/utils";
type ChatSectionItemType = {
  data: IConversation;
  status?: boolean;
  cancelConnect?: string;
};
const ChatSectionItem = ({ data, status }: ChatSectionItemType) => {
  const { authUser } = useAuth();

  return (
    <div className="group-[.active]:bg-[#f051231a] flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md ">
      <div className="relative size-12 bg-gray-300 rounded-full mr-3">
        <img
          src={data.participant?.avatar as string}
          alt={`${data.participant?.name?.last_name} ${data.participant?.name?.first_name}`}
          className="size-12 min-h-12 min-w-12  rounded-full"
        />
        <span
          className={cn(
            status ? "bg-green-500" : "bg-gray-600",
            "absolute bottom-0.5 right-1 size-3 rounded-full"
          )}
        />
      </div>
      <div className="flex-1 hidden md:block">
        <h2 className="text-lg font-semibold">{`${data.participant?.name?.last_name} ${data.participant?.name?.first_name}`}</h2>
        <p className="text-gray-600 truncate w-3/5 max-w-60">
          <span
            className={cn(
              data.lastMessage?.sender == authUser?._id
                ? "inline-block"
                : "hidden"
            )}
          >
            Bạn:
          </span>{" "}
          {data.lastMessage?.message}
        </p>
      </div>
    </div>
  );
};

export default ChatSectionItem;
