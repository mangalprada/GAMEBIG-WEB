import { useEffect, useState } from 'react';
import Head from 'next/head';
import CreateTeam from '../../../components/Team/createTeam';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData, TeamType } from '../../../utilities/types';
import TeamIntro from '../../../components/Team/TeamIntro';
import TeamItem from '../../../components/Team/TeamItem';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../libs/getUser';
import FixedButton from '../../../components/UI/Buttons/FixedButton';
import { useAuth } from '../../../context/authContext';
import Modal from '@/components/UI/Modal/Modal';
import { fetchTeams } from '@/libs/fetchTeams';
import { fetchInvitingTeams } from '@/libs/fetchInvitingteams';

export default function Home({
  userData: userDataFromServer,
}: {
  userData: UserData;
}) {
  const {
    userData: { uid },
  } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [currentTeams, setCurrentTeams] = useState<TeamType[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamType | undefined>(
    undefined
  );
  const [invitingTeams, setinvitingTeams] = useState<TeamType[]>([]);

  useEffect(() => {
    const getTeamData = async () => {
      if (uid) {
        if (uid === userDataFromServer.uid) {
          const invitingTeams = await fetchInvitingTeams(
            userDataFromServer.uid
          );
          setinvitingTeams(invitingTeams);
        }
        const teams = await fetchTeams(userDataFromServer.uid);
        setCurrentTeams(teams);
      }
    };
    getTeamData();
  }, [uid, userDataFromServer.uid]);

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

  const addTeam = (team: TeamType) => {
    const temp = [...currentTeams, team];
    setCurrentTeams(temp);
  };

  const removeInvitingTeam = (docId: string) => {
    const temp = invitingTeams.filter((item) => {
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

      <ProfileHeader userData={userDataFromServer} />
      <div className="w-11/12 md:w-5/6 xl:w-1/2 mx-auto mt-2">
        <div className="flex justify-end">
          {userDataFromServer.uid === uid && currentTeams.length !== 0 ? (
            <FixedButton name="Create Team" onClick={openModal} />
          ) : (
            noTeamsComponent
          )}
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          {currentTeams.length !== 0 || invitingTeams.length !== 0 ? (
            <div>
              {invitingTeams.length !== 0 ? (
                <>
                  <span className="text-center text-xl text-gray-300 font-sans font-semibold">
                    Invitations
                  </span>
                  <div>
                    {invitingTeams.map((team, index) => {
                      return (
                        <TeamItem
                          team={team}
                          key={index}
                          removeTeam={removeInvitingTeam}
                          addTeam={addTeam}
                        />
                      );
                    })}
                  </div>
                </>
              ) : null}
              <span className="text-center text-xl text-gray-300 font-sans font-semibold">
                My Teams
              </span>
              {currentTeams.map((team, index) => {
                return (
                  <TeamItem
                    team={team}
                    key={index}
                    openModal={openModal}
                    setSelectedTeam={setSelectedTeam}
                    removeTeam={removeTeam}
                  />
                );
              })}
            </div>
          ) : userDataFromServer.uid === uid ? (
            <TeamIntro openModal={openModal} />
          ) : null}
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
