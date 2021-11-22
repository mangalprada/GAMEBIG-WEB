import { useEffect, useState } from 'react';
import Head from 'next/head';
import CreateTeam from '../../../components/Profile/createTeam';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData, TeamType } from '../../../utilities/types';
import TeamIntro from '../../../components/Profile/TeamIntro';
import TeamItem from '../../../components/Profile/TeamItem';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../libs/getUser';
import FixedButton from '../../../components/UI/Buttons/FixedButton';
import { useAuth } from '../../../context/authContext';
import Modal from '@/components/UI/Modal/Modal';
import { db } from 'firebase/firebaseClient';
import { fetchTeams } from '@/libs/fetchTeams';
import TextButton from '@/components/UI/Buttons/TextButton';
import router from 'next/router';

export default function Home({ userData }: { userData: UserData }) {
  const {
    userData: { uid },
  } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTeams, setCurrentTeams] = useState<TeamType[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamType | undefined>(
    undefined
  );

  useEffect(() => {
    const getTeamData = async () => {
      if (uid) {
        const teams = await fetchTeams(uid);
        setCurrentTeams(teams);
      }
    };
    getTeamData();
  }, [uid]);

  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const removeTeam = (docId: string) => {
    const temp = currentTeams.filter((item) => {
      return docId !== item.docId;
    });
    setCurrentTeams(temp);
  };

  const noTeamsComponent = (
    <div
      className={
        'md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg my-3 mt-4 md:mx-auto mx-4 ' +
        'flex flex-col justify-center items-center'
      }
    >
      <span className="text-lg text-gray-500 font-medium text-center">
        No Teams Found!
      </span>
    </div>
  );

  return (
    <Aux>
      <Head>
        <title>Profile</title>
        <meta
          name="description"
          content="Create a Team with your friends to fight with the elite gamers on GameBig Today"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <ProfileHeader userData={userData} />
      <div className="w-11/12 md:w-5/6 xl:w-1/2 mx-auto mt-2">
        <div className="flex justify-end">
          {userData.uid === uid && currentTeams.length !== 0 ? (
            <FixedButton name="Create Team" onClick={openModal} />
          ) : (
            noTeamsComponent
          )}
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          {currentTeams.length !== 0 ? (
            currentTeams.map((team, index) => {
              return (
                <TeamItem
                  team={team}
                  key={index}
                  openModal={openModal}
                  setSelectedTeam={setSelectedTeam}
                  removeTeam={removeTeam}
                />
              );
            })
          ) : (
            <TeamIntro openModal={openModal} />
          )}
        </div>
      </div>
      <Modal closeModal={closeModal} isOpen={modalOpen}>
        <CreateTeam teamData={selectedTeam} onCancel={closeModal} />
      </Modal>
    </Aux>
  );
}

export async function getServerSideProps(context: {
  params: { username: string };
}) {
  const { username } = context.params;
  const userData = await getUser(username);
  return {
    props: { userData },
  };
}
