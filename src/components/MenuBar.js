import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { GetAuthContext } from '../context/authContext';

function MenuBar() {
  const pathName = window.location.pathname.substr(1);
  const [activeItem, setActiveItem] = useState(pathName || 'home');

  const { state, logout } = GetAuthContext();

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <div>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          {!state?.user ? (
            <>
              <Menu.Item
                name="login"
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to="/login"
              />
              <Menu.Item
                name="register"
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to="/register"
              />
            </>
          ) : (
            <Menu.Item
              name="logout"
              // active={activeItem === 'register'}
              onClick={logout}
            />
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default MenuBar;
