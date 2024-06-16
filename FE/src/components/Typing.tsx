import { cn } from "@/lib/utils";

const Typing = ({
  class_name,
  avatar,
}: {
  class_name: string;
  avatar: string;
}) => {
  return (
    <div className={cn("absolute flex items-center gap-x-1", class_name)}>
      <img src={avatar} alt="" className={cn("w-7 h-7 rounded-full")} />
      <span className={cn("dots-cont bg-gray-200 rounded-2xl px-1")}>
        {" "}
        <span className="dot dot-1"></span> <span className="dot dot-2"></span>{" "}
        <span className="dot dot-3"></span>{" "}
      </span>
    </div>
  );
};

export default Typing;
