import type { Product } from "../../Layout";
import ProductBoxLayout from "./ProductBoxLayout";
import WithVariantsForm from "./WithVariantsForm";
import WithoutVariantsForm from "./WithoutVariantsForm";

export default function CamerasStep({ products }: { products: Product[] }) {
  return (
    <form>
      <div className="grid grid-cols-1 gap-3.75 md:grid-cols-2 ">
        {products?.map((p) => (
          <ProductBoxLayout
            key={p.id}
            product={{
              description: p.description,
              title: p.title,
              discount: p.discount || 0,
              image: p.image,
              id: p.id,
            }}
          >
            {!!p?.attributes?.length ? (
              <WithVariantsForm productId={p.id} variants={p.variants || []} />
            ) : (
              <WithoutVariantsForm
                productId={p.id}
                price={p.price || 0}
                stock={p.stock || 0}
                discount={p.discount}
              />
            )}
          </ProductBoxLayout>
        ))}
      </div>
    </form>
  );
}
