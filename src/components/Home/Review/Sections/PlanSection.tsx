import PlanIcon from "@/assets/icons/PlanIcon";

export default function PlanSection() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <PlanIcon />

        <p className="!m-0 font-bold text-base">
          Cam <span className="text-[#4E2FD2]">Unlimited</span>
        </p>
      </div>

      <div className="flex flex-col items-end">
        <p className="text-sm text-[#6F7882] font-medium m-0! line-through">
          $12.99/mo
        </p>
        <p className="text-[#4E2FD2] text-sm font-semibold m-0!">$9.99/mo</p>
      </div>
    </div>
  );
}
