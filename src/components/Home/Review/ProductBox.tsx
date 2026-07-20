import { useFormContext, useWatch } from "react-hook-form";
import DebounceQuantityControl from "../Steps/CameraStep/DebounceQuantityControl";

interface ProductBoxProps {
  title: string;
  variantDetail: { id: string; name: string }[] | null;
  image: string;
  quantityName: string;
  unitPrice: number;
  discount: number | null;
  stock: number;
}

export default function ProductBox({
  title,
  variantDetail,
  image,
  quantityName,
  unitPrice,
  discount,
}: ProductBoxProps) {
  const methods = useFormContext();
  const quantity =
    useWatch({
      name: quantityName,
      control: methods.control,
    }) || 0;

  // 1. Calculate the true current price after applying the discount
  const isFullyDiscounted = discount === 100;
  const currentPrice = isFullyDiscounted
    ? 0
    : discount
      ? unitPrice * quantity * (1 - discount / 100)
      : unitPrice * quantity;

  // 2. The original price is just the base price before any discount
  const originalPrice = discount ? unitPrice * quantity : null;

  const variantStr = variantDetail
    ?.map((d: { id: string; name: string }) => d.name)
    .join(" - ");

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Left section: Image and Title details */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-[41px] h-[41px] bg-white border border-slate-100 rounded-lg flex items-center justify-center p-[5px] flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="min-w-0 flex flex-col">
          <p className="font-semibold text-sm text-[#1F1F1F] leading-tight md:text-base">
            {title}
          </p>

          {variantStr && (
            <p className="text-xs text-slate-500 font-medium mt-1 truncate leading-tight">
              {variantStr}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        <DebounceQuantityControl
          name={quantityName}
          initialValue={0}
        />

        {/* Right section: Price details */}
        <div className="flex flex-col items-end ">
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
    </div>
  );
}
