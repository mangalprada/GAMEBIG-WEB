import { FC, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import Modal from '../UI/Modal/Modal';

const TeamUpFAQ: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">
      <section
        className={
          'flex justify-between items-center px-4 py-2 rounded-md ' +
          'bg-indigo-900/20 hover:bg-indigo-800/60 cursor-pointer'
        }
        onClick={() => setIsModalOpen(true)}
      >
        <span className="text-lg font-medium text-gray-400">
          Find your perfect Teammate!
        </span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 fill-current text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d={
                'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 ' +
                '1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 ' +
                '8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 ' +
                '1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
              }
              clipRule="evenodd"
            />
          </svg>
        </span>
      </section>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <div
          className={
            'flex flex-col bg-gradient-to-r from-indigo-900/60 via-black to-black ' +
            'w-11/12 mx-auto px-4 py-5 rounded-md mb-10 font-sans'
          }
        >
          <span className="text-xl text-gray-200 font-semibold tracking-wider ">
            Find your perfect Teammate
          </span>
          <br />
          <br />
          <span className="text-lg text-red-400">
            Are you getting frustrated, because of random players in match
            making 😫?
          </span>
          <span className="text-lg text-red-400">
            Can&apos;t find a player whose synergy matches yours 😢?
          </span>
          <span className="text-lg text-yellow-300">
            {' '}
            Well, you&apos;re at the right place! 🥳
          </span>
          <br />
          <br />
          <ol className="list-decimal mx-5 tracking-wide text-indigo-200">
            <li className="text-lg">
              Click on <strong>Find Teammate</strong> and add all the
              requirements you want to have in your teammate.
            </li>
            <li className="text-lg">Others will see and apply for the role.</li>
            <li className="text-lg">
              Review their profiles and decide if they are a good fit for you.
            </li>
            <li className="text-lg">
              Onboard your perfect teammate and start conquering.
            </li>
          </ol>
        </div>
      </Modal>
    </div>
  );
};

export default TeamUpFAQ;
