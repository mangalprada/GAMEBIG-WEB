import { useUI } from '@/context/uiContext';
import { submitFeedback } from '@/libs/feedback';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import * as yup from 'yup';
import ResponsiveButton from '../UI/Buttons/ResponsiveButton';
import Facebook from '../UI/Icons/SocialIcons/FacebookIcon';
import Instagram from '../UI/Icons/SocialIcons/InstagramIcon';
import Twitter from '../UI/Icons/SocialIcons/TwitterIcon';
import FormInput from '../UI/Inputs/FormInput';
import TextArea from '../UI/Inputs/TextArea';
import Modal from '../UI/Modal/Modal';

const Feedback: FC = () => {
  const { openSnackBar } = useUI();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      description: '',
    },
    validationSchema: yup.object({
      description: yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {
      const isSubmitted = await submitFeedback(values);
      if (isSubmitted) {
        openSnackBar({
          type: 'success',
          label: 'Submitted',
          message: 'Thank you for your feedback!',
        });
      } else {
        openSnackBar({
          type: 'error',
          label: 'Error',
          message: 'Something went wrong. Please try again.',
        });
      }
      setIsModalOpen(false);
      formik.resetForm();
    },
  });

  return (
    <div>
      <section>
        <button
          className={
            'md:h-14 md:w-14 h-12 w-12 rounded-full fixed ' +
            'flex justify-center items-center ' +
            (isModalOpen
              ? '-right-40 '
              : 'md:bottom-5 md:right-8 bottom-14 right-4 z-40 ') +
            'bg-green-500 hover:bg-green-600/80'
          }
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="md:h-8 md:w-8 h-7 w-7 fill-current text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 ' +
                '8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 ' +
                '3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
              }
            />
          </svg>
        </button>
      </section>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <div className="w-5/6 mx-auto font-sans">
          <section
            className={
              'flex items-center gap-x-3 text-lg ' +
              'font-semibold text-gray-300'
            }
          >
            Contact us on
            <a href="https://www.facebook.com/GameBig-101011608993281/">
              <Facebook size={35} />
            </a>
            <a href="https://www.instagram.com/gamebighq/">
              <Instagram size={33} />
            </a>
            <a href="https://twitter.com/GameBigHQ">
              <Twitter size={28} />
            </a>
          </section>
          <span className="text-sm text-gray-400 font-semibold">or</span>
          <section>
            <h5 className="text-xl font-semibold text-indigo-600 tracking-wide mt-2">
              Give us Feedback / Suggestions
            </h5>
          </section>
          <section className="mt-5 mb-10">
            <FormInput
              labelName="Email (optional)"
              name="email"
              value={formik.values.email}
              onChangeHandler={formik.handleChange}
              placeHolder="Enter your email"
            />
            <TextArea
              labelName="Describe your feedback / suggestions*"
              name="description"
              value={formik.values.description}
              onChangeHandler={formik.handleChange}
              placeHolder={
                '- Issue , or\n- Feature Request , or\n- General Feedback'
              }
            />
            {Boolean(formik.errors.description) ? (
              <span className="text-red-400 tracking-wide font-semibold">
                Please write something to submit
              </span>
            ) : null}
            <ResponsiveButton
              name="Send"
              type="button"
              onClick={formik.handleSubmit}
            />
          </section>
        </div>
      </Modal>
    </div>
  );
};

export default Feedback;
