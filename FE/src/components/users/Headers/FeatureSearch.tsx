import { getSearchProducts } from "@/api/products";
import { IProduct } from "@/interfaces/product";
import { Search, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const FeatureSearch = ({
  onUIModal,
}: {
  onUIModal: (isOpen: boolean) => void;
}) => {
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
    navigate("/shop?search=" + formData.get("search"));
    onUIModal(false);
  };
  return (
    <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
      {/* overlay */}
      <div
        onClick={() => onUIModal(false)}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
      ></div>
      {/* Modal */}
      <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
        <div className="w-full py-10 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
          <button
            onClick={() => onUIModal(false)}
            tabIndex={-1}
            type="button"
            className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
          >
            <X className="h-4 w-4 cursor-pointer text-gray-400" />
            <span className="sr-only">Close</span>
          </button>
          <div className="">
            <form
              className="form-search relative w-full px-2"
              onSubmit={handleSubmitForm}
            >
              <Search
                strokeWidth={1.5}
                size={22}
                className="absolute top-1/2 left-4 -translate-y-1/2"
              />

              <input
                onChange={(e) => handleAutocomplete(e.target.value)}
                type="text"
                placeholder="Tìm kiếm..."
                name="search"
                className="text-button-lg h-9 rounded-2xl w-full pl-10 pr-12 bg-gray-100 outline-none border-none"
              />
            </form>
            <div className="autocomplete mt-3">
              <ul className="*:py-1  *:relative">
                {listAutocomplete?.map((item) => (
                  <li key={item._id}>
                    <Link
                      onClick={() => onUIModal(false)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSearch;
