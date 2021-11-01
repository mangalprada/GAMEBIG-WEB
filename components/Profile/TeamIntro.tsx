import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';

export default function TeamIntro({
  openBackdrop,
}: {
  openBackdrop: () => void;
}) {
  return (
    <div
      className={
        'mx-auto mt-10 p-10 w-5/6 h-5/6 rounded-lg bg-gradient-to-t font-sans font-semibold ' +
        'bg-gradient-to-b from-gray-900 to-black text-center text-gray-300 col-span-2'
      }
    >
      <span className="text-xl md:text-3xl py-6">
        Create a team and participate in events, NOW!
      </span>
      <ResponsiveButton name="Create" type="submit" onClick={openBackdrop} />
    </div>
  );
}
