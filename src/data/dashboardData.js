export const conditioningFactors = [
  {
    id: 1,
    name: 'Documentation Quality',
    status: 'success',
    value: 85,
    dimension: 'Technical'
  },
  {
    id: 2,
    name: 'Community Engagement',
    status: 'warning',
    value: 65,
    dimension: 'Social'
  },
  {
    id: 3,
    name: 'Resource Utilization',
    status: 'error',
    value: 45,
    dimension: 'Economic'
  }
];

export const guidelinesData = {
  Technical: [
    {
      id: 1,
      title: 'Code Documentation',
      description: 'Ensure comprehensive documentation of code and APIs',
      status: 'success'
    },
    {
      id: 2,
      title: 'Testing Coverage',
      description: 'Maintain high testing coverage across all components',
      status: 'warning'
    }
  ],
  Social: [
    {
      id: 3,
      title: 'Community Guidelines',
      description: 'Clear guidelines for community contributions',
      status: 'success'
    }
  ],
  Economic: [
    {
      id: 4,
      title: 'Resource Management',
      description: 'Efficient allocation of development resources',
      status: 'warning'
    }
  ]
}; 