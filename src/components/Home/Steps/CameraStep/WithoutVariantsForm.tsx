import { useFormContext, useWatch } from "react-hook-form";
import DebounceQuantityControl from "./DebounceQuantityControl";
import Pirce from "./Pirce";

export default function WithoutVariantsForm({
  productId,
  price,
  stock,
  discount,
}: {
  productId: string;
  price: number;
  stock: number;
  discount: number | null;
}) {
  const methods = useFormContext();

  const products =
    useWatch({
      name: "products",
      control: methods.control,
    }) || [];

  const productIndex = products.findIndex((p: any) => p.id === productId);
  const currentProduct = products[productIndex];

  const quantity = currentProduct?.quantity || 0;

  const finalPrice = discount ? price * (1 - discount / 100) : price;

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-end mt-auto">
      {/* Price and quantity */}
      <div className="flex items-center justify-between">
        <div>
          <DebounceQuantityControl
            name={`products.[${productIndex}].quantity`}
            initialValue={0}
          />
        </div>

        <div>
          <Pirce
            price={finalPrice}
            quantity={quantity}
            discount={currentProduct?.discount}
            stock={stock}
          />
        </div>
      </div>
    </div>
  );
}
