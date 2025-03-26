// src/pages/Guidelines.jsx
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getStatusIcon, getFactorStatusColor, getFactorStatusText } from '../utils/statusHelpers';

const Guidelines = ({
  selectedGuideline,
  selectedGuidelineData,
  selectedFactor,
  setSelectedFactor,
  selectedDimension,
  setSelectedDimension,
  handleGuidelineSelect,
  activeGuidelineTab,
  setActiveGuidelineTab,
  expandedSections,
  toggleSection,
}) => {
  
  if (selectedGuidelineData) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        {/* Guideline header with back button */}
        <div className="flex items-center mb-4">
          <button 
            className="mr-2 p-1 rounded hover:bg-gray-100"
            onClick={() => handleGuidelineSelect(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold">{selectedGuidelineData.title}</h2>
        </div>
        
        {/* Guideline tabs */}
        <div className="flex border-b mb-4">
          {['overall', 'metrics', 'subguidelines'].map(tab => (
            <button
              key={tab}
              className={`px-3 py-2 text-sm ${
                activeGuidelineTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveGuidelineTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Tab content */}
        {activeGuidelineTab === 'overall' && (
          <div>
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700 mb-2">{selectedGuidelineData.description}</div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Overall Compliance:</div>
                <div className="text-lg font-semibold">{selectedGuidelineData.compliance}%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className={`h-2.5 rounded-full ${
                    selectedGuidelineData.compliance >= 80 ? 'bg-green-500' :
                    selectedGuidelineData.compliance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${selectedGuidelineData.compliance}%` }}
                ></div>
              </div>
            </div>
            
            <h3 className="font-medium mb-2">Status</h3>
            <div className="flex items-center mb-4">
              {getStatusIcon(selectedGuidelineData.status)}
              <span className="ml-2">{getFactorStatusText(selectedGuidelineData.status)}</span>
            </div>
          </div>
        )}
        
        {activeGuidelineTab === 'metrics' && selectedGuidelineData.detailedMetrics && (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={selectedGuidelineData.detailedMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4F46E5" name="Compliance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {activeGuidelineTab === 'subguidelines' && selectedGuidelineData.subguidelines && (
          <div className="space-y-3">
            {selectedGuidelineData.subguidelines.map(subguideline => (
              <div key={subguideline.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(subguideline.status)}
                    <span className="ml-2 font-medium">{subguideline.title}</span>
                  </div>
                  <span className={`text-sm ${getFactorStatusColor(subguideline.status)}`}>
                    {subguideline.compliance}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Transparency Guidelines</h2>
      
      {/* Technical Guidelines */}
      <div className="mb-4 border rounded-lg overflow-hidden">
        <div 
          className="flex items-center justify-between p-3 bg-blue-50 cursor-pointer"
          onClick={() => toggleSection('technical')}
        >
          <h3 className="font-medium text-blue-800">Technical Guidelines</h3>
          {expandedSections.technical ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSections.technical && (
          <div className="p-3 space-y-3">
            {[
              { id: 1, title: 'Code Documentation', status: 'success', compliance: 85 },
              { id: 2, title: 'Testing Coverage', status: 'warning', compliance: 68 }
            ].map(guideline => (
              <div 
                key={guideline.id} 
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => handleGuidelineSelect(guideline.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(guideline.status)}
                    <span className="ml-2 font-medium">{guideline.title}</span>
                  </div>
                  <span className={`text-sm ${getFactorStatusColor(guideline.status)}`}>
                    {guideline.compliance}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Social Guidelines */}
      <div className="mb-4 border rounded-lg overflow-hidden">
        <div 
          className="flex items-center justify-between p-3 bg-green-50 cursor-pointer"
          onClick={() => toggleSection('social')}
        >
          <h3 className="font-medium text-green-800">Social Guidelines</h3>
          {expandedSections.social ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSections.social && (
          <div className="p-3 space-y-3">
            {[
              { id: 3, title: 'Community Guidelines', status: 'success', compliance: 90 },
              { id: 4, title: 'Inclusive Language', status: 'warning', compliance: 72 }
            ].map(guideline => (
              <div 
                key={guideline.id} 
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => handleGuidelineSelect(guideline.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(guideline.status)}
                    <span className="ml-2 font-medium">{guideline.title}</span>
                  </div>
                  <span className={`text-sm ${getFactorStatusColor(guideline.status)}`}>
                    {guideline.compliance}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Organizational Guidelines */}
      <div className="mb-4 border rounded-lg overflow-hidden">
        <div 
          className="flex items-center justify-between p-3 bg-purple-50 cursor-pointer"
          onClick={() => toggleSection('organizational')}
        >
          <h3 className="font-medium text-purple-800">Organizational Guidelines</h3>
          {expandedSections.organizational ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSections.organizational && (
          <div className="p-3 space-y-3">
            {[
              { id: 5, title: 'Governance Structure', status: 'warning', compliance: 65 }
            ].map(guideline => (
              <div 
                key={guideline.id} 
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => handleGuidelineSelect(guideline.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(guideline.status)}
                    <span className="ml-2 font-medium">{guideline.title}</span>
                  </div>
                  <span className={`text-sm ${getFactorStatusColor(guideline.status)}`}>
                    {guideline.compliance}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Economic Guidelines */}
      <div className="mb-4 border rounded-lg overflow-hidden">
        <div 
          className="flex items-center justify-between p-3 bg-yellow-50 cursor-pointer"
          onClick={() => toggleSection('economic')}
        >
          <h3 className="font-medium text-yellow-800">Economic Guidelines</h3>
          {expandedSections.economic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSections.economic && (
          <div className="p-3 space-y-3">
            {[
              { id: 6, title: 'Resource Management', status: 'error', compliance: 45 }
            ].map(guideline => (
              <div 
                key={guideline.id} 
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => handleGuidelineSelect(guideline.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(guideline.status)}
                    <span className="ml-2 font-medium">{guideline.title}</span>
                  </div>
                  <span className={`text-sm ${getFactorStatusColor(guideline.status)}`}>
                    {guideline.compliance}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Guidelines;