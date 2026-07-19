import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import ProductBoxLayout from "./ProductBoxLayout";
import WithVariantsForm from "./WithVariantsForm";
import WithoutVariantsForm from "./WithoutVariantsForm";
import { zodResolver } from "@hookform/resolvers/zod";

export interface AttributeValue {
  id: string;
  name: string;
  image: string | null;
}

export interface Attribute {
  name: string;
  type: string;
  values: AttributeValue[];
}

export interface VariantDetail {
  id: string;
  name: string;
}

export interface Variant {
  id: string;
  price: number;
  stock: number;
  quantity?: number | null;
  variantDetail: VariantDetail[];
  priceConverted: number;
}

export interface Product {
  id: string;
  title: string;
  price: number | null;
  stock: number | null;
  quantity?: number | null;
  discount: number | null;
  image: string;
  description: string;
  attributes?: Attribute[] | null;
  variants?: Variant[] | null;
}

const productItemSchema = z
  .object({
    id: z.string(),
    price: z.number().nullable().optional(),
    stock: z.number().nullable().optional(),
    discount: z.number().nullable().optional(),
    quantity: z.number().nullable().optional(),
    selectedVariantId: z.string().nullable().optional(),
    attributes: z
      .array(
        z.object({
          name: z.string(),
          type: z.string(),
          values: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              image: z.string().nullable().optional(),
            }),
          ),
        }),
      )
      .optional()
      .nullable(),
    selectedAttributes: z.record(z.string(), z.string()).optional().nullable(),
    selectedVariantsQuantity: z
      .record(z.string(), z.number())
      .optional()
      .nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.attributes && data.attributes.length > 0) {
      const selected = data.selectedAttributes || {};
      data.attributes.forEach((attr) => {
        if (!selected[attr.name]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["selectedAttributes", attr.name],
            message: `Please select a ${attr.name.toLowerCase()} before adding to cart`,
          });
        }
      });
    }
  });

const schema = z.object({
  products: z.array(productItemSchema),
});

type schemaType = z.infer<typeof schema>;

export let formRef = {
  current: null as ReturnType<typeof useForm> | null,
};

export default function CamerasStep() {
  const [products, setProducts] = useState<Product[]>([]);

  const methods = useForm<schemaType>({
    resolver: zodResolver(schema),
    values: {
      products:
        products?.map((p) => ({
          id: p.id,
          attributes: p.attributes || [],
          selectedAttributes: p.attributes?.length
            ? p.attributes.reduce<Record<string, string>>((acc, a) => {
                acc[a.name] = "";
                return acc;
              }, {})
            : {},
          selectedVariantId: null,
          price: p.price,
          quantity: 0,
          stock: p.stock,
          discount: p.discount,
          selectedVariantsQuantity:
            p.variants?.reduce<Record<string, number>>((acc, curr) => {
              acc[curr.id] = curr.quantity || 0;
              return acc;
            }, {}) || {},
        })) || [],
    },
  });

  formRef.current = methods;

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((res) => res.json())
      .then((data: any[]) => {
        const productsWithId = data.map((p, idx) => ({
          ...p,
          id: p.id || p.title || `product-${idx}`,
        }));
        setProducts(productsWithId);
      });
  }, []);

  return (
    <FormProvider {...methods}>
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
              }}
            >
              {!!p?.attributes?.length ? (
                <WithVariantsForm
                  productId={p.id}
                  variants={p.variants || []}
                />
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
    </FormProvider>
  );
}
