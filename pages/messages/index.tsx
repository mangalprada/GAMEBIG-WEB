import ChatContainer from '../../components/Contact/ChatContainer';
import TypeContainer from '../../components/Contact/ReplyContainer';
import UsersList from '../../components/Messages/UsersList/UsersList';

const index = () => {
  return (
    <div className="fixed md:w-10/12">
      <div className="flex items-center mt-4 md:gap-8 h-screen ">
        <UsersList />
        <ChatContainer chatDatas={[]} />
      </div>
    </div>
  );
};

export default index;
