import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { STORAGE_KEY } from "@/components/Home/Layout";

export default function ReviewActions() {
  const [isSaved, setIsSaved] = useState(false);
  const methods = useFormContext();

  const handleSaveLater = () => {
    if (!methods) return;
    const values = methods.getValues();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <p className="font-semibold text-[14px] text-[#0AA288]">
        Congrats! You’re saving $50.92 on your security bundle!
      </p>

      <Button className="bg-[#4E2FD2] font-bold text-white text-[17px] px-8 py-6 w-full cursor-pointer">
        Checkout
      </Button>

      <Button
        type="button"
        onClick={handleSaveLater}
        className="text-[#484848] underline italic font-light cursor-pointer"
      >
        Save my system later
      </Button>

      {isSaved && (
        <p className="text-xs text-[#0AA288] font-medium mt-1 animate-pulse">
          System saved for later!
        </p>
      )}
    </div>
  );
}
