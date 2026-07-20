import Fees from "./../../../../assets/worry-fees.png";
import { Badge } from "@/components/ui/badge";

export default function TotalSection() {
  return (
    <div className="flex items-center justify-between">
      <div className="">
        <img src={Fees} className="w-20" />
      </div>

      <div className="space-y-2 flex flex-col items-end">
        <Badge className="bg-[#4E2FD2] text-white">as low as $19.19/mo</Badge>

        <div className="flex items-center gap-x-2">
          <p className="line-through font-medium text-lg text-[#6F7882]">
            $238.81
          </p>

          <p className="text-[#4E2FD2] font-bold text-2xl">$187.89</p>
        </div>
      </div>
    </div>
  );
}
