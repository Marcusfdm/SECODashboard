// src/components/Common/TabContainer.jsx
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'react-feather';

export const TabContainer = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="flex border-b mb-6">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`px-4 py-2 text-sm ${
            activeTab === tab.id
              ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          <tab.icon size={16} className="inline mr-1" /> {tab.label}
        </button>
      ))}
    </div>
  );
};

export const getStatusIcon = (status) => {
  if (status === 'completed') return <CheckCircle className="text-green-500" size={18} />;
  if (status === 'partial') return <AlertTriangle className="text-yellow-500" size={18} />;
  return <XCircle className="text-gray-400" size={18} />;
};

export const getStatusColor = (status) => {
  if (status === 'completed') return 'bg-green-500';
  if (status === 'partial') return 'bg-yellow-500';
  return 'bg-gray-300';
};

export const getStatusText = (status) => {
  if (status === 'completed') return 'Complete';
  if (status === 'partial') return 'Partial';
  return 'Not started';
};

export const getFactorStatusColor = (status) => {
  if (status === 'advanced') return 'bg-green-600';
  if (status === 'established') return 'bg-green-400';
  if (status === 'developing') return 'bg-yellow-400';
  return 'bg-red-400';
};

export const getFactorStatusText = (status) => {
  if (status === 'advanced') return 'Advanced';
  if (status === 'established') return 'Established';
  if (status === 'developing') return 'Developing';
  return 'Initial';
};

export const getDimensionColor = (dimension, type) => {
  const dimensions = type === 'seco' ? secoSystemDimensions : sustainabilityDimensions;
  const found = dimensions.find(d => d.id === dimension);
  return found ? found.color : 'gray';
};

export default TabContainer;