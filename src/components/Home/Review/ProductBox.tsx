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
  const quantity = useWatch({
    name: quantityName,
    control: methods.control,
  }) || 0;

  const currentPrice = unitPrice * quantity;
  const originalPrice = discount ? currentPrice / (1 - discount / 100) : null;

  const variantStr = variantDetail?.map((d: any) => d.name).join(" - ");

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Left section: Image and Title details */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-[50px] h-[50px] bg-white border border-slate-100 rounded-lg flex items-center justify-center p-[5px] flex-shrink-0">
          <img src={image} alt={title} className="max-w-full max-h-full object-contain" />
        </div>

        <div className="min-w-0 flex flex-col">
          <p className="font-semibold text-base text-[#1F1F1F] truncate leading-tight">
            {title}
          </p>
          {variantStr && (
            <p className="text-xs text-slate-500 font-medium mt-1 truncate leading-tight">
              {variantStr}
            </p>
          )}
        </div>
      </div>

      {/* Middle section: Quantity control */}
      <div className="flex-shrink-0">
        <DebounceQuantityControl name={quantityName} initialValue={0} />
      </div>

      {/* Right section: Price details */}
      <div className="flex flex-col items-end flex-shrink-0 min-w-[75px]">
        {originalPrice && originalPrice > 0 && (
          <span className="text-xs text-slate-400 line-through leading-tight mb-0.5">
            ${originalPrice.toFixed(2)}
          </span>
        )}
        <span className="text-base font-semibold text-[#4E2FD2] leading-none">
          ${currentPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
