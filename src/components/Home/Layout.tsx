import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ColumnWrapper from "./ColumnWrapper";
import Review from "./Review/Review";
import Steps from "./Steps/Steps";
import productsData from "./../../../db.json";

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
  selectedVariantsQuantity?: Record<string, number> | null;
}

const productItemSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    image: z.string().nullable().optional(),
    variants: z.array(z.any()).optional().nullable(),
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

export default function Layout() {
  const methods = useForm<schemaType>({
    resolver: zodResolver(schema),
    values: {
      products:
        productsData?.items?.map((p) => ({
          id: p.id,
          title: p?.title,
          image: p?.image,
          variants: p?.variants || [],
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

  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-[1440px] grid grid-cols-3 my-[50px] mx-[122px] gap-[29px] font-gilory">
        <header className="col-span-3">
          <h2 className="font-bold text-[31.88px] mb-[20px]">
            Let’s get started!
          </h2>
        </header>

        <ColumnWrapper className="col-span-3 lg:col-span-2">
          <Steps products={productsData?.items as Product[]} />
        </ColumnWrapper>

        <ColumnWrapper className="bg-[#EDF4FF] self-start p-[15px] rounded-[15px] col-span-3 lg:col-span-1">
          <Review />
        </ColumnWrapper>
      </div>
    </FormProvider>
  );
}
