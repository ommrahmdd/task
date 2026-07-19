import type { Product } from "@/components/Home/Layout";
import { useFormContext, useWatch } from "react-hook-form";

export const useCameraInfo = () => {
  const methods = useFormContext();
  const watchProducts = useWatch({
    name: "products",
    control: methods?.control,
  });

  const withoutVariantsProducts = watchProducts?.filter(
    (p: Product) => !!p.quantity,
  );

  const withVariantsProducts = watchProducts?.filter((product: Product) =>
    Object.keys(product?.selectedVariantsQuantity || {}).some(
      (variantKey) =>
        (product?.selectedVariantsQuantity?.[variantKey] ?? 0) > 0,
    ),
  );

  const selectedProducts = [
    ...withoutVariantsProducts,
    ...withVariantsProducts,
  ];

  return { selectedProducts };
};
