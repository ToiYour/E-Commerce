import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Breadcrumd {
  urlLink: string;
  title: string;
}
const Breadcrumd = ({
  page,
  breadcrumbs,
}: {
  page: string;
  breadcrumbs: Breadcrumd[];
}) => {
  document.title = page;
  return (
    <div className="breadcrumb-block style-img">
      <div className="breadcrumb-main bg-linear overflow-hidden">
        <div className="container lg:pt-[134px] pt-24 pb-10 relative">
          <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
            <div className="text-content">
              <div className="heading2 text-center">{page}</div>
              <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                {breadcrumbs?.map((breadcrumb, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <Link to={breadcrumb.urlLink}>{breadcrumb.title}</Link>{" "}
                    <ChevronRight size={18} strokeWidth={1} color="#a0a0a0" />
                  </div>
                ))}
                <div className="text-secondary2 capitalize">{page}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumd;
