import React, { useState, useEffect, useCallback } from 'react';
import { ReportsContext } from './reportsContextInstance';
import { MOCK_REPORTS } from '../data/mockReports';
import { MOCK_TICKETS } from '../data/mockTickets';
import {
  INITIAL_USERS,
  INITIAL_WARDS,
  INITIAL_DEPARTMENTS,
  INITIAL_CATEGORIES
} from '../data/mockUsers';

const STORAGE_KEYS = {
  REPORTS: 'civicreflex_reports_v4',
  TICKETS: 'civicreflex_tickets_v4',
  USER_REPORTS: 'civicreflex_user_reports_v4',
  BLIND_SPOTS: 'civicreflex_blind_spots_v4',
  USERS: 'civicreflex_all_users_v4',
  WARDS: 'civicreflex_wards_v4',
  DEPARTMENTS: 'civicreflex_departments_v4',
  CATEGORIES: 'civicreflex_categories_v4',
  AUDIT_LOGS: 'civicreflex_audit_logs_v4',
  SETTINGS: 'civicreflex_system_settings_v4'
};

// Default Simulated Citizen Profile
const DEFAULT_CITIZEN = {
  id: 'USR-88219',
  name: 'Vikram R. Sharma',
  phone: '+91 98765 44821',
  email: 'vikram.sharma@example.com',
  ward: 'Ward 14 (South Zone)',
  memberSince: 'March 2026'
};

// Department and Authority directory mapping for realistic routing
const AUTHORITY_DIRECTORY = {
  roads: {
    dept: 'Roads and Infrastructure',
    officer: 'Er. Rameshwar Rao',
    officerId: 'OFF-PWD-014',
    fieldOfficerName: 'Mr. V. Nair',
    designation: 'Executive Engineer (PWD - Road Division)',
    email: 'pwd-ward14@civicreflex.gov.in',
    slaHours: 72
  },
  sanitation: {
    dept: 'Solid Waste Management',
    officer: 'Dr. S. K. Mukherjee',
    officerId: 'OFF-SAN-003',
    fieldOfficerName: 'Dr. S. K. Mukherjee',
    designation: 'Chief Sanitary Inspector',
    email: 'sanitation-central@civicreflex.gov.in',
    slaHours: 24
  },
  lighting: {
    dept: 'Electrical Maintenance',
    officer: 'Er. Amitava Sen',
    officerId: 'OFF-ELE-008',
    fieldOfficerName: 'Er. Amitava Sen',
    designation: 'Assistant Engineer (Electrical)',
    email: 'electrical-north@civicreflex.gov.in',
    slaHours: 48
  },
  drainage: {
    dept: 'Drainage and Water Management',
    officer: 'Er. P. B. Patil',
    officerId: 'OFF-DRN-011',
    fieldOfficerName: 'Er. P. B. Patil',
    designation: 'Sub-Divisional Officer (Drainage)',
    email: 'drainage-w11@civicreflex.gov.in',
    slaHours: 24
  },
  accessibility: {
    dept: 'Public Accessibility',
    officer: 'Smt. Kalyani Deshmukh',
    officerId: 'OFF-ACC-002',
    fieldOfficerName: 'Smt. Kalyani Deshmukh',
    designation: 'Accessibility & Barrier-Free Officer',
    email: 'accessibility-central@civicreflex.gov.in',
    slaHours: 168
  },
  public_safety: {
    dept: 'Roads and Infrastructure',
    officer: 'Er. Rameshwar Rao',
    officerId: 'OFF-PWD-014',
    fieldOfficerName: 'Mr. V. Nair',
    designation: 'Nodal Safety & Infrastructure Officer',
    email: 'safety-audit@civicreflex.gov.in',
    slaHours: 120
  }
};

const DEFAULT_BLIND_SPOTS = [
  {
    id: 'CLUSTER-BLIND-01',
    title: 'Sector 4 Link Road Dark Stretch',
    category: 'Poorly Lit Streets',
    ward: 'Ward 22 (North Zone)',
    location: 'Sector 4 Link Road between Crossroad 3 and 7',
    reportsCount: 7,
    threshold: 5,
    distinctReporters: ['USR-101', 'USR-204', 'USR-309', 'USR-412', 'USR-505', 'USR-619', 'USR-782'],
    timeOfDay: '8:00 PM – 11:30 PM (Night Peak)',
    autoEscalated: true,
    approvalStatus: 'Awaiting Authority Review',
    resultingTicketId: null,
    details: 'Seven non-functional sodium lamps over a 400-meter corridor. High risk of night pedestrian accidents and women commuter distress.',
    recommendedDept: 'Electrical Maintenance',
    recommendedOfficer: 'Er. Amitava Sen'
  },
  {
    id: 'CLUSTER-BLIND-02',
    title: 'Central Bus Terminal South Gate Curb Barrier',
    category: 'Missing Accessibility Ramps',
    ward: 'Ward 03 (Central Zone)',
    location: 'South Gate Pedestrian Crossing, Central Bus Stand',
    reportsCount: 5,
    threshold: 4,
    distinctReporters: ['USR-112', 'USR-219', 'USR-344', 'USR-480', 'USR-521'],
    timeOfDay: 'All Day (Continuous Accessibility Barrier)',
    autoEscalated: true,
    approvalStatus: 'Awaiting Authority Review',
    resultingTicketId: null,
    details: 'High 8-inch concrete curb stone with no drop ramp preventing wheelchair boarding and elder access.',
    recommendedDept: 'Public Accessibility',
    recommendedOfficer: 'Smt. Kalyani Deshmukh'
  },
  {
    id: 'CLUSTER-BLIND-03',
    title: 'Old Canal Road Missing Footpath Shoulder',
    category: 'Missing Footpaths',
    ward: 'Ward 14 (South Zone)',
    location: 'Canal Road connecting Ward 14 to Industrial Estate',
    reportsCount: 6,
    threshold: 5,
    distinctReporters: ['USR-109', 'USR-198', 'USR-301', 'USR-405', 'USR-602', 'USR-710'],
    timeOfDay: 'Morning & Evening Commute (07:30 - 10:00 AM, 05:30 - 08:00 PM)',
    autoEscalated: true,
    approvalStatus: 'Awaiting Authority Review',
    resultingTicketId: null,
    details: 'Pedestrians forced onto roadway with high-speed vehicular traffic due to missing unpaved footpath link.',
    recommendedDept: 'Roads and Infrastructure',
    recommendedOfficer: 'Mr. V. Nair'
  }
];

