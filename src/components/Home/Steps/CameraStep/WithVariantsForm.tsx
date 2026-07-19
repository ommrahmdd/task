import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { ImageInput } from "./ImageInputBox";
import { BoxInput } from "./BoxInput";
import { useMemo } from "react";
import DebounceQuantityControl from "./DebounceQuantityControl";

// Added variants type safety definition matching your data payload structure
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

  const productIndex = products.findIndex((p: any) => p.id === productId);
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
      (attr: any) => attr.name,
    );

    const selectedValueIds = allowedAttributeNames
      .map((name) => currentProduct.selectedAttributes[name])
      .filter(Boolean); // removes undefined/null values

    const isLengthMatched =
      selectedValueIds.length === allowedAttributeNames.length;
    if (!isLengthMatched) return null;

    return variants?.find((variant) => {
      return selectedValueIds.every((selectedId) =>
        variant.variantDetail?.some((detail) => detail.id === selectedId),
      );
    });
  }, [currentProduct, variants]);

  console.log("xxx", matchedProduct?.price, matchedProduct);

  return (
    <div className="space-y-6">
      {/* ---------------------------------------------- Variants */}
      <div className="space-y-4 max-h-[200px] overflow-auto">
        {currentProduct?.attributes?.map((field: any) => {
          const selectedValueId =
            currentProduct?.selectedAttributes?.[field.name];

          return (
            <div key={field?.id} className="space-y-1.5">
              <p className="text-sm font-medium text-slate-700 !mb-1">
                {field?.name}
              </p>

              <div className="flex items-center flex-wrap gap-2">
                {field.values?.map((v: any) => {
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
      <div className="flex items-center justify-between">
        <div>
          <DebounceQuantityControl
            name={`products.[${productIndex}].selectedAttributes.quantity`}
            initialValue={matchedProduct?.quantity || 0}
          />
        </div>

        <div>
          {matchedProduct && !!currentProduct?.selectedAttributes?.quantity ? (
            <div className="flex flex-col gap-y-1">
              <span className="text-base font-normal text-[#575757]">
                $
                {(
                  matchedProduct.priceConverted *
                  currentProduct?.selectedAttributes?.quantity
                )?.toFixed(2)}
              </span>

              <span className="text-xs text-slate-400">
                ({matchedProduct.stock} items left)
              </span>
            </div>
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
