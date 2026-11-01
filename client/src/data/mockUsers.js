// Mock Users and Role Directory Data for CivicReflex Portal

export const DEMO_USERS = {
  CITIZEN: {
    id: 'USR-88219',
    email: 'citizen@civicreflex.gov.in',
    password: 'citizen123',
    name: 'Vikram R. Sharma',
    role: 'citizen',
    designation: 'Registered Citizen Resident',
    ward: 'Ward 14 (South Zone)',
    phone: '+91 98765 44821',
    memberSince: 'March 2026',
    accountStatus: 'Active',
    grievancesCount: 3,
    verificationsCount: 12
  },
  AUTHORITY: {
    id: 'AUTH-EXEC-001',
    email: 'authority@civicreflex.gov.in',
    password: 'authority123',
    name: 'Er. Rameshwar Rao',
    role: 'authority',
    designation: 'Superintending Executive Engineer & Zonal Administrator',
    department: 'Public Works & Municipal Infrastructure Directorate',
    ward: 'All Wards (South & Central Zone HQ)',
    phone: '+91 94220 11099',
    memberSince: 'January 2024',
    accountStatus: 'Active',
    jurisdiction: 'South & Central Zones (Wards 01-24)',
    badgeNumber: 'NIC-MC-EXEC-842'
  },
  FIELD_OFFICER: {
    id: 'OFF-PWD-014',
    email: 'officer.pwd@civicreflex.gov.in',
    password: 'officer123',
    name: 'Mr. V. Nair',
    role: 'field_officer',
    designation: 'Junior Engineer (Roads & Structural Maintenance)',
    department: 'Roads and Infrastructure',
    ward: 'Ward 14 (South Zone)',
    phone: '+91 98231 77412',
    memberSince: 'July 2024',
    accountStatus: 'Active',
    engineeringSquad: 'PWD Squad #4 (Ward 14 Quick Response)',
    badgeNumber: 'NIC-MC-ENG-014'
  },
  ADMIN: {
    id: 'ADM-SYS-001',
    email: 'admin@civicreflex.gov.in',
    password: 'admin123',
    name: 'CivicReflex System Administrator',
    role: 'admin',
    designation: 'Principal System Administrator & Chief Data Custodian',
    department: 'Digital Governance & Information Technology Cell',
    ward: 'Central IT Cell (State Capital HQ)',
    phone: '+91 99000 11223',
    memberSince: 'January 2024',
    accountStatus: 'Active',
    lastLogin: 'Today, 09:30 AM',
    permissions: 'Full System Administration, User Management, Content Moderation, Audit Log Supervision',
    badgeNumber: 'NIC-SYS-ADM-001'
  }
};

