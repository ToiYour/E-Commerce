import { statusOrder } from "@/lib/utils";
import { useState } from "react";

const Purchase = () => {
  const [tab, setTab] = useState("all");
  return (
    <div>
      <ul className="tabs-purchase flex items-center justify-center *:flex-shrink-0  *:text-center *:py-4 *:px-11 overflow-x-scroll  bg-gray-100">
        {statusOrder.map((item) => (
          <li
            key={item.key}
            className={tab == item.key ? "active" : ""}
            onClick={() => setTab(item.key)}
          >
            {item.value}
          </li>
        ))}
      </ul>
      <div className="tab-content bg-gray-100 mt-3 ">
        <div className="no-order flex flex-col items-center justify-center p-28 ">
          <img
            src="/images/no-order.png"
            alt=""
            className="object-cover size-24"
          />
          <p>Chưa có đơn hàng</p>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
