import CameraSectionReview from "./CameraSectionReview";

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

        <hr className="my-[10px] text-[#CED6DE]" />

        <CameraSectionReview />
      </div>
    </div>
  );
}
