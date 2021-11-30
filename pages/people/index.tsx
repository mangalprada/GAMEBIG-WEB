import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import ProfileCard from '../../components/Profile/ProfileCard';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { UserData } from '../../utilities/types';
import { firebaseAdmin } from 'firebase/firebaseAdmin';

type Props = {
  users: UserData[];
};

const People = ({ users }: Props) => {
  return (
    <div>
      <Head>
        <title>People</title>
        <meta
          name="description"
          content="Find Gamers Like you, connect with them!"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <div className="xl:w-1/2 lg:w-2/3 md:w-5/6 w-11/12 mx-auto mt-2">
          <span className="text-gray-400 font-medium text-lg tracking-wide">
            People you may know
          </span>
        </div>
        <div
          className={
            'xl:w-1/2 lg:w-2/3 md:w-5/6 w-11/12 grid grid-cols-2 sm:grid-cols-3 ' +
            'gap-3 sm:gap-5 mt-3 mx-auto'
          }
        >
          {users.map((user) => (
            <ProfileCard user={user} key={user.uid} />
          ))}
        </div>
      </Aux>
    </div>
  );
};

export default People;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let users: any[] = [];
  let uid = '';

  const cookies = nookies.get(context);
  try {
    await firebaseAdmin
      .auth()
      .verifyIdToken(cookies.token)
      .then(async (user) => {
        if (user) uid = user.uid;
      });
  } catch (error) {
    console.log(error);
  }

  await firebaseAdmin
    .firestore()
    .collection('users')
    .where('uid', '!=', uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data) {
          users.push({
            ...data,
            dob: data.dob ? data.dob.toDate().toISOString() : null,
            docId: doc.id,
          });
        }
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
  return {
    props: { users },
  };
}
