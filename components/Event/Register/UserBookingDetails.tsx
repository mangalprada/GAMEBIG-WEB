import { useState } from 'react';
import GamersInfoList from './GamerInfoList';
import axios from 'axios';
import { useRouter } from 'next/router';
import Modal from '@/components/UI/Modal/Modal';
import FixedButton from '@/components/UI/Buttons/FixedButton';
const { BASE_URL } = process.env;

const UserBookingDetails = ({
  bookingDetails,
  setIsRegistered,
}: {
  bookingDetails: any;
  setIsRegistered: (val: boolean) => void;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const cancelBooking = () => {
    try {
      axios.post(`${BASE_URL}/api/cancelEventBooking`, {
        participantId: bookingDetails._id,
        eventId: bookingDetails.eventId,
        slotNo: bookingDetails.slotNumber,
      });
      setIsRegistered(false);
      router.push(window.location.pathname);
    } catch (error) {
      console.log(error);
    }
  };

  if (!bookingDetails) return null;

  return (
    <div
      className={
        'py-10 px-4 flex flex-col gap-12 font-sans text-gray-50 ' +
        'font-semibold text-xl  sm:text-left bg-slate-900'
      }
    >
      <span className="text-xl text-center text-gray-400">My Booking</span>
      <div className="grid grid-cols-2 mx-auto gap-4 md:gap-10">
        <section>
          <h2 className="font-semibold text-base text-gray-500">Team</h2>
          <span className="text-gray-200 text-xl font-semibold tracking-wide rounded-md">
            {bookingDetails.teamName}
          </span>
        </section>
        <section>
          <h2 className="font-semibold text-sm text-gray-500">Phone</h2>
          <span className="text-gray-200 text-xl font-semibold tracking-wide rounded-md">
            {bookingDetails.phoneNumber}
          </span>
        </section>
        <section>
          <h2 className="font-semibold text-base text-gray-500">Slot Number</h2>
          <span className="text-xl text-center font-semibold tracking-wide rounded-md text-green-500 ">
            {bookingDetails.slotNumber || 'Organizer Will Update'}
          </span>
        </section>
      </div>
      {bookingDetails.users.length > 1 ? (
        <GamersInfoList gamers={bookingDetails.users} />
      ) : null}
      <span
        className="text-center text-xs text-gray-400 cursor-pointer mt-16"
        onClick={openModal}
      >
        Cancel Booking
      </span>
      <Modal isOpen={open} closeModal={closeModal}>
        <div className="flex flex-col mt-48">
          <span className="text-center text-gray-200 text-xl md:text-2xl mb-8">
            Are you sure?
          </span>
          <div className="flex mx-auto gap-2 md:">
            <FixedButton
              name="Yes, Cancel Booking"
              isDangerous
              onClick={cancelBooking}
            />
            <FixedButton name="No, Don't cancel" onClick={closeModal} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserBookingDetails;