export const INITIAL_USERS = [
  {
    id: 'ADM-SYS-001',
    name: 'CivicReflex System Administrator',
    email: 'admin@civicreflex.gov.in',
    role: 'admin',
    designation: 'Principal System Administrator',
    department: 'Digital Governance & Information Technology Cell',
    ward: 'Central IT Cell (HQ)',
    phone: '+91 99000 11223',
    registrationDate: '15 Jan 2024',
    accountStatus: 'Active',
    submittedComplaintsCount: 0
  },
  {
    id: 'AUTH-EXEC-001',
    name: 'Er. Rameshwar Rao',
    email: 'authority@civicreflex.gov.in',
    role: 'authority',
    designation: 'Superintending Executive Engineer',
    department: 'Roads and Infrastructure',
    ward: 'South & Central Zones (Wards 01-24)',
    phone: '+91 94220 11099',
    registrationDate: '01 Feb 2024',
    accountStatus: 'Active',
    submittedComplaintsCount: 0
  },
  {
    id: 'AUTH-ZON-002',
    name: 'Smt. Deepa Nair',
    email: 'deepa.nair@civicreflex.gov.in',
    role: 'authority',
    designation: 'Zonal Grievance Officer',
    department: 'Solid Waste Management',
    ward: 'North Zone (Wards 18-24)',
    phone: '+91 98450 66211',
    registrationDate: '10 Mar 2024',
    accountStatus: 'Active',
    submittedComplaintsCount: 0
  },
  {
    id: 'OFF-PWD-014',
    name: 'Mr. V. Nair',
    email: 'officer.pwd@civicreflex.gov.in',
    role: 'field_officer',
    designation: 'Junior Engineer (Roads)',
    department: 'Roads and Infrastructure',
    ward: 'Ward 14 (South Zone)',
    phone: '+91 98231 77412',
    registrationDate: '01 Jul 2024',
    accountStatus: 'Active',
    submittedComplaintsCount: 0
  },
  {
    id: 'OFF-SAN-003',
    name: 'Dr. S. K. Mukherjee',
    email: 'sanitation.central@civicreflex.gov.in',
    role: 'field_officer',
    designation: 'Chief Sanitary Inspector',
    department: 'Solid Waste Management',
    ward: 'Ward 08 (Central Zone)',
    phone: '+91 98110 55214',
    registrationDate: '15 Aug 2024',
    accountStatus: 'Active',
    submittedComplaintsCount: 0
  },
  {
    id: 'OFF-ELE-008',
    name: 'Er. Amitava Sen',
    email: 'electrical.north@civicreflex.gov.in',
    role: 'field_officer',
    designation: 'Assistant Engineer (Electrical)',
    department: 'Electrical Maintenance',
    ward: 'Ward 22 (North Zone)',
    phone: '+91 98302 44190',
    registrationDate: '05 Sep 2024',
    accountStatus: 'Active',
    submittedComplaintsCount: 0
  },
  {
    id: 'OFF-DRN-011',
    name: 'Er. P. B. Patil',
    email: 'drainage.w11@civicreflex.gov.in',
    role: 'field_officer',
    designation: 'Sub-Divisional Officer (Drainage)',
    department: 'Drainage and Water Management',
    ward: 'Ward 11 (West Zone)',
    phone: '+91 94225 88910',
    registrationDate: '20 Sep 2024',
    accountStatus: 'Active',
    submittedComplaintsCount: 0
  },
  {
    id: 'OFF-ACC-002',
    name: 'Smt. Kalyani Deshmukh',
    email: 'accessibility.cell@civicreflex.gov.in',
    role: 'field_officer',
    designation: 'Accessibility & Barrier-Free Officer',
    department: 'Public Accessibility',
    ward: 'Ward 03 (Central Zone)',
    phone: '+91 98700 33140',
    registrationDate: '12 Oct 2024',
    accountStatus: 'Active',
    submittedComplaintsCount: 0
  },
  {
    id: 'USR-88219',
    name: 'Vikram R. Sharma',
    email: 'citizen@civicreflex.gov.in',
    role: 'citizen',
    designation: 'Resident Citizen',
    department: 'N/A',
    ward: 'Ward 14 (South Zone)',
    phone: '+91 98765 44821',
    registrationDate: '12 Mar 2026',
    accountStatus: 'Active',
    submittedComplaintsCount: 3
  },
  {
    id: 'USR-88220',
    name: 'Ananya Roy',
    email: 'ananya.roy@example.com',
    role: 'citizen',
    designation: 'Resident Citizen',
    department: 'N/A',
    ward: 'Ward 08 (Central Zone)',
    phone: '+91 98440 22319',
    registrationDate: '18 Mar 2026',
    accountStatus: 'Active',
    submittedComplaintsCount: 1
  },
  {
    id: 'USR-88221',
    name: 'Rajesh K. Patel',
    email: 'rajesh.patel@example.com',
    role: 'citizen',
    designation: 'Resident Citizen',
    department: 'N/A',
    ward: 'Ward 22 (North Zone)',
    phone: '+91 98200 44901',
    registrationDate: '22 Mar 2026',
    accountStatus: 'Suspended',
    submittedComplaintsCount: 5,
    suspensionReason: 'Repeatedly submitting commercial advertisements and automated spam tickets.'
  },
  {
    id: 'USR-88222',
    name: 'Meera S. Iyer',
    email: 'meera.iyer@example.com',
    role: 'citizen',
    designation: 'Resident Citizen',
    department: 'N/A',
    ward: 'Ward 03 (Central Zone)',
    phone: '+91 98190 77654',
    registrationDate: '29 Mar 2026',
    accountStatus: 'Active',
    submittedComplaintsCount: 2
  }
];

