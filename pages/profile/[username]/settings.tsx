import firebase from '../../../firebase/firebaseClient';

const settings = () => {
  const deleteUser = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      user
        .delete()
        .then(() => {
          // User deleted.
        })
        .catch((error) => {
          // An error ocurred
          // ...
        });
    }
  };

  return (
    <div className="flex flex-col justify-end h-screen">
      <span
        onClick={deleteUser}
        className="bg-red-600 p-3 rounded-md mt-40 w-2/12"
      >
        Delete Account
      </span>
    </div>
  );
};

export default settings;
