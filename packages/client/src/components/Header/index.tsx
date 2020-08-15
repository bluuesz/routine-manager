import React from 'react';
import { NavLink } from 'react-router-dom';
import { lighten } from 'polished';
import { MdExitToApp } from 'react-icons/md';
import { useQuery, useApolloClient } from '@apollo/client';

import styled from 'styled-components';

import logo from '../../assets/logo.svg';

import { IS_LOGGED_IN, LoggedCache } from '../../graphql/isLogged';

const Header: React.FC = () => {
  const { data } = useQuery<LoggedCache>(IS_LOGGED_IN);
  const client = useApolloClient();

  return (
    <HeaderContainer>
      <img src={logo} alt="Logo Tasks" />

      <div>
        <NavLink
          exact
          to="/main"
          activeStyle={{ color: '#fff', textDecoration: 'none' }}
        >
          Tarefas incompletas
        </NavLink>

        <NavLink
          exact
          to="/completedTasks"
          activeStyle={{ color: '#fff', textDecoration: 'none' }}
        >
          Tarefas completas
        </NavLink>
        <h4>{data?.user.name || 'ow'}</h4>
        <MdExitToApp
          onClick={() => {
            client.writeQuery({
              query: IS_LOGGED_IN,
              data: {
                isLoggedIn: false,
                user: null,
              },
            });
            localStorage.clear();
          }}
          size={30}
        />
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  @media (max-width: 629px) {
    padding: 10px 0px;
    img {
      width: 50px;
      height: 50px;
    }
  }
  div {
    display: flex;
    align-items: center;
    a {
      font-weight: normal;
      color: #d1d1d1;
      text-decoration: none;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
      & + a {
        margin-left: 30px;
      }
      @media (max-width: 675px) {
        font-size: 14px;
      }
    }
    h4 {
      text-decoration: underline;
      text-decoration-color: #ff5260;
      margin-left: 30px;
      font-size: 20px;
    }
    @media (max-width: 629px) {
      margin-left: 15px;
    }
    svg {
      margin-left: 20px;
      color: ${lighten(0.1, '#ff5260')};
      cursor: pointer;
      transition: color 0.2s;
      &:hover {
        color: #ff5260;
      }
    }
  }
`;

export default Header;
