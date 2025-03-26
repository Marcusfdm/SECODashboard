// src/utils/statusHelpers.js
import { CheckCircle, AlertTriangle, XCircle } from 'react-feather';

export const getStatusIcon = (status) => {
  switch (status) {
    case 'success':
      return CheckCircle;
    case 'warning':
      return AlertTriangle;
    case 'error':
      return XCircle;
    default:
      return CheckCircle;
  }
};

export const getFactorStatusColor = (status) => {
  switch (status) {
    case 'success':
      return 'text-green-500';
    case 'warning':
      return 'text-yellow-500';
    case 'error':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export const getFactorStatusText = (status) => {
  switch (status) {
    case 'success':
      return 'Good';
    case 'warning':
      return 'Needs Attention';
    case 'error':
      return 'Critical';
    default:
      return 'Unknown';
  }
};