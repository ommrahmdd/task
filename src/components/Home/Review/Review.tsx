import CameraSectionReview from "./Sections/CameraSectionReview";
import ReviewActions from "./Sections/ReviewActions";
import ReviewSection from "./ReviewSectionLayout";
import TotalSection from "./Sections/TotalSection";
import PlanSection from "./Sections/PlanSection";
import SensorSection from "./Sections/SensorSection";
import AccessoriesSection from "./Sections/AccessoriesSection";
import ShippingSection from "./Sections/ShippingSection";

export default function Review() {
  return (
    <div>
      <p className="font-medium text-[#484848] mb-[25px] uppercase tracking-[1.6px]">
        Review
      </p>

      <div className="px-2 space-y-1">
        <h6 className="font-semibold text-[22px] text-[#1F1F1F] tracking-[.6px]">
          Your security system
        </h6>

        <p className="text-[#484848] font-medium tracking-[.6px] leading-5">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>

        <ReviewSection title="Cameras">
          <CameraSectionReview />
        </ReviewSection>

        <ReviewSection title="Sensors">
          <SensorSection />
        </ReviewSection>

        <ReviewSection title="accessories">
          <AccessoriesSection />
        </ReviewSection>

        <ReviewSection title="plan">
          <PlanSection />
        </ReviewSection>

        <ReviewSection title="">
          <ShippingSection />
        </ReviewSection>

        <div className="my-[13px]">
          <TotalSection />
        </div>

        <div className="mb-2">
          <ReviewActions />
        </div>
      </div>
    </div>
  );
}
