import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormContext, useWatch } from "react-hook-form";

export default function DebounceQuantityControl({
  name,
  initialValue,
}: {
  name: string;
  initialValue: number;
}) {
  const methods = useFormContext();

  const currentValue = useWatch({
    name,
    control: methods.control,
  });

  const quantity =
    typeof currentValue === "number" ? currentValue : initialValue;

  console.log("dddd", currentValue);

  const handleIncrement = () => {
    methods.setValue(name, quantity + 1, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      methods.setValue(name, quantity - 1, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Explicit type="button" stops form submission crashes */}
      <Button
        type="button"
        variant="outline"
        onClick={handleDecrement}
        disabled={quantity <= 1}
      >
        -
      </Button>

      <div className="w-20">
        <Input
          type="number"
          {...methods.register(name, { valueAsNumber: true })}
          className="text-center"
        />
      </div>

      <Button type="button" variant="outline" onClick={handleIncrement}>
        +
      </Button>
    </div>
  );
}
