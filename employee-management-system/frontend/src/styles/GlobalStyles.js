import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  input, textarea, select {
    outline: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 14px;
  }

  input:focus, textarea:focus, select:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background: ${props => {
    switch (props.$variant) {
      case 'primary': return '#007bff';
      case 'success': return '#28a745';
      case 'danger': return '#dc3545';
      case 'warning': return '#ffc107';
      case 'secondary': return '#6c757d';
      default: return '#6c757d';
    }
  }};
  color: ${props => props.$variant === 'warning' ? '#212529' : 'white'};
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  color: #555;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  &.error {
    border-color: #dc3545;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

export const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  
  background: ${props => {
    switch (props.$variant) {
      case 'success': return '#d4edda';
      case 'danger': return '#f8d7da';
      case 'warning': return '#fff3cd';
      case 'info': return '#d1ecf1';
      default: return '#e2e3e5';
    }
  }};
  
  color: ${props => {
    switch (props.$variant) {
      case 'success': return '#155724';
      case 'danger': return '#721c24';
      case 'warning': return '#856404';
      case 'info': return '#0c5460';
      default: return '#383d41';
    }
  }};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #555;
  }
  
  tr:hover {
    background-color: #f8f9fa;
  }
`;

// In your GlobalStyles.js or wherever FlexContainer is defined
export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.$gap || '0'}; // Use $gap instead of gap
  flex-direction: ${props => props.$direction || 'row'};
  flex-wrap: ${props => props.$wrap || 'nowrap'};
`;


export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;
