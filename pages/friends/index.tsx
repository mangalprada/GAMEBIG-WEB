import { useState, useEffect } from 'react';
import ProfileCard from '../../components/Friends/ProfileCard';
import { firebaseAdmin } from '../../firebase/firebaseAdmin';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { UserData } from '../../utilities/types';

const Friends = ({
  friendsSuggestions,
}: {
  friendsSuggestions: UserData[];
}) => {
  return (
    <Aux>
      <div className="max-w-full flex flex-wrap gap-4 justify-center mt-4 pt-1">
        {friendsSuggestions.map((suggestion) => (
          <div key={suggestion.uid}>
            <ProfileCard
              about="hello"
              games={[]}
              username={suggestion.username}
              image={suggestion.photoURL}
            />
          </div>
        ))}
      </div>
    </Aux>
  );
};

export default Friends;

export async function getStaticProps() {
  const friendsSuggestions: UserData[] = [];
  await firebaseAdmin
    .firestore()
    .collection('users')
    .limit(40)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        friendsSuggestions.push(doc.data() as UserData)
      )
    )
    .catch((err) => console.log(err));

  return {
    props: { friendsSuggestions },
  };
}