const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUD-2026-1001',
    timestamp: '2026-10-28 09:15 AM',
    action: 'GRIEVANCE_LODGED',
    relatedRecord: 'CR-2026-8842',
    user: 'Vikram R. Sharma (USR-88219)',
    role: 'citizen',
    description: 'Citizen lodged grievance: Deep crater-sized pothole near junction in Ward 14.'
  },
  {
    id: 'AUD-2026-1002',
    timestamp: '2026-10-28 11:30 AM',
    action: 'GRIEVANCE_ASSIGNED',
    relatedRecord: 'CR-2026-8842',
    user: 'Er. Rameshwar Rao (AUTH-EXEC-001)',
    role: 'authority',
    description: 'Authority assigned work order to Junior Engineer Mr. V. Nair (Roads and Infrastructure).'
  },
  {
    id: 'AUD-2026-1003',
    timestamp: '2026-10-29 03:00 PM',
    action: 'SITE_INSPECTION_RECORDED',
    relatedRecord: 'CR-2026-8842',
    user: 'Mr. V. Nair (OFF-PWD-014)',
    role: 'field_officer',
    description: 'Field inspection completed: Pothole diameter 1.5m, cold mix asphalt repair approved.'
  },
  {
    id: 'AUD-2026-1004',
    timestamp: '2026-10-30 08:30 AM',
    action: 'USER_LOGIN',
    relatedRecord: 'ADM-SYS-001',
    user: 'CivicReflex System Administrator',
    role: 'admin',
    description: 'System Administrator logged in from IP 10.14.0.12 (NIC GovNet Capital Gateway).'
  },
  {
    id: 'AUD-2026-1005',
    timestamp: '2026-10-31 10:15 AM',
    action: 'USER_SUSPENDED',
    relatedRecord: 'USR-88221',
    user: 'CivicReflex System Administrator',
    role: 'admin',
    description: 'Account USR-88221 (Rajesh K. Patel) suspended. Reason: Repeatedly submitting commercial advertisements and automated spam tickets.'
  },
  {
    id: 'AUD-2026-1006',
    timestamp: '2026-11-01 02:30 PM',
    action: 'CONTENT_FLAGGED_DUPLICATE',
    relatedRecord: 'CR-2026-8860',
    user: 'Automated Geo-Fence System',
    role: 'system',
    description: 'Complaint CR-2026-8860 flagged by GIS duplicate detection algorithm (matches active ticket CR-2026-8842 within 8 meters).'
  },
  {
    id: 'AUD-2026-1007',
    timestamp: '2026-11-01 03:15 PM',
    action: 'CONTENT_FLAGGED_SPAM',
    relatedRecord: 'CR-2026-8861',
    user: 'Automated Image Scanner',
    role: 'system',
    description: 'Complaint CR-2026-8861 flagged for commercial banner advertising text detected in photo proof.'
  },
  {
    id: 'AUD-2026-1008',
    timestamp: '2026-11-01 04:00 PM',
    action: 'CONTENT_FLAGGED_INAPPROPRIATE',
    relatedRecord: 'CR-2026-8862',
    user: 'Media Integrity Engine',
    role: 'system',
    description: 'Complaint CR-2026-8862 flagged for low image quality and non-civic personal portrait selfie.'
  },
  {
    id: 'AUD-2026-1009',
    timestamp: '2026-11-01 05:20 PM',
    action: 'CONTENT_FLAGGED_FALSE_CLAIM',
    relatedRecord: 'CR-2026-8863',
    user: 'Zonal Patrol Incident Cross-Check',
    role: 'system',
    description: 'Complaint CR-2026-8863 flagged for high alarmist claim contradicted by real-time zonal patrolling.'
  },
  {
    id: 'AUD-2026-1010',
    timestamp: '2026-11-01 06:00 PM',
    action: 'CATEGORY_CONFIG_UPDATED',
    relatedRecord: 'cat-roads',
    user: 'CivicReflex System Administrator',
    role: 'admin',
    description: 'Updated default SLA for Road Damage / Potholes category to 72 hours under monsoon advisory.'
  }
];

const DEFAULT_SETTINGS = {
  portalName: 'CivicReflex – Citizen Civic Services & Accountability Portal',
  municipalCorporation: 'Capital City Municipal Corporation',
  helpline: '1800-11-2026 (Toll-Free)',
  portalUrl: 'https://civicreflex.gov.in',
  highSlaHours: 24,
  mediumSlaHours: 48,
  lowSlaHours: 120,
  autoEscalationDays: 3,
  duplicateGeoRadiusMeters: 15,
  autoQuarantineSpam: true,
  aiSpamSensitivity: 'Standard',
  enableSmsAlerts: true,
  enableEmailAlerts: true,
  dailyDigestTime: '08:00 AM',
  defaultContrastMode: 'Standard Contrast',
  fontScalingDefault: 'Normal (100%)'
};

