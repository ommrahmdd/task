import { Badge } from "@/components/ui/badge";
import classNames from "classnames";
import React from "react";

export default function ProductBoxLayout({
  children,
  className,
  product,
}: {
  children: React.ReactElement;
  className?: string;
  product: {
    image: string;
    discount: number;
    title: string;
    description: string;
  };
}) {
  return (
    <div
      className={classNames(
        "p-2.75 rounded-xl grid grid-cols-3 bg-white",
        className,
      )}
    >
      <div className="p-4 relative self-start">
        <img
          src={product?.image}
          className="w-[101px] h-[137px] object-scale-down"
        />
        {!!product?.discount && (
          <Badge className="bg-[#4E2FD2] text-white absolute left-1 top-1 text-[12px]">
            Save {product?.discount}%
          </Badge>
        )}
      </div>

      <div className="col-span-2 flex flex-col gap-y-2">
        <div className="space-y-2">
          <h4 className="font-semibold text-base">{product.title}</h4>
          <p className="text-xs font-medium text-[#1F1F1FBF]">
            {product.description}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
