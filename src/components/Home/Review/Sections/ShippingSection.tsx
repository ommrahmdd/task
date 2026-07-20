import CarbonDeliveryIcon from "@/assets/icons/CarbonDeliveryIcon";
import React from "react";

export default function ShippingSection() {
  const title = "Fast Shipping";
  const originalPrice = 1500;
  const currentPrice = 20;

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Left section: Image and Title details */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-[41px] h-[41px] bg-white border border-slate-100 rounded-lg flex items-center justify-center p-[5px] flex-shrink-0">
          <CarbonDeliveryIcon />
        </div>

        <div className="min-w-0 flex flex-col">
          <p className="font-semibold text-base text-[#1F1F1F] leading-tight">
            {title}
          </p>
        </div>
      </div>

      {/* Right section: Price details */}
      <div className="flex flex-col items-end flex-shrink-0 min-w-[75px]">
        {originalPrice && originalPrice > 0 && (
          <span className="text-xs text-slate-400 line-through leading-tight mb-0.5">
            ${originalPrice.toFixed(2)}
          </span>
        )}
        <span className="text-base font-semibold text-[#4E2FD2] leading-none">
          ${currentPrice <= 0 ? "FREE" : currentPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
