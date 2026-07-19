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
        "p-2.75 rounded-xl grid grid-cols-1 bg-white md:grid-cols-1 xl:grid-cols-3",
        className,
      )}
    >
      <div className="p-4 relative self-start">
        <img
          src={product?.image}
          className="w-full h-[137px] object-contain mx-auto sm:w-[101px]"
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
          <p className="text-sm font-medium text-[#1F1F1FBF]">
            {product.description}{" "}
            <a href="#" className="text-[#0000EE] font-medium">
              Learn more
            </a>
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
