// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStatusIcon, getFactorStatusColor, getFactorStatusText } from '../utils/statusHelpers';

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
  const effectiveSelectedFactor = selectedFactor !== undefined ? selectedFactor : localSelectedFactor;
  const effectiveSetSelectedFactor = setSelectedFactor || setLocalSelectedFactor;

  // Get factors from evaluation data, or use default if not available
  const factors = evaluationData?.factors || [
    { id: 1, name: 'Documentation Quality', status: 'success', value: 85, dimension: 'technical' },
    { id: 2, name: 'Community Engagement', status: 'warning', value: 65, dimension: 'social' },
    { id: 3, name: 'Resource Utilization', status: 'error', value: 45, dimension: 'economic' }
  ];

  // Get guidelines from evaluation data, or use default if not available
  const guidelinesData = evaluationData?.guidelines || {
    technical: [
      { id: 1, title: 'Code Documentation', status: 'success', compliance: 85 },
      { id: 2, title: 'Testing Coverage', status: 'warning', compliance: 68 }
    ],
    social: [
      { id: 3, title: 'Community Guidelines', status: 'success', compliance: 90 }
    ],
    economic: [
      { id: 4, title: 'Resource Management', status: 'warning', compliance: 72 }
    ]
  };

  // Loading state
  if (isLoadingEvaluation) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="h-32 bg-gray-100 rounded"></div>
            <div className="h-32 bg-gray-100 rounded"></div>
            <div className="h-32 bg-gray-100 rounded"></div>
          </div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
        <p className="mt-4 text-gray-500">Loading dashboard data...</p>
      </div>
    );
  }

  if (effectiveShowGuidelines) {
    const dimensionKey = effectiveShowGuidelines.toLowerCase();
    const guidelines = guidelinesData[dimensionKey] || [];
    
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
              'bg-purple-100 text-purple-800'
            }`}>
              Overall: {
                guidelines.length > 0 
                  ? `${Math.round(guidelines.reduce((sum, g) => sum + g.compliance, 0) / guidelines.length)}%` 
                  : 'N/A'
              }
            </div>
          </div>
          
          {/* Guidelines list */}
          <div className="space-y-4">
            {guidelines.map(guideline => (
              <div key={guideline.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(guideline.status)}
                    <h3 className="ml-2 font-medium">{guideline.title}</h3>
                  </div>
                  <span className={`text-sm ${getFactorStatusColor(guideline.status)}`}>
                    {getFactorStatusText(guideline.status)}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 text-sm">{guideline.description || "No description available."}</p>
                <div className="mt-3">
                  <div className="text-sm">Compliance: {guideline.compliance}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        guideline.compliance >= 80 ? 'bg-green-500' :
                        guideline.compliance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${guideline.compliance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            
            {guidelines.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No guidelines available for this dimension.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (effectiveSelectedFactor) {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center mb-4">
          <button 
            className="mr-2 p-1 rounded hover:bg-gray-100"
            onClick={() => effectiveSetSelectedFactor(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold">{effectiveSelectedFactor.name}</h2>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="w-24 text-sm font-medium">Status:</div>
          <div className="flex items-center">
            {getStatusIcon(effectiveSelectedFactor.status)}
            <span className="ml-2">{getFactorStatusText(effectiveSelectedFactor.status)}</span>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="w-24 text-sm font-medium">Value:</div>
          <div className="text-xl font-bold">{effectiveSelectedFactor.value}%</div>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="w-24 text-sm font-medium">Dimension:</div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            effectiveSelectedFactor.dimension === 'technical' ? 'bg-blue-100 text-blue-800' :
            effectiveSelectedFactor.dimension === 'social' ? 'bg-green-100 text-green-800' :
            effectiveSelectedFactor.dimension === 'organizational' ? 'bg-purple-100 text-purple-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {effectiveSelectedFactor.dimension.charAt(0).toUpperCase() + effectiveSelectedFactor.dimension.slice(1)}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => {
              setActiveTab('guidelines');
            }}
          >
            View Related Guidelines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-blue-600">SECO Transparency Dashboard</h2>
          <Info className="text-gray-400 hover:text-gray-600 cursor-pointer" size={20} />
        </div>
        <p className="text-sm text-gray-600 mb-4">
          This dashboard operationalizes sustainable transparency in software ecosystems.
        </p>
        
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {factors.map(factor => (
            <div 
              key={factor.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => effectiveSetSelectedFactor(factor)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{factor.name}</h3>
                {getStatusIcon(factor.status)}
              </div>
              <div className="text-2xl font-bold">{factor.value}%</div>
              <div className="text-sm text-gray-500 capitalize">{factor.dimension}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={factors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4F46E5" name="Value (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Dimensions Overview */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Sustainability Dimensions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'technical', name: 'Technical', icon: 'code', color: 'blue' },
            { id: 'social', name: 'Social', icon: 'users', color: 'green' },
            { id: 'organizational', name: 'Organizational', icon: 'settings', color: 'purple' },
            { id: 'economic', name: 'Economic', icon: 'globe', color: 'yellow' }
          ].map(dimension => {
            const dimensionGuidelines = guidelinesData[dimension.id] || [];
            const compliance = dimensionGuidelines.length > 0 
              ? Math.round(dimensionGuidelines.reduce((sum, g) => sum + g.compliance, 0) / dimensionGuidelines.length)
              : 0;
              
            return (
              <div 
                key={dimension.id}
                className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => effectiveSetShowGuidelines(dimension.name)}
                style={{
                  borderColor: dimension.color === 'blue' ? '#bfdbfe' : 
                              dimension.color === 'green' ? '#bbf7d0' :
                              dimension.color === 'purple' ? '#e9d5ff' : '#fef08a',
                  backgroundColor: dimension.color === 'blue' ? '#eff6ff' : 
                                  dimension.color === 'green' ? '#f0fdf4' :
                                  dimension.color === 'purple' ? '#faf5ff' : '#fefce8'
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium" style={{
                    color: dimension.color === 'blue' ? '#1e40af' : 
                          dimension.color === 'green' ? '#166534' :
                          dimension.color === 'purple' ? '#6b21a8' : '#854d0e'
                  }}>
                    {dimension.name}
                  </h3>
                  <div className="px-2 py-1 rounded-full text-xs font-medium" style={{
                    backgroundColor: dimension.color === 'blue' ? '#dbeafe' : 
                                    dimension.color === 'green' ? '#dcfce7' :
                                    dimension.color === 'purple' ? '#f3e8ff' : '#fef9c3',
                    color: dimension.color === 'blue' ? '#1e40af' : 
                          dimension.color === 'green' ? '#166534' :
                          dimension.color === 'purple' ? '#6b21a8' : '#854d0e'
                  }}>
                    {compliance}%
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {dimensionGuidelines.length} guidelines
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${compliance}%`,
                      backgroundColor: dimension.color === 'blue' ? '#3b82f6' : 
                                      dimension.color === 'green' ? '#22c55e' :
                                      dimension.color === 'purple' ? '#a855f7' : '#eab308'
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;