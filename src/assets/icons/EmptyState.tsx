import Empty from "./../../assets/Empty.png";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-1">
      <img src={Empty} alt="" className="h-16" />
      <p className="text-[#A8B2BD] text-sm">Nothing here yet</p>
    </div>
  );
}
