import { Button } from "@/components/ui/button";
import { useFormContext, useWatch } from "react-hook-form";

export default function DebounceQuantityControl({
  name,
  initialValue,
  disabled,
}: {
  name: string;
  initialValue: number;
  disabled?: boolean;
}) {
  const methods = useFormContext();

  const currentValue = useWatch({
    name,
    control: methods.control,
  });

  const quantity =
    typeof currentValue === "number" ? currentValue : initialValue;

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
    <div className="flex items-center gap-[10px]" key={name}>
      <ButtonController
        content={"-"}
        disabled={disabled}
        handler={handleDecrement}
      />

      <p className="font-medium text-base !mb-0">{quantity}</p>

      <ButtonController
        content={"+"}
        disabled={disabled}
        handler={handleIncrement}
      />
    </div>
  );
}

const ButtonController = ({
  handler,
  disabled,
  content,
}: {
  handler: () => void;
  disabled?: boolean;
  content: string;
}) => (
  <Button
    type="button"
    variant="outline"
    onClick={handler}
    disabled={disabled}
    size="sm"
    className="bg-[#F0F4F7] border-none text-[#525963] text-sm"
  >
    {content}
  </Button>
);
