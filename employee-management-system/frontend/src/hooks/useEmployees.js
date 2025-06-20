import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeAPI } from '../services/api';
import { toast } from 'react-toastify';

export const useEmployees = (params) => {
  return useQuery({
    queryKey: ['employees', params],
    queryFn: async () => {
      const response = await employeeAPI.getEmployees(params);
      return response.data; // Extract just the data from the Axios response
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useEmployee = (id) => {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      const response = await employeeAPI.getEmployee(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeAPI.createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Employee created successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create employee');
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => employeeAPI.updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employee'] });
      toast.success('Employee updated successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update employee');
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeAPI.deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Employee deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete employee');
    },
  });
};

export const useEmployeeStats = () => {
  return useQuery({
    queryKey: ['employeeStats'],
    queryFn: async () => {
      const response = await employeeAPI.getEmployeeStats();
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSearchEmployees = (searchParams) => {
  return useQuery({
    queryKey: ['searchEmployees', searchParams],
    queryFn: async () => {
      const response = await employeeAPI.searchEmployees(searchParams);
      return response.data;
    },
    enabled: !!searchParams.q || !!searchParams.department || !!searchParams.status,
    keepPreviousData: true,
  });
};
