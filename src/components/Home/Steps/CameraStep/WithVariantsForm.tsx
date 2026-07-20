import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { ImageInput } from "./ImageInputBox";
import { BoxInput } from "./BoxInput";
import { useMemo } from "react";
import DebounceQuantityControl from "./DebounceQuantityControl";
import Pirce from "./Pirce";

interface VariantDetail {
  id: string;
  name: string;
}

interface Variant {
  id: string;
  price: number;
  stock: number;
  variantDetail: VariantDetail[];
  priceConverted: number;
}

export default function WithVariantsForm({
  productId,
  variants,
}: {
  productId: string;
  variants: Variant[];
}) {
  const methods = useFormContext();

  const products =
    useWatch({
      name: "products",
      control: methods.control,
    }) || [];

  const { update } = useFieldArray({
    control: methods.control,
    name: "products",
  });

  const productIndex = products.findIndex((p: { id: string }) => p.id === productId);
  const currentProduct = products[productIndex];

  const setAttributeValue = (attributeName: string, valueId: string) => {
    if (productIndex === -1) return;

    const updatedSelections = {
      ...(currentProduct?.selectedAttributes || {}),
      [attributeName]: valueId,
    };

    update(productIndex, {
      ...currentProduct,
      selectedAttributes: updatedSelections,
    });
  };

  const matchedProduct = useMemo(() => {
    if (
      !currentProduct ||
      !currentProduct.selectedAttributes ||
      !currentProduct.attributes
    ) {
      return null;
    }

    const allowedAttributeNames = currentProduct.attributes.map(
      (attr: { name: string }) => attr.name,
    );

    const selectedValueIds = allowedAttributeNames
      .map((name: string) => currentProduct.selectedAttributes[name])
      .filter(Boolean) as string[];

    const isLengthMatched =
      selectedValueIds.length === allowedAttributeNames.length;

    if (!isLengthMatched) return null;

    return variants?.find((variant) => {
      return selectedValueIds.every((selectedId) =>
        variant.variantDetail?.some((detail) => detail.id === selectedId),
      );
    });
  }, [
    currentProduct,
    variants,
  ]);

  const quantityName = matchedProduct
    ? `products.[${productIndex}].selectedVariantsQuantity.${matchedProduct.id}`
    : `products.[${productIndex}].quantity`;

  const currentVariantQuantity = matchedProduct
    ? currentProduct?.selectedVariantsQuantity?.[matchedProduct.id] || 0
    : 0;

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between">
      {/* ---------------------------------------------- Variants */}
      <div className="space-y-4 max-h-[200px] overflow-auto">
        {currentProduct?.attributes?.map((field: { name: string; type: string; values: { id: string; name: string; image?: string | null }[] }) => {
          const selectedValueId =
            currentProduct?.selectedAttributes?.[field.name];

          return (
            <div key={field?.name} className="space-y-1.5">
              <p className="text-sm font-medium text-slate-700 !mb-1">
                {field?.name}
              </p>

              <div className="flex items-center flex-wrap gap-2">
                {field.values?.map((v: { id: string; name: string; image?: string | null }) => {
                  const isSelected = selectedValueId === v.id;

                  return (
                    <div key={v.id}>
                      {field?.type === "COLOR" ? (
                        <ImageInput
                          src={v.image ?? ""}
                          text={v.name}
                          selected={isSelected}
                          onClick={() => setAttributeValue(field.name, v.id)}
                        />
                      ) : (
                        <BoxInput
                          name={v.name}
                          selected={isSelected}
                          onClick={() => setAttributeValue(field.name, v.id)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Price and quantity */}
      <div className="flex items-center justify-between mt-auto">
        <div>
          <DebounceQuantityControl
            name={quantityName}
            initialValue={0}
            disabled={!matchedProduct}
          />
        </div>

        <div>
          {matchedProduct && !!currentVariantQuantity ? (
            <Pirce
              price={matchedProduct.price}
              quantity={currentVariantQuantity}
              discount={currentProduct?.discount}
              stock={matchedProduct.stock}
            />
          ) : (
            <span className="text-base font-normal text-[#575757]">
              $ 00.00
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
