import { ChangeEvent, useState } from 'react';
import algoliaClient from '../../../lib/algolia';
import debounce from '../../../lib/debounce';
import { UserData } from '../../../utilities/types';
import SearchInput from '../../UI/Inputs/SearchInput';
import User from './User';

const UsersList = () => {
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [users, setUsers] = useState<any>([]);

  const getUser = (query: string) => {
    const index = algoliaClient.initIndex('users');
    index
      .search(query, {
        attributesToRetrieve: ['name', 'username', 'photoURL'],
      })
      .then(({ hits }) => {
        setUsers(hits);
      });
  };

  return (
    <div className="w-full md:w-1/3 h-full pt-2">
      <SearchInput
        name="searchUser"
        onChangeHandler={(e: ChangeEvent) => {
          const target = e.target as HTMLInputElement;
          setQuery(target.value);
          const debouncedGetSearch = debounce(() => getUser(target.value), 500);
          if (target.value.trim() !== '') {
            debouncedGetSearch();
          } else {
            setUsers([]);
          }
        }}
        placeHolder="Search someone and send a message..."
        value={query}
        error={Boolean(errorMsg)}
        errorMessage={errorMsg}
      />
      <div className="h-full overflow-auto pr-3">
        {users.map((user: any, index: number) => {
          return (
            <div key={index}>
              <User
                name={user.name}
                username={user.username}
                image={user.photoURL}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersList;
