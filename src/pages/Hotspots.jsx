// src/pages/Hotspots.jsx
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import HeatmapVisualization from '../components/Dashboard/HeatmapVisualization';

const Hotspots = ({ evaluationData, isLoadingEvaluation }) => {
  // Check if we have hotspot data
  const hasHotspotMetrics = evaluationData?.hotspotMetrics;
  const hasHeatmapData = evaluationData?.heatmapData && evaluationData.heatmapData.length > 0;
  const hasTaskCompletionTimes = evaluationData?.taskCompletionTimes && evaluationData.taskCompletionTimes.length > 0;
  
  if (isLoadingEvaluation) {
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-64 bg-gray-100 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
        </div>
        <p className="mt-4 text-gray-500">Loading hotspot data...</p>
      </div>
    );
  }
  
  if (!hasHotspotMetrics && !hasHeatmapData && !hasTaskCompletionTimes) {
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <div className="mb-4 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 11v3m0 0v3m0-3h3m-3 0H9" />
          </svg>
        </div>
        <p className="text-lg font-medium">No Hotspot Data Available</p>
        <p className="text-gray-500 mt-2">Hotspot data will appear here once user interaction is tracked.</p>
      </div>
    );
  }
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div className="space-y-6">
      {/* Top navigation paths */}
      {hasHotspotMetrics && hasHotspotMetrics.topPaths && hasHotspotMetrics.topPaths.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top Navigation Paths</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hasHotspotMetrics.topPaths}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4F46E5" name="Number of Visits" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Destination frequency */}
      {hasHotspotMetrics && hasHotspotMetrics.frequencyByDestination && hasHotspotMetrics.frequencyByDestination.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Section Engagement</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={hasHotspotMetrics.frequencyByDestination}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {hasHotspotMetrics.frequencyByDestination.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Task completion times */}
      {hasTaskCompletionTimes && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Task Completion Times</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={evaluationData.taskCompletionTimes}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="task" />
                <YAxis label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="time" fill="#8884d8" name="Actual Time" />
                <Bar dataKey="benchmark" fill="#82ca9d" name="Benchmark" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Interaction heatmap */}
      {hasHeatmapData && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Interaction Heatmap</h2>
          <div className="flex items-center justify-center py-4">
            <HeatmapVisualization 
              data={evaluationData.heatmapData} 
              width={500} 
              height={300} 
            />
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            This heatmap shows where users interact most frequently with the interface
          </p>
        </div>
      )}
    </div>
  );
};

export default Hotspots;