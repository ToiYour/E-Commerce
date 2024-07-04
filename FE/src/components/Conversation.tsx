import { cn } from "@/lib/utils";
import TimeAgoVi from "./TimeAgoVi";

type Conversation = {
  imgUrl: string;
  status: boolean;
  name: string;
  role?: boolean;
  cancelConnectAt?: string;
};
const Conversation = ({
  imgUrl,
  status,
  name,
  role = false,
  cancelConnectAt,
}: Conversation) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative">
        <img
          src={imgUrl}
          alt={name}
          className="size-8 object-cover rounded-full"
        />
        <span
          className={cn(
            status ? "bg-green-500" : "bg-gray-600",
            "absolute bottom-0.5 -right-0.5 size-3 rounded-full"
          )}
        ></span>
      </div>
      <div className="">
        <h3 className="text-sm font-semibold">
          {name} {role && `(Admin)`}
        </h3>
        <p className="text-xs font-light text-gray-300">
          {status ? (
            "Online"
          ) : cancelConnectAt ? (
            <>
              Hoạt động <TimeAgoVi date={cancelConnectAt as string} />
            </>
          ) : (
            "Offline"
          )}
        </p>
      </div>
    </div>
  );
};

export default Conversation;
