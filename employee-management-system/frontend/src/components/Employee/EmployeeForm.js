import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEmployee, useCreateEmployee, useUpdateEmployee } from '../../hooks/useEmployees';
import {
  Container,
  Card,
  Button,
  FormGroup,
  Label,
  Input,
  Select,
  ErrorMessage,
  LoadingSpinner,
  FlexContainer
} from '../../styles/GlobalStyles';
import styled from 'styled-components';

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
 $gap: 20px;
  margin-bottom: 20px;
`;

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const { data: employee, isLoading: loadingEmployee } = useEmployee(id);
  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();

  useEffect(() => {
    if (isEdit && employee?.data) {
      const emp = employee.data;

      // Set basic employee fields
      setValue('firstName', emp.firstName || '');
      setValue('lastName', emp.lastName || '');
      setValue('email', emp.email || '');
      setValue('phone', emp.phone || '');
      setValue('department', emp.department || '');
      setValue('position', emp.position || '');
      setValue('salary', emp.salary || '');
      setValue('status', emp.status || 'active');
      setValue('photo', emp.photo || '');

      // Handle hire date conversion
      if (emp.hireDate) {
        setValue('hireDate', new Date(emp.hireDate).toISOString().split('T')[0]);
      }

      // Handle nested address object
      if (emp.address) {
        setValue('address.street', emp.address.street || '');
        setValue('address.city', emp.address.city || '');
        setValue('address.state', emp.address.state || '');
        setValue('address.zipCode', emp.address.zipCode || '');
        setValue('address.country', emp.address.country || '');
      } else {
        // Clear address fields if no address data
        setValue('address.street', '');
        setValue('address.city', '');
        setValue('address.state', '');
        setValue('address.zipCode', '');
        setValue('address.country', '');
      }

      // Handle nested emergency contact object
      if (emp.emergencyContact) {
        setValue('emergencyContact.name', emp.emergencyContact.name || '');
        setValue('emergencyContact.relationship', emp.emergencyContact.relationship || '');
        setValue('emergencyContact.phone', emp.emergencyContact.phone || '');
      } else {
        // Clear emergency contact fields if no data
        setValue('emergencyContact.name', '');
        setValue('emergencyContact.relationship', '');
        setValue('emergencyContact.phone', '');
      }
    }
  }, [employee, isEdit, setValue]);


  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      navigate('/employees');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (loadingEmployee) return <LoadingSpinner />;

  const isLoading = createMutation.isLoading || updateMutation.isLoading;

  return (
    <Container>
      <Card>
        <h2>{isEdit ? 'Edit Employee' : 'Add New Employee'}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                className={errors.firstName ? 'error' : ''}
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: { value: 2, message: 'Minimum 2 characters required' }
                })}
              />
              {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                type="text"
                className={errors.lastName ? 'error' : ''}
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: { value: 2, message: 'Minimum 2 characters required' }
                })}
              />
              {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                className={errors.email ? 'error' : ''}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                className={errors.phone ? 'error' : ''}
                {...register('phone', {
                  required: 'Phone number is required'
                })}
              />
              {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="department">Department *</Label>
              <Select
                id="department"
                className={errors.department ? 'error' : ''}
                {...register('department', {
                  required: 'Department is required'
                })}
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Sales">Sales</option>
              </Select>
              {errors.department && <ErrorMessage>{errors.department.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                type="text"
                className={errors.position ? 'error' : ''}
                {...register('position', {
                  required: 'Position is required'
                })}
              />
              {errors.position && <ErrorMessage>{errors.position.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="salary">Salary *</Label>
              <Input
                id="salary"
                type="number"
                min="0"
                step="0.01"
                className={errors.salary ? 'error' : ''}
                {...register('salary', {
                  required: 'Salary is required',
                  min: { value: 0, message: 'Salary must be positive' }
                })}
              />
              {errors.salary && <ErrorMessage>{errors.salary.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="hireDate">Hire Date *</Label>
              <Input
                id="hireDate"
                type="date"
                className={errors.hireDate ? 'error' : ''}
                {...register('hireDate', {
                  required: 'Hire date is required'
                })}
              />
              {errors.hireDate && <ErrorMessage>{errors.hireDate.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                {...register('status')}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="terminated">Terminated</option>
              </Select>
            </FormGroup>
          </FormGrid>

          <h3>Address Information</h3>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="address.street">Street</Label>
              <Input
                id="address.street"
                type="text"
                {...register('address.street')}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address.city">City</Label>
              <Input
                id="address.city"
                type="text"
                {...register('address.city')}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address.state">State</Label>
              <Input
                id="address.state"
                type="text"
                {...register('address.state')}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address.zipCode">Zip Code</Label>
              <Input
                id="address.zipCode"
                type="text"
                {...register('address.zipCode')}
              />
            </FormGroup>
          </FormGrid>

          <h3>Emergency Contact</h3>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="emergencyContact.name">Contact Name</Label>
              <Input
                id="emergencyContact.name"
                type="text"
                {...register('emergencyContact.name')}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="emergencyContact.relationship">Relationship</Label>
              <Input
                id="emergencyContact.relationship"
                type="text"
                {...register('emergencyContact.relationship')}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="emergencyContact.phone">Contact Phone</Label>
              <Input
                id="emergencyContact.phone"
                type="tel"
                {...register('emergencyContact.phone')}
              />
            </FormGroup>
          </FormGrid>

          <FlexContainer $gap="10px" style={{ marginTop: '30px' }}>
            <Button
              type="submit"
              $variant="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (isEdit ? 'Update Employee' : 'Create Employee')}
            </Button>
            <Button
              type="button"
              $variant="secondary"
              onClick={() => navigate('/employees')}
            >
              Cancel
            </Button>
          </FlexContainer>
        </form>
      </Card>
    </Container >
  );
};

export default EmployeeForm;
