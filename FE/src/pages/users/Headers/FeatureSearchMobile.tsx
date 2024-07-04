import { IProduct } from "@/interfaces/product";
import { getSearchProducts } from "@/services/product";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
type propsType = {
  onHandleClick: () => void;
};
const FeatureSearchMobile = (props: propsType) => {
  const navigate = useNavigate();
  const [listAutocomplete, setListAutocomplete] = useState<IProduct[]>([]);
  const handleAutocomplete = useDebouncedCallback((key) => {
    getSearchProducts(key).then(({ data }) => {
      setListAutocomplete(data.data);
    });
  }, 1000);
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elementForm = e.target as HTMLFormElement;
    const formData = new FormData(elementForm);
    props.onHandleClick();
    navigate("/shop?search=" + formData.get("search"));
  };
  return (
    <form onSubmit={handleSubmitForm}>
      <div className="form-search relative mt-2">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
          strokeWidth={1}
          size={18}
        />

        <input
          onChange={(e) => handleAutocomplete(e.target.value)}
          type="text"
          placeholder="Nhập tên sản phẩm..."
          className=" h-12 rounded-lg border border-gray-200 border-line text-sm w-full pl-10 pr-4"
        />
      </div>
      <div className="autocomplete mt-3 bg-gray-100 rounded">
        <ul className="*:py-1  *:relative">
          {listAutocomplete?.map((item) => (
            <li key={item._id}>
              <Link
                onClick={() => props.onHandleClick()}
                to={"/shop/" + item.slug}
                className="flex items-center pl-4"
              >
                <Search strokeWidth={1} size={16} />
                <span className="pl-2">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default FeatureSearchMobile;
