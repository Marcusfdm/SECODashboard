// src/utils/dataProcessing.js

/**
 * Process navigation flows data for hotspot visualization
 * @param {Array} navigationFlows - Array of navigation flow data
 * @returns {Object} Processed metrics for hotspot visualization
 */
export const processNavigationFlowsForHotspots = (navigationFlows) => {
    if (!navigationFlows || navigationFlows.length === 0) {
      return {
        topPaths: [],
        frequencyByDestination: [],
        timeByPath: []
      };
    }
  
    // Extract destinations from paths
    const destinations = navigationFlows.map(flow => {
      const pathParts = flow.path.split('->');
      return pathParts[pathParts.length - 1];
    });
  
    // Count frequency of each destination
    const destinationCounts = destinations.reduce((acc, dest) => {
      acc[dest] = (acc[dest] || 0) + 1;
      return acc;
    }, {});
  
    // Convert to array format for charts
    const frequencyByDestination = Object.entries(destinationCounts).map(([name, value]) => ({
      name,
      value
    }));
  
    // Process time data
    const timeByPath = navigationFlows.map(flow => ({
      name: flow.path,
      value: flow.avgTime
    }));
  
    // Sort and limit to top paths
    const topPaths = [...navigationFlows]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(flow => ({
        name: flow.path,
        value: flow.count
      }));
  
    return {
      topPaths,
      frequencyByDestination,
      timeByPath
    };
  };
  
  /**
   * Get dimension color 
   */
  export const getDimensionColor = (dimension) => {
    const dimensionColors = {
      technical: 'blue',
      social: 'green',
      organizational: 'purple',
      economic: 'yellow'
    };
    
    return dimensionColors[dimension] || 'gray';
  };
  
  /**
   * Get tailwind background color class based on dimension
   */
  export const getDimensionBgClass = (dimension) => {
    const colorName = getDimensionColor(dimension);
    return `bg-${colorName}-100`;
  };
  
  /**
   * Get tailwind text color class based on dimension
   */
  export const getDimensionTextClass = (dimension) => {
    const colorName = getDimensionColor(dimension);
    return `text-${colorName}-800`;
  };
  
  /**
   * Get tailwind border color class based on dimension
   */
  export const getDimensionBorderClass = (dimension) => {
    const colorName = getDimensionColor(dimension);
    return `border-${colorName}-200`;
  };