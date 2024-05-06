import Benefit from "@/components/users/Homes/Benefit";
import Collections from "@/components/users/Homes/Collections";
import Slides from "@/components/users/Homes/Slides";
import Testimonial from "@/components/users/Homes/Testimonial";

const HomePage = () => {
  return (
    <>
      <Slides />
      <Benefit />
      <Collections />
      <Testimonial />
    </>
  );
};

export default HomePage;
