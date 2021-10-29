import { useState } from 'react';
import SearchInput from '../../UI/Inputs/SearchInput';
import User from './User';

const UsersList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  return (
    <div className="w-full md:w-1/3 h-full pt-2">
      <SearchInput
        name="searchUser"
        onChangeHandler={() => {
          console.log('val changed');
        }}
        placeHolder="Search someone and send a message..."
        value={searchValue}
        error={Boolean(errorMsg)}
        errorMessage={errorMsg}
      />
      <div className="h-full overflow-auto pr-3"></div>
    </div>
  );
};

export default UsersList;
