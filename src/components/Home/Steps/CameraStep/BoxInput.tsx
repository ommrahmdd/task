import classNames from "classnames";

export function BoxInput({
  name,
  onClick,
  selected,
  className,
}: {
  name: string;
  onClick: () => void;
  selected: boolean;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "border rounded px-3 py-1.5 cursor-pointer",
        selected ? "border border-[#0AA288]" : "border-[#CCCCCC]",
        className,
      )}
      onClick={() => onClick?.()}
      role="button"
      data-testid="store-box-input"
    >
      {name}
    </div>
  );
}
