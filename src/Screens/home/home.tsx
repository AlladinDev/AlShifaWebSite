import { About } from "../About/About";
import { Appointment } from "../Appointment/Appointment";
import FAQSection from "../Faqs/Faqs";
import Footer from "../Footer/Footer";
import { MainSection } from "../Main/Main";

export const Home = () => {
  return (
    <div className="h-full">
      <MainSection />
      <About />
      <Appointment />
      <FAQSection />
      <Footer />
    </div>
  );
};
