import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, FormGroup, Label, Input, ErrorMessage } from '../../styles/GlobalStyles';
import styled from 'styled-components';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  margin: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  color: #333;
`;

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Login to Employee Management</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className={errors.password ? 'error' : ''}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </FormGroup>

          <Button
            type="submit"
            $variant="primary"
            disabled={loading}
            style={{ width: '100%', marginBottom: '16px' }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

        </form>

        <div style={{ textAlign: 'center' }}>
          <Link to="/forgot-password" style={{ color: '#007bff', fontSize: '14px' }}>
            Forgot your password?
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#007bff' }}>
              Sign up
            </Link>
          </span>
        </div>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
