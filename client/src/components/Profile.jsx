import React from 'react';
import { UserContext } from '../Context';

const Profile = () => {
  const { user, logOutUser } = React.useContext(UserContext);

  return (
    <div>
      <h1>Welcome {user.username}!</h1>
      <button type="submit" onClick={logOutUser}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