export const FIELD_OFFICERS_DIRECTORY = [
  {
    id: 'OFF-PWD-014',
    name: 'Mr. V. Nair',
    designation: 'Junior Engineer (Roads)',
    department: 'Roads and Infrastructure',
    ward: 'Ward 14 (South Zone)',
    activeWorkOrders: 4,
    phone: '+91 98231 77412',
    email: 'officer.pwd@civicreflex.gov.in'
  },
  {
    id: 'OFF-SAN-003',
    name: 'Dr. S. K. Mukherjee',
    designation: 'Chief Sanitary Inspector',
    department: 'Solid Waste Management',
    ward: 'Central Zone (Wards 07-12)',
    activeWorkOrders: 6,
    phone: '+91 98110 55214',
    email: 'sanitation.central@civicreflex.gov.in'
  },
  {
    id: 'OFF-ELE-008',
    name: 'Er. Amitava Sen',
    designation: 'Assistant Engineer (Electrical)',
    department: 'Electrical Maintenance',
    ward: 'North Zone (Wards 18-24)',
    activeWorkOrders: 3,
    phone: '+91 98302 44190',
    email: 'electrical.north@civicreflex.gov.in'
  },
  {
    id: 'OFF-DRN-011',
    name: 'Er. P. B. Patil',
    designation: 'Sub-Divisional Officer (Drainage)',
    department: 'Drainage and Water Management',
    ward: 'Ward 11 (West Zone)',
    activeWorkOrders: 5,
    phone: '+91 94225 88910',
    email: 'drainage.w11@civicreflex.gov.in'
  },
  {
    id: 'OFF-ACC-002',
    name: 'Smt. Kalyani Deshmukh',
    designation: 'Accessibility & Barrier-Free Officer',
    department: 'Public Accessibility',
    ward: 'Citywide Accessibility Cell',
    activeWorkOrders: 2,
    phone: '+91 98700 33140',
    email: 'accessibility.cell@civicreflex.gov.in'
  }
];

export const INITIAL_WARDS = [
  {
    wardNumber: 'Ward 14',
    wardName: 'M.G. Road & Shanthi Nagar',
    zone: 'South Zone',
    assignedAuthority: 'Er. Rameshwar Rao',
    fieldOfficers: ['Mr. V. Nair'],
    totalGrievances: 18,
    resolvedGrievances: 14,
    resolutionRate: 77.7,
    status: 'Active'
  },
  {
    wardNumber: 'Ward 08',
    wardName: 'Gandhi Market & Shastri Nagar',
    zone: 'Central Zone',
    assignedAuthority: 'Er. Rameshwar Rao',
    fieldOfficers: ['Dr. S. K. Mukherjee'],
    totalGrievances: 15,
    resolvedGrievances: 12,
    resolutionRate: 80.0,
    status: 'Active'
  },
  {
    wardNumber: 'Ward 22',
    wardName: 'Sector 4 Link & North Hub',
    zone: 'North Zone',
    assignedAuthority: 'Smt. Deepa Nair',
    fieldOfficers: ['Er. Amitava Sen'],
    totalGrievances: 12,
    resolvedGrievances: 8,
    resolutionRate: 66.6,
    status: 'Active'
  },
  {
    wardNumber: 'Ward 11',
    wardName: 'Subhash Nagar & Industrial Basin',
    zone: 'West Zone',
    assignedAuthority: 'Er. Rameshwar Rao',
    fieldOfficers: ['Er. P. B. Patil'],
    totalGrievances: 9,
    resolvedGrievances: 7,
    resolutionRate: 77.7,
    status: 'Active'
  },
  {
    wardNumber: 'Ward 03',
    wardName: 'Central Bus Terminal & Station Area',
    zone: 'Central Zone',
    assignedAuthority: 'Er. Rameshwar Rao',
    fieldOfficers: ['Smt. Kalyani Deshmukh'],
    totalGrievances: 8,
    resolvedGrievances: 6,
    resolutionRate: 75.0,
    status: 'Active'
  },
  {
    wardNumber: 'Ward 05',
    wardName: 'Eastern Lakeview Extension',
    zone: 'East Zone',
    assignedAuthority: 'Smt. Deepa Nair',
    fieldOfficers: ['Mr. V. Nair'],
    totalGrievances: 4,
    resolvedGrievances: 3,
    resolutionRate: 75.0,
    status: 'Active'
  }
];

