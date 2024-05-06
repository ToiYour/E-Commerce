import { Send } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-main bg-surface">
        <div className="container">
          <div className="content-footer md:py-[60px] py-10 flex justify-between flex-wrap gap-y-8">
            <div className="company-infor basis-1/4 max-lg:basis-full pr-7">
              <Link to={"/"} className="logo inline-block">
                <div className="heading3 w-fit">Toinh</div>
              </Link>
              <div className="flex gap-3 mt-3">
                <div className="flex flex-col ">
                  <span className="text-button">Mail:</span>
                  <span className="text-button mt-3">Phone:</span>
                  <span className="text-button mt-3">Address:</span>
                </div>
                <div className="flex flex-col ">
                  <span className="">toidz25102004@gmail.com</span>
                  <span className="mt-[14px]">0385521231</span>
                  <span className="mt-3 pt-1">Hà Nội</span>
                </div>
              </div>
            </div>
            <div className="right-content flex flex-wrap gap-y-8 basis-3/4 max-lg:basis-full">
              <div className="list-nav flex justify-between basis-2/3 max-md:basis-full gap-4">
                <div className="item flex flex-col basis-1/3 ">
                  <div className="text-button-uppercase pb-3">Infomation</div>
                  <a
                    className="caption1 has-line-before duration-300 w-fit"
                    href="contact.html"
                  >
                    Contact us
                  </a>
                  <a
                    className="caption1 has-line-before duration-300 w-fit pt-2"
                    href="#!"
                  >
                    Career
                  </a>
                  <a
                    className="caption1 has-line-before duration-300 w-fit pt-2"
                    href="my-account.html"
                  >
                    My Account
                  </a>
                  <a
                    className="caption1 has-line-before duration-300 w-fit pt-2"
                    href="order-tracking.html"
                  >
                    Order &amp; Returns
                  </a>
                  <a
                    className="caption1 has-line-before duration-300 w-fit pt-2"
                    href="faqs.html"
                  >
                    FAQs
                  </a>
                </div>
                <div className="item flex flex-col basis-1/3 ">
                  <div className="text-button-uppercase pb-3">Quick Shop</div>
                  <a
                    className="caption1 has-line-before duration-300 w-fit"
                    href="shop-breadcrumb1.html"
                  >
                    Women
                  </a>
                  <a
                    className="caption1 has-line-before duration-300 w-fit pt-2"
                    href="shop-breadcrumb1.html"
                  >
                    Men
                  </a>
                  <a
                    className="caption1 has-line-before duration-300 w-fit pt-2"
                    href="shop-breadcrumb1.html"
                  >
                    Clothes
                  </a>
                  <a
                    className="caption1 has-line-before duration-300 w-fit pt-2"
                    href="shop-breadcrumb1.html"
                  >
                    Accessories
                  </a>
                  <a
                    className="caption1 has-line-before duration-300 w-fit pt-2"
                    href="blog-default.html"
                  >
                    Blog
                  </a>
                </div>
                <div className="item flex flex-col basis-1/3 ">
                  <div className="text-button-uppercase pb-3">
                    Customer Services
                  </div>
                  <a
                    className="caption1 has-line-before duration-300 w-fit"
                    href="faqs.html"
                  >
                    FAQs
                  </a>
                  <a
                    className="caption1 has-line-before duration-300 w-fit pt-2"
                    href="faqs.html"
                  >
                    Shipping
                  </a>
                  <a
                    className="caption1 has-line-before duration-300 w-fit pt-2"
                    href="faqs.html"
                  >
                    Privacy Policy
                  </a>
                  <a
                    className="caption1 has-line-before duration-300 w-fit pt-2"
                    href="order-tracking.html"
                  >
                    Return &amp; Refund
                  </a>
                </div>
              </div>
              <div className="newsletter basis-1/3 pl-7 max-md:basis-full max-md:pl-0">
                <div className="text-button-uppercase">Newletter</div>
                <div className="caption1 mt-3">
                  Sign up for our newsletter and get 10% off your first purchase
                </div>
                <div className="input-block w-full h-[52px] mt-4">
                  <form
                    className="w-full h-full relative"
                    action="https://anvogue-html.vercel.app/post"
                  >
                    <input
                      type="email"
                      placeholder="Enter your e-mail"
                      className="caption1 w-full h-full pl-4 pr-14 rounded-xl border border-gray-300 border-line"
                    />
                    <button className="w-[44px] h-[44px] bg-black flex items-center justify-center rounded-xl absolute top-1 right-1">
                      <Send color="white" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
