import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="footer bg-gray-50 ">
        <div className="footer-main bg-surface">
          <div className="container">
            <div className="content-footer md:py-[60px] py-10 flex justify-between flex-wrap gap-y-8">
              <div className="company-infor basis-1/4 max-lg:basis-full pr-7">
                <Link to={"/"} className="logo inline-block">
                  <div className="heading3 w-fit">Toinh</div>
                </Link>
                <div className="flex gap-3 mt-3">
                  <div className="flex flex-col ">
                    <span className="flex flex-wrap items-center font-bold">
                      Mail:{" "}
                      <a
                        className="font-normal"
                        href="mailto:toidz25102004@gmail.com?subject=Tiêu đề email&body=Nội dung email"
                      >
                        toidz25102004@gmail.com
                      </a>
                    </span>
                    <span className="flex flex-wrap items-center font-bold ">
                      Số điện thoại:{" "}
                      <a className="font-normal" href="tel:+84385521231">
                        0385521231
                      </a>
                    </span>
                    <span className="flex flex-wrap items-center font-bold ">
                      Github:{" "}
                      <a
                        className="font-normal"
                        href="https://github.com/ToiYour"
                      >
                        https://github.com/ToiYour
                      </a>
                    </span>
                    <span className="flex flex-wrap items-center font-bold ">
                      Facebook:{" "}
                      <a
                        className="font-normal"
                        href="https://www.facebook.com/NguyenHuyToi.Your"
                      >
                        https://www.facebook.com/NguyenHuyToi.Your
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
