import type React from "react";

export default function ReviewSectionLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement;
}) {
  return (
    <div>
      <hr className="my-[15px] text-[#CED6DE]" />

      <div className="space-y-2">
        <p className="font-normal text-xs text-[#A8B2BD] uppercase tracking-[1.6px]">
          {title}
        </p>

        <div className="">{children}</div>
      </div>
    </div>
  );
}
