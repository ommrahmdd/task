import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CamerasStep from "./CameraStep/CamerasStep";
import { useState } from "react";
import classNames from "classnames";

import CameraIcon from "@/assets/icons/CameraIcon";
import ProtectionIcon from "@/assets/icons/ProtectionIcon";
import SensorIcon from "@/assets/icons/SensorIcon";
import ExtraProtectionIcon from "@/assets/icons/ExtraProtectionIcon";
import type { Product } from "../Layout";
import { useCameraInfo } from "@/hooks/useCameraInfo";
import Lorem from "./Lorem";
import { Button } from "@/components/ui/button";

export default function Steps({ products }: { products: Product[] }) {
  const steps = [
    {
      title: "Choose your cameras",
      titleIcon: <CameraIcon />,
      children: <CamerasStep products={products} />,
      actions: "2 Selected",
      value: 1,
    },
    {
      title: "Choose your plan",
      titleIcon: <ProtectionIcon />,
      children: <Lorem />,
      actions: "2 Selected",
      value: 2,
    },
    {
      title: "Choose your sensors",
      titleIcon: <SensorIcon />,
      children: <Lorem />,
      actions: "2 Selected",
      value: 3,
    },
    {
      title: "Add extra protection",
      titleIcon: <ExtraProtectionIcon />,
      children: <Lorem />,
      actions: "2 Selected",
      value: 4,
    },
  ];

  const [activeItem, setActiveItem] = useState<number[]>([steps?.[0]?.value]);

  const { selectedProducts } = useCameraInfo();

  return (
    <section className="space-y-1">
      {steps?.map((step, idx) => (
        <Accordion
          defaultValue={[steps?.[0]?.value]}
          key={idx}
          className={classNames(
            "rounded-[10px]",
            activeItem?.[0] === step.value && "bg-[#EDF4FF]",
          )}
          value={activeItem}
          onValueChange={setActiveItem}
        >
          <p className="text-sm font-medium my-[5px] mx-[15px] text-[#484848]">
            Step {idx + 1} of {steps?.length}
          </p>

          <AccordionItem
            value={step.value}
            className={classNames(
              "border-t-[.5px] border-[#1F1F1F]",
              activeItem?.[0] !== step.value && "border-b-[.5px]",
            )}
          >
            <AccordionTrigger className="mx-[15px] flex items-center justify-between gap-x-4 py-[22.5px] ">
              <div className="flex items-center gap-2">
                {step?.titleIcon}

                <h4 className="font-semibold text-[22px]">{step?.title}</h4>
              </div>

              {step?.value === 1 && (
                <p className="text-[#4E2FD2] font-medium text-sm">
                  {selectedProducts?.length} selected
                </p>
              )}
            </AccordionTrigger>

            <AccordionContent className="mx-[15px]">
              {step?.children}

              <div className="flex items-center justify-center gap-x-3 mt-4">
                {step?.value !== 1 && (
                  <Button
                    variant="outline"
                    className="border-[#4E2FD2] text-[#4E2FD2] text-[18px] py-3 px-6 font-semibold border-2"
                    onClick={() => setActiveItem([step?.value - 1])}
                  >
                    Prev: {steps[idx - 1]?.title}
                  </Button>
                )}
                {step?.value !== 4 && (
                  <Button
                    variant="outline"
                    className="border-[#4E2FD2] text-[#4E2FD2] text-[18px] py-3 px-6 font-semibold border-2"
                    onClick={() => setActiveItem([step?.value + 1])}
                  >
                    Next: {steps[idx + 1]?.title}
                  </Button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </section>
  );
}
