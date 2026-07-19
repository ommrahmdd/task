import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import ProductBoxLayout from "./ProductBoxLayout";
import WithVariantsForm from "./WithVariantsForm";
import WithoutVariantsForm from "./WithoutVariantsForm";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CamerasStep() {
  const [products, setProducts] = useState<[]>([]);

  const schema = z.object({
    products: z.array(
      z.object({
        id: z.string(),
        price: z.number().nullable().optional(),
        stock: z.number().nullable().optional(),
        quantity: z.number().nullable().optional(),
        // In case of variants
        attributes: z.array(
          z.object({
            name: z.string().optional().nullable(),
            type: z.string().optional().nullable(),
            values: z.object({
              id: z.string().optional().nullable(),
              name: z.string().optional().nullable(),
              image: z.string().optional().nullable(),
            }),
          }),
        ),
        selectedAttributes: z.object(
          (products?.attributes ?? []).reduce<Record<string, z.ZodString>>(
            (acc, a) => {
              acc[a.name] = z.string().min(1, {
                message: `Please select a ${a.name.toLowerCase()} before add to cart`,
              });
              return acc;
            },
            {},
          ),
        ),
      }),
    ),
  });

  type schemaType = z.infer<typeof schema>;

  const methods = useForm<schemaType>({
    resolver: zodResolver(schema),
    values: {
      products: products?.map((p) => ({
        id: p?.id,
        attributes: p.attributes,
        selectedAttributes: !!p?.attributes?.length
          ? p?.attributes.reduce<Record<string, string>>((acc, a) => {
              acc[a.name] = "";
              return acc;
            }, {})
          : {},
        price: p.price,
        quantity: p.quantity,
        stock: p.stock,
      })),
    },
  });

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        console.log("data", data);
      });
  }, []);

  return (
    <FormProvider {...methods}>
      <form>
        <div className="grid grid-cols-2 gap-3.75">
          {products?.map((p, idx) => (
            <ProductBoxLayout
              product={{
                description: p.description,
                title: p.title,
                discount: p.discount,
                image: p.image,
              }}
            >
              {!!p?.attributes?.length ? (
                <WithVariantsForm productId={p.id} variants={p.variants} />
              ) : (
                <WithoutVariantsForm />
              )}
            </ProductBoxLayout>
          ))}
        </div>
      </form>
    </FormProvider>
  );
}
