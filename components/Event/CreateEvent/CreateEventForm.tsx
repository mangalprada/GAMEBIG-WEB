import { useState } from 'react';
import { useFormik } from 'formik';
import TimeDatePicker from '@/components/UI/Picker/TimeDatePicker';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import SelectRadioButton from '@/components/UI/Select/SelectRadioButton';
import SliderSelect from '@/components/UI/Slider/SliderSelect';
import { HostEventForm } from '@/utilities/HostEventForm';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
import FormInput from '@/components/UI/Inputs/FormInput';
import { validationSchema } from '@/utilities/eventItem/validator';
import { EventData, EventFormData } from '@/utilities/eventItem/types';
import Editor from '../../UI/Inputs/Editor';
import axios from 'axios';
import SlotsGrid from './SlotsGrid';
import { useUI } from '@/context/uiContext';
const { BASE_URL } = process.env;

export default function CreateEventForm({
  onCancel,
  gameCode,
  oldValues,
  pageId,
  pageName,
}: {
  onCancel: () => void;
  gameCode: string;
  oldValues?: EventData;
  pageId?: string;
  pageName?: string;
}) {
  const { openSnackBar } = useUI();
  async function updateEvent(_id: string, data: EventFormData) {
    await axios.put(`${BASE_URL}/api/events`, {
      _id: _id,
      data: { $set: data },
    });
  }

  async function createEvent(value: EventFormData) {
    axios.post(`${BASE_URL}/api/events`, {
      data: {
        ...value,
        gameCode,
        pageId,
        pageName,
        createdAt: new Date(),
      },
    });
  }
  const [slots, setSlots] = useState(
    initialSlots(HostEventForm[gameCode].initialValues.noOfSlots)
  );
  const formik = useFormik({
    initialValues: oldValues || HostEventForm[gameCode].initialValues,
    validationSchema: validationSchema,
    onSubmit: async (value: EventFormData, { resetForm }) => {
      const { description } = value;
      if (
        value.accessibility === 'Password Protected' &&
        !value.bookingPassword
      ) {
        openSnackBar({
          message: 'Please enter a password',
          type: 'warning',
          label: 'Booking Password Empty',
        });
        return;
      }
      if (oldValues?._id) {
        delete value._id;
        updateEvent(oldValues._id, {
          ...value,
          description: JSON.stringify(description),
        });
      } else {
        if (pageId && pageName) {
          let event = {
            ...value,
            description: JSON.stringify(description),
          };
          if (value.type === 'Custom Room') event = { ...event, slots };
          createEvent(event);
        }
      }
      onCancel();
      resetForm();
    },
  });

  function initialSlots(noOfSlots: number) {
    const slots: Record<string, any> = {};
    for (var i = 1; i <= noOfSlots; i++) {
      slots[i] = 'available';
    }
    return slots;
  }

  function slotSelectHandler(slot: string) {
    const newSlots = { ...slots };
    newSlots[slot] =
      newSlots[slot] === 'available' ? 'reserved_by_org' : 'available';
    if (newSlots[slot] === 'reserved_by_org') {
      formik.setFieldValue('noOfSlots', formik.values.noOfSlots - 1);
    } else if (newSlots[slot] === 'available') {
      formik.setFieldValue('noOfSlots', formik.values.noOfSlots + 1);
    }
    setSlots(newSlots);
  }

  const formInputComponents = HostEventForm[formik.values.gameCode].form.map(
    (input: Record<string, any>, index: number) => {
      switch (input.formType) {
        case 'radio':
          return (
            <section key={index.toString()}>
              <SelectRadioButton
                label={input.labelName}
                items={input.options}
                value={formik.values[input.name]}
                name={input.name}
                handleChange={(item) => {
                  formik.setFieldValue(input.name, item);
                  if (input.name === 'mode') {
                    const noOfSlots =
                      item === 'Solo' ? 100 : item === 'Duo' ? 50 : 25;
                    formik.setFieldValue('noOfSlots', noOfSlots);
                    setSlots(initialSlots(noOfSlots));
                  }
                }}
              />
            </section>
          );
        case 'slider':
          return (
            <section key={index.toString()}>
              <SliderSelect
                label={input.labelName}
                name={input.name}
                value={formik.values[input.name]}
                min={input.min}
                max={
                  formik.values.mode === 'Solo'
                    ? input.max * 4
                    : formik.values.mode === 'Duo'
                    ? input.max * 2
                    : input.max
                }
                onSlide={(e) =>
                  formik.setFieldValue(input.name, e.target.value)
                }
              />
            </section>
          );
        default:
          return <></>;
      }
    }
  );

  return (
    <Aux>
      <div
        className={
          'md:w-5/6 lg:w-2/3 mx-auto mt-6 ' +
          'relative flex flex-col mb-6 ' +
          'shadow-lg rounded-lg border-0'
        }
      >
        <div
          className={
            'rounded-t-lg bg-gradient-to-tl from-gray-900 to-black ' +
            'mb-0 md:px-7 px-4 py-6 text-center flex justify-between'
          }
        >
          <h6 className="text-white text-2xl font-semibold mt-5 opacity-60">
            Create Custom Room
          </h6>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gradient-to-tr from-black to-gray-900">
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="false">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <TimeDatePicker
                name="startTime"
                error={false}
                label="Date and Time"
                initialTime={formik.values.startTime}
                changeHandler={(date: Date) => {
                  formik.setFieldValue('startTime', date);
                }}
              />
              {formInputComponents}
              {formik.values.type === 'Classic Tournament' ? (
                <FormInput
                  labelName="No. Of Slots"
                  name="noOfSlots"
                  placeHolder="Enter No. Of Slots"
                  value={formik.values.noOfSlots}
                  onChangeHandler={formik.handleChange}
                  error={Boolean(formik.errors.noOfSlots)}
                  errorMessage={formik.errors.noOfSlots}
                />
              ) : null}
              <FormInput
                isDisabled={true}
                labelName="Entry Fee (Comming soon)"
                name="entryFee"
                placeHolder="0"
                value={formik.values.entryFee}
                onChangeHandler={formik.handleChange}
                error={Boolean(formik.errors.entryFee)}
                errorMessage={formik.errors.entryFee}
              />
              <FormInput
                labelName="Prize / Reward (Optional)"
                name="prize"
                placeHolder="100 rupees"
                value={formik.values.prize}
                onChangeHandler={formik.handleChange}
                error={Boolean(formik.errors.prize)}
                errorMessage={formik.errors.prize}
              />
              <SelectRadioButton
                label="Accessibility"
                items={['Open', 'Password Protected']}
                value={formik.values.accessibility}
                name={'accessibility'}
                handleChange={(item) => {
                  formik.setFieldValue('accessibility', item);
                }}
              />
              {formik.values.accessibility === 'Password Protected' ? (
                <FormInput
                  labelName="Password To Book"
                  name="bookingPassword"
                  placeHolder="Enter Password needed to book"
                  value={formik.values.bookingPassword}
                  onChangeHandler={formik.handleChange}
                  error={Boolean(formik.errors.bookingPassword)}
                  errorMessage={formik.errors.bookingPassword}
                />
              ) : null}
            </div>
            <div>
              <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide mb-2">
                Description
              </label>
              <Editor
                value={formik.values.description}
                isReadOnly={false}
                onChange={(value) => {
                  formik.setFieldValue('description', value);
                }}
                placeHolderText="Describe your Rules, point and Prize distribution here"
              />
            </div>
            {formik.values.type === 'Custom Room' && !oldValues ? (
              <SlotsGrid
                message="Pick any slots if you want to reserve"
                slots={slots}
                slotSelectHandler={slotSelectHandler}
              />
            ) : null}
            <span className="text-red-500 text-sm font-semibold mt-5 opacity-60">
              {
                "Once you create an event, you can't change the SLOTS for the conveinience of the participansts."
              }
            </span>
            <ResponsiveButton
              name={oldValues ? 'Update' : 'Create'}
              type="submit"
              onClick={formik.handleSubmit}
            />
          </form>
        </div>
      </div>
    </Aux>
  );
}
