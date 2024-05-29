import Benefit from "./Benefit";
import Collections from "./Collections";
import Slides from "./Slides";
import Testimonial from "./Testimonial";

const HomePage = () => {
  document.title = "Toinh";
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
