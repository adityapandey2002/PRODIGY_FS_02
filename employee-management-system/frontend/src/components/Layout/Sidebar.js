import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaUserPlus, FaCog } from 'react-icons/fa';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px 0;
  min-height: 100vh;
`;

const Logo = styled.div`
  padding: 0 20px 30px;
  text-align: center;
  border-bottom: 1px solid #34495e;
  margin-bottom: 20px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.3s;
  
  &:hover {
    background: #34495e;
    color: white;
  }
  
  &.active {
    background: #3498db;
    color: white;
  }
  
  svg {
    font-size: 16px;
  }
`;

const Sidebar = () => {
  const { user } = useAuth();
  const canManageEmployees = user?.role === 'admin' || user?.role === 'hr';

  return (
    <SidebarContainer>
      <Logo>
        <h3>EMS</h3>
        <p style={{ fontSize: '12px', margin: '5px 0 0' }}>
          Employee Management
        </p>
      </Logo>

      <nav>
        <NavItem to="/dashboard">
          <MdDashboard />
          Dashboard
        </NavItem>

        <NavItem to="/employees">
          <FaUsers />
          Employees
        </NavItem>

        {canManageEmployees && (
          <NavItem to="/employees/new">
            <FaUserPlus />
            Add Employee
          </NavItem>
        )}

        <NavItem to="/profile">
          <FaCog />
          Profile
        </NavItem>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;
