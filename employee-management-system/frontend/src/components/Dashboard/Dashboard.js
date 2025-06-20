import React from 'react';
import { useEmployeeStats } from '../../hooks/useEmployees';
import { Container, Card, Grid, LoadingSpinner } from '../../styles/GlobalStyles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styled from 'styled-components';

const DashboardHeader = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 16px;
`;

const StatCard = styled(Card)`
  text-align: center;
  background: ${props => props.$bgcolor || 'white'};
  color: ${props => props.$textcolor || '#333'};
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const ChartCard = styled(Card)`
  height: 400px;
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const Dashboard = () => {
  const { data: stats, isLoading, error } = useEmployeeStats();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading dashboard data</div>;

  const departmentData = stats?.data?.departmentStats || [];
  const statusData = stats?.data?.statusStats || [];
  const totalEmployees = stats?.data?.totalEmployees || 0;
  const activeEmployees = stats?.data?.activeEmployees || 0;

  return (
    <Container>
      <DashboardHeader>
        <Title>Dashboard</Title>
        <Subtitle>Welcome to Employee Management System</Subtitle>
      </DashboardHeader>

      <Grid>
        <StatCard $bgcolor="#007bff" $textcolor="white">
          <StatNumber>{totalEmployees}</StatNumber>
          <StatLabel>Total Employees</StatLabel>
        </StatCard>

        <StatCard $bgcolor="#28a745" $textcolor="white">
          <StatNumber>{activeEmployees}</StatNumber>
          <StatLabel>Active Employees</StatLabel>
        </StatCard>

        <StatCard $bgcolor="#17a2b8" $textcolor="white">
          <StatNumber>{departmentData.length}</StatNumber>
          <StatLabel>Departments</StatLabel>
        </StatCard>

        <StatCard $bgcolor="#ffc107" $textcolor="#212529">
          <StatNumber>{totalEmployees - activeEmployees}</StatNumber>
          <StatLabel>Inactive Employees</StatLabel>
        </StatCard>
      </Grid>

      <Grid>
        <ChartCard>
          <h3 style={{ marginBottom: '20px' }}>Employees by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard>
          <h3 style={{ marginBottom: '20px' }}>Employee Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ _id, count }) => `${_id}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>
    </Container>
  );
};

export default Dashboard;
