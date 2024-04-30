import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpNarrowWide,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
interface IArrangeTable {
  column: string;
}
const ArrangeTable = ({ column }: IArrangeTable) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentType =
    column == searchParams.get("arrange")
      ? searchParams.get("orderBy")
      : ("default" as const);
  const IconSort = {
    default: ArrowDownUp,
    asc: ArrowUpNarrowWide,
    desc: ArrowDownNarrowWide,
  };
  const IconTable = IconSort[currentType as keyof typeof IconSort];
  return (
    <IconTable
      size={16}
      onClick={() => {
        const urlSearch: { [key: string]: string } = {};
        for (const [key, val] of searchParams.entries()) {
          urlSearch[key] = val;
        }
        let orderBy: string;
        if (!searchParams.get("orderBy")) {
          orderBy = "asc";
        } else {
          orderBy = searchParams.get("orderBy") == "asc" ? "desc" : "asc";
        }
        setSearchParams({
          ...urlSearch,
          arrange: column,
          orderBy: `${orderBy}`,
        });
      }}
    />
  );
};

export default ArrangeTable;
