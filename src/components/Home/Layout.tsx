import ColumnWrapper from "./ColumnWrapper";
import Review from "./Review/Review";
import Steps from "./Steps/Steps";

export default function Layout() {
  return (
    <div className="mx-auto max-w-[1440px] grid grid-cols-3 my-[50px] mx-[122px] gap-x-[29px] font-gilory">
      <ColumnWrapper className="col-span-2">
        <Steps />
      </ColumnWrapper>

      <ColumnWrapper className="bg-[#EDF4FF] self-start p-[15px] rounded-[15px]">
        <Review />
      </ColumnWrapper>
    </div>
  );
}
