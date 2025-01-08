export default function ZapCell({
  name,
  index,
  color,
}: {
  name?: string;
  index?: number;
  color?: string;
}) {
  return (
    <div
      className={`p-2 w-fit flex flex gap-5 bg-white text-black items-center px-8 border-2 border-black ${color}`}
    >
      <div className="">{index}.</div>
      <div className="">{name}</div>
    </div>
  );
}
