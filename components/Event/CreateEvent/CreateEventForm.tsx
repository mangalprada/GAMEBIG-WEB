import { useFormik } from 'formik';
import TimeDatePicker from '@/components/UI/Picker/TimeDatePicker';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import SelectRadioButton from '@/components/UI/Select/SelectRadioButton';
import SliderSelect from '@/components/UI/Slider/SliderSelect';
import { HostEventForm } from '@/utilities/HostEventForm';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
import FormInput from '@/components/UI/Inputs/FormInput';
import TextArea from '@/components/UI/Inputs/TextArea';
import { validationSchema } from '@/utilities/eventItem/validator';
import { EventData, EventFormData } from '@/utilities/eventItem/types';
import axios from 'axios';
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
  const formik = useFormik({
    initialValues: oldValues || HostEventForm[gameCode].initialValues,
    validationSchema: validationSchema,
    onSubmit: async (value: EventFormData, { resetForm }) => {
      if (oldValues?._id) {
        delete value._id;
        updateEvent(oldValues._id, value);
      } else {
        if (pageId && pageName) {
          createEvent(value);
        }
      }
      onCancel();
      resetForm();
    },
  });

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
                    formik.setFieldValue('noOfSlots', 1);
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
              <FormInput
                labelName="Entry Fee (in Rupees)"
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
            </div>
            <TextArea
              name="description"
              labelName="Rules for Matches"
              placeHolder="Describe your Rules and Point distribution here"
              value={formik.values.description}
              onChangeHandler={formik.handleChange}
            />
            <ResponsiveButton
              name="Save"
              type="submit"
              onClick={formik.handleSubmit}
            />
          </form>
        </div>
      </div>
    </Aux>
  );
}

// todo: show error for textarea for description
