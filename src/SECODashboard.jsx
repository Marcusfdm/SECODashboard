// src/SECODashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Info, FileText, Users, Settings, CheckCircle, AlertTriangle, XCircle, Search, Globe, BookOpen, Code, Zap, Clock,
  Activity, Eye, ChevronDown, Smile, ChevronUp, Check
} from 'lucide-react';
import { fetchEvaluationData, fetchGuidelineData } from './api/evaluationApi';
import TabContainer from './components/Common/TabContainer';
import Dashboard from './pages/Dashboard';
import Guidelines from './pages/Guidelines';
import Hotspots from './pages/Hotspots';
import { getStatusIcon } from './utils/statusHelpers';

// The main dashboard component
const SECODashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('monthly');
  const [evaluationData, setEvaluationData] = useState({});
  const [isLoadingEvaluation, setIsLoadingEvaluation] = useState(false);
  const [selectedGuideline, setSelectedGuideline] = useState(null);
  const [selectedGuidelineData, setSelectedGuidelineData] = useState(null);
  const [selectedFactor, setSelectedFactor] = useState(null);
  const [selectedDimension, setSelectedDimension] = useState(null);
  const [showGuidelinesForDimension, setShowGuidelinesForDimension] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    technical: true,
    social: true,
    organizational: true,
    economic: true
  });
  const [activeGuidelineTab, setActiveGuidelineTab] = useState('overall');

  // Update the useEffect for loading evaluation data
  useEffect(() => {
    const loadEvaluationData = async () => {
      try {
        setIsLoadingEvaluation(true);
        // Fetch real data from the API
        const data = await fetchEvaluationData();
        setEvaluationData(data);
        setIsLoadingEvaluation(false);
      } catch (error) {
        console.error('Error loading evaluation data:', error);
        setIsLoadingEvaluation(false);
      }
    };

    loadEvaluationData();
  }, []);

  // Add useEffect to load guideline-specific data when a guideline is selected
  useEffect(() => {
    const loadGuidelineData = async () => {
      if (!selectedGuideline) {
        setSelectedGuidelineData(null);
        return;
      }

      try {
        setIsLoadingEvaluation(true);
        const data = await fetchGuidelineData(selectedGuideline);
        setSelectedGuidelineData(data);
      } catch (error) {
        console.error(`Error loading guideline data:`, error);
      } finally {
        setIsLoadingEvaluation(false);
      }
    };

    loadGuidelineData();
  }, [selectedGuideline]);

  // Add this new useEffect to fetch data specifically for the hotspots tab
  useEffect(() => {
    const loadHotspotData = async () => {
      if (activeTab !== 'hotspots') return;
      
      try {
        setIsLoadingEvaluation(true);
        console.log("Fetching hotspot data...");
        const data = await fetchEvaluationData();
        
        // Just use the data directly without additional processing for now
        setEvaluationData(prev => ({ 
          ...prev, 
          hotspotMetrics: {
            topPaths: data.navigationFlows,
            frequencyByDestination: data.navigationFlows,
            timeByPath: data.navigationFlows
          }
        }));
        
        setIsLoadingEvaluation(false);
      } catch (error) {
        console.error('Error loading hotspot data:', error);
        setIsLoadingEvaluation(false);
      }
    };

    loadHotspotData();
  }, [activeTab]);

  // Update the guideline selection handler
  const handleGuidelineSelect = async (guidelineId) => {
    setSelectedGuideline(guidelineId);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                <Info className="mr-2" size={20} /> SECO Transparency Dashboard
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Sustainable Transparency KPIs</span>
              </h1>
              <p className="text-gray-500 text-sm">Last updated: March 5, 2025</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500 mr-2">Timeframe:</div>
              <select 
                className="border rounded-md shadow-sm px-3 py-2 text-sm"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center">
                <Eye size={14} className="mr-1" /> KPI Achievement Rate: 68%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Navigation Tabs */}
        <TabContainer 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          tabs={[
            { id: 'overview', label: 'Overview', icon: Info },
            { id: 'guidelines', label: 'Guidelines', icon: FileText },
            { id: 'hotspots', label: 'Hotspots', icon: Activity }
          ]}
        />

        {activeTab === 'overview' && (
          <Dashboard 
            showGuidelinesForDimension={showGuidelinesForDimension}
            setShowGuidelinesForDimension={setShowGuidelinesForDimension}
            selectedFactor={selectedFactor}
            setSelectedFactor={setSelectedFactor}
            setActiveTab={setActiveTab}
            evaluationData={evaluationData}
            isLoadingEvaluation={isLoadingEvaluation}
          />
        )}
        
        {activeTab === 'guidelines' && (
          <Guidelines
            selectedGuideline={selectedGuideline}
            selectedGuidelineData={selectedGuidelineData}
            selectedFactor={selectedFactor}
            setSelectedFactor={setSelectedFactor}
            selectedDimension={selectedDimension}
            setSelectedDimension={setSelectedDimension}
            handleGuidelineSelect={handleGuidelineSelect}
            activeGuidelineTab={activeGuidelineTab}
            setActiveGuidelineTab={setActiveGuidelineTab}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        )}
        
        {activeTab === 'hotspots' && (
          <Hotspots
            evaluationData={evaluationData}
            isLoadingEvaluation={isLoadingEvaluation}
          />
        )}

        {/* Footer content with sustainable transparency dimensions */}
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Sustainable Transparency Dimensions</h3>
            <div className="flex items-center">
              <Clock size={14} className="text-gray-500 mr-1" />
              <div className="text-xs text-gray-500">Last updated: March 6, 2025</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            {/* Technical dimension */}
            <div className="border border-blue-200 bg-blue-50 rounded p-3">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-blue-800 flex items-center">
                  <Code size={14} className="mr-1" />
                  Technical
                </div>
                {getStatusIcon('partial')}
              </div>
              <div className="mt-2 text-sm">
                {/* Status details omitted for brevity */}
              </div>
            </div>
            
            {/* Social dimension */}
            <div className="border border-green-200 bg-green-50 rounded p-3">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-green-800 flex items-center">
                  <Users size={14} className="mr-1" />
                  Social
                </div>
                {getStatusIcon('partial')}
              </div>
              <div className="mt-2 text-sm">
                {/* Status details omitted for brevity */}
              </div>
            </div>
            
            {/* Organizational dimension */}
            <div className="border border-purple-200 bg-purple-50 rounded p-3">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-purple-800 flex items-center">
                  <Settings size={14} className="mr-1" />
                  Organizational
                </div>
                {getStatusIcon('partial')}
              </div>
              <div className="mt-2 text-sm">
                {/* Status details omitted for brevity */}
              </div>
            </div>
            
            {/* Economic dimension */}
            <div className="border border-yellow-200 bg-yellow-50 rounded p-3">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-yellow-800 flex items-center">
                  <Globe size={14} className="mr-1" />
                  Economic
                </div>
                {getStatusIcon('partial')}
              </div>
              <div className="mt-2 text-sm">
                {/* Status details omitted for brevity */}
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
    </div>
  );
};

export default SECODashboard;