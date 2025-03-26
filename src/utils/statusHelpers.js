// src/utils/statusHelpers.js
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export const getStatusIcon = (status) => {
  if (status === 'completed' || status === 'success') 
    return <CheckCircle className="text-green-500" size={18} />;
  if (status === 'partial' || status === 'warning') 
    return <AlertTriangle className="text-yellow-500" size={18} />;
  return <XCircle className="text-red-500" size={18} />;
};

export const getStatusColor = (status) => {
  if (status === 'completed' || status === 'success') return 'bg-green-500';
  if (status === 'partial' || status === 'warning') return 'bg-yellow-500';
  if (status === 'error') return 'bg-red-500';
  return 'bg-gray-300';
};

export const getStatusText = (status) => {
  if (status === 'completed' || status === 'success') return 'Complete';
  if (status === 'partial' || status === 'warning') return 'Partial';
  if (status === 'error') return 'At Risk';
  return 'Not started';
};

export const getFactorStatusColor = (status) => {
  if (status === 'advanced' || status === 'success') return 'text-green-500';
  if (status === 'established' || status === 'warning') return 'text-yellow-500';
  if (status === 'developing' || status === 'error') return 'text-red-500';
  return 'text-gray-500';
};

export const getFactorStatusText = (status) => {
  if (status === 'advanced' || status === 'success') return 'Good';
  if (status === 'established' || status === 'warning') return 'Needs Attention';
  if (status === 'developing' || status === 'error') return 'Critical';
  return 'Unknown';
};