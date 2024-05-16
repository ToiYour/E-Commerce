import { PhoneCall, ArchiveRestore, BadgeCheck } from "lucide-react";
const Benefit = () => {
  return (
    <div className="benefit-block bg-white md:pt-20 pt-10">
      <div className="container">
        <div className="list-benefit grid items-start md:grid-cols-2 lg:grid-cols-4  gap-[30px]">
          <div className="benefit-item flex flex-col items-center justify-center">
            <PhoneCall size={48} strokeWidth={1} />
            <div className="heading6 text-center mt-5">
              Dịch vụ khách hàng 24/7
            </div>
            <div className="caption1 text-secondary text-center mt-3">
              Chúng tôi sẵn sàng trợ giúp bạn nếu bạn có bất kỳ câu hỏi hoặc
              thắc mắc nào, 24/7.
            </div>
          </div>
          <div className="benefit-item flex flex-col items-center justify-center">
            <ArchiveRestore size={48} strokeWidth={1} />
            <div className="heading6 text-center mt-5">
              Hoàn tiền trong 14 ngày
            </div>
            <div className="caption1 text-secondary text-center mt-3">
              Nếu bạn không hài lòng với giao dịch mua hàng của mình, chỉ cần
              trả lại trong vòng 14 ngày để được hoàn lại tiền.
            </div>
          </div>
          <div className="benefit-item flex flex-col items-center justify-center">
            <i className="icon-guarantee lg:text-7xl text-5xl" />
            <BadgeCheck size={48} strokeWidth={1} />
            <div className="heading6 text-center mt-5">
              Đảm bảo của chúng tôi
            </div>
            <div className="caption1 text-secondary text-center mt-3">
              {" "}
              Chúng tôi ủng hộ các sản phẩm và dịch vụ của mình và đảm bảo cho
              bạn sự hài lòng.
            </div>
          </div>
          <div className="benefit-item flex flex-col items-center justify-center">
            <svg
              fill="#000000"
              height="48px"
              width="48px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 495.317 495.317"
              xmlSpace="preserve"
            >
              <path
                d="M495.103,333.198c-1.933-9.851-19.004-96.612-23.221-109.279c-10.139-30.455-34.498-65.125-65.159-92.742
	c-31.879-28.713-64.908-45.181-90.62-45.181H65.991c-12.962,0-23.508,10.546-23.508,23.508v36.938H25.165
	c-6.351,0-11.5,5.149-11.5,11.5s5.149,11.5,11.5,11.5h17.317v27.432H11.5c-6.351,0-11.5,5.149-11.5,11.5
	c0,6.351,5.149,11.5,11.5,11.5h30.982v115.537c0,12.962,10.546,23.507,23.508,23.507h28.672
	c4.287,28.488,28.926,50.401,58.59,50.401c29.664,0,54.303-21.913,58.589-50.401h105.484c4.286,28.488,28.926,50.401,58.59,50.401
	c29.664,0,54.303-21.913,58.589-50.401h37.304c12.963,0,23.509-10.545,23.509-23.507
	C495.317,334.669,495.245,333.928,495.103,333.198z M448.743,227.476l-118.502-0.001V111.052
	C372.222,122.327,430.41,178.181,448.743,227.476z M153.253,386.32c-19.99,0-36.254-16.263-36.254-36.254
	c0-19.99,16.264-36.253,36.254-36.253c19.99,0,36.253,16.263,36.253,36.253C189.505,370.057,173.243,386.32,153.253,386.32z
	 M375.916,386.32c-19.99-0.001-36.254-16.264-36.254-36.254c0-19.99,16.264-36.253,36.254-36.253s36.253,16.263,36.253,36.253
	C412.169,370.057,395.906,386.32,375.916,386.32z M471.24,335.919c-9.59,0-37.791,0-37.791,0
	c-6.361-25.861-29.736-45.105-57.533-45.105s-51.173,19.244-57.534,45.105H210.786c-6.361-25.861-29.736-45.105-57.533-45.105
	c-27.797,0-51.173,19.244-57.534,45.105H65.991c-0.28,0-0.508-0.228-0.508-0.507V219.875h140.934c6.351,0,11.5-5.149,11.5-11.5
	c0-6.351-5.149-11.5-11.5-11.5H65.482v-27.432h64.87c6.351,0,11.5-5.149,11.5-11.5s-5.149-11.5-11.5-11.5h-64.87v-36.938
	c0-0.28,0.228-0.508,0.508-0.508h241.251v129.978c0,6.351,5.148,11.5,11.5,11.5l135.955,0.001
	c4.904,22.361,11.63,58.202,17.356,84.734C472.168,335.744,471.834,335.919,471.24,335.919z"
              />
            </svg>

            <div className="heading6 text-center mt-5">
              Vận chuyển trên toàn thế giới
            </div>
            <div className="caption1 text-secondary text-center mt-3">
              Chúng tôi vận chuyển sản phẩm của mình trên toàn thế giới, giúp
              chúng có thể tiếp cận được với khách hàng ở mọi nơi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
