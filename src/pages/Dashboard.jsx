// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Info } from 'react-feather';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStatusIcon, getFactorStatusColor, getFactorStatusText } from '../utils/statusHelpers';
import { conditioningFactors, guidelinesData } from '../data/dashboardData';

const Dashboard = ({ 
  showGuidelinesForDimension, 
  setShowGuidelinesForDimension, 
  selectedFactor, 
  setSelectedFactor, 
  setActiveTab,
  evaluationData,
  isLoadingEvaluation
}) => {
  // Default state if props aren't provided
  const [localShowGuidelines, setLocalShowGuidelines] = useState(null);
  const [localSelectedFactor, setLocalSelectedFactor] = useState(null);
  
  // Use props if provided, otherwise use local state
  const effectiveShowGuidelines = showGuidelinesForDimension !== undefined ? 
    showGuidelinesForDimension : localShowGuidelines;
  const effectiveSetShowGuidelines = setShowGuidelinesForDimension || setLocalShowGuidelines;
  const effectiveSelectedFactor = selectedFactor || localSelectedFactor;
  const effectiveSetSelectedFactor = setSelectedFactor || setLocalSelectedFactor;

  if (effectiveShowGuidelines) {
    return (
      <div>
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <button 
                className="mr-2 p-1 rounded hover:bg-gray-100"
                onClick={() => effectiveSetShowGuidelines(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-lg font-semibold">{effectiveShowGuidelines} Dimension Guidelines</h2>
            </div>
            <div className={`px-3 py-1 rounded text-sm font-medium ${
              effectiveShowGuidelines === 'Technical' ? 'bg-blue-100 text-blue-800' :
              effectiveShowGuidelines === 'Social' ? 'bg-green-100 text-green-800' :
              effectiveShowGuidelines === 'Economic' ? 'bg-yellow-100 text-yellow-800' :
              'bg-teal-100 text-teal-800'
            }`}>
              Overall: {
                effectiveShowGuidelines === 'Technical' ? '70%' :
                effectiveShowGuidelines === 'Social' ? '80%' :
                effectiveShowGuidelines === 'Economic' ? '50%' : '30%'
              }
            </div>
          </div>
          
          {/* Guidelines list */}
          <div className="space-y-4">
            {guidelinesData[effectiveShowGuidelines]?.map(guideline => {
              const StatusIcon = getStatusIcon(guideline.status);
              return (
                <div key={guideline.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <StatusIcon className={`mr-2 ${getFactorStatusColor(guideline.status)}`} />
                      <h3 className="font-medium">{guideline.title}</h3>
                    </div>
                    <span className={`text-sm ${getFactorStatusColor(guideline.status)}`}>
                      {getFactorStatusText(guideline.status)}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">{guideline.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-blue-600">SECO Transparency Dashboard</h2>
          <Info className="text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
        <p className="text-sm text-gray-600 mb-4">
          This dashboard operationalizes sustainable transparency in software ecosystems.
        </p>
        
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {conditioningFactors.map(factor => {
            const StatusIcon = getStatusIcon(factor.status);
            return (
              <div 
                key={factor.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => effectiveSetSelectedFactor(factor)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{factor.name}</h3>
                  <StatusIcon className={getFactorStatusColor(factor.status)} />
                </div>
                <div className="text-2xl font-bold">{factor.value}%</div>
                <div className="text-sm text-gray-500">{factor.dimension}</div>
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={conditioningFactors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;