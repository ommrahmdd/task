import ColumnWrapper from "./ColumnWrapper";
import Review from "./Review/Review";
import Steps from "./Steps/Steps";

export default function Layout() {
  return (
    <div className="mx-auto max-w-[1440px] grid grid-cols-1 my-[50px] mx-[122px] gap-x-[29px] font-gilory xl:grid-cols-3">
      <ColumnWrapper className="col-span-3 xl:col-span-2">
        <Steps />
      </ColumnWrapper>

      <ColumnWrapper className="col-span-3 bg-[#EDF4FF] self-start p-[15px] rounded-[15px] xl:col-span-1">
        <Review />
      </ColumnWrapper>
    </div>
  );
}
