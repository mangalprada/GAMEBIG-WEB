import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useAuth } from '../../../context/authContext';
import * as yup from 'yup';
import { EventData } from '@/utilities/eventItem/types';
import FormInput from '@/components/UI/Inputs/FormInput';
import { useFormik } from 'formik';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
import axios from 'axios';
import SlotsGrid from '../CreateEvent/SlotsGrid';
import { useUI } from '@/context/uiContext';
import LurkingCat from '@/components/UI/Loaders/LurkingCat';
import LoadingLottie from '@/components/UI/Loaders/Dots';

const { BASE_URL } = process.env;

interface Props {
  teamSize: number;
  eventId: string;
  setIsRegistered: (val: boolean) => void;
  setTeamId: Dispatch<SetStateAction<string>>;
  setBookingdetails: Dispatch<SetStateAction<any>>;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  teamName: yup.string().required('Team Name is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Only add your 10 digit mobile number')
    .length(10, 'Phone number must be 10 digits long')
    .required('Phone Number can not be empty'),
});

function loadScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function CustomRoomRegistrationForm({
  eventId,
  setIsRegistered,
  setBookingdetails,
}: Props) {
  const {
    userData: { uid, name, photoURL, username },
  } = useAuth();
  const [eventData, setEventData] = useState<EventData>();

  const { openSnackBar } = useUI();

  const [slots, setSlots] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlotNumber, setCurrentSlotnumber] = useState<string>('');

  useEffect(() => {
    const getEventData = async () => {
      if (eventId) {
        const response = await axios.get(
          `${BASE_URL}/api/events/?id=${eventId}`
        );
        setEventData(response.data.data);
        setSlots(response.data.data.slots);
      }
    };
    getEventData();
  }, [eventId]);

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      teamName: '',
      inGameName: '',
      inGameId: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!eventData) return;
      if (currentSlotNumber === '') {
        openSnackBar({
          label: 'Select A Slot!',
          message: 'A slot number is required to register',
          type: 'warning',
        });
        return;
      }
      setIsLoading(true);
      const { teamName, phoneNumber } = values;
      const data = {
        createdAt: new Date(),
        eventId: eventId,
        slotNumber: Number(currentSlotNumber),
        phoneNumber,
        teamName,
        users: [{ uid, name, photoURL, username }],
      };
      await axios
        .put(`${BASE_URL}/api/events`, {
          _id: eventId,
          data: {
            $set: {
              noOfSlots: eventData.noOfSlots - 1,
              slots: { ...eventData.slots, [currentSlotNumber]: 'booked' },
            },
          },
        })
        .then(async () => {
          await axios.post(`${BASE_URL}/api/participants`, {
            data,
          });

          if (Notification.permission !== 'granted') {
            openSnackBar({
              label: 'Notification Permission Required',
              message:
                'Please allow notifications to receive ROOM ID and PASSWORD',
              type: 'warning',
            });
          }
          setBookingdetails(data);
          setIsRegistered(true);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    },
  });

  function slotSelectHandler(slot: string) {
    if (!slots) return;
    const newSlots = slots as any;
    if (slots[slot] === 'available') {
      newSlots[slot] =
        newSlots[slot] === 'available' ? 'selected' : 'available';
      if (slot !== currentSlotNumber) {
        newSlots[currentSlotNumber] = 'selected' ? 'available' : 'selected';
      }
      setCurrentSlotnumber(slot);
      setSlots(newSlots);
    }
  }

  if (isLoading) {
    return (
      <div className="my-4 md:my-16">
        <LoadingLottie height={100} width={200} />
      </div>
    );
  }

  if (!eventData) return <LurkingCat height={150} width={150} />;

  return (
    <div
      id="register"
      className="flex flex-col font-sans font-semibold text-gray-300 px-4 mx-auto w-11/12 md:w-2/3"
    >
      <label className="font-sans font-semibold text-2xl text-indigo-600 py-5">
        Book a slot To Partcipate
      </label>
      <form className="flex flex-col justify-center ">
        <FormInput
          labelName="Team Name"
          name="teamName"
          value={formik.values.teamName}
          onChangeHandler={formik.handleChange}
          error={Boolean(formik.errors.teamName)}
          errorMessage={formik.errors.teamName}
        />
        <FormInput
          labelName="Phone Number(WhatsApp)"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          placeHolder="10 digit e.g. - 9876543210"
          onChangeHandler={formik.handleChange}
          error={Boolean(formik.errors.phoneNumber)}
          errorMessage={formik.errors.phoneNumber}
        />
        {slots ? (
          <SlotsGrid
            message="Pick your slot number"
            slotSelectHandler={slotSelectHandler}
            slots={slots}
          />
        ) : null}
      </form>
      <ResponsiveButton
        name="Book My Slot"
        type="submit"
        isDisabled={formik.isSubmitting}
        onClick={formik.handleSubmit}
      />
    </div>
  );
}
