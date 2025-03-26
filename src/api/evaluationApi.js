// src/api/evaluationApi.js

// Mock data for initial development
const mockEvaluationData = {
  dimensions: [
    { id: 'technical', name: 'Technical', status: 'partial', score: 70 },
    { id: 'social', name: 'Social', status: 'partial', score: 65 },
    { id: 'organizational', name: 'Organizational', status: 'partial', score: 55 },
    { id: 'economic', name: 'Economic', status: 'partial', score: 45 }
  ],
  factors: [
    { id: 1, name: 'Documentation Quality', status: 'success', value: 85, dimension: 'technical' },
    { id: 2, name: 'Community Engagement', status: 'warning', value: 65, dimension: 'social' },
    { id: 3, name: 'Governance Clarity', status: 'warning', value: 60, dimension: 'organizational' },
    { id: 4, name: 'Resource Utilization', status: 'error', value: 45, dimension: 'economic' }
  ],
  guidelines: {
    technical: [
      {
        id: 1,
        title: 'Code Documentation',
        description: 'Ensure comprehensive documentation of code and APIs',
        status: 'success',
        compliance: 85
      },
      {
        id: 2,
        title: 'Testing Coverage',
        description: 'Maintain high testing coverage across all components',
        status: 'warning',
        compliance: 68
      }
    ],
    social: [
      {
        id: 3,
        title: 'Community Guidelines',
        description: 'Clear guidelines for community contributions',
        status: 'success',
        compliance: 90
      },
      {
        id: 4,
        title: 'Inclusive Language',
        description: 'Use inclusive language in all documentation',
        status: 'warning',
        compliance: 72
      }
    ],
    organizational: [
      {
        id: 5,
        title: 'Governance Structure',
        description: 'Clearly defined governance structure and decision-making process',
        status: 'warning',
        compliance: 65
      }
    ],
    economic: [
      {
        id: 6,
        title: 'Resource Management',
        description: 'Efficient allocation of development resources',
        status: 'error',
        compliance: 45
      }
    ]
  },
  navigationFlows: [
    { id: 1, path: 'dashboard->guidelines->technical', count: 145, avgTime: 32 },
    { id: 2, path: 'dashboard->hotspots->interaction', count: 98, avgTime: 45 },
    { id: 3, path: 'guidelines->dashboard', count: 112, avgTime: 18 }
  ],
  heatmapData: [
    { x: 120, y: 80, value: 45 },
    { x: 200, y: 150, value: 75 },
    { x: 280, y: 90, value: 35 },
    { x: 180, y: 200, value: 55 },
    { x: 100, y: 250, value: 25 }
  ],
  taskCompletionTimes: [
    { task: 'Find Technical Guidelines', time: 18.5, benchmark: 15 },
    { task: 'Locate KPI Dashboard', time: 8.2, benchmark: 10 },
    { task: 'Identify Hotspots', time: 25.7, benchmark: 20 }
  ]
};

const mockGuidelineData = {
  1: {
    id: 1,
    title: 'Code Documentation',
    description: 'Ensure comprehensive documentation of code and APIs',
    status: 'success',
    compliance: 85,
    detailedMetrics: [
      { month: 'Jan', value: 75 },
      { month: 'Feb', value: 80 },
      { month: 'Mar', value: 85 }
    ],
    subguidelines: [
      { id: '1.1', title: 'API Documentation', status: 'success', compliance: 90 },
      { id: '1.2', title: 'Code Comments', status: 'warning', compliance: 70 }
    ]
  },
  2: {
    id: 2,
    title: 'Testing Coverage',
    description: 'Maintain high testing coverage across all components',
    status: 'warning',
    compliance: 68,
    detailedMetrics: [
      { month: 'Jan', value: 60 },
      { month: 'Feb', value: 65 },
      { month: 'Mar', value: 68 }
    ],
    subguidelines: [
      { id: '2.1', title: 'Unit Test Coverage', status: 'warning', compliance: 65 },
      { id: '2.2', title: 'Integration Tests', status: 'warning', compliance: 70 }
    ]
  }
};

// Simulate API request to fetch evaluation data
export const fetchEvaluationData = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real implementation, this would be a fetch request to your backend
  // return await fetch('/api/evaluation-data').then(res => res.json());
  
  return mockEvaluationData;
};

// Simulate API request to fetch guideline-specific data
export const fetchGuidelineData = async (guidelineId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // In a real implementation, this would be a fetch request to your backend
  // return await fetch(`/api/guidelines/${guidelineId}`).then(res => res.json());
  
  return mockGuidelineData[guidelineId] || null;
};