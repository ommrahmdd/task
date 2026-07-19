import classnames from "classnames";
export default function ColumnWrapper({
  children,
  className,
}: {
  children: React.ReactElement;
  className?: string;
}) {
  return <div className={classnames("", className)}>{children}</div>;
}
