// src/components/Common/TabContainer.jsx
import React from 'react';

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
          {tab.icon && <tab.icon size={16} className="inline mr-1" />} {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabContainer;