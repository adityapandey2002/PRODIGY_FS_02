import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, FlexContainer } from '../../styles/GlobalStyles';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background: white;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #eee;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
 $gap: 10px;
  color: #666;
`;

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <NavbarContainer>
      <h2>Employee Management System</h2>

      <FlexContainer $gap="15px">
        <UserInfo>
          <FaUser />
          <span>{user?.name}</span>
          <span style={{ fontSize: '12px', textTransform: 'uppercase' }}>
            ({user?.role})
          </span>
        </UserInfo>

        <Button $variant="danger" onClick={logout}>
          <FaSignOutAlt /> Logout
        </Button>
      </FlexContainer>
    </NavbarContainer>
  );
};

export default Navbar;
