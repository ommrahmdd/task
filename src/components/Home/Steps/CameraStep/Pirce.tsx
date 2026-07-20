export default function Price({
  price,
  discount = 0,
  stock,
  quantity,
}: {
  price: number;
  discount?: number;
  stock?: number;
  quantity: number;
}) {
  const totalPrice = quantity ? price * quantity : price;
  const isFullyDiscounted = discount === 100;

  // Calculate final price based on discount
  const finalPrice = isFullyDiscounted ? 0 : totalPrice * (1 - discount / 100);

  console.log("xxxx", finalPrice, totalPrice);

  return (
    <div className="flex flex-col text-right">
      {discount > 0 && (
        <span className="text-base font-normal text-[#D8392B] line-through">
          ${totalPrice.toFixed(2)}
        </span>
      )}

      <span className="text-base font-normal text-[#575757]">
        {finalPrice <= 0 ? "FREE" : `$${finalPrice.toFixed(2)}`}
      </span>

      {stock !== undefined && (
        <span className="text-xs text-slate-400">({stock} items left)</span>
      )}
    </div>
  );
}
