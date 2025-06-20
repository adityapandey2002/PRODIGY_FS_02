import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEmployees, useDeleteEmployee } from '../../hooks/useEmployees';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Card,
  Button,
  Table,
  Badge,
  LoadingSpinner,
  FlexContainer,
  Input,
  Select
} from '../../styles/GlobalStyles';
import { FaEdit, FaTrash, FaEye, FaPlus, FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

const SearchContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActionButton = styled(Button)`
  padding: 6px 12px;
  font-size: 12px;
  margin: 0 2px;
`;

const EmployeeList = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');




  const queryParams = {
    page,
    limit,
    ...(search && { q: search }), // ✅ Changed from 'search' to 'q'
    ...(department && { department }),
    ...(status && { status })
  };

  const { data, isLoading, error } = useEmployees(queryParams);
  const deleteEmployeeMutation = useDeleteEmployee();

  // Debug logging - but check the actual structure
  console.log('EmployeeList - API Response:', { data, isLoading, error });

  // ✅ Add proper error handling and data validation
  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading employees: {error.message}</div>;

  // ✅ Ensure we have the correct data structure
  if (!data || typeof data !== 'object') {
    console.error('Invalid response format:', data);
    return <div>Error: Invalid response format from server</div>;
  }

  const employees = data.data || [];
  const isValidData = Array.isArray(employees);

  if (!isValidData) {
    console.error('Employees data is not an array:', data);
    return <div>Error: Invalid data format received from server</div>;
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployeeMutation.mutate(id);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      inactive: 'warning',
      terminated: 'danger'
    };
    return <Badge $variant={variants[status]}>{status}</Badge>; // ✅ Use $variant
  };

  return (
    <Container>
      <FlexContainer $justify="space-between" style={{ marginBottom: '20px' }}>
        <h1>Employees</h1>
        {(user?.role === 'admin' || user?.role === 'hr') && (
          <Link to="/employees/new">
            <Button $variant="primary">
              <FaPlus /> Add Employee
            </Button>
          </Link>
        )}
      </FlexContainer>

      <SearchContainer>
        <form onSubmit={handleSearch}>
          <FlexContainer $gap="15px" $wrap="wrap">
            <Input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Sales">Sales</option>
            </Select>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="terminated">Terminated</option>
            </Select>
            <Button type="submit" $variant="primary">
              <FaSearch /> Search
            </Button>
          </FlexContainer>
        </form>
      </SearchContainer>

      <Card>
        {employees.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee._id}>
                  <td>{employee.employeeId}</td>
                  <td>{employee.firstName} {employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>{getStatusBadge(employee.status)}</td>
                  <td>
                    <FlexContainer $gap="5px">
                      <Link to={`/employees/${employee._id}`}>
                        <ActionButton $variant="info">
                          <FaEye />
                        </ActionButton>
                      </Link>
                      {(user?.role === 'admin' || user?.role === 'hr') && (
                        <>
                          <Link to={`/employees/${employee._id}/edit`}>
                            <ActionButton $variant="warning">
                              <FaEdit />
                            </ActionButton>
                          </Link>
                          <ActionButton
                            $variant="danger"
                            onClick={() => handleDelete(employee._id)}
                          >
                            <FaTrash />
                          </ActionButton>
                        </>
                      )}
                    </FlexContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            No employees found
          </div>
        )}
      </Card>

      {/* Pagination */}
      {data?.pagination && (
        <FlexContainer $justify="center" $gap="10px" style={{ marginTop: '20px' }}>
          {data.pagination.prev && (
            <Button onClick={() => setPage(data.pagination.prev.page)}>
              Previous
            </Button>
          )}
          <span>Page {page}</span>
          {data.pagination.next && (
            <Button onClick={() => setPage(data.pagination.next.page)}>
              Next
            </Button>
          )}
        </FlexContainer>
      )}
    </Container>
  );
};



export default EmployeeList;
