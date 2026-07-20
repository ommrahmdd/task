import { useFormContext, useWatch } from "react-hook-form";
import ProductBox from "../ProductBox";
import EmptyState from "@/assets/icons/EmptyState";

interface AttributeVal {
  id: string;
  name: string;
  image?: string | null;
}

interface AttributeItem {
  name: string;
  type: string;
  values?: AttributeVal[];
}

interface VariantDetailItem {
  id: string;
  name: string;
}

interface VariantItem {
  id: string;
  price: number;
  stock: number;
  variantDetail?: VariantDetailItem[];
  priceConverted: number;
}

interface ProductItem {
  id: string;
  title: string;
  image: string;
  price?: number | null;
  stock?: number | null;
  discount?: number | null;
  quantity?: number | null;
  attributes?: AttributeItem[] | null;
  variants?: VariantItem[] | null;
  selectedVariantsQuantity?: Record<string, number> | null;
}

interface SelectedItem {
  key: string;
  title: string;
  variantDetail: VariantDetailItem[] | null;
  image: string;
  quantityName: string;
  unitPrice: number;
  discount?: number | null;
  stock: number;
}

const getVariantImage = (product: ProductItem, variant: VariantItem) => {
  const colorAttr = product.attributes?.find((a) => a.type === "COLOR");
  if (colorAttr) {
    const colorValueDetail = variant.variantDetail?.find((d) =>
      colorAttr.values?.some((v) => v.id === d.id),
    );
    if (colorValueDetail) {
      const colorVal = colorAttr.values?.find(
        (v) => v.id === colorValueDetail.id,
      );
      if (colorVal?.image) return colorVal.image;
    }
  }
  return product.image;
};

export default function CameraSectionReview() {
  const methods = useFormContext();
  const watchProducts: ProductItem[] =
    useWatch({
      name: "products",
      control: methods?.control,
    }) || [];

  const selectedItems: SelectedItem[] = [];

  watchProducts.forEach((product: ProductItem, productIndex: number) => {
    if (product.attributes && product.attributes.length > 0) {
      const selectedVariantsQuantity = product.selectedVariantsQuantity || {};
      const variants = product.variants || [];

      Object.entries(selectedVariantsQuantity).forEach(([variantId, qty]) => {
        const quantity = qty as number;
        if (quantity > 0) {
          const variant = variants.find((v) => v.id === variantId);
          if (variant) {
            const image = getVariantImage(product, variant);
            selectedItems.push({
              key: `${product.id}-${variantId}`,
              title: product.title,
              variantDetail: variant.variantDetail || null,
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
    return <EmptyState />;
  }

  return (
    <div>
      <div className="space-y-[15px]">
        {selectedItems.map((item) => (
          <ProductBox
            key={item.key}
            title={item.title}
            variantDetail={item.variantDetail}
            image={item.image}
            quantityName={item.quantityName}
            unitPrice={item.unitPrice}
            discount={item.discount || null}
            stock={item.stock}
          />
        ))}
      </div>
    </div>
  );
}

