import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, ZAxis, Cell, Treemap } from 'recharts';
import { Info, FileText, Users, Settings, CheckCircle, AlertTriangle, XCircle, Search, Globe, BookOpen, Code, Shield, Zap, Clock, Activity, Target, Eye } from 'lucide-react';

const SECODashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedGuideline, setSelectedGuideline] = useState(null);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [timeframe, setTimeframe] = useState('monthly');
  
  // Conditioning factors data
  const conditioningFactors = [
    { id: 'CF1', name: 'Communication Channels', value: 65, description: 'The existence of communication channels between actors and keystone' },
    { id: 'CF2', name: 'Accessible Information', value: 80, description: 'Information about platform made available in an accessible way' },
    { id: 'CF3', name: 'Understanding', value: 55, description: 'The actors\' understanding of SECO information' },
    { id: 'CF4', name: 'Information Quality', value: 72, description: 'The quality of platform information provided by a keystone' },
    { id: 'CF5', name: 'Interface Usability', value: 68, description: 'The usability of interfaces with platform documentation' },
    { id: 'CF6', name: 'Auditability', value: 60, description: 'The auditability of platform processes and information' },
    { id: 'CF7', name: 'Evolution Visualization', value: 45, description: 'Visualization of the evolution of projects in SECO' },
    { id: 'CF8', name: 'Information Reliability', value: 75, description: 'Reliability of information provided by a keystone' }
  ];
  
  // Developer experience factors data (simplified)
  const devExpFactors = [
    { group: 'Common Technological Platform', id: 'F1', name: 'Technical resources', value: 70, dimension: 'Technical' },
    { group: 'Common Technological Platform', id: 'F5', name: 'Platform transparency', value: 65, dimension: 'Technical' },
    { group: 'Common Technological Platform', id: 'F6', name: 'Documentation quality', value: 72, dimension: 'Technical' },
    { group: 'Common Technological Platform', id: 'F7', name: 'Communication channels', value: 68, dimension: 'Social' },
    { group: 'Projects and Applications', id: 'F9', name: 'Clients/users for applications', value: 60, dimension: 'Social' },
    { group: 'Projects and Applications', id: 'F13', name: 'Ease of learning', value: 58, dimension: 'Technical' },
    { group: 'Community Interaction', id: 'F17', name: 'Good relationship with community', value: 75, dimension: 'Social' },
    { group: 'Community Interaction', id: 'F19', name: 'Good developer relations program', value: 55, dimension: 'Organizational' },
    { group: 'Expectations and Value', id: 'F24', name: 'Developer skills improvement', value: 80, dimension: 'Organizational' },
    { group: 'Expectations and Value', id: 'F27', name: 'Engagement and rewards', value: 65, dimension: 'Economic' }
  ];
  
  // Processes data
  const processesData = [
    { id: 'P1', name: 'Access to documentation, source code, and tools', compliance: 85, linkedGuidelines: ['G1', 'G2', 'G3'] },
    { id: 'P2', name: 'Access to information about code in repositories', compliance: 70, linkedGuidelines: ['G1', 'G2', 'G3'] },
    { id: 'P3', name: 'Communication channels between actors and keystone', compliance: 65, linkedGuidelines: ['G3'] },
    { id: 'P4', name: 'Processes related to SECO governance', compliance: 60, linkedGuidelines: [] },
    { id: 'P5', name: 'Access to information about requirements flow', compliance: 45, linkedGuidelines: ['G1', 'G2', 'G3'] },
    { id: 'P6', name: 'Processes related to data collection, processing, and sharing', compliance: 55, linkedGuidelines: [] },
    { id: 'P7', name: 'Access to information about SECO architecture', compliance: 50, linkedGuidelines: ['G1', 'G2', 'G3'] }
  ];
  
  // Guidelines data
  const guidelinesData = [
    { 
      id: 'G1', 
      name: 'Access Capability', 
      description: 'Software ecosystem portals must be accessible, stable, and functional, with consistent and uninterrupted access.',
      dimension: 'Technical',
      conditioningFactors: ['CF2'],
      devExpFactors: ['F1', 'F5', 'F8'],
      processes: ['P1', 'P2', 'P5', 'P7'],
      successCriteria: [
        { id: '3.1.1', name: 'Accessible by main browsers', compliance: 90 },
        { id: '3.1.2', name: 'Online availability', compliance: 95 },
        { id: '3.1.3', name: 'Availability for multiple devices', compliance: 85 }
      ] 
    },
    { 
      id: 'G2', 
      name: 'Availability of Tools for Accessibility', 
      description: 'Ecosystem interfaces must be compatible with tools that help people with disabilities, making information accessible to the widest possible audience.',
      dimension: 'Technical',
      conditioningFactors: ['CF2', 'CF5'],
      devExpFactors: ['F5', 'F6'],
      processes: ['P1', 'P2', 'P5', 'P7'],
      successCriteria: [
        { id: '3.2.1', name: 'Helps with visual impairments', compliance: 65 },
        { id: '3.2.2', name: 'Helps with motor limitations', compliance: 45 },
        { id: '3.2.3', name: 'Helps with hearing impairments', compliance: 70 }
      ] 
    },
    { 
      id: 'G3', 
      name: 'Availability in multiple languages', 
      description: 'Providing information in different languages offers foreign users a more enjoyable experience and makes communication more effective.',
      dimension: 'Technical',
      conditioningFactors: ['CF2', 'CF3', 'CF4'],
      devExpFactors: ['F5', 'F6', 'F17'],
      processes: ['P1', 'P2', 'P3', 'P5', 'P7'],
      successCriteria: [
        { id: '3.3.1', name: 'Multiple language support', compliance: 60 },
        { id: '3.3.2', name: 'Quality of translations', compliance: 55 },
        { id: '3.3.3', name: 'Language switching ease', compliance: 75 }
      ] 
    },
    { 
      id: 'G4', 
      name: 'Fast research for information', 
      description: 'The information should be organized so that users can access it easily and quickly. Effective search tools must be provided to enhance the speed of finding relevant information.',
      dimension: 'Technical',
      conditioningFactors: ['CF3', 'CF4', 'CF5'],
      devExpFactors: ['F5', 'F6', 'F13'],
      processes: ['P1', 'P2', 'P5', 'P7'],
      successCriteria: [
        { id: '1.3.1', name: 'Effective search functionality', compliance: 60 },
        { id: '1.3.2', name: 'Information organization', compliance: 65 },
        { id: '1.3.3', name: 'Quick access to common resources', compliance: 70 }
      ] 
    },
    { 
      id: 'G5', 
      name: 'Content quality', 
      description: 'A software ecosystem portal must keep its content up-to-date, clear, and concise. The language should be easy to understand and convey information without confusion or ambiguity.',
      dimension: 'Information',
      conditioningFactors: ['CF3', 'CF4', 'CF8'],
      devExpFactors: ['F5', 'F6'],
      processes: ['P1', 'P2', 'P5', 'P7'],
      successCriteria: [
        { id: '2.1.1', name: 'Up-to-date content', compliance: 75 },
        { id: '2.1.2', name: 'Clear and concise language', compliance: 80 },
        { id: '2.1.3', name: 'Comprehensive information', compliance: 65 }
      ] 
    },
    { 
      id: 'G6', 
      name: 'Avoid strict methods for code organization', 
      description: 'A software ecosystem portal, when providing implementation examples, should avoid imposing specific and strict methods for code organization, allowing developers flexibility.',
      dimension: 'Technical',
      conditioningFactors: ['CF3', 'CF4'],
      devExpFactors: ['F1', 'F13'],
      processes: ['P1', 'P2', 'P5', 'P7'],
      successCriteria: [
        { id: '2.2.1', name: 'Flexible implementation examples', compliance: 55 },
        { id: '2.2.2', name: 'Various approaches demonstrated', compliance: 60 },
        { id: '2.2.3', name: 'Adaptable code patterns', compliance: 65 }
      ] 
    }
  ];
  
  // KPIs data - structured based on research paper
  const kpiData = [
    { 
      id: 'KPI1', 
      name: 'Developer response time', 
      goal: 'Ensure effective communication channels',
      criticalSuccess: 'Prompt and public responses to developer queries',
      metric: 'Percentage of support queries receiving verified response within 2 days',
      target: '≥ 85%',
      current: 78,
      dimension: 'Social',
      conditioningFactors: ['CF1', 'CF3'],
      trend: [
        { month: 'Jan', value: 65 },
        { month: 'Feb', value: 70 },
        { month: 'Mar', value: 75 },
        { month: 'Apr', value: 78 },
        { month: 'May', value: 78 }
      ],
      correctiveActions: [
        'Increase community moderator involvement',
        'Implement AI-powered FAQ system',
        'Improve documentation for common issues'
      ],
      hotspots: [
        { area: 'API Reference Questions', severity: 'high', time: 4.2 },
        { area: 'Pricing Questions', severity: 'high', time: 3.8 },
        { area: 'Integration Issues', severity: 'medium', time: 2.5 }
      ]
    },
    { 
      id: 'KPI2', 
      name: 'Documentation search time', 
      goal: 'Improve information accessibility',
      criticalSuccess: 'Quick access to accurate documentation',
      metric: 'Average time to find specific information in documentation',
      target: '< 3 minutes',
      current: 5.8,
      dimension: 'Technical',
      conditioningFactors: ['CF2', 'CF5'],
      trend: [
        { month: 'Jan', value: 8.2 },
        { month: 'Feb', value: 7.5 },
        { month: 'Mar', value: 6.7 },
        { month: 'Apr', value: 6.2 },
        { month: 'May', value: 5.8 }
      ],
      correctiveActions: [
        'Implement improved search functionality',
        'Restructure documentation hierarchy',
        'Add contextual navigation elements'
      ],
      hotspots: [
        { area: 'API Reference', severity: 'high', time: 8 },
        { area: 'Installation Guide', severity: 'medium', time: 4.5 },
        { area: 'Pricing Details', severity: 'high', time: 6.5 }
      ]
    },
    { 
      id: 'KPI3', 
      name: 'Cost transparency', 
      goal: 'Enhance economic transparency',
      criticalSuccess: 'Clear presentation of pricing models and hidden costs',
      metric: 'Percentage of pricing models with complete cost details',
      target: '100%',
      current: 80,
      dimension: 'Economic',
      conditioningFactors: ['CF4', 'CF8'],
      trend: [
        { month: 'Jan', value: 60 },
        { month: 'Feb', value: 65 },
        { month: 'Mar', value: 70 },
        { month: 'Apr', value: 75 },
        { month: 'May', value: 80 }
      ],
      correctiveActions: [
        'Develop transparent cost calculator',
        'Create comprehensive pricing FAQ',
        'Document all potential additional costs'
      ],
      hotspots: [
        { area: 'Enterprise Pricing', severity: 'high', time: 7.5 },
        { area: 'Usage Limits', severity: 'high', time: 6.8 },
        { area: 'Scaling Costs', severity: 'medium', time: 5.2 }
      ]
    },
    { 
      id: 'KPI4', 
      name: 'Governance transparency', 
      goal: 'Improve visibility of decision-making processes',
      criticalSuccess: 'Timely and public dissemination of governance updates',
      metric: 'Percentage of major decisions documented within 5 days',
      target: '≥ 90%',
      current: 65,
      dimension: 'Organizational',
      conditioningFactors: ['CF6', 'CF7'],
      trend: [
        { month: 'Jan', value: 45 },
        { month: 'Feb', value: 50 },
        { month: 'Mar', value: 55 },
        { month: 'Apr', value: 60 },
        { month: 'May', value: 65 }
      ],
      correctiveActions: [
        'Create standardized decision documentation process',
        'Implement automated notification system',
        'Establish regular governance update schedule'
      ],
      hotspots: [
        { area: 'Policy Changes', severity: 'high', time: 9.2 },
        { area: 'Deprecation Notices', severity: 'high', time: 8.5 },
        { area: 'Roadmap Information', severity: 'medium', time: 6.8 }
      ]
    },
    { 
      id: 'KPI5', 
      name: 'Information quality', 
      goal: 'Enhance quality of platform information',
      criticalSuccess: 'Up-to-date, clear, and accurate information',
      metric: 'Percentage of documentation updated in last 90 days',
      target: '≥ 90%',
      current: 72,
      dimension: 'Technical',
      conditioningFactors: ['CF4', 'CF8'],
      trend: [
        { month: 'Jan', value: 62 },
        { month: 'Feb', value: 65 },
        { month: 'Mar', value: 68 },
        { month: 'Apr', value: 70 },
        { month: 'May', value: 72 }
      ],
      correctiveActions: [
        'Implement documentation audit schedule',
        'Add documentation age indicators',
        'Create content verification workflow'
      ],
      hotspots: [
        { area: 'SDK Documentation', severity: 'medium', time: 5.2 },
        { area: 'API Examples', severity: 'high', time: 7.8 },
        { area: 'Migration Guides', severity: 'high', time: 8.5 }
      ]
    }
  ];

  // Action items data - linked to KPIs and guidelines
  const actionItems = [
    { id: 1, title: 'Improve accessibility tools support', guideline: 'G2', kpi: 'KPI2', deadline: 'Q2 2025', status: 'planning', impact: 'Increase compliance of criterion 3.2.2 from 45% to 75%', dimension: 'Technical' },
    { id: 2, title: 'Add multilingual support for API docs', guideline: 'G3', kpi: 'KPI2', deadline: 'Q1 2025', status: 'in-progress', impact: 'Support 5 additional languages, raising G3 compliance to 75%', dimension: 'Technical' },
    { id: 3, title: 'Implement AI-powered search', guideline: 'G4', kpi: 'KPI2', deadline: 'Q3 2025', status: 'planning', impact: 'Reduce average search time from 8m to 3m', dimension: 'Technical' },
    { id: 4, title: 'Restructure implementation examples', guideline: 'G6', kpi: 'KPI5', deadline: 'Q1 2025', status: 'in-progress', impact: 'Provide multiple pattern examples for each API', dimension: 'Technical' },
    { id: 5, title: 'Enhance documentation audit tools', guideline: 'G5', kpi: 'KPI5', deadline: 'Q2 2025', status: 'planning', impact: 'Improve content freshness tracking and updates', dimension: 'Technical' },
    { id: 6, title: 'Create pricing calculator', guideline: 'G5', kpi: 'KPI3', deadline: 'Q2 2025', status: 'planning', impact: 'Increase economic transparency from 80% to 95%', dimension: 'Economic' },
    { id: 7, title: 'Implement community response program', guideline: 'G1', kpi: 'KPI1', deadline: 'Q1 2025', status: 'in-progress', impact: 'Reduce response time from 2 days to 1 day', dimension: 'Social' },
    { id: 8, title: 'Create governance documentation system', guideline: 'G1', kpi: 'KPI4', deadline: 'Q3 2025', status: 'planning', impact: 'Improve governance transparency from 65% to 90%', dimension: 'Organizational' }
  ];
  
  // Helper functions
  const getStatusIcon = (compliance) => {
    if (compliance >= 80) return <CheckCircle className="text-green-500" size={18} />;
    if (compliance >= 60) return <AlertTriangle className="text-yellow-500" size={18} />;
    return <XCircle className="text-red-500" size={18} />;
  };
  
  const getStatusColor = (compliance) => {
    if (compliance >= 80) return 'bg-green-500';
    if (compliance >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getStatusText = (compliance) => {
    if (compliance >= 80) return 'Good';
    if (compliance >= 60) return 'Warning';
    return 'Critical';
  };

  // Radar chart data for conditioning factors
  const radarData = conditioningFactors.map(factor => ({
    factor: factor.id,
    value: factor.value,
    fullMark: 100
  }));

  // Hotspot data for visualization
  const hotspotData = kpiData.flatMap(kpi => 
    kpi.hotspots.map(hotspot => ({
      kpiId: kpi.id,
      kpiName: kpi.name,
      area: hotspot.area,
      severity: hotspot.severity,
      time: hotspot.time,
      dimension: kpi.dimension
    }))
  );

  // Group actions by dimension for visualization
  const actionsByDimension = {
    Technical: actionItems.filter(item => item.dimension === 'Technical').length,
    Social: actionItems.filter(item => item.dimension === 'Social').length,
    Economic: actionItems.filter(item => item.dimension === 'Economic').length,
    Organizational: actionItems.filter(item => item.dimension === 'Organizational').length
  };

  // Calculate overall transparency score
  const calculateOverallScore = () => {
    const kpiScores = kpiData.map(kpi => {
      const percentage = (kpi.current / parseFloat(kpi.target.replace(/[^0-9.]/g, ''))) * 100;
      return Math.min(percentage, 100); // Cap at 100%
    });
    return Math.round(kpiScores.reduce((sum, score) => sum + score, 0) / kpiScores.length);
  };

  const overallScore = calculateOverallScore();

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="bg-gray-800 text-white p-4 rounded-t-lg mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">SECO Transparency Dashboard</h1>
          <div className="ml-3 px-2 py-1 bg-blue-600 rounded-full text-xs flex items-center">
            <Activity size={12} className="mr-1" /> 
            <span>Sustainable Transparency KPIs</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 rounded flex items-center ${activeTab === 'overview' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('overview')}
          >
            <Info size={16} className="mr-1" /> Overview
          </button>
          <button 
            className={`px-3 py-1 rounded flex items-center ${activeTab === 'kpis' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('kpis')}
          >
            <Target size={16} className="mr-1" /> KPIs
          </button>
          <button 
            className={`px-3 py-1 rounded flex items-center ${activeTab === 'hotspots' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('hotspots')}
          >
            <Zap size={16} className="mr-1" /> Hotspots
          </button>
          <button 
            className={`px-3 py-1 rounded flex items-center ${activeTab === 'guidelines' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('guidelines')}
          >
            <FileText size={16} className="mr-1" /> Guidelines
          </button>
          <button 
            className={`px-3 py-1 rounded flex items-center ${activeTab === 'factors' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('factors')}
          >
            <Users size={16} className="mr-1" /> Factors
          </button>
          <button 
            className={`px-3 py-1 rounded flex items-center ${activeTab === 'actions' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('actions')}
          >
            <Settings size={16} className="mr-1" /> Action Items
          </button>
        </div>
      </div>
      
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">Last updated: March 6, 2025</div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm mr-2">Timeframe:</span>
            <select 
              className="bg-white border rounded px-2 py-1 text-sm"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
          <div className="flex items-center bg-white px-3 py-1 rounded border">
            <Eye size={14} className="mr-1 text-blue-500" />
            <span className="text-sm">Sustainable Transparency Score: </span>
            <span className={`ml-1 font-bold ${
              overallScore >= 80 ? 'text-green-600' : 
              overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>{overallScore}%</span>
          </div>
        </div>
      </div>
      
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Transparency Overview section */}
          <div className="bg-white p-4 rounded-lg shadow col-span-3">
            <h2 className="text-lg font-semibold text-blue-600 mb-4">SECO Transparency KPI Dashboard</h2>
            <p className="text-sm text-gray-600 mb-4">
              This dashboard operationalizes sustainable transparency in software ecosystems through KPIs as defined by Zacarias et al. (2024). 
              It covers technical, social, organizational, and economic dimensions of transparency to help SECO managers make data-driven decisions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <Target size={18} className="text-blue-600 mr-2" />
                  <h3 className="font-medium">Key Performance Indicators</h3>
                </div>
                <div className="text-3xl font-bold">{kpiData.length}</div>
                <div className="text-sm text-gray-600">Active KPIs</div>
                <div className="flex items-center mt-2">
                  <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{width: `${overallScore}%`}}></div>
                  </div>
                  <span className="text-sm ml-2">{overallScore}% avg. attainment</span>
                </div>
              </div>
              
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <Zap size={18} className="text-red-600 mr-2" />
                  <h3 className="font-medium">Transparency Hotspots</h3>
                </div>
                <div className="text-3xl font-bold">{hotspotData.length}</div>
                <div className="text-sm text-gray-600">Identified issues</div>
                <div className="flex items-center mt-2">
                  <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-sm ml-2">75% high severity</span>
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <Users size={18} className="text-green-600 mr-2" />
                  <h3 className="font-medium">Conditioning Factors</h3>
                </div>
                <div className="text-3xl font-bold">{conditioningFactors.length}</div>
                <div className="text-sm text-gray-600">Tracked factors</div>
                <div className="flex items-center mt-2">
                  <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{width: '65%'}}></div>
                  </div>
                  <span className="text-sm ml-2">65% avg. score</span>
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <Settings size={18} className="text-purple-600 mr-2" />
                  <h3 className="font-medium">Action Items</h3>
                </div>
                <div className="text-3xl font-bold">{actionItems.length}</div>
                <div className="text-sm text-gray-600">Corrective actions</div>
                <div className="flex items-center mt-2">
                  <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{width: '35%'}}></div>
                  </div>
                  <span className="text-sm ml-2">35% in progress</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* KPI Overview */}
          <div className="bg-white p-4 rounded-lg shadow col-span-2">
            <h2 className="text-lg font-semibold text-blue-600 mb-4">KPI Performance by Dimension</h2>
            <div className="flex mb-2 text-xs font-medium">
              <div className="w-1/4 text-center py-1 bg-blue-100 text-blue-800 rounded-l">Technical</div>
              <div className="w-1/4 text-center py-1 bg-green-100 text-green-800">Social</div>
              <div className="w-1/4 text-center py-1 bg-purple-100 text-purple-800">Organizational</div>
              <div className="w-1/4 text-center py-1 bg-yellow-100 text-yellow-800 rounded-r">Economic</div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={kpiData.map(kpi => ({
                    name: kpi.id,
                    value: kpi.current,
                    target: parseFloat(kpi.target.replace(/[^0-9.]/g, '')),
                    dimension: kpi.dimension
                  }))}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name, props) => [`${value}${props.payload.name === 'KPI2' ? 'm' : '%'}`, 'Current Value']}
                    labelFormatter={(label) => {
                      const kpi = kpiData.find(k => k.id === label);
                      return `${kpi.name} (${kpi.dimension})`;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Current Value">
                    {kpiData.map((kpi, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          kpi.dimension === 'Technical' ? '#93c5fd' : 
                          kpi.dimension === 'Social' ? '#86efac' : 
                          kpi.dimension === 'Organizational' ? '#c4b5fd' : '#fde68a'
                        } 
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="target" name="Target" fill="#cbd5e1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              {kpiData.map(kpi => (
                <div 
                  key={kpi.id} 
                  className={`border rounded p-2 cursor-pointer hover:bg-gray-50 ${selectedKPI === kpi.id ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => {
                    setSelectedKPI(kpi.id);
                    setActiveTab('kpis');
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-medium">{kpi.id}</div>
                    {getStatusIcon(kpi.dimension === 'Technical' && kpi.id === 'KPI2' ? 
                      (kpi.target.includes('<') ? 100 - (kpi.current/parseFloat(kpi.target.replace(/[^0-9.]/g, '')))*100 : (kpi.current/parseFloat(kpi.target.replace(/[^0-9.]/g, '')))*100) : 
                      kpi.current)}
                  </div>
                  <div className="text-sm font-semibold mt-1 truncate" title={kpi.name}>{kpi.name}</div>
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>{kpi.dimension}</span>
                    <span>{kpi.current}{kpi.dimension === 'Technical' && kpi.id === 'KPI2' ? 'm' : '%'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hotspot Analysis */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-red-600 mb-4">Hotspot Analysis</h2>
            <div className="mb-3">
              <div className="text-sm mb-1">Top areas requiring attention based on user interaction data</div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid />
                    <XAxis 
                      type="category" 
                      dataKey="area" 
                      name="Area" 
                      tick={{fontSize: 10}}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="time" 
                      name="Time (min)" 
                      domain={[0, 'dataMax + 1']}
                    />
                    <ZAxis range={[60, 400]} />
                    <Tooltip 
                      formatter={(value, name, props) => [name === 'time' ? `${value} min` : value, name === 'time' ? 'Search Time' : 'Area']} 
                      labelFormatter={(label) => `Hotspot: ${label}`}
                    />
                    <Legend />
                    <Scatter 
                      name="Hotspots" 
                      data={hotspotData.slice(0, 8)} 
                      fill="#ef4444" 
                      shape="circle"
                    >
                      {hotspotData.slice(0, 8).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            entry.severity === 'high' ? '#ef4444' : 
                            entry.severity === 'medium' ? '#f59e0b' : '#10b981'
                          } 
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="border-t pt-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Highest Severity Issues</h3>
                <button 
                  className="text-xs text-blue-600 hover:underline"
                  onClick={() => setActiveTab('hotspots')}
                >
                  View all hotspots
                </button>
              </div>
              <div className="space-y-2">
                {hotspotData
                  .filter(h => h.severity === 'high')
                  .slice(0, 3)
                  .map((hotspot, index) => (
                    <div key={index} className="flex items-center justify-between border px-2 py-1 rounded">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-xs font-medium">{hotspot.area}</span>
                      </div>
                      <div className="text-xs">{hotspot.time} min avg. search time</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'kpis' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* KPI List */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Key Performance Indicators</h2>
            <div className="space-y-2">
              {kpiData.map(kpi => (
                <div 
                  key={kpi.id} 
                  className={`border p-3 rounded cursor-pointer hover:bg-gray-50 transition ${selectedKPI === kpi.id ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setSelectedKPI(kpi.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {kpi.dimension === 'Technical' && <Code size={16} className="text-blue-500 mr-2" />}
                      {kpi.dimension === 'Social' && <Users size={16} className="text-green-500 mr-2" />}
                      {kpi.dimension === 'Organizational' && <Settings size={16} className="text-purple-500 mr-2" />}
                      {kpi.dimension === 'Economic' && <Globe size={16} className="text-yellow-500 mr-2" />}
                      <span className="font-medium">{kpi.id}: {kpi.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full mr-2 ${
                        kpi.dimension === 'Technical' && kpi.id === 'KPI2' ? 
                          (kpi.current <= parseFloat(kpi.target.replace(/[^0-9.]/g, '')) ? 'bg-green-100 text-green-800' : 
                          kpi.current <= parseFloat(kpi.target.replace(/[^0-9.]/g, '')) * 1.5 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800') :
                          (kpi.current >= parseFloat(kpi.target.replace(/[^0-9.]/g, '')) * 0.9 ? 'bg-green-100 text-green-800' : 
                          kpi.current >= parseFloat(kpi.target.replace(/[^0-9.]/g, '')) * 0.7 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800')
                      }`}>
                        {kpi.current}{kpi.dimension === 'Technical' && kpi.id === 'KPI2' ? 'm' : '%'}
                      </span>
                      {selectedKPI === kpi.id ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* KPI Details */}
          <div className="bg-white p-4 rounded-lg shadow col-span-2">
            {selectedKPI ? (
              <div>
                {kpiData.filter(k => k.id === selectedKPI).map(kpi => (
                  <div key={kpi.id}>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-lg font-semibold">{kpi.id}: {kpi.name}</h2>
                      <div className="flex items-center">
                        <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                          kpi.dimension === 'Technical' && kpi.id === 'KPI2' ? 
                            (kpi.current <= parseFloat(kpi.target.replace(/[^0-9.]/g, '')) ? 'bg-green-100 text-green-800' : 
                            kpi.current <= parseFloat(kpi.target.replace(/[^0-9.]/g, '')) * 1.5 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800') :
                            (kpi.current >= parseFloat(kpi.target.replace(/[^0-9.]/g, '')) * 0.9 ? 'bg-green-100 text-green-800' : 
                            kpi.current >= parseFloat(kpi.target.replace(/[^0-9.]/g, '')) * 0.7 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800')
                        }`}>
                          {kpi.current}{kpi.dimension === 'Technical' && kpi.id === 'KPI2' ? 'm' : '%'}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          Target: {kpi.target}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Goal</h3>
                      <p className="text-sm">{kpi.goal}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Critical Success Factors</h3>
                        <p className="text-sm">{kpi.criticalSuccess}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Dimension</h3>
                        <div className="flex items-center">
                          {kpi.dimension === 'Technical' && <Code size={14} className="text-blue-500 mr-1" />}
                          {kpi.dimension === 'Social' && <Users size={14} className="text-green-500 mr-1" />}
                          {kpi.dimension === 'Organizational' && <Settings size={14} className="text-purple-500 mr-1" />}
                          {kpi.dimension === 'Economic' && <Globe size={14} className="text-yellow-500 mr-1" />}
                          <span className="text-sm">{kpi.dimension}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Conditioning Factors</h3>
                      <div className="flex flex-wrap gap-1">
                        {kpi.conditioningFactors.map(cf => (
                          <span key={cf} className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">{cf}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Trend Analysis</h3>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={kpi.trend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis domain={kpi.dimension === 'Technical' && kpi.id === 'KPI2' ? 
                              [0, 'dataMax + 2'] : 
                              [0, 100]} />
                            <Tooltip formatter={(value) => [`${value}${kpi.dimension === 'Technical' && kpi.id === 'KPI2' ? 'm' : '%'}`]} />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#3b82f6" 
                              activeDot={{ r: 8 }} 
                            />
                            {/* Target line */}
                            {kpi.dimension === 'Technical' && kpi.id === 'KPI2' ? (
                              <Line 
                                type="monotone" 
                                dataKey={() => parseFloat(kpi.target.replace(/[^0-9.]/g, ''))}
                                stroke="#ef4444" 
                                strokeDasharray="3 3"
                                name="Target"
                              />
                            ) : (
                              <Line 
                                type="monotone" 
                                dataKey={() => parseFloat(kpi.target.replace(/[^0-9.]/g, ''))}
                                stroke="#10b981" 
                                strokeDasharray="3 3"
                                name="Target"
                              />
                            )}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Hotspots</h3>
                      <div className="space-y-2">
                        {kpi.hotspots.map((hotspot, index) => (
                          <div key={index} className="border rounded p-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className={`w-2 h-2 mr-2 rounded-full ${
                                  hotspot.severity === 'high' ? 'bg-red-500' : 
                                  hotspot.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                }`}></div>
                                <span className="text-sm font-medium">{hotspot.area}</span>
                              </div>
                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                {hotspot.time} min avg.
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Corrective Actions</h3>
                      <div className="border rounded p-3 bg-blue-50">
                        <div className="text-sm font-medium text-blue-700 mb-2">When Target Not Met</div>
                        <ul className="space-y-1">
                          {kpi.correctiveActions.map((action, index) => (
                            <li key={index} className="text-sm flex items-center">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                              {action}
                            </li>
                          ))}
                        </ul>
                        
                        {/* Related action items */}
                        {actionItems.filter(item => item.kpi === kpi.id).length > 0 && (
                          <div className="mt-3 pt-2 border-t border-blue-200">
                            <div className="text-sm font-medium text-blue-700 mb-1">Current Action Items</div>
                            {actionItems.filter(item => item.kpi === kpi.id).map(item => (
                              <div key={item.id} className="text-xs bg-white p-1.5 rounded mb-1 border border-blue-200">
                                <div className="flex justify-between items-center">
                                  <span>{item.title}</span>
                                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                                    item.status === 'planning' ? 'bg-blue-100 text-blue-700' : 
                                    item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' : 
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {item.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                <Target size={48} />
                <p className="mt-2">Select a KPI to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'hotspots' && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Transparency Hotspot Analysis</h2>
          <p className="text-sm text-gray-600 mb-4">
            Hotspots identify areas where users experience difficulties accessing or understanding information, based on real usage data. This analysis helps detect transparency gaps and prioritize improvements.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-medium mb-2">Hotspot Distribution by Dimension</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={[
                      { name: 'Technical', size: hotspotData.filter(h => h.dimension === 'Technical').length, color: '#93c5fd' },
                      { name: 'Social', size: hotspotData.filter(h => h.dimension === 'Social').length, color: '#86efac' },
                      { name: 'Organizational', size: hotspotData.filter(h => h.dimension === 'Organizational').length, color: '#c4b5fd' },
                      { name: 'Economic', size: hotspotData.filter(h => h.dimension === 'Economic').length, color: '#fde68a' }
                    ]}
                    dataKey="size"
                    nameKey="name"
                    fill="#8884d8"
                    content={(props) => {
                      const { root, depth, x, y, width, height, name, color } = props;
                      return (
                        <g>
                          <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            style={{
                              fill: color,
                              stroke: '#fff',
                              strokeWidth: 2 / (depth + 1e-10),
                            }}
                          />
                          {width > 30 && height > 30 && (
                            <text
                              x={x + width / 2}
                              y={y + height / 2}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="text-xs font-medium"
                              style={{ fill: '#000' }}
                            >
                              {name}
                            </text>
                          )}
                        </g>
                      );
                    }}
                  />
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Top Search Time Areas</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={hotspotData.sort((a, b) => b.time - a.time).slice(0, 6)}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 'dataMax + 1']} />
                    <YAxis 
                      type="category" 
                      dataKey="area" 
                      width={80}
                      tick={{fontSize: 10}}
                    />
                    <Tooltip formatter={(value) => [`${value} minutes`, 'Avg. Search Time']} />
                    <Legend />
                    <Bar dataKey="time" name="Search Time (min)">
                      {hotspotData.sort((a, b) => b.time - a.time).slice(0, 6).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            entry.severity === 'high' ? '#ef4444' : 
                            entry.severity === 'medium' ? '#f59e0b' : '#10b981'
                          } 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* High severity hotspots */}
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-red-800 font-medium mb-2">High Severity</h3>
              <div className="space-y-2">
                {hotspotData
                  .filter(h => h.severity === 'high')
                  .map((hotspot, index) => (
                    <div key={index} className="bg-white p-2 rounded border border-red-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{hotspot.area}</span>
                        <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">{hotspot.time} min</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1 flex items-center">
                        <span>{hotspot.kpiName}</span>
                        <span className="mx-1">•</span>
                        <span>{hotspot.dimension}</span>
                      </div>
                      {actionItems.find(a => a.title.toLowerCase().includes(hotspot.area.toLowerCase())) && (
                        <div className="text-xs text-green-600 mt-1">
                          Action item in progress
                        </div>
                      )}
                    </div>
                  ))
                }
              </div>
            </div>
            
            {/* Medium severity hotspots */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-yellow-800 font-medium mb-2">Medium Severity</h3>
              <div className="space-y-2">
                {hotspotData
                  .filter(h => h.severity === 'medium')
                  .map((hotspot, index) => (
                    <div key={index} className="bg-white p-2 rounded border border-yellow-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{hotspot.area}</span>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">{hotspot.time} min</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1 flex items-center">
                        <span>{hotspot.kpiName}</span>
                        <span className="mx-1">•</span>
                        <span>{hotspot.dimension}</span>
                      </div>
                      {actionItems.find(a => a.title.toLowerCase().includes(hotspot.area.toLowerCase())) && (
                        <div className="text-xs text-green-600 mt-1">
                          Action item in progress
                        </div>
                      )}
                    </div>
                  ))
                }
              </div>
            </div>
            
            {/* Corrective strategies */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-gray-800 font-medium mb-2">Corrective Strategies</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <h4 className="text-sm font-medium text-red-700 mb-1">High Severity Issues</h4>
                  <ul className="space-y-1">
                    <li className="text-xs flex items-start">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5 mt-1"></div>
                      <span>Implement AI-powered search capabilities</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5 mt-1"></div>
                      <span>Restructure documentation hierarchy</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5 mt-1"></div>
                      <span>Conduct user testing sessions for problem areas</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <h4 className="text-sm font-medium text-yellow-700 mb-1">Medium Severity Issues</h4>
                  <ul className="space-y-1">
                    <li className="text-xs flex items-start">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5 mt-1"></div>
                      <span>Add contextual navigation elements</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5 mt-1"></div>
                      <span>Improve information categorization</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5 mt-1"></div>
                      <span>Enhance filtering and sorting options</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <h4 className="text-sm font-medium text-blue-700 mb-1">Monitoring Plan</h4>
                  <div className="text-xs text-gray-600">
                    After implementing changes, continue monitoring these areas through our UX tracking tool to ensure improvements are effective.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'guidelines' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Guidelines List */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Transparency Guidelines</h2>
            <div className="space-y-2">
              {guidelinesData.map(guideline => (
                <div 
                  key={guideline.id} 
                  className={`border p-3 rounded cursor-pointer hover:bg-gray-50 transition ${selectedGuideline === guideline.id ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setSelectedGuideline(guideline.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {guideline.id === 'G1' && <Globe size={16} className="text-blue-500 mr-2" />}
                      {guideline.id === 'G2' && <Users size={16} className="text-green-500 mr-2" />}
                      {guideline.id === 'G3' && <Globe size={16} className="text-purple-500 mr-2" />}
                      {guideline.id === 'G4' && <Search size={16} className="text-yellow-500 mr-2" />}
                      {guideline.id === 'G5' && <BookOpen size={16} className="text-red-500 mr-2" />}
                      {guideline.id === 'G6' && <Code size={16} className="text-indigo-500 mr-2" />}
                      <span className="font-medium">{guideline.id}: {guideline.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full mr-2 ${
                        guideline.successCriteria.reduce((acc, sc) => acc + sc.compliance, 0) / guideline.successCriteria.length >= 80 ? 'bg-green-100 text-green-800' : 
                        guideline.successCriteria.reduce((acc, sc) => acc + sc.compliance, 0) / guideline.successCriteria.length >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {Math.round(guideline.successCriteria.reduce((acc, sc) => acc + sc.compliance, 0) / guideline.successCriteria.length)}%
                      </span>
                      {selectedGuideline === guideline.id ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Guideline Details */}
          <div className="bg-white p-4 rounded-lg shadow col-span-2">
            {selectedGuideline ? (
              <div>
                {guidelinesData.filter(g => g.id === selectedGuideline).map(guideline => (
                  <div key={guideline.id}>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-lg font-semibold">{guideline.id}: {guideline.name}</h2>
                      <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                        guideline.successCriteria.reduce((acc, sc) => acc + sc.compliance, 0) / guideline.successCriteria.length >= 80 ? 'bg-green-100 text-green-800' : 
                        guideline.successCriteria.reduce((acc, sc) => acc + sc.compliance, 0) / guideline.successCriteria.length >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        Overall: {Math.round(guideline.successCriteria.reduce((acc, sc) => acc + sc.compliance, 0) / guideline.successCriteria.length)}%
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                      <p className="text-sm">{guideline.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Software Ecosystem Dimension</h3>
                        <p className="text-sm">{guideline.dimension}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Conditioning Factors</h3>
                        <div className="flex flex-wrap gap-1">
                          {guideline.conditioningFactors.map(cf => (
                            <span key={cf} className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">{cf}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Developer Experience Factors</h3>
                        <div className="flex flex-wrap gap-1">
                          {guideline.devExpFactors.map(f => (
                            <span key={f} className="text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">{f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Related Processes</h3>
                      <div className="flex flex-wrap gap-1">
                        {guideline.processes.map(p => (
                          <span key={p} className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">{p}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Success Criteria</h3>
                      <div className="space-y-3">
                        {guideline.successCriteria.map(criterion => (
                          <div key={criterion.id} className="border p-3 rounded">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">{criterion.id}: {criterion.name}</span>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                criterion.compliance >= 80 ? 'bg-green-100 text-green-800' : 
                                criterion.compliance >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {criterion.compliance}%
                              </span>
                            </div>
                            <div className="mt-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div className={`h-full ${getStatusColor(criterion.compliance)}`} style={{width: `${criterion.compliance}%`}}></div>
                            </div>
                            {/* Action items related to this criterion */}
                            {actionItems.filter(item => item.guideline === guideline.id).length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs text-blue-600">
                                  {actionItems.filter(item => item.guideline === guideline.id).length} action item(s) in progress
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                <FileText size={48} />
                <p className="mt-2">Select a guideline to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'factors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Conditioning Factors */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-green-600 mb-4">Conditioning Factors for Transparency</h2>
            <p className="text-sm text-gray-600 mb-3">
              These factors influence transparency in the SECO but are not directly measurable as percentages. 
              Instead, they represent conditions that enable or limit transparency across different dimensions.
            </p>
            <div className="space-y-4">
              {conditioningFactors.map(factor => (
                <div key={factor.id} className="border rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{factor.id}: {factor.name}</div>
                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                      factor.id === 'CF1' || factor.id === 'CF7' ? 'bg-red-100 text-red-800' : 
                      factor.id === 'CF2' || factor.id === 'CF3' || factor.id === 'CF5' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {factor.id === 'CF1' || factor.id === 'CF7' ? 'Needs attention' : 
                       factor.id === 'CF2' || factor.id === 'CF3' || factor.id === 'CF5' ? 'Developing' : 
                       'Established'}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                  
                  {/* Maturity assessment instead of percentage */}
                  <div className="flex items-center mb-2">
                    <div className="flex-grow grid grid-cols-4 gap-1">
                      <div className={`h-1.5 rounded-l ${factor.id === 'CF1' || factor.id === 'CF7' ? 'bg-red-400' : 'bg-gray-300'}`}></div>
                      <div className={`h-1.5 ${
                        (factor.id === 'CF1' || factor.id === 'CF7') ? 'bg-gray-300' :
                        (factor.id === 'CF2' || factor.id === 'CF3' || factor.id === 'CF5') ? 'bg-yellow-400' : 'bg-green-400'
                      }`}></div>
                      <div className={`h-1.5 ${
                        (factor.id === 'CF1' || factor.id === 'CF7' || factor.id === 'CF2' || factor.id === 'CF3' || factor.id === 'CF5') ? 'bg-gray-300' : 'bg-green-400'
                      }`}></div>
                      <div className={`h-1.5 rounded-r ${
                        (factor.id === 'CF4' || factor.id === 'CF8') ? 'bg-green-400' : 'bg-gray-300'
                      }`}></div>
                    </div>
                    <div className="ml-2">
                      <span className="text-xs">
                        {factor.id === 'CF1' || factor.id === 'CF7' ? 'Initial' : 
                         factor.id === 'CF2' || factor.id === 'CF3' || factor.id === 'CF5' ? 'Defined' : 
                         factor.id === 'CF4' || factor.id === 'CF6' ? 'Managed' : 'Optimized'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Influence on KPIs */}
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Influences KPIs:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {kpiData
                        .filter(kpi => kpi.conditioningFactors.includes(factor.id))
                        .map(kpi => (
                          <span 
                            key={kpi.id} 
                            className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded cursor-pointer hover:bg-blue-200"
                            onClick={() => {
                              setSelectedKPI(kpi.id);
                              setActiveTab('kpis');
                            }}
                          >
                            {kpi.id}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                  
                  {/* Enhancement opportunities */}
                  {(factor.id === 'CF1' || factor.id === 'CF7' || factor.id === 'CF2' || factor.id === 'CF3' || factor.id === 'CF5') && (
                    <div className="mt-2 text-xs bg-blue-50 p-2 rounded">
                      <div className="font-medium text-blue-700">Enhancement opportunities:</div>
                      <ul className="mt-1 space-y-1 pl-4 list-disc">
                        {factor.id === 'CF1' && (
                          <>
                            <li>Implement structured communication channels</li>
                            <li>Reduce response time to developer queries</li>
                          </>
                        )}
                        {factor.id === 'CF2' && (
                          <>
                            <li>Improve search functionality and organization</li>
                            <li>Enhance accessibility for developers with disabilities</li>
                          </>
                        )}
                        {factor.id === 'CF3' && (
                          <>
                            <li>Create improved onboarding and learning materials</li>
                            <li>Simplify complex documentation sections</li>
                          </>
                        )}
                        {factor.id === 'CF5' && (
                          <>
                            <li>Improve UI/UX of documentation interfaces</li>
                            <li>Add contextual navigation elements</li>
                          </>
                        )}
                        {factor.id === 'CF7' && (
                          <>
                            <li>Implement project timeline visualization tools</li>
                            <li>Add roadmap and deprecation tracking</li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Developer Experience Factors */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-purple-600 mb-4">Developer Experience Factors</h2>
            <p className="text-sm text-gray-600 mb-3">
              These factors represent the developer experience aspects that influence SECO transparency.
              Rather than percentages, they reflect qualitative aspects of the ecosystem.
            </p>
            
            {/* Group factors by category */}
            {['Common Technological Platform', 'Projects and Applications', 'Community Interaction', 'Expectations and Value'].map(group => (
              <div key={group} className="mb-4">
                <h3 className="font-medium text-sm text-gray-600 mb-2">{group}</h3>
                <div className="space-y-3">
                  {devExpFactors.filter(f => f.group === group).map(factor => (
                    <div key={factor.id} className="border rounded p-2">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-medium">{factor.id}: {factor.name}</div>
                        <div className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          factor.dimension === 'Technical' ? 'bg-blue-100 text-blue-800' : 
                          factor.dimension === 'Social' ? 'bg-green-100 text-green-800' : 
                          factor.dimension === 'Organizational' ? 'bg-purple-100 text-purple-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {factor.dimension}
                        </div>
                      </div>
                      
                      {/* Maturity indication */}
                      <div className="flex items-center mb-2">
                        <div className="flex-grow flex space-x-1">
                          <div className={`h-1.5 w-1/4 rounded-l ${factor.value >= 25 ? 
                            (factor.dimension === 'Technical' ? 'bg-blue-400' : 
                             factor.dimension === 'Social' ? 'bg-green-400' : 
                             factor.dimension === 'Organizational' ? 'bg-purple-400' : 'bg-yellow-400') : 'bg-gray-300'}`}></div>
                          <div className={`h-1.5 w-1/4 ${factor.value >= 50 ? 
                            (factor.dimension === 'Technical' ? 'bg-blue-400' : 
                             factor.dimension === 'Social' ? 'bg-green-400' : 
                             factor.dimension === 'Organizational' ? 'bg-purple-400' : 'bg-yellow-400') : 'bg-gray-300'}`}></div>
                          <div className={`h-1.5 w-1/4 ${factor.value >= 75 ? 
                            (factor.dimension === 'Technical' ? 'bg-blue-400' : 
                             factor.dimension === 'Social' ? 'bg-green-400' : 
                             factor.dimension === 'Organizational' ? 'bg-purple-400' : 'bg-yellow-400') : 'bg-gray-300'}`}></div>
                          <div className={`h-1.5 w-1/4 rounded-r ${factor.value >= 90 ? 
                            (factor.dimension === 'Technical' ? 'bg-blue-400' : 
                             factor.dimension === 'Social' ? 'bg-green-400' : 
                             factor.dimension === 'Organizational' ? 'bg-purple-400' : 'bg-yellow-400') : 'bg-gray-300'}`}></div>
                        </div>
                        <div className="ml-2">
                          <span className="text-xs">
                            {factor.value < 50 ? 'Emerging' : factor.value < 75 ? 'Established' : 'Advanced'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Show related guidelines */}
                      <div className="mt-1">
                        <div className="flex flex-wrap gap-1">
                          {guidelinesData
                            .filter(g => g.devExpFactors.includes(factor.id))
                            .map(g => (
                              <span key={g.id} className="text-xs bg-gray-100 text-gray-800 px-1 rounded">{g.id}</span>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-gray-50 rounded border text-sm">
              <p className="font-medium">Note on measurement approach:</p>
              <p className="text-xs text-gray-600 mt-1">
                Developer experience factors are assessed through qualitative methods including developer surveys, 
                interviews, and usage analytics. These factors influence transparency but are not directly measured 
                as percentages. Instead, they represent maturity levels and relative strengths in the ecosystem.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'actions' && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Action Items</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Action</th>
                  <th className="py-2 px-4 text-left">Related Guideline</th>
                  <th className="py-2 px-4 text-left">Deadline</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Expected Impact</th>
                </tr>
              </thead>
              <tbody>
                {actionItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 px-4 font-medium">{item.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {item.guideline}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.deadline}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.status === 'planning' ? 'bg-blue-100 text-blue-700' : 
                        item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.status === 'planning' ? 'Planning' : 
                         item.status === 'in-progress' ? 'In Progress' : 'Completed'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{item.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Implementation Timeline</h3>
            <div className="relative pt-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                <div className="absolute left-0 top-0 h-full bg-blue-500" style={{width: '25%'}}></div>
              </div>
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-1">1</div>
                  <div className="text-xs">Q1 2025</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center mx-auto mb-1">2</div>
                  <div className="text-xs">Q2 2025</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center mx-auto mb-1">3</div>
                  <div className="text-xs">Q3 2025</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center mx-auto mb-1">4</div>
                  <div className="text-xs">Q4 2025</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-3 rounded border">
                <h4 className="text-sm font-medium mb-2">Current Phase: Q1 2025</h4>
                <ul className="text-xs space-y-1">
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center mr-2 text-xxs">⟳</span>
                    Add multilingual support for API docs
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center mr-2 text-xxs">⟳</span>
                    Restructure implementation examples
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <h4 className="text-sm font-medium mb-2">Next Phase: Q2 2025</h4>
                <ul className="text-xs space-y-1">
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mr-2 text-xxs">●</span>
                    Improve accessibility tools support
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mr-2 text-xxs">●</span>
                    Enhance documentation audit tools
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Sustainable Transparency Dimensions</h3>
          <div className="flex items-center">
            <Clock size={14} className="text-gray-500 mr-1" />
            <div className="text-xs text-gray-500">Last updated: March 6, 2025</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          {/* Show summary by transparency dimension */}
          <div className="border border-blue-200 bg-blue-50 rounded p-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-blue-800 flex items-center">
                <Code size={14} className="mr-1" />
                Technical
              </div>
              {getStatusIcon(72)}
            </div>
            <div className="text-xl font-semibold mt-1 text-blue-800">72%</div>
            <div className="text-xs text-blue-600">
              <span className="font-medium">KPIs:</span> Documentation search time, Information quality
            </div>
            <div className="text-xs text-blue-600 mt-1">
              <span className="font-medium">CF:</span> CF2, CF4, CF5
            </div>
            <div className="mt-2 text-xs flex justify-between items-center">
              <span className="text-blue-800">3 high-severity hotspots</span>
              <span className="bg-blue-100 px-2 py-0.5 rounded text-blue-800">4 actions</span>
            </div>
          </div>
          
          <div className="border border-green-200 bg-green-50 rounded p-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-green-800 flex items-center">
                <Users size={14} className="mr-1" />
                Social
              </div>
              {getStatusIcon(78)}
            </div>
            <div className="text-xl font-semibold mt-1 text-green-800">78%</div>
            <div className="text-xs text-green-600">
              <span className="font-medium">KPIs:</span> Developer response time
            </div>
            <div className="text-xs text-green-600 mt-1">
              <span className="font-medium">CF:</span> CF1, CF3
            </div>
            <div className="mt-2 text-xs flex justify-between items-center">
              <span className="text-green-800">1 high-severity hotspot</span>
              <span className="bg-green-100 px-2 py-0.5 rounded text-green-800">1 action</span>
            </div>
          </div>
          
          <div className="border border-purple-200 bg-purple-50 rounded p-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-purple-800 flex items-center">
                <Settings size={14} className="mr-1" />
                Organizational
              </div>
              {getStatusIcon(65)}
            </div>
            <div className="text-xl font-semibold mt-1 text-purple-800">65%</div>
            <div className="text-xs text-purple-600">
              <span className="font-medium">KPIs:</span> Governance transparency
            </div>
            <div className="text-xs text-purple-600 mt-1">
              <span className="font-medium">CF:</span> CF6, CF7
            </div>
            <div className="mt-2 text-xs flex justify-between items-center">
              <span className="text-purple-800">2 high-severity hotspots</span>
              <span className="bg-purple-100 px-2 py-0.5 rounded text-purple-800">1 action</span>
            </div>
          </div>
          
          <div className="border border-yellow-200 bg-yellow-50 rounded p-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-yellow-800 flex items-center">
                <Globe size={14} className="mr-1" />
                Economic
              </div>
              {getStatusIcon(80)}
            </div>
            <div className="text-xl font-semibold mt-1 text-yellow-800">80%</div>
            <div className="text-xs text-yellow-600">
              <span className="font-medium">KPIs:</span> Cost transparency
            </div>
            <div className="text-xs text-yellow-600 mt-1">
              <span className="font-medium">CF:</span> CF4, CF8
            </div>
            <div className="mt-2 text-xs flex justify-between items-center">
              <span className="text-yellow-800">2 high-severity hotspots</span>
              <span className="bg-yellow-100 px-2 py-0.5 rounded text-yellow-800">1 action</span>
            </div>
          </div>
        </div>
        
        <div className="mt-3 border-t pt-2">
          <div className="text-xs text-gray-500 italic">
            This dashboard operationalizes SECO transparency through KPIs and hotspot analysis, enabling data-driven decisions that improve transparency across technical, social, organizational, and economic dimensions.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SECODashboard;