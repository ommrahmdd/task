import { useCameraInfo } from "@/hooks/useCameraInfo";
import ProductBox from "./ProductBox";

export default function CameraSectionReview() {
  const { selectedProducts } = useCameraInfo();

  console.log("dddddddddddddddd", selectedProducts);

  return (
    <div>
      <p className="uppercase font-normal text-[#A8B2BD] text-[12px]">
        Cameras
      </p>

      <div className="space-y-2">
        {selectedProducts?.map((p) => (
          <ProductBox key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