export const INITIAL_DEPARTMENTS = [
  {
    id: 'dept-roads',
    name: 'Roads and Infrastructure',
    code: 'PWD-ROADS',
    nodalOfficer: 'Er. Rameshwar Rao',
    officerCount: 8,
    activeComplaints: 24,
    slaComplianceRate: 90.8,
    budgetAllocated: '₹4.50 Cr',
    contactEmail: 'pwd.roads@civicreflex.gov.in'
  },
  {
    id: 'dept-sanitation',
    name: 'Solid Waste Management',
    code: 'SWM-HEALTH',
    nodalOfficer: 'Dr. S. K. Mukherjee',
    officerCount: 14,
    activeComplaints: 16,
    slaComplianceRate: 94.2,
    budgetAllocated: '₹3.80 Cr',
    contactEmail: 'sanitation@civicreflex.gov.in'
  },
  {
    id: 'dept-electrical',
    name: 'Electrical Maintenance',
    code: 'ELEC-INFRA',
    nodalOfficer: 'Er. Amitava Sen',
    officerCount: 6,
    activeComplaints: 11,
    slaComplianceRate: 90.8,
    budgetAllocated: '₹2.10 Cr',
    contactEmail: 'electrical@civicreflex.gov.in'
  },
  {
    id: 'dept-drainage',
    name: 'Drainage and Water Management',
    code: 'DRN-WATER',
    nodalOfficer: 'Er. P. B. Patil',
    officerCount: 7,
    activeComplaints: 9,
    slaComplianceRate: 87.8,
    budgetAllocated: '₹3.20 Cr',
    contactEmail: 'drainage@civicreflex.gov.in'
  },
  {
    id: 'dept-accessibility',
    name: 'Public Accessibility',
    code: 'ACC-CELL',
    nodalOfficer: 'Smt. Kalyani Deshmukh',
    officerCount: 4,
    activeComplaints: 6,
    slaComplianceRate: 84.0,
    budgetAllocated: '₹1.40 Cr',
    contactEmail: 'accessibility@civicreflex.gov.in'
  }
];

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-roads',
    name: 'Road Damage / Potholes',
    department: 'Roads and Infrastructure',
    defaultPriority: 'High',
    defaultSlaHours: 72,
    status: 'Active',
    description: 'Surface craters, road depressions, crumbling edges, and potholes.'
  },
  {
    id: 'cat-sanitation',
    name: 'Garbage and Waste Management',
    department: 'Solid Waste Management',
    defaultPriority: 'High',
    defaultSlaHours: 24,
    status: 'Active',
    description: 'Overflowing dump bins, uncollected waste, and illegal debris disposal.'
  },
  {
    id: 'cat-lighting',
    name: 'Streetlight Issues',
    department: 'Electrical Maintenance',
    defaultPriority: 'Medium',
    defaultSlaHours: 48,
    status: 'Active',
    description: 'Dark corridors, non-functional sodium lamps, and pole wiring faults.'
  },
  {
    id: 'cat-drainage',
    name: 'Drainage and Waterlogging',
    department: 'Drainage and Water Management',
    defaultPriority: 'High',
    defaultSlaHours: 24,
    status: 'Active',
    description: 'Choked storm water conduits, waterlogging, and broken culvert slabs.'
  },
  {
    id: 'cat-footpath',
    name: 'Footpath Damage',
    department: 'Public Accessibility',
    defaultPriority: 'Medium',
    defaultSlaHours: 120,
    status: 'Active',
    description: 'Broken pedestrian paving tiles, pavement encroachments, and tripping hazards.'
  },
  {
    id: 'cat-accessibility',
    name: 'Accessibility Barriers',
    department: 'Public Accessibility',
    defaultPriority: 'High',
    defaultSlaHours: 168,
    status: 'Active',
    description: 'Missing drop curb ramps, lack of wheelchair access, and broken tactile paving.'
  },
  {
    id: 'cat-safety',
    name: 'Unsafe Locations',
    department: 'Roads and Infrastructure',
    defaultPriority: 'Critical',
    defaultSlaHours: 48,
    status: 'Active',
    description: 'Deserted stretches, open dangerous excavation pits, and blind corners.'
  }
];

export const DEPARTMENTS_LIST = [
  'Roads and Infrastructure',
  'Solid Waste Management',
  'Electrical Maintenance',
  'Drainage and Water Management',
  'Public Accessibility'
];

export const CURRENT_USER = DEMO_USERS.CITIZEN;