export const ReportsProvider = ({ children }) => {
  // Helper: format timestamp in Indian standard format
  const getFormattedNow = () => {
    return new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // 1. All Public Reports Register
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return saved ? JSON.parse(saved) : MOCK_REPORTS;
    } catch {
      return MOCK_REPORTS;
    }
  });

  // 2. All Tickets Detailed Lifecycle Mapping (by Ticket Number)
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TICKETS);
      return saved ? JSON.parse(saved) : MOCK_TICKETS;
    } catch {
      return MOCK_TICKETS;
    }
  });

  // 3. Current Citizen's Grievance History (Dashboard)
  const [userReports, setUserReports] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_REPORTS);
      if (saved) return JSON.parse(saved);

      const initialUserReport = MOCK_REPORTS.find((r) => r.ticketNumber === 'CR-2026-8842');
      return initialUserReport ? [initialUserReport] : [];
    } catch {
      return [];
    }
  });

  // 4. Blind Spot Clusters
  const [blindSpotClusters, setBlindSpotClusters] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLIND_SPOTS);
      return saved ? JSON.parse(saved) : DEFAULT_BLIND_SPOTS;
    } catch {
      return DEFAULT_BLIND_SPOTS;
    }
  });

  // 5. System Administrator: User Management Directory
  const [usersList, setUsersList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // 6. System Administrator: Ward Directory
  const [wardsList, setWardsList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WARDS);
      return saved ? JSON.parse(saved) : INITIAL_WARDS;
    } catch {
      return INITIAL_WARDS;
    }
  });

  // 7. System Administrator: Departments Directory
  const [departmentsList, setDepartmentsList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
      return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
    } catch {
      return INITIAL_DEPARTMENTS;
    }
  });

  // 8. System Administrator: Categories Directory
  const [categoriesList, setCategoriesList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // 9. System Administrator: Append-Only Audit Logs Register
  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  // 10. System Administrator: Portal Configuration Settings
  const [systemSettings, setSystemSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // 11. Current Citizen User Profile
  const [currentUser] = useState(DEFAULT_CITIZEN);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch (e) {
      console.warn('Storage sync failed for reports', e);
    }
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    } catch (e) {
      console.warn('Storage sync failed for tickets', e);
    }
  }, [tickets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_REPORTS, JSON.stringify(userReports));
    } catch (e) {
      console.warn('Storage sync failed for user reports', e);
    }
  }, [userReports]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BLIND_SPOTS, JSON.stringify(blindSpotClusters));
    } catch (e) {
      console.warn('Storage sync failed for blind spots', e);
    }
  }, [blindSpotClusters]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(usersList));
    } catch (e) {
      console.warn('Storage sync failed for users list', e);
    }
  }, [usersList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WARDS, JSON.stringify(wardsList));
    } catch (e) {
      console.warn('Storage sync failed for wards list', e);
    }
  }, [wardsList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departmentsList));
    } catch (e) {
      console.warn('Storage sync failed for departments', e);
    }
  }, [departmentsList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categoriesList));
    } catch (e) {
      console.warn('Storage sync failed for categories', e);
    }
  }, [categoriesList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('Storage sync failed for audit logs', e);
    }
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(systemSettings));
    } catch (e) {
      console.warn('Storage sync failed for settings', e);
    }
  }, [systemSettings]);

  /**
   * Append-Only Audit Logger
   */
  const addAuditLog = useCallback(({ action, relatedRecord = 'N/A', description, user = 'System', role = 'system' }) => {
    const formattedDate = getFormattedNow();
    const newEntry = {
      id: `AUD-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: formattedDate,
      action,
      relatedRecord,
      description,
      user,
      role
    };

    setAuditLogs((prev) => [newEntry, ...prev]);
    return newEntry;
  }, []);

  /**
   * Submit a new civic grievance (Citizen action)
   */
  const submitReport = useCallback(({
    category,
    categoryName,
    subcategory,
    title,
    description,
    ward,
    landmark,
    severity = 'Medium',
    citizenName,
    citizenPhone,
    photoUrl
  }) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ticketNumber = `CR-2026-${randomSuffix}`;
    const reportId = `REP-2026-${randomSuffix}`;
    const formattedDate = getFormattedNow();
    const now = new Date();

    const authority = AUTHORITY_DIRECTORY[category] || AUTHORITY_DIRECTORY.roads;
    const slaTargetDate = new Date(now.getTime() + authority.slaHours * 60 * 60 * 1000).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const resolvedCategoryName = categoryName || (
      category === 'roads' ? 'Road Damage / Potholes' :
      category === 'sanitation' ? 'Garbage and Waste Management' :
      category === 'lighting' ? 'Streetlight Issues' :
      category === 'drainage' ? 'Drainage and Waterlogging' :
      category === 'accessibility' ? 'Footpath and Accessibility' : 'Public Safety'
    );

    const newReport = {
      id: reportId,
      ticketNumber,
      title: title || `${subcategory} in ${ward}`,
      category: resolvedCategoryName,
      subcategory: subcategory || 'Infrastructure Repair',
      location: landmark ? `${landmark}, ${ward}` : ward,
      zone: ward.includes('South') ? 'South Zone' : ward.includes('Central') ? 'Central Zone' : ward.includes('North') ? 'North Zone' : 'West Zone',
      wardNumber: ward.split('(')[0].trim(),
      landmark: landmark || 'Prominent neighborhood junction',
      reportedAt: formattedDate,
      status: 'Reported',
      severity: severity || 'Medium',
      upvotes: 1,
      verifiedCount: 0,
      assignedDepartment: 'Unassigned',
      assignedOfficer: 'Awaiting Allocation',
      assignedOfficerId: null,
      slaTargetDate,
      description,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
      isUserSubmitted: true,
      moderationStatus: 'Approved',
      moderationHistory: [],
      actionsTaken: [
        { timestamp: formattedDate, action: 'Grievance lodged by citizen via CivicReflex Web Portal' },
        { timestamp: formattedDate, action: `Queued for departmental allocation under ${resolvedCategoryName}` }
      ]
    };

    const newTicket = {
      ticketNumber,
      citizenName: citizenName || currentUser.name,
      citizenContact: citizenPhone ? `******${citizenPhone.slice(-4)}` : currentUser.phone,
      ward,
      category: resolvedCategoryName,
      issueType: subcategory || 'General Repair',
      subject: title || `${subcategory} reported`,
      address: landmark ? `${landmark}, ${ward}` : ward,
      submissionDate: formattedDate,
      expectedResolutionDate: slaTargetDate,
      currentStatus: 'Reported',
      urgencyLevel: `${severity} Priority`,
      isUserSubmitted: true,
      assignedOfficerId: null,
      assignedAuthority: {
        name: 'Awaiting Allocation',
        designation: 'Zonal Assignment Desk',
        department: 'Unassigned',
        contact: 'nodal-desk@civicreflex.gov.in'
      },
      timeline: [
        {
          stage: 'Reported',
          title: 'Grievance Lodged & Geotagged',
          description: `Grievance registered under ${resolvedCategoryName} with photographic evidence. Unique Ticket ID issued.`,
          date: formattedDate,
          completed: true,
          officer: 'System Automated Routing'
        }
      ]
    };

    setReports((prev) => [newReport, ...prev]);
    setTickets((prev) => ({ [ticketNumber]: newTicket, ...prev }));
    setUserReports((prev) => [newReport, ...prev]);

    // Record in administrative audit log
    addAuditLog({
      action: 'GRIEVANCE_LODGED',
      relatedRecord: ticketNumber,
      description: `Citizen registered new grievance: "${title || subcategory}" in ${ward}.`,
      user: citizenName || currentUser.name,
      role: 'citizen'
    });

    return { ticketNumber, report: newReport, ticket: newTicket };
  }, [currentUser, addAuditLog]);

  /**
   * Search ticket by Ticket ID (case-insensitive)
   */
  const getTicket = useCallback((ticketNumber) => {
    if (!ticketNumber) return null;
    const cleanId = String(ticketNumber).trim().toUpperCase();
    return tickets[cleanId] || null;
  }, [tickets]);

  /**
   * Find report by ID or Ticket Number
   */
  const getReport = useCallback((query) => {
    if (!query) return null;
    const clean = String(query).trim().toUpperCase();
    return reports.find((r) => r.ticketNumber === clean || r.id === clean) || null;
  }, [reports]);

  /**
   * Assign a complaint to department and field officer (Authority action)
   */
  const assignGrievance = useCallback((ticketNumber, {
    department,
    officerId,
    officerName,
    priority = 'High',
    remarks = '',
    adminUser = null
  }) => {
    const cleanId = String(ticketNumber).trim().toUpperCase();
    const formattedDate = getFormattedNow();

    // 1. Update Tickets mapping
    setTickets((prev) => {
      const ticket = prev[cleanId];
      if (!ticket) return prev;

      const newTimelineItem = {
        stage: 'Assigned',
        title: `Work Order Assigned to ${officerName}`,
        description: remarks || `Departmental assignment to ${department} approved by ${adminUser?.name || 'Authority'}.`,
        date: formattedDate,
        completed: true,
        officer: adminUser?.name || 'Superintending Engineer'
      };

      return {
        ...prev,
        [cleanId]: {
          ...ticket,
          currentStatus: 'Assigned',
          urgencyLevel: `${priority} Priority`,
          assignedOfficerId: officerId,
          assignedAuthority: {
            name: officerName,
            designation: 'Assigned Field Officer',
            department: department,
            contact: `${officerId.toLowerCase()}@civicreflex.gov.in`
          },
          timeline: [...ticket.timeline, newTimelineItem]
        }
      };
    });

    // 2. Update Public Reports Register
    setReports((prev) =>
      prev.map((r) => {
        if (r.ticketNumber !== cleanId) return r;
        return {
          ...r,
          status: 'Assigned',
          severity: priority,
          assignedDepartment: department,
          assignedOfficer: officerName,
          assignedOfficerId: officerId,
          actionsTaken: [
            ...r.actionsTaken,
            {
              timestamp: formattedDate,
              action: `Assigned to ${officerName} (${department}) by Authority. Priority: ${priority}. Instructions: "${remarks || 'Take immediate corrective action'}"`
            }
          ]
        };
      })
    );

    // 3. Update User Reports if present
    setUserReports((prev) =>
      prev.map((r) => {
        if (r.ticketNumber !== cleanId) return r;
        return {
          ...r,
          status: 'Assigned',
          assignedDepartment: department,
          assignedOfficer: officerName,
          assignedOfficerId: officerId
        };
      })
    );

    // Record in audit log
    addAuditLog({
      action: 'GRIEVANCE_ASSIGNED',
      relatedRecord: cleanId,
      description: `Work order assigned to ${officerName} (${department}) by ${adminUser?.name || 'Municipal Authority'}. Priority: ${priority}.`,
      user: adminUser?.name || 'Authority Officer',
      role: 'authority'
    });

    return true;
  }, [addAuditLog]);

  /**
   * Update grievance status according to valid lifecycle progression (Authority or System action)
   */
  const updateGrievanceStatus = useCallback((ticketNumber, newStatus, remarks = '', officerInfo = null) => {
    const cleanId = String(ticketNumber).trim().toUpperCase();
    const formattedDate = getFormattedNow();

    setTickets((prev) => {
      const ticket = prev[cleanId];
      if (!ticket) return prev;

      const previousStatus = ticket.currentStatus;
      const timelineEntry = {
        stage: newStatus,
        title: `Status Transition: ${newStatus}`,
        description: remarks || `Status transitioned from ${previousStatus} to ${newStatus}.`,
        date: formattedDate,
        completed: true,
        officer: officerInfo?.name || 'Municipal Authority'
      };

      return {
        ...prev,
        [cleanId]: {
          ...ticket,
          currentStatus: newStatus,
          timeline: [...ticket.timeline, timelineEntry]
        }
      };
    });

    setReports((prev) =>
      prev.map((r) => {
        if (r.ticketNumber !== cleanId) return r;
        return {
          ...r,
          status: newStatus,
          actionsTaken: [
            ...r.actionsTaken,
            {
              timestamp: formattedDate,
              action: `Status updated to ${newStatus} by ${officerInfo?.name || 'Authority'}. Remarks: "${remarks || 'Updated via Authority Portal'}"`
            }
          ]
        };
      })
    );

    setUserReports((prev) =>
      prev.map((r) => (r.ticketNumber === cleanId ? { ...r, status: newStatus } : r))
    );

    addAuditLog({
      action: 'STATUS_UPDATED',
      relatedRecord: cleanId,
      description: `Status changed to ${newStatus} by ${officerInfo?.name || 'Authority'}. Remarks: "${remarks || 'Standard update'}"`,
      user: officerInfo?.name || 'Municipal Authority',
      role: officerInfo?.role || 'authority'
    });

    return true;
  }, [addAuditLog]);

  /**
   * Field Officer Inspection & Work Order Actions
   */
  const updateFieldInspection = useCallback((ticketNumber, {
    action, // 'start_inspection' | 'submit_inspection' | 'start_work' | 'upload_photos' | 'complete_work'
    remarks = '',
    measurements = '',
    recommendedSquad = '',
    beforePhotoUrl = '',
    afterPhotoUrl = '',
    completionReport = '',
    officerUser = null
  }) => {
    const cleanId = String(ticketNumber).trim().toUpperCase();
    const formattedDate = getFormattedNow();

    setTickets((prev) => {
      const ticket = prev[cleanId];
      if (!ticket) return prev;

      let updatedStatus = ticket.currentStatus;
      let timelineTitle = 'Inspection Update';
      let timelineDesc = remarks;

      if (action === 'start_inspection') {
        timelineTitle = 'On-Ground Site Inspection Initiated';
        timelineDesc = `Field Officer ${officerUser?.name || 'assigned'} has arrived on site and initiated physical inspection.`;
      } else if (action === 'submit_inspection') {
        timelineTitle = 'Inspection Findings & Defect Assessment Filed';
        timelineDesc = `Measurements: ${measurements || 'Recorded'}. Squad Required: ${recommendedSquad || 'General PWD'}. Remarks: ${remarks}`;
      } else if (action === 'start_work') {
        updatedStatus = 'In Progress';
        timelineTitle = 'Field Remediation Work Started';
        timelineDesc = `Contractor squad deployed on site. Material preparation and repairs commenced. Remarks: ${remarks || 'Work actively ongoing'}`;
      } else if (action === 'upload_photos') {
        timelineTitle = 'Site Evidence Documentation Uploaded';
        timelineDesc = 'Before/during photo evidence recorded in audit log.';
      } else if (action === 'complete_work') {
        updatedStatus = 'Resolved';
        timelineTitle = 'Remediation Completed by Field Squad';
        timelineDesc = `Work order executed and completed. After-remediation photographic proof submitted. Awaiting Citizen Confirmation. Completion Notes: ${completionReport || remarks}`;
      }

      const newTimelineItem = {
        stage: updatedStatus,
        title: timelineTitle,
        description: timelineDesc,
        date: formattedDate,
        completed: true,
        officer: officerUser?.name || 'Field Officer'
      };

      return {
        ...prev,
        [cleanId]: {
          ...ticket,
          currentStatus: updatedStatus,
          inspectionDetails: {
            ...ticket.inspectionDetails,
            inspectionStartedAt: ticket.inspectionDetails?.inspectionStartedAt || formattedDate,
            measurements: measurements || ticket.inspectionDetails?.measurements,
            recommendedSquad: recommendedSquad || ticket.inspectionDetails?.recommendedSquad,
            inspectionRemarks: remarks || ticket.inspectionDetails?.inspectionRemarks,
            beforePhotoUrl: beforePhotoUrl || ticket.inspectionDetails?.beforePhotoUrl,
            afterPhotoUrl: afterPhotoUrl || ticket.inspectionDetails?.afterPhotoUrl,
            completionReport: completionReport || ticket.inspectionDetails?.completionReport,
            completedAt: action === 'complete_work' ? formattedDate : ticket.inspectionDetails?.completedAt
          },
          timeline: [...ticket.timeline, newTimelineItem]
        }
      };
    });

    setReports((prev) =>
      prev.map((r) => {
        if (r.ticketNumber !== cleanId) return r;
        let newStatus = r.status;
        if (action === 'start_work') newStatus = 'In Progress';
        if (action === 'complete_work') newStatus = 'Resolved';

        return {
          ...r,
          status: newStatus,
          afterPhotoUrl: afterPhotoUrl || r.afterPhotoUrl,
          actionsTaken: [
            ...r.actionsTaken,
            {
              timestamp: formattedDate,
              action: `Field Officer ${officerUser?.name || ''} performed [${action}]: ${remarks || completionReport || 'Inspection progress recorded'}`
            }
          ]
        };
      })
    );

    setUserReports((prev) =>
      prev.map((r) => {
        if (r.ticketNumber !== cleanId) return r;
        let newStatus = r.status;
        if (action === 'start_work') newStatus = 'In Progress';
        if (action === 'complete_work') newStatus = 'Resolved';
        return { ...r, status: newStatus };
      })
    );

    addAuditLog({
      action: `FIELD_${action.toUpperCase()}`,
      relatedRecord: cleanId,
      description: `Field Officer ${officerUser?.name || 'Officer'} executed [${action}] on ticket ${cleanId}. Remarks: "${remarks || completionReport || 'Completed'}"`,
      user: officerUser?.name || 'Field Officer',
      role: 'field_officer'
    });

    return true;
  }, [addAuditLog]);

  /**
   * Citizen Confirms Resolution (Transitions to Citizen-Confirmed)
   */
  const confirmCitizenResolution = useCallback((ticketNumber, citizenRemarks = '') => {
    const cleanId = String(ticketNumber).trim().toUpperCase();
    const formattedDate = getFormattedNow();

    setTickets((prev) => {
      const ticket = prev[cleanId];
      if (!ticket) return prev;

      const timelineItem = {
        stage: 'Citizen-Confirmed',
        title: 'Resolution Confirmed by Citizen',
        description: citizenRemarks ? `Citizen Sign-off: "${citizenRemarks}"` : 'Citizen confirmed on-site satisfaction with remediation work.',
        date: formattedDate,
        completed: true,
        officer: 'Verified Citizen'
      };

      return {
        ...prev,
        [cleanId]: {
          ...ticket,
          currentStatus: 'Citizen-Confirmed',
          verifiedByUser: true,
          timeline: [...ticket.timeline, timelineItem]
        }
      };
    });

    setReports((prev) =>
      prev.map((r) =>
        r.ticketNumber === cleanId
          ? {
              ...r,
              status: 'Citizen-Confirmed',
              verifiedCount: (r.verifiedCount || 0) + 1,
              actionsTaken: [
                ...r.actionsTaken,
                { timestamp: formattedDate, action: `Citizen confirmed satisfactory resolution: "${citizenRemarks || 'Closed with citizen sign-off'}"` }
              ]
            }
          : r
      )
    );

    setUserReports((prev) =>
      prev.map((r) =>
        r.ticketNumber === cleanId ? { ...r, status: 'Citizen-Confirmed', verifiedCount: (r.verifiedCount || 0) + 1 } : r
      )
    );

    addAuditLog({
      action: 'CITIZEN_CONFIRMATION',
      relatedRecord: cleanId,
      description: `Citizen verified and closed complaint ${cleanId}. Remarks: "${citizenRemarks || 'Satisfied'}"`,
      user: currentUser.name,
      role: 'citizen'
    });

    return true;
  }, [currentUser, addAuditLog]);

  /**
   * Reopen Grievance when citizen verification indicates problem persists
   */
  const reopenGrievance = useCallback((ticketNumber, disputeRemarks = '') => {
    const cleanId = String(ticketNumber).trim().toUpperCase();
    const formattedDate = getFormattedNow();

    setTickets((prev) => {
      const ticket = prev[cleanId];
      if (!ticket) return prev;

      const timelineItem = {
        stage: 'Reopened',
        title: 'Grievance Reopened: Issue Persists on Ground',
        description: disputeRemarks ? `Citizen Inspection Audit: "${disputeRemarks}"` : 'Citizen inspected site and rejected resolution. Reopened for field re-inspection.',
        date: formattedDate,
        completed: true,
        officer: 'Citizen Audit Appeal'
      };

      return {
        ...prev,
        [cleanId]: {
          ...ticket,
          currentStatus: 'Reopened - Under Investigation',
          urgencyLevel: 'Critical Priority',
          timeline: [...ticket.timeline, timelineItem]
        }
      };
    });

    setReports((prev) =>
      prev.map((r) =>
        r.ticketNumber === cleanId
          ? {
              ...r,
              status: 'Reopened - Under Investigation',
              severity: 'Critical',
              actionsTaken: [
                ...r.actionsTaken,
                { timestamp: formattedDate, action: `Grievance reopened by citizen due to incomplete work: "${disputeRemarks || 'Requires re-inspection'}"` }
              ]
            }
          : r
      )
    );

    setUserReports((prev) =>
      prev.map((r) =>
        r.ticketNumber === cleanId ? { ...r, status: 'Reopened - Under Investigation', severity: 'Critical' } : r
      )
    );

    addAuditLog({
      action: 'GRIEVANCE_REOPENED',
      relatedRecord: cleanId,
      description: `Grievance ${cleanId} reopened by citizen. Dispute: "${disputeRemarks || 'Defect still persists'}"`,
      user: currentUser.name,
      role: 'citizen'
    });

    return true;
  }, [currentUser, addAuditLog]);

  /**
   * Approve and Auto-Escalate a Blind Spot Cluster into a Formal Grievance Ticket (Authority Action)
   */
  const approveAndEscalateCluster = useCallback((clusterId, adminRemarks = '', authorityUser = null) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ticketNumber = `CR-2026-BLIND-${randomSuffix}`;
    const reportId = `REP-BLIND-${randomSuffix}`;
    const formattedDate = getFormattedNow();

    let targetCluster = null;

    setBlindSpotClusters((prev) =>
      prev.map((c) => {
        if (c.id === clusterId) {
          targetCluster = c;
          return {
            ...c,
            approvalStatus: 'Approved & Converted to Ticket',
            resultingTicketId: ticketNumber,
            approvedAt: formattedDate,
            approvedBy: authorityUser?.name || 'Municipal Authority'
          };
        }
        return c;
      })
    );

    if (!targetCluster) {
      targetCluster = DEFAULT_BLIND_SPOTS.find((c) => c.id === clusterId) || DEFAULT_BLIND_SPOTS[0];
    }

    const newReport = {
      id: reportId,
      ticketNumber,
      title: `[Auto-Escalated Blind Spot] ${targetCluster.title}`,
      category: targetCluster.category === 'Poorly Lit Streets' ? 'Streetlight Issues' :
                targetCluster.category === 'Missing Accessibility Ramps' ? 'Footpath and Accessibility' :
                'Footpath and Accessibility',
      subcategory: targetCluster.category,
      location: targetCluster.location,
      zone: targetCluster.ward.includes('North') ? 'North Zone' : targetCluster.ward.includes('Central') ? 'Central Zone' : 'South Zone',
      wardNumber: targetCluster.ward.split('(')[0].trim(),
      landmark: targetCluster.location,
      reportedAt: formattedDate,
      status: 'Verified',
      severity: 'Critical',
      upvotes: targetCluster.reportsCount * 4,
      verifiedCount: targetCluster.reportsCount,
      assignedDepartment: targetCluster.recommendedDept,
      assignedOfficer: targetCluster.recommendedOfficer,
      assignedOfficerId: targetCluster.recommendedDept === 'Roads and Infrastructure' ? 'OFF-PWD-014' :
                         targetCluster.recommendedDept === 'Electrical Maintenance' ? 'OFF-ELE-008' :
                         'OFF-ACC-002',
      slaTargetDate: 'Within 48 Hours (High Priority Safety SLA)',
      description: `Auto-escalated from ${targetCluster.reportsCount} independent citizen experience audits. ${targetCluster.details} Admin Instructions: ${adminRemarks || 'Proceed with urgent site mitigation.'}`,
      photoUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80',
      isBlindSpotEscalated: true,
      moderationStatus: 'Approved',
      moderationHistory: [],
      actionsTaken: [
        { timestamp: formattedDate, action: `Cluster reached auto-escalation threshold (${targetCluster.reportsCount} citizen reports). Approved by Authority ${authorityUser?.name || 'Er. Rameshwar Rao'}` },
        { timestamp: formattedDate, action: `Formal Work Order Ticket ${ticketNumber} generated and assigned to ${targetCluster.recommendedDept}` }
      ]
    };

    const newTicket = {
      ticketNumber,
      citizenName: `Crowdsourced Ward Cluster (${targetCluster.reportsCount} Verified Residents)`,
      citizenContact: 'CivicReflex Safety Cell',
      ward: targetCluster.ward,
      category: newReport.category,
      issueType: targetCluster.category,
      subject: newReport.title,
      address: targetCluster.location,
      submissionDate: formattedDate,
      expectedResolutionDate: 'Within 48 Hours',
      currentStatus: 'Verified',
      urgencyLevel: 'Critical Priority',
      isBlindSpotEscalated: true,
      assignedOfficerId: newReport.assignedOfficerId,
      assignedAuthority: {
        name: targetCluster.recommendedOfficer,
        designation: 'Nodal Section Officer',
        department: targetCluster.recommendedDept,
        contact: `${targetCluster.recommendedDept.toLowerCase().replace(/\s+/g, '-')}@civicreflex.gov.in`
      },
      timeline: [
        {
          stage: 'Verified',
          title: 'Cluster Threshold Auto-Escalation Approved',
          description: `Reviewed and sanctioned by Municipal Authority. Converted to high-priority infrastructure ticket from ${targetCluster.reportsCount} independent audits.`,
          date: formattedDate,
          completed: true,
          officer: authorityUser?.name || 'Superintending Engineer'
        }
      ]
    };

    setReports((prev) => [newReport, ...prev]);
    setTickets((prev) => ({ [ticketNumber]: newTicket, ...prev }));

    addAuditLog({
      action: 'BLIND_SPOT_ESCALATED',
      relatedRecord: ticketNumber,
      description: `Cluster ${targetCluster.title} auto-escalated to official ticket ${ticketNumber} by ${authorityUser?.name || 'Authority'}.`,
      user: authorityUser?.name || 'Municipal Authority',
      role: 'authority'
    });

    return { ticketNumber, report: newReport, ticket: newTicket };
  }, [addAuditLog]);

  /**
   * Cast a community verification endorsement vote on a ticket (Citizen action)
   */
  const verifyTicket = useCallback((ticketNumber) => {
    const cleanId = String(ticketNumber).trim().toUpperCase();
    
    setTickets((prev) => {
      const ticket = prev[cleanId];
      if (!ticket) return prev;

      const updatedTimeline = ticket.timeline.map((step) => {
        if (step.stage === 'Verification') {
          return { ...step, completed: true, title: 'Citizen Verified (Endorsed by You)' };
        }
        return step;
      });

      return {
        ...prev,
        [cleanId]: {
          ...ticket,
          timeline: updatedTimeline,
          verifiedByUser: true
        }
      };
    });

    setReports((prev) =>
      prev.map((r) =>
        r.ticketNumber === cleanId ? { ...r, verifiedCount: (r.verifiedCount || 0) + 1 } : r
      )
    );

    setUserReports((prev) =>
      prev.map((r) =>
        r.ticketNumber === cleanId ? { ...r, verifiedCount: (r.verifiedCount || 0) + 1 } : r
      )
    );
  }, []);

  /**
   * Upvote a public report
   */
  const upvoteReport = useCallback((reportId) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
  }, []);

  // ==========================================
  // MILESTONE 4: SYSTEM ADMINISTRATOR METHODS
  // ==========================================

  /**
   * Toggle user account suspension (Active <-> Suspended)
   * Disallows self-suspension if admin is logged in as the target user.
   */
  const toggleUserSuspension = useCallback((userId, reason = '', adminUser = null) => {
    if (adminUser?.id === userId) {
      return { success: false, error: 'Administrative Protection: You cannot suspend your own active administrator account.' };
    }

    let targetUser = null;
    let nextStatus = 'Suspended';

    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          nextStatus = u.accountStatus === 'Suspended' ? 'Active' : 'Suspended';
          targetUser = {
            ...u,
            accountStatus: nextStatus,
            suspensionReason: nextStatus === 'Suspended' ? (reason || 'Violation of portal acceptable use policy') : null,
            suspendedAt: nextStatus === 'Suspended' ? getFormattedNow() : null,
            suspendedBy: nextStatus === 'Suspended' ? (adminUser?.name || 'CivicReflex System Administrator') : null
          };
          return targetUser;
        }
        return u;
      })
    );

    if (targetUser) {
      addAuditLog({
        action: nextStatus === 'Suspended' ? 'USER_SUSPENDED' : 'USER_REINSTATED',
        relatedRecord: userId,
        description: `User account ${targetUser.name} (${userId}) status changed to ${nextStatus}. ${nextStatus === 'Suspended' ? `Reason: ${reason || 'Administrative action'}` : 'Restored by Administrator'}.`,
        user: adminUser?.name || 'System Administrator',
        role: 'admin'
      });
      return { success: true, user: targetUser, status: nextStatus };
    }

    return { success: false, error: 'User record not found in directory.' };
  }, [addAuditLog]);

  /**
   * Update User Record in Directory
   */
  const updateUser = useCallback((userId, updatedData, adminUser = null) => {
    let updatedUser = null;
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          updatedUser = { ...u, ...updatedData };
          return updatedUser;
        }
        return u;
      })
    );

    if (updatedUser) {
      addAuditLog({
        action: 'USER_PROFILE_UPDATED',
        relatedRecord: userId,
        description: `Admin updated user record for ${updatedUser.name} (${userId}). Role: ${updatedUser.role}.`,
        user: adminUser?.name || 'System Administrator',
        role: 'admin'
      });
      return { success: true, user: updatedUser };
    }
    return { success: false, error: 'User not found.' };
  }, [addAuditLog]);

  /**
   * Create New User Record in Directory
   */
  const createUser = useCallback((userData, adminUser = null) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix = userData.role === 'admin' ? 'ADM' :
                   userData.role === 'authority' ? 'AUTH' :
                   userData.role === 'field_officer' ? 'OFF' : 'USR';
    const newId = `${prefix}-${randomSuffix}`;
    const formattedDate = getFormattedNow();

    const newUser = {
      id: newId,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      designation: userData.designation || (userData.role === 'citizen' ? 'Registered Citizen' : 'Municipal Officer'),
      department: userData.department || 'General Administration',
      ward: userData.ward || 'Ward 14 (South Zone)',
      phone: userData.phone || '+91 98000 00000',
      registrationDate: formattedDate,
      accountStatus: 'Active',
      submittedComplaintsCount: 0
    };

    setUsersList((prev) => [newUser, ...prev]);

    addAuditLog({
      action: 'USER_ACCOUNT_CREATED',
      relatedRecord: newId,
      description: `New ${userData.role} account created for ${userData.name} (${userData.email}).`,
      user: adminUser?.name || 'System Administrator',
      role: 'admin'
    });

    return { success: true, user: newUser };
  }, [addAuditLog]);

  /**
   * Content Moderation Decision Commit (Non-Destructive)
   * Decisions: 'Approved' | 'Rejected' | 'Duplicate' | 'Clarification Requested' | 'Escalated'
   */
  const recordModerationDecision = useCallback((ticketNumber, {
    decision, // 'Approved' | 'Rejected' | 'Duplicate' | 'Clarification Requested' | 'Escalated'
    reason = '',
    primaryTicketId = '',
    clarificationNotes = '',
    adminUser = null
  }) => {
    const cleanId = String(ticketNumber).trim().toUpperCase();
    const formattedDate = getFormattedNow();
    const moderatorName = adminUser?.name || 'CivicReflex System Administrator';

    // 1. Update Public Reports Register
    setReports((prev) =>
      prev.map((r) => {
        if (r.ticketNumber !== cleanId) return r;

        let newStatus = r.status;
        let assignedDept = r.assignedDepartment;
        let assignedOff = r.assignedOfficer;

        if (decision === 'Approved') {
          newStatus = 'Reported';
          assignedDept = 'Roads and Infrastructure';
          assignedOff = 'Awaiting Allocation';
        } else if (decision === 'Rejected') {
          newStatus = 'Rejected by Moderation';
        } else if (decision === 'Duplicate') {
          newStatus = 'Duplicate';
        } else if (decision === 'Clarification Requested') {
          newStatus = 'Clarification Requested';
        } else if (decision === 'Escalated') {
          newStatus = 'Under Vigilance Review';
        }

        const historyEntry = {
          decision,
          reason: reason || clarificationNotes || (decision === 'Duplicate' ? `Duplicate of ${primaryTicketId}` : 'Reviewed by Moderator'),
          primaryTicketId: decision === 'Duplicate' ? primaryTicketId : null,
          clarificationNotes: decision === 'Clarification Requested' ? clarificationNotes : null,
          timestamp: formattedDate,
          moderator: moderatorName
        };

        return {
          ...r,
          status: newStatus,
          moderationStatus: decision,
          assignedDepartment: assignedDept,
          assignedOfficer: assignedOff,
          primaryTicketMatch: decision === 'Duplicate' ? primaryTicketId : r.primaryTicketMatch,
          moderationHistory: [...(r.moderationHistory || []), historyEntry],
          actionsTaken: [
            ...r.actionsTaken,
            {
              timestamp: formattedDate,
              action: `Content Moderation Decision [${decision}]: ${reason || clarificationNotes || 'Evaluated by System Administrator'}`
            }
          ]
        };
      })
    );

    // 2. Update Tickets Mapping if present
    setTickets((prev) => {
      const ticket = prev[cleanId];
      if (!ticket) return prev;

      let newStatus = ticket.currentStatus;
      if (decision === 'Approved') newStatus = 'Reported';
      if (decision === 'Rejected') newStatus = 'Rejected by Moderation';
      if (decision === 'Duplicate') newStatus = 'Duplicate';
      if (decision === 'Clarification Requested') newStatus = 'Clarification Requested';
      if (decision === 'Escalated') newStatus = 'Under Vigilance Review';

      const timelineItem = {
        stage: `Moderation: ${decision}`,
        title: `Content Moderation Review – ${decision}`,
        description: reason || clarificationNotes || `Decision: ${decision} by ${moderatorName}.`,
        date: formattedDate,
        completed: true,
        officer: moderatorName
      };

      return {
        ...prev,
        [cleanId]: {
          ...ticket,
          currentStatus: newStatus,
          moderationStatus: decision,
          timeline: [...ticket.timeline, timelineItem]
        }
      };
    });

    // 3. Log to Administrative Audit Log
    addAuditLog({
      action: `MODERATION_${decision.toUpperCase().replace(/\s+/g, '_')}`,
      relatedRecord: cleanId,
      description: `Moderation verdict '${decision}' recorded on complaint ${cleanId}. ${reason || clarificationNotes || (decision === 'Duplicate' ? `Linked to ${primaryTicketId}` : '')}`,
      user: moderatorName,
      role: 'admin'
    });

    return { success: true, ticketNumber: cleanId, decision };
  }, [addAuditLog]);

  /**
   * Save or Update Ward Record
   */
  const saveWard = useCallback((wardData, adminUser = null) => {
    let isEdit = false;
    setWardsList((prev) => {
      const exists = prev.some((w) => w.wardNumber.toLowerCase() === wardData.wardNumber.toLowerCase());
      if (exists) {
        isEdit = true;
        return prev.map((w) => (w.wardNumber.toLowerCase() === wardData.wardNumber.toLowerCase() ? { ...w, ...wardData } : w));
      }
      return [...prev, { ...wardData, totalGrievances: 0, resolvedGrievances: 0, resolutionRate: 100, status: 'Active' }];
    });

    addAuditLog({
      action: isEdit ? 'WARD_CONFIG_UPDATED' : 'WARD_ADDED',
      relatedRecord: wardData.wardNumber,
      description: `Ward ${wardData.wardNumber} (${wardData.wardName}) ${isEdit ? 'configuration updated' : 'created'}. Zone: ${wardData.zone}.`,
      user: adminUser?.name || 'System Administrator',
      role: 'admin'
    });

    return { success: true };
  }, [addAuditLog]);

  /**
   * Delete or Deactivate Ward Record
   */
  const deleteWard = useCallback((wardNumber, adminUser = null) => {
    setWardsList((prev) => prev.filter((w) => w.wardNumber !== wardNumber));
    addAuditLog({
      action: 'WARD_REMOVED',
      relatedRecord: wardNumber,
      description: `Ward ${wardNumber} decommissioned from active municipal directory.`,
      user: adminUser?.name || 'System Administrator',
      role: 'admin'
    });
    return { success: true };
  }, [addAuditLog]);

  /**
   * Save or Update Department Record
   */
  const saveDepartment = useCallback((deptData, adminUser = null) => {
    let isEdit = false;
    const deptId = deptData.id || `dept-${Date.now()}`;

    setDepartmentsList((prev) => {
      const exists = prev.some((d) => d.id === deptId || d.name.toLowerCase() === deptData.name.toLowerCase());
      if (exists) {
        isEdit = true;
        return prev.map((d) => (d.id === deptId || d.name.toLowerCase() === deptData.name.toLowerCase() ? { ...d, ...deptData } : d));
      }
      return [...prev, { ...deptData, id: deptId, activeComplaints: 0, slaComplianceRate: 100 }];
    });

    addAuditLog({
      action: isEdit ? 'DEPARTMENT_UPDATED' : 'DEPARTMENT_ADDED',
      relatedRecord: deptData.code || deptId,
      description: `Department "${deptData.name}" ${isEdit ? 'updated' : 'added to directory'}. Nodal Officer: ${deptData.nodalOfficer}.`,
      user: adminUser?.name || 'System Administrator',
      role: 'admin'
    });

    return { success: true };
  }, [addAuditLog]);

  /**
   * Delete Department Record
   */
  const deleteDepartment = useCallback((deptId, adminUser = null) => {
    setDepartmentsList((prev) => prev.filter((d) => d.id !== deptId));
    addAuditLog({
      action: 'DEPARTMENT_REMOVED',
      relatedRecord: deptId,
      description: `Department record ID ${deptId} removed from system directory.`,
      user: adminUser?.name || 'System Administrator',
      role: 'admin'
    });
    return { success: true };
  }, [addAuditLog]);

  /**
   * Save or Update Civic Category Record
   */
  const saveCategory = useCallback((categoryData, adminUser = null) => {
    let isEdit = false;
    const catId = categoryData.id || `cat-${Date.now()}`;

    setCategoriesList((prev) => {
      const exists = prev.some((c) => c.id === catId);
      if (exists) {
        isEdit = true;
        return prev.map((c) => (c.id === catId ? { ...c, ...categoryData } : c));
      }
      return [...prev, { ...categoryData, id: catId, status: 'Active' }];
    });

    addAuditLog({
      action: isEdit ? 'CATEGORY_UPDATED' : 'CATEGORY_ADDED',
      relatedRecord: catId,
      description: `Civic Category "${categoryData.name}" ${isEdit ? 'parameters modified' : 'added to portal'}. SLA: ${categoryData.defaultSlaHours}h.`,
      user: adminUser?.name || 'System Administrator',
      role: 'admin'
    });

    return { success: true };
  }, [addAuditLog]);

  /**
   * Toggle Civic Category Status (Active <-> Deactivated)
   * Deactivated categories are hidden from new /report submissions but preserved on historical records.
   */
  const toggleCategoryStatus = useCallback((categoryId, adminUser = null) => {
    let targetCat = null;
    let nextStatus = 'Deactivated';

    setCategoriesList((prev) =>
      prev.map((c) => {
        if (c.id === categoryId) {
          nextStatus = c.status === 'Active' ? 'Deactivated' : 'Active';
          targetCat = { ...c, status: nextStatus };
          return targetCat;
        }
        return c;
      })
    );

    if (targetCat) {
      addAuditLog({
        action: nextStatus === 'Active' ? 'CATEGORY_ACTIVATED' : 'CATEGORY_DEACTIVATED',
        relatedRecord: categoryId,
        description: `Civic Category "${targetCat.name}" is now ${nextStatus}. ${nextStatus === 'Deactivated' ? 'Hidden from citizen reporting form.' : 'Restored for citizen reporting.'}`,
        user: adminUser?.name || 'System Administrator',
        role: 'admin'
      });
      return { success: true, category: targetCat, status: nextStatus };
    }

    return { success: false, error: 'Category not found.' };
  }, [addAuditLog]);

  /**
   * Save System Configuration Settings
   */
  const saveSystemSettings = useCallback((newSettings, adminUser = null) => {
    setSystemSettings((prev) => ({ ...prev, ...newSettings }));
    addAuditLog({
      action: 'SYSTEM_SETTINGS_UPDATED',
      relatedRecord: 'SYS-GLOBAL-CONFIG',
      description: 'System configuration and policy parameters updated by Administrator.',
      user: adminUser?.name || 'System Administrator',
      role: 'admin'
    });
    return { success: true };
  }, [addAuditLog]);

  return (
    <ReportsContext.Provider
      value={{
        reports,
        tickets,
        userReports,
        currentUser,
        blindSpotClusters,
        submitReport,
        getTicket,
        getReport,
        assignGrievance,
        updateGrievanceStatus,
        updateFieldInspection,
        confirmCitizenResolution,
        reopenGrievance,
        approveAndEscalateCluster,
        verifyTicket,
        upvoteReport,
        // Milestone 4: Administrator shared state & actions
        usersList,
        wardsList,
        departmentsList,
        categoriesList,
        auditLogs,
        systemSettings,
        toggleUserSuspension,
        updateUser,
        createUser,
        recordModerationDecision,
        saveWard,
        deleteWard,
        saveDepartment,
        deleteDepartment,
        saveCategory,
        toggleCategoryStatus,
        saveSystemSettings,
        addAuditLog
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsContext;
