import Button from "../../utils/Button";
import HomeLayout from "../Layouts/HomeLayout";
import CallToAction from "./CallToAction";
import Card from "./Card";
import Companies from "./Companies";
import CourseSection from "./CourseSection";
import FAQs from "./FAQs";
import Feedback from "./Feedback";
import HomePage from "./HomePage";
import LaunchNotification from "./LaunchNotification";
import LogoTicker from "./LogoTicker";
import PricingSection from "./PricingSection";
import Reviews from "./Reviews";
import SecondTesti from "./SecondTesti";
import Section from "./Section";
import { SmoothScrollLenis } from "./SmoothScrollLenis";
import Testimonials from "./Testimonials";
import TextSlide from "./TextSlide";

function LandingPage() {
  return (
    <HomeLayout>
      <HomePage />
      <Reviews />
      <LogoTicker />
      <SmoothScrollLenis />
      <CourseSection />
      <TextSlide />
      <Testimonials />
      <Section />
      <CallToAction />
      <LaunchNotification />
      <PricingSection />
      <Companies />
      <SecondTesti />
      <FAQs/>
      <Feedback/>
      <Card/>
      <Button/>
     
    </HomeLayout>
  );
}
export default LandingPage;
