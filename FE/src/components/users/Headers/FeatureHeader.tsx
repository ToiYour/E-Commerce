import { Search, ShoppingCart, User } from "lucide-react";
import FeatureSearch from "./FeatureSearch";
import { useState } from "react";

const FeatureHeader = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className="right flex gap-12">
      <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
        {/* <i className="" /> */}
        {isOpenModal && <FeatureSearch onUIModal={setIsOpenModal} />}
        <Search
          className="ph-bold ph-magnifying-glass "
          onClick={() => setIsOpenModal(true)}
        />
        <div className="line absolute bg-gray-300 w-px h-6 -right-6" />
      </div>
      <div className="list-action flex items-center gap-4">
        <div className="user-icon flex items-center justify-center cursor-pointer">
          {/* <i className="ph-bold ph-user text-2xl" /> */}
          <User className="ph-bold ph-user " />
        </div>
        <div className="max-md:hidden cart-icon flex items-center relative cursor-pointer">
          <ShoppingCart className="ph-bold ph-handbag" />
          <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-[#ee4d2d] w-4 h-4 flex items-center justify-center rounded-full">
            0
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureHeader;
