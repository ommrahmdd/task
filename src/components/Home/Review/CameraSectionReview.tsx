import { formRef } from "../Steps/CameraStep/CamerasStep";
import { useWatch } from "react-hook-form";

export default function CameraSectionReview() {
  const methods = formRef.current;
  const watechProducts = useWatch({
    name: "products",
    control: methods?.control,
  });

  console.log("ffff", watechProducts);

  return <div>CameraSectionReview</div>;
}
