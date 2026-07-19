import classNames from "classnames";

export function ImageInput({
  src,
  onClick,
  selected,
  text,
}: {
  src: string;
  onClick: () => void;
  selected: boolean;
  text?: string;
}) {
  return (
    <div
      className={classNames(
        "flex justify-center items-center gap-[2px] rounded cursor-pointer border py-[1px] px-2",
        selected && "border-[#0AA288]",
      )}
      role="button"
      onClick={() => onClick?.()}
      data-testid="store-image-input"
    >
      <img
        src={src}
        className={classNames(
          "h-[28px] w-[28px] rounded-xl object-contain p-[3px]",
        )}
      />

      {text && <p className="!m-0 text-xs">{text}</p>}
    </div>
  );
}
