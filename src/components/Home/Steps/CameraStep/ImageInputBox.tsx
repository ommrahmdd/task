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
      className="flex flex-col justify-center items-center gap-1 cursor-pointer"
      role="button"
      onClick={() => onClick?.()}
      data-testid="store-image-input"
    >
      <img
        src={src}
        className={classNames(
          "h-[50px] w-[50px] rounded-xl object-fill p-[3px]",
          selected && "border-2 border-[#0AA288]",
        )}
      />

      {text && <p>{text}</p>}
    </div>
  );
}
