import { Button } from "@/components/ui/button";

export default function ReviewActions() {
  return (
    <div className="w-full flex flex-col items-center">
      <p className="font-semibold text-[14px] text-[#0AA288]">
        Congrats! You’re saving $50.92 on your security bundle!
      </p>

      <Button className="bg-[#4E2FD2] font-bold text-white text-[17px] px-8 py-6 w-full cursor-pointer">
        Checkout
      </Button>

      <Button className="text-[#484848] underline italic font-light cursor-pointer">
        Save my system later
      </Button>
    </div>
  );
}
