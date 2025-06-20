import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEmployee, useDeleteEmployee } from '../../hooks/useEmployees';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Card,
  Button,
  Badge,
  LoadingSpinner,
  FlexContainer
} from '../../styles/GlobalStyles';
import { FaEdit, FaTrash, FaArrowLeft, FaEnvelope, FaPhone } from 'react-icons/fa';
import styled from 'styled-components';
import { format } from 'date-fns';

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  $gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
 $gap: 20px;
  margin-bottom: 20px;
`;

const InfoCard = styled(Card)`
  padding: 15px;
`;

const InfoLabel = styled.div`
  font-weight: 600;
  color: #666;
  margin-bottom: 5px;
`;

const InfoValue = styled.div`
  color: #333;
  font-size: 16px;
`;

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading, error } = useEmployee(id);
  const deleteEmployeeMutation = useDeleteEmployee();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployeeMutation.mutateAsync(id);
        navigate('/employees');
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading employee details</div>;
  if (!data?.data) return <div>Employee not found</div>;

  const employee = data.data;
  const canModify = user?.role === 'admin' || user?.role === 'hr';

  const getStatusBadge = (status) => {
    const $variants = {
      active: 'success',
      inactive: 'warning',
      terminated: 'danger'
    };
    return <Badge $variant={$variants[status]}>{status}</Badge>;
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <Container>
      <FlexContainer justify="space-between" style={{ marginBottom: '20px' }}>
        <Button $variant="secondary" onClick={() => navigate('/employees')}>
          <FaArrowLeft /> Back to List
        </Button>
        {canModify && (
          <FlexContainer $gap="10px">
            <Link to={`/employees/${id}/edit`}>
              <Button $variant="warning">
                <FaEdit /> Edit
              </Button>
            </Link>
            <Button
              $variant="danger"
              onClick={handleDelete}
              disabled={deleteEmployeeMutation.isLoading}
            >
              <FaTrash /> Delete
            </Button>
          </FlexContainer>
        )}
      </FlexContainer>

      <Card>
        <ProfileHeader>
          <ProfileImage>
            {getInitials(employee.firstName, employee.lastName)}
          </ProfileImage>
          <div>
            <h1>{employee.firstName} {employee.lastName}</h1>
            <p style={{ color: '#666', fontSize: '18px', margin: '5px 0' }}>
              {employee.position} - {employee.department}
            </p>
            <p style={{ color: '#666', margin: '5px 0' }}>
              Employee ID: {employee.employeeId}
            </p>
            {getStatusBadge(employee.status)}
          </div>
        </ProfileHeader>

        <InfoGrid>
          <InfoCard>
            <h3 style={{ marginBottom: '15px' }}>Contact Information</h3>
            <div style={{ marginBottom: '10px' }}>
              <InfoLabel><FaEnvelope /> Email</InfoLabel>
              <InfoValue>{employee.email}</InfoValue>
            </div>
            <div>
              <InfoLabel><FaPhone /> Phone</InfoLabel>
              <InfoValue>{employee.phone}</InfoValue>
            </div>
          </InfoCard>

          <InfoCard>
            <h3 style={{ marginBottom: '15px' }}>Employment Details</h3>
            <div style={{ marginBottom: '10px' }}>
              <InfoLabel>Department</InfoLabel>
              <InfoValue>{employee.department}</InfoValue>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <InfoLabel>Position</InfoLabel>
              <InfoValue>{employee.position}</InfoValue>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <InfoLabel>Salary</InfoLabel>
              <InfoValue>${employee.salary?.toLocaleString()}</InfoValue>
            </div>
            <div>
              <InfoLabel>Hire Date</InfoLabel>
              <InfoValue>
                {employee.hireDate ? format(new Date(employee.hireDate), 'MMM dd, yyyy') : 'N/A'}
              </InfoValue>
            </div>
          </InfoCard>

          {employee.address && (
            <InfoCard>
              <h3 style={{ marginBottom: '15px' }}>Address</h3>
              <InfoValue>
                {employee.address.street && <div>{employee.address.street}</div>}
                {(employee.address.city || employee.address.state) && (
                  <div>
                    {employee.address.city}{employee.address.city && employee.address.state && ', '}
                    {employee.address.state} {employee.address.zipCode}
                  </div>
                )}
                {employee.address.country && <div>{employee.address.country}</div>}
              </InfoValue>
            </InfoCard>
          )}

          {employee.emergencyContact && (
            <InfoCard>
              <h3 style={{ marginBottom: '15px' }}>Emergency Contact</h3>
              <div style={{ marginBottom: '10px' }}>
                <InfoLabel>Name</InfoLabel>
                <InfoValue>{employee.emergencyContact.name}</InfoValue>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <InfoLabel>Relationship</InfoLabel>
                <InfoValue>{employee.emergencyContact.relationship}</InfoValue>
              </div>
              <div>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>{employee.emergencyContact.phone}</InfoValue>
              </div>
            </InfoCard>
          )}
        </InfoGrid>

        <InfoCard>
          <h3 style={{ marginBottom: '15px' }}>System Information</h3>
          <InfoGrid>
            <div>
              <InfoLabel>Created Date</InfoLabel>
              <InfoValue>
                {employee.createdAt ? format(new Date(employee.createdAt), 'MMM dd, yyyy HH:mm') : 'N/A'}
              </InfoValue>
            </div>
            <div>
              <InfoLabel>Last Updated</InfoLabel>
              <InfoValue>
                {employee.updatedAt ? format(new Date(employee.updatedAt), 'MMM dd, yyyy HH:mm') : 'N/A'}
              </InfoValue>
            </div>
            {employee.createdBy && (
              <div>
                <InfoLabel>Created By</InfoLabel>
                <InfoValue>{employee.createdBy.name}</InfoValue>
              </div>
            )}
            {employee.updatedBy && (
              <div>
                <InfoLabel>Updated By</InfoLabel>
                <InfoValue>{employee.updatedBy.name}</InfoValue>
              </div>
            )}
          </InfoGrid>
        </InfoCard>
      </Card>
    </Container>
  );
};

export default EmployeeDetails;
