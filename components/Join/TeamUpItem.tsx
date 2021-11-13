import { useAuth } from '@/context/authContext';
import { JoinPostType } from '@/utilities/join/JoinPostType';
import { db } from 'firebase/firebaseClient';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FixedButton from '../UI/Buttons/FixedButton';

type Props = {
  data: JoinPostType;
};

export default function Post({ data }: Props) {
  const {
    userData: { uid, username, name, photoURL },
  } = useAuth();
  const router = useRouter();

  const openProfile = () => {
    router.push(`/profile/${data.username}`);
  };

  const onClick = () => {
    router.push(`/join/${data.uid}/${data.id}`);
  };

  const createJoinee = async () => {
    if (data.uid !== uid) {
      await db
        .collection('join')
        .doc(data.id)
        .collection('joinees')
        .doc(uid)
        .set({ uid, username, name, photoURL })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      className={
        'xl:w-1/2 md:w-5/6 mx-auto font-sans px-3 md:px-12 pb-8 pt-4 ' +
        'bg-gray-900 rounded-lg my-2 '
      }
      onClick={onClick}
    >
      <div className="flex items-center justify-between px-3 mb-8 rounded-lg border-2 border-gray-800 ">
        <section
          className="flex gap-3 items-center justify-start "
          onClick={openProfile}
        >
          {data.photoURL ? (
            <div className="relative h-10 w-10 md:h-14 md:w-14 cursor-pointer">
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
            <span className="font-semibold text-sm  md:text-lg text-gray-300 hover:text-indigo-600">
              {data.name}
            </span>
            <span className="font-semibold text-gray-500 text-xs md:text-base">
              @{data.username}
            </span>
          </section>
        </section>
        {data.uid !== uid ? (
          <FixedButton name={`Join ${data.username}`} onClick={createJoinee} />
        ) : null}
      </div>
      <span className="text-gray-100 tracking-wide pt-1">
        {data.description}
      </span>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 mt-8 space-5 gap-6">
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Game</span>
          <span className="text-gray-100 tracking-wide pt-1">
            {data.gameCode}
          </span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Mode</span>
          <span className="text-gray-100 tracking-wide pt-1">{data.mode}</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">K/D</span>
          <span className="text-gray-100 tracking-wide pt-1">{data.kd}</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">
            Average Damage
          </span>
          <span className="text-gray-100 tracking-wide pt-1">
            {data.averageDamage}
          </span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Age</span>
          <span className="text-gray-100 tracking-wide pt-1">{data.age}</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">
            Experience
          </span>
          <span className="text-gray-100 tracking-wide pt-1">
            {data.experience}
          </span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Role</span>
          <span className="text-gray-100 tracking-wide pt-1">{data.role}</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Purpose</span>
          <span className="text-gray-100 tracking-wide pt-1">
            {data.purpose}
          </span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500 text-sm">Language</span>
          <span className="text-gray-100 tracking-wide pt-1">
            {data.language}
          </span>
        </section>
      </div>
    </div>
  );
}
