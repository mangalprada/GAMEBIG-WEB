import ResponsiveButton from '../UI/Buttons/ResponsiveButton';

export default function TeamIntro({
  openBackdrop,
}: {
  openBackdrop: () => void;
}) {
  return (
    <div
      className={
        'mx-auto mt-10 p-10 w-11/12 md:w-1/2 h-5/6 rounded-lg bg-gradient-to-t font-sans font-semibold ' +
        'from-gray-900 to-black text-center text-gray-300'
      }
    >
      <span className="text-xl md:text-4xl py-6">
        Create a Team And Participate in Tournaments, NOW!
      </span>
      <ResponsiveButton
        name="Create"
        type="submit"
        onClickHandler={openBackdrop}
      />
    </div>
  );
}
