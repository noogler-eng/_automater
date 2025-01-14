export default function ZapCell({
  name,
  index,
  color,
  setModalState,
}: {
  name?: string;
  index?: number;
  color?: string;
  setModalState: any;
}) {
  return (
    <div
      className={`p-2 w-fit flex flex gap-5 items-center px-8 border-2 border-black ${color}`}
      id="defaultModalButton"
      data-modal-target="defaultModal"
      data-modal-toggle="defaultModal"
      onClick={() => {
        setModalState(index);
      }}
    >
      <div className="">{index}.</div>
      <div className="">{name}</div>
    </div>
  );
}
