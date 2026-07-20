import { useFormContext, useWatch } from "react-hook-form";
import ProductBox from "./ProductBox";

const getVariantImage = (product: any, variant: any) => {
  const colorAttr = product.attributes?.find((a: any) => a.type === "COLOR");
  if (colorAttr) {
    const colorValueDetail = variant.variantDetail?.find((d: any) =>
      colorAttr.values?.some((v: any) => v.id === d.id),
    );
    if (colorValueDetail) {
      const colorVal = colorAttr.values?.find(
        (v: any) => v.id === colorValueDetail.id,
      );
      if (colorVal?.image) return colorVal.image;
    }
  }
  return product.image;
};

export default function CameraSectionReview() {
  const methods = useFormContext();
  const watchProducts =
    useWatch({
      name: "products",
      control: methods?.control,
    }) || [];

  const selectedItems: any[] = [];

  console.log("dddd", watchProducts);

  watchProducts.forEach((product: any, productIndex: number) => {
    if (product.attributes && product.attributes.length > 0) {
      const selectedVariantsQuantity = product.selectedVariantsQuantity || {};
      const variants = product.variants || [];

      Object.entries(selectedVariantsQuantity).forEach(([variantId, qty]) => {
        const quantity = qty as number;
        if (quantity > 0) {
          const variant = variants.find((v: any) => v.id === variantId);
          if (variant) {
            const image = getVariantImage(product, variant);
            selectedItems.push({
              key: `${product.id}-${variantId}`,
              title: product.title,
              variantDetail: variant.variantDetail,
              image,
              quantityName: `products.[${productIndex}].selectedVariantsQuantity.${variantId}`,
              unitPrice: variant.priceConverted || 0,
              discount: product.discount,
              stock: variant.stock || 0,
            });
          }
        }
      });
    } else {
      const quantity = product.quantity || 0;
      if (quantity > 0) {
        selectedItems.push({
          key: product.id,
          title: product.title,
          variantDetail: null,
          image: product.image,
          quantityName: `products.[${productIndex}].quantity`,
          unitPrice: product.price || 0,
          discount: product.discount,
          stock: product.stock || 0,
        });
      }
    }
  });

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mb-[25px]">
      <p className="font-semibold text-xs text-[#525963] uppercase tracking-[1.6px] mb-[15px]">
        Cameras
      </p>

      <div className="space-y-[15px]">
        {selectedItems.map((item) => (
          <ProductBox
            key={item.key}
            title={item.title}
            variantDetail={item.variantDetail}
            image={item.image}
            quantityName={item.quantityName}
            unitPrice={item.unitPrice}
            discount={item.discount}
            stock={item.stock}
          />
        ))}
      </div>

      <hr className="my-[10px] text-[#CED6DE]" />
    </div>
  );
}
