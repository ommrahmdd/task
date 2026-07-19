export default function ProductBox({ product }: { product: {} }) {
  return (
    <div className="flex items-center justify-between">
      <div className="">
        <p>{product?.title}</p>
      </div>
    </div>
  );
}
