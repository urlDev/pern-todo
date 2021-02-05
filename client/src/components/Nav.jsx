import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context';

const Nav = () => {
  const { user } = React.useContext(UserContext);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {
          user.username ? (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/profile/login">Login</Link>
              </li>
              <li>
                <Link to="/profile/register">Register</Link>
              </li>
            </>
          ) //
        }
      </ul>
    </nav>
  );
};

export default Nav;
