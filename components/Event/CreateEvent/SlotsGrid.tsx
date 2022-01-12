type Props = {
  message: string;
  slots: Record<string, string>;
  slotSelectHandler: (slot: string) => void;
};
const SlotsGrid = ({ slots, slotSelectHandler, message }: Props) => {
  const pickColor = (slot: string) => {
    switch (slots[slot]) {
      case 'available':
        return 'bg-green-500 text-gray-50';
      case 'booked':
        return 'bg-slate-700 text-gray-500';
      case 'reserved_by_org':
        return 'bg-neutral-800 text-gray-500';
      case 'selected':
        return 'bg-green-600 text-gray-50 ring ring-indigo-600';
      default:
        return '';
    }
  };

  return (
    <div className="text-center mt-4">
      <span className="text-lg text-gray-50 font-bold">{message}</span>
      <div className="grid grid-cols-5 gap-2 md-w-1/5 w-3/4 mx-auto mt-2">
        {Object.keys(slots).map((slot, index) => {
          return (
            <div
              key={index}
              className={
                'flex flex-col items-center justify-center rounded-md cursor-pointer ' +
                pickColor(slot)
              }
              onClick={() => {
                slotSelectHandler(slot);
              }}
            >
              <span className="text-lg  font-bold">{slot}</span>
            </div>
          );
        })}
      </div>
      <div className="flex my-4 mx-auto bg-re d-400 justify-center">
        <div className="flex items-center">
          <div className="rounded-sm bg-neutral-800 w-4 h-3 ml-4 mr-1"></div>
          <span className="text-sm font-semibold text-gray-500">
            Reserved By Organizer
          </span>
        </div>
        <div className="flex items-center">
          <div className="rounded-sm bg-slate-700 w-3 h-3 ml-4 mr-1"></div>
          <span className="text-sm font-semibold text-gray-500">Booked</span>
        </div>
        <div className="flex items-center">
          <div className="rounded-sm bg-green-500 w-3 h-3 ml-4 mr-1"></div>
          <span className="text-sm font-semibold text-gray-500">Available</span>
        </div>
      </div>
    </div>
  );
};

export default SlotsGrid;
