// Mock Key Performance Indicators & Municipal Metrics (Demonstration Data)

export const PORTAL_METRICS = {
  totalRegistered: "48,219",
  totalResolved: "43,892",
  pendingGrievances: "4,327",
  resolutionRate: "91.02%",
  activeUnderReview: "3,418",
  activeBlindSpots: "909",
  verifiedByCitizens: "39,120",
  avgRedressalTimeHours: "46.8",
  participatingWards: "64",
  monthlyTrend: "+14.2% faster resolution than previous quarter"
};

// Transparency metrics with numerical values for charts & visual meters
export const TRANSPARENCY_METRICS = {
  totalReceived: 48219,
  resolvedCount: 43892,
  pendingCount: 4327,
  resolvedPercentage: 91.02,
  pendingPercentage: 8.98,
  avgResolutionHours: 46.8,
  slaComplianceRate: 94.6,
  citizenSatisfactionRate: 88.4,
  
  // Department-wise resolution performance
  departmentPerformance: [
    { name: "Public Works (PWD - Roads)", received: 15420, resolved: 14410, rate: 93.4, color: "#003366" },
    { name: "Solid Waste Management", received: 13850, resolved: 13170, rate: 95.1, color: "#216E39" },
    { name: "Street Lighting & Electrical", received: 8420, resolved: 7460, rate: 88.6, color: "#CDA250" },
    { name: "Storm Water Drainage", received: 6210, resolved: 5540, rate: 89.2, color: "#0B2545" },
    { name: "Footpaths & Accessibility", received: 4319, resolved: 3312, rate: 76.7, color: "#B7791F" }
  ],

  // Monthly demonstration trend
  monthlyTrendData: [
    { month: "Jun", received: 7420, resolved: 6810 },
    { month: "Jul", received: 8850, resolved: 8120 },
    { month: "Aug", received: 9140, resolved: 8390 },
    { month: "Sep", received: 8430, resolved: 7890 },
    { month: "Oct", received: 8120, resolved: 7650 },
    { month: "Nov (Demo)", received: 6259, resolved: 5032 }
  ]
};

export const SLA_TARGETS = [
  { service: "Pothole & Surface Damage Repair", timeline: "72 Hours", department: "Public Works Dept" },
  { service: "Solid Waste & Overflowing Dump Clearance", timeline: "24 Hours", department: "Sanitation Directorate" },
  { service: "Streetlight Bulb / Line Fault Rectification", timeline: "48 Hours", department: "Electrical Infrastructure" },
  { service: "Drainage Choke / Water Logging Removal", timeline: "24 Hours", department: "Storm Water Drainage" },
  { service: "Blind Spot Illumination Escalation", timeline: "5 Working Days", department: "Joint Safety Committee" },
  { service: "Accessibility Ramp & Footpath Obstruction", timeline: "7 Working Days", department: "Accessibility Cell" }
];
