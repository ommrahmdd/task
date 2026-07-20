import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { useFormContext, useWatch } from "react-hook-form";

export default function DebounceQuantityControl({
  name,
  initialValue,
  disabled,
  variant = "main",
}: {
  name: string;
  initialValue: number;
  disabled?: boolean;
  variant?: "main" | "secondary";
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
    if (quantity > 0) {
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
  variant = "main",
}: {
  handler: () => void;
  disabled?: boolean;
  content: string;
  variant?: "main" | "secondary";
}) => (
  <Button
    type="button"
    variant="outline"
    onClick={handler}
    disabled={disabled}
    size="sm"
    className={classNames(
      "border-none  text-sm cursor-pointer",
      variant === "main" && "bg-[#F0F4F7] text-[#525963]",
      variant === "secondary" && "text-[#575757] bg-white",
    )}
  >
    {content}
  </Button>
);
