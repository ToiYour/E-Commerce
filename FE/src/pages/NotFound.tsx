import React from "react";
import { Link } from "react-router-dom";

const NotFound = (props: { href: string }) => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">
          Chúng tôi không thể tìm thấy trang đó.
        </p>

        <Link
          to={props.href}
          className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Trở về trang chính
        </Link>
      </div>
    </div>
  );
};

export default NotFound;