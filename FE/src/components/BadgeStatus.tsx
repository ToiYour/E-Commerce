import { Ban, CircleCheck } from "lucide-react";

const BadgeStatus = ({ status = true }: { status: boolean }) => {
  return (
    <>
      <span
        className={`${
          status ? "bg-emerald-100" : "bg-amber-100"
        } inline-flex items-center justify-center p-3 rounded-full   px-2.5 py-0.5 `}
      >
        <div
          className={`${
            status ? "text-emerald-700" : "text-amber-700"
          } flex items-center gap-x-1`}
        >
          {status ? (
            <CircleCheck color="green" size={16} />
          ) : (
            <Ban color="orange" size={16} />
          )}
          {status ? "Active" : "Draft"}
        </div>
      </span>
    </>
  );
};

export default BadgeStatus;
