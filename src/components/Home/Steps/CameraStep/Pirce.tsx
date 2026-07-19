export default function Pirce({
  price,
  discount,
  stock,
  quantity,
}: {
  price: number;
  discount?: number;
  stock?: number;
  quantity: number;
}) {
  return (
    <div className="flex flex-col text-right">
      {!!discount && (
        <span className="text-base font-normal text-[#D8392B] line-through">
          ${(price * quantity).toFixed(2)}
        </span>
      )}

      <span className="text-base font-normal text-[#575757]">
        ${(price * quantity * (1 - (discount || 0) / 100)).toFixed(2)}
      </span>

      <span className="text-xs text-slate-400">({stock} items left)</span>
    </div>
  );
}
