import { Dispatch, SetStateAction, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import * as yup from 'yup';
import { EventData } from '@/utilities/eventItem/types';
import FormInput from '@/components/UI/Inputs/FormInput';
import { useFormik } from 'formik';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
import axios from 'axios';
import SlotsGrid from '../CreateEvent/SlotsGrid';
import { useUI } from '@/context/uiContext';

const { BASE_URL } = process.env;

interface Props {
  teamSize: number;
  eventData: EventData;
  setIsRegistered: (val: boolean) => void;
  setTeamId: Dispatch<SetStateAction<string>>;
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

export default function BasicEventRegistrationForm({
  eventData,
  setIsRegistered,
}: Props) {
  const {
    userData: { uid, name, photoURL, username },
  } = useAuth();

  const { openSnackBar } = useUI();

  const [slots, setSlots] = useState(eventData.slots);
  const [currentSlotNumber, setCurrentSlotnumber] = useState<string>('');
  const formik = useFormik({
    initialValues: { phoneNumber: '', teamName: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (currentSlotNumber === '') {
        openSnackBar({
          label: 'Select A Slot!',
          message: 'A slot number is required to register',
          type: 'warning',
        });
        return;
      }
      const { teamName, phoneNumber } = values;

      axios.post(`${BASE_URL}/api/participants`, {
        data: {
          createdAt: new Date(),
          eventId: eventData._id,
          slotNumber: currentSlotNumber,
          phoneNumber,
          users: [{ uid, name, photoURL, username }],
        },
      });
      axios.put(`${BASE_URL}/api/events`, {
        _id: eventData._id,
        data: {
          $set: {
            noOfSlots: eventData.noOfSlots - 1,
            slots: { ...eventData.slots, [currentSlotNumber]: 'booked' },
          },
        },
      });
      setIsRegistered(true);
    },
  });

  async function displayRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const data = await fetch(`${BASE_URL}/api/razorpay`, {
      method: 'POST',
    }).then((t) => t.json());

    const options = {
      key: 'rzp_test_2TYHpxVnjqaIze',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'Donation',
      description: 'Thank you for nothing. Please give us some money',
      image: 'http://localhost:1337/logo.svg',
      handler: function (response: any) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name,
        email: 'sdfdsjfh2@ndsfdf.com',
        phone_number: '9899999999',
      },
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  }

  function slotSelectHandler(slot: string) {
    const newSlots = { ...slots };
    if (slot === currentSlotNumber || slots[slot] === 'available') {
      newSlots[slot] =
        newSlots[slot] === 'available' ? 'selected' : 'available';
      setCurrentSlotnumber(slot);
      setSlots(newSlots);
    }
  }

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
        <SlotsGrid
          message="Pick your slot number"
          slotSelectHandler={slotSelectHandler}
          slots={slots}
        />
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
