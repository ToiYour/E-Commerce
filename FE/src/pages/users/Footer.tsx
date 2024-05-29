import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="footer bg-gray-50">
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
                    <span className="text-button ">Số điện thoại:</span>
                    <span className="text-button ">Địa chỉ:</span>
                    <span className="text-button ">Github:</span>
                    <span className="text-button ">Facebook:</span>
                  </div>
                  <div className="flex flex-col ">
                    <a href="mailto:toidz25102004@gmail.com?subject=Tiêu đề email&body=Nội dung email">
                      toidz25102004@gmail.com
                    </a>
                    <a href="sms:+84385521231">0385521231</a>
                    <span className="">Thạch Thất - Hà Nội</span>
                    <a href="https://github.com/ToiYour">
                      https://github.com/ToiYour
                    </a>
                    <a href="https://www.facebook.com/NguyenHuyToi.Your">
                      https://www.facebook.com/NguyenHuyToi.Your
                    </a>
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
