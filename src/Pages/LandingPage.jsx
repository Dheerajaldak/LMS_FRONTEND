import HomeLayout from "../Layouts/HomeLayout";
import CallToAction from "./CallToAction";
import Companies from "./Companies";
import CourseSection from "./CourseSection";
import HomePage from "./HomePage";
import LaunchNotification from "./LaunchNotification";
import LogoTicker from "./LogoTicker";
import PricingSection from "./PricingSection";
import SecondTesti from "./SecondTesti";
import Section from "./Section";
import Testimonials from "./Testimonials";
import TextSlide from "./TextSlide";

function LandingPage() {
  return (
    <HomeLayout>
      <HomePage />
      <LogoTicker />
      <CourseSection />
      <TextSlide />
      <Testimonials />
      <Section />
      <CallToAction />
      <LaunchNotification />
      <PricingSection />
      <Companies />
      <SecondTesti/>
    </HomeLayout>
  );
}
export default LandingPage;
