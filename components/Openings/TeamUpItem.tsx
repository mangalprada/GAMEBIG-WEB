import { MouseEvent, useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import { games } from '@/utilities/GameList';
import { TeamUpPost } from '@/utilities/openings/TeamUpPost';
import { db } from 'firebase/firebaseClient';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FixedButton from '../UI/Buttons/FixedButton';
import { checkIfApplied } from '@/libs/teamupQueries';
import { useUI } from '@/context/uiContext';

type Props = {
  data: TeamUpPost;
};

export default function TeamUpItem({ data }: Props) {
  const {
    userData: { uid, username, name, photoURL },
  } = useAuth();
  const { openSnackBar } = useUI();

  const router = useRouter();

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    (async function (userId, docId) {
      const hasAlreadyApplied = await checkIfApplied(userId, docId);
      if (hasAlreadyApplied) setIsApplied(true);
    })(uid, data.docId);
  }, [uid, data.docId]);

  const openProfile = (e: MouseEvent) => {
    e.stopPropagation();
    if (data.username) router.push(`/profile/${data.username}`);
  };

  const handleCardClick = () => {
    if (data.uid && data.docId) {
      router.push(`/openings/${data.uid}/${data.docId}`);
    }
  };

  const createJoinee = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      if (data.uid !== uid) {
        await db
          .collection('teamOpening')
          .doc(data.docId)
          .collection('joinees')
          .doc(uid)
          .set({ uid, username, name, photoURL });
        setIsApplied(true);
        openSnackBar({
          label: '',
          message: 'You have successfully applied!',
          type: 'success',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={
        'xl:w-1/2 md:w-5/6 w-11/12 mx-auto font-sans px-5 py-5 ' +
        'bg-gray-900 rounded-lg my-2'
      }
    >
      <div
        className={
          'flex items-center justify-between px-3 mb-5 py-1 ' +
          'rounded-lg border-2 border-gray-800 '
        }
      >
        <section
          className="flex gap-3 items-center justify-start "
          onClick={(e) => openProfile(e)}
        >
          {data.photoURL ? (
            <div className="relative h-10 w-10 md:h-12 md:w-12 cursor-pointer">
              <Image
                src={data.photoURL}
                alt="Picture"
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
            </div>
          ) : null}
          <section className="flex flex-col cursor-pointer">
            <span
              className={
                'font-semibold text-sm md:text-lg text-gray-300 hover:underline ' +
                'hover:text-indigo-500'
              }
            >
              {data.name}
            </span>
            <span className="font-semibold text-gray-500 text-xs md:text-base">
              @{data.username}
            </span>
          </section>
        </section>
        {data.uid !== uid ? (
          isApplied ? (
            <div
              className={
                'my-2 text-lg font-semibold text-green-500 px-3 py-1.5 ' +
                'bg-green-900 rounded-md cursor-default'
              }
            >
              Applied
            </div>
          ) : (
            <div onClick={(e) => e && createJoinee(e)}>
              <FixedButton name="Apply" />
            </div>
          )
        ) : null}
      </div>

      {/** Description */}
      <span className="text-gray-300 text-lg font-medium tracking-wide px-3">
        {data.description}
      </span>

      {/** Requirements */}
      <div
        className={
          'grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 mt-8 gap-5 ' +
          'cursor-pointer bg-black/30 hover:bg-black/50 px-6 py-3 rounded-md'
        }
        onClick={handleCardClick}
      >
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Game</span>
          <span className="text-gray-100 tracking-wide text-lg font-medium pt-1 pl-0.5">
            {data.gameCode && games[data.gameCode].shortName}
          </span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Mode</span>
          <span className="text-gray-100 tracking-wide text-lg font-medium pt-1 pl-0.5">
            {data.mode}
          </span>
        </section>
        {data.perspective ? (
          <section className="flex flex-col">
            <span className="font-semibold text-gray-500 text-sm">
              Perspective
            </span>
            <span className="text-gray-100 tracking-wide text-lg font-medium pt-1 pl-0.5">
              {data.perspective}
            </span>
          </section>
        ) : null}
        {data.tier ? (
          <section className="flex flex-col">
            <span className="font-semibold text-gray-500 text-sm">Tier</span>
            <span className="text-gray-100 tracking-wide text-lg font-medium pt-1 pl-0.5">
              {data.tier}
            </span>
          </section>
        ) : null}
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">K/D</span>
          <span className="text-gray-100 tracking-wide text-lg font-medium pt-1 pl-0.5">
            {data.kd}
          </span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">
            Average Damage
          </span>
          <span className="text-gray-100 tracking-wide text-lg font-medium pt-1 pl-0.5">
            {data.averageDamage}
          </span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Age</span>
          <span className="text-gray-100 tracking-wide text-lg font-medium pt-1 pl-0.5">
            {data.age}+
          </span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">
            Experience
          </span>
          <span className="text-gray-100 tracking-wide text-lg font-medium pt-1 pl-0.5">
            {data.experience}
          </span>
        </section>
        {data.role ? (
          <section className="flex flex-col">
            <span className="font-semibold text-gray-500 text-sm">Role</span>
            <span className="text-gray-100 tracking-wide text-lg font-medium pt-1 pl-0.5">
              {data.role}
            </span>
          </section>
        ) : null}
        {data.purpose ? (
          <section className="flex flex-col">
            <span className="font-semibold text-gray-500 text-sm">Purpose</span>
            <span className="text-gray-100 tracking-wide text-lg font-medium pt-1 pl-0.5">
              {data.purpose}
            </span>
          </section>
        ) : null}
        {data.timeAvailability ? (
          <section className="flex col-span-2 flex-col">
            <span className="font-semibold text-gray-500 text-sm">
              Time Avl.
            </span>
            <span className="text-gray-100 tracking-wide text-lg font-medium pt-1 pl-0.5">
              {data.timeAvailability}
            </span>
          </section>
        ) : null}
        {data.language ? (
          <section className="flex flex-col">
            <span className="font-semibold text-gray-500 text-sm">
              Language
            </span>
            <span className="text-gray-100 tracking-wide text-lg font-medium pt-1 pl-0.5">
              {data.language}
            </span>
          </section>
        ) : null}
      </div>
    </div>
  );
}
