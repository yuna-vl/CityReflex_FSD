// Mock Tickets Data with detailed civic lifecycle tracking

export const MOCK_TICKETS = {
  "CR-2026-8842": {
    ticketNumber: "CR-2026-8842",
    citizenName: "Vikram R. Sharma",
    citizenContact: "******4821",
    ward: "Ward 14 (South Zone)",
    category: "Roads & Footpaths",
    issueType: "Pothole Repair",
    subject: "Deep crater-sized pothole near junction causing traffic hazard",
    address: "Opposite State Bank, Ward 14, M.G. Road",
    submissionDate: "28 Oct 2026, 09:15 AM",
    expectedResolutionDate: "03 Nov 2026, 06:00 PM",
    currentStatus: "In Progress",
    urgencyLevel: "High Priority",
    assignedOfficerId: "OFF-PWD-014",
    assignedAuthority: {
      name: "Er. Rameshwar Rao / Mr. V. Nair (JE)",
      designation: "Executive Engineer & Junior Engineer (Road Maintenance)",
      department: "Roads and Infrastructure",
      contact: "pwd-ward14@civicreflex.gov.in"
    },
    timeline: [
      {
        stage: "Registered",
        title: "Grievance Lodged",
        description: "Complaint successfully recorded with geo-location coordinates (18.5204° N, 73.8567° E). Automated SMS acknowledgment dispatched to citizen.",
        date: "28 Oct 2026, 09:15 AM",
        completed: true,
        officer: "System Automated Routing"
      },
      {
        stage: "Assigned",
        title: "Assigned to Ward Engineer",
        description: "Forwarded to PWD South Zone Division. Ticket accepted by Executive Engineer Er. Rameshwar Rao.",
        date: "28 Oct 2026, 11:30 AM",
        completed: true,
        officer: "Zonal Nodal Desk"
      },
      {
        stage: "Field Inspection",
        title: "Physical Inspection Completed",
        description: "Junior Engineer Mr. V. Nair inspected the site. Crater depth measured at 18cm, width 1.4m. Work order WO-PWD-1049 issued to maintenance contractor.",
        date: "29 Oct 2026, 03:00 PM",
        completed: true,
        officer: "Mr. V. Nair (JE, Ward 14)"
      },
      {
        stage: "Execution",
        title: "Patching & Resurfacing in Progress",
        description: "Cold mix asphalt patching initiated by contractor squad. Base gravel compaction completed. Bituminous topcoat curing scheduled.",
        date: "30 Oct 2026, 10:00 AM",
        completed: true,
        officer: "Squad Leader S. Verma"
      },
      {
        stage: "Verification",
        title: "Citizen Redressal Verification",
        description: "Awaiting field photo upload and verification by ward citizens through CivicReflex public verification protocol.",
        date: "Estimated: 02 Nov 2026",
        completed: false,
        officer: "Ward Citizens Council"
      },
      {
        stage: "Closure",
        title: "Formal Ticket Closure",
        description: "Subject to at least 3 positive citizen verification votes in the ward.",
        date: "Pending Verification",
        completed: false,
        officer: "Zonal Grievance Officer"
      }
    ]
  },
  "CR-2026-8843": {
    ticketNumber: "CR-2026-8843",
    citizenName: "Anita S. Sundaram",
    citizenContact: "******1982",
    ward: "Ward 08 (Central Zone)",
    category: "Solid Waste Management",
    issueType: "Garbage Dump Clearance",
    subject: "Secondary garbage accumulation point overflowing on public walkway",
    address: "Gandhi Market Outer Gate, Ward 08",
    submissionDate: "29 Oct 2026, 07:45 AM",
    expectedResolutionDate: "30 Oct 2026, 02:00 PM",
    currentStatus: "Resolved",
    urgencyLevel: "Critical",
    assignedAuthority: {
      name: "Dr. S. K. Mukherjee",
      designation: "Chief Sanitary Inspector",
      department: "Health & Sanitation Directorate",
      contact: "sanitation-central@civicreflex.gov.in"
    },
    timeline: [
      {
        stage: "Registered",
        title: "Grievance Lodged",
        description: "Complaint logged with photographic evidence showing 20m sidewalk blockage.",
        date: "29 Oct 2026, 07:45 AM",
        completed: true,
        officer: "Automated Desk"
      },
      {
        stage: "Assigned",
        title: "Assigned to Sanitation Division",
        description: "Immediate action ticket created under 24-hour SLA standard.",
        date: "29 Oct 2026, 08:30 AM",
        completed: true,
        officer: "Central Sanitation Desk"
      },
      {
        stage: "Execution",
        title: "Special Sanitation Drive Conducted",
        description: "Compactor truck #DL-1GC-4482 deployed. 3.2 metric tonnes of accumulated waste cleared. Bleaching powder and citronella spray applied.",
        date: "29 Oct 2026, 02:15 PM",
        completed: true,
        officer: "Sanitary Inspector Ward 08"
      },
      {
        stage: "Verification",
        title: "Citizen Verified & Confirmed",
        description: "12 registered local shopkeepers and residents confirmed clearance with 100% satisfaction score.",
        date: "30 Oct 2026, 08:00 AM",
        completed: true,
        officer: "Citizen Audit Pool"
      },
      {
        stage: "Closure",
        title: "Grievance Successfully Resolved",
        description: "SLA target met within 6.5 hours of filing. Quality report signed off.",
        date: "30 Oct 2026, 08:30 AM",
        completed: true,
        officer: "Chief Sanitary Inspector"
      }
    ]
  },
  "CR-2026-8844": {
    ticketNumber: "CR-2026-8844",
    citizenName: "Meenakshi Narayan",
    citizenContact: "******9203",
    ward: "Ward 22 (North Zone)",
    category: "Street Lighting & Electrical",
    issueType: "Streetlight Outage (Blind Spot)",
    subject: "Cluster of non-functional sodium vapor streetlights creating dark stretch",
    address: "Sector 4 Link Road, Ward 22",
    submissionDate: "30 Oct 2026, 08:10 PM",
    expectedResolutionDate: "02 Nov 2026, 06:00 PM",
    currentStatus: "In Progress",
    urgencyLevel: "High Priority",
    assignedAuthority: {
      name: "Er. Amitava Sen",
      designation: "Assistant Engineer (Electrical)",
      department: "Electrical Infrastructure Wing",
      contact: "electrical-north@civicreflex.gov.in"
    },
    timeline: [
      {
        stage: "Registered",
        title: "Blind Spot Report Logged",
        description: "Night-time safety report registered with illumination assessment rating 1/5.",
        date: "30 Oct 2026, 08:10 PM",
        completed: true,
        officer: "Blind Spot Audit System"
      },
      {
        stage: "Assigned",
        title: "Assigned to Electrical Wing",
        description: "Flagged for priority feeder pillar line maintenance.",
        date: "31 Oct 2026, 09:30 AM",
        completed: true,
        officer: "Zonal Electrical Nodal"
      },
      {
        stage: "Execution",
        title: "Feeder Transformer Cable Replacement",
        description: "Fault identified in underground aluminum conduit near pole #SN-45. Replacement cable laid.",
        date: "31 Oct 2026, 04:00 PM",
        completed: true,
        officer: "Er. Amitava Sen"
      },
      {
        stage: "Verification",
        title: "Photometric Night Verification",
        description: "Scheduled for night audit by Women's Safety & Illumination volunteer group.",
        date: "Scheduled: 01 Nov 2026, 09:00 PM",
        completed: false,
        officer: "Safety Audit Desk"
      }
    ]
  },
  "CR-2026-8850": {
    ticketNumber: "CR-2026-8850",
    citizenName: "Rakesh J. Verma",
    citizenContact: "******1982",
    ward: "Ward 14 (South Zone)",
    category: "Road Damage / Potholes",
    issueType: "Pothole Repair",
    subject: "Crumbling bitumen edge and hazardous potholes along Ring Road",
    address: "Ring Road Sector 9 Junction, Ward 14",
    submissionDate: "01 Nov 2026, 08:30 AM",
    expectedResolutionDate: "04 Nov 2026, 06:00 PM",
    currentStatus: "Reported",
    urgencyLevel: "High Priority",
    assignedOfficerId: null,
    assignedAuthority: {
      name: "Awaiting Allocation",
      designation: "Zonal Assignment Desk",
      department: "Unassigned",
      contact: "nodal-ward14@civicreflex.gov.in"
    },
    timeline: [
      {
        stage: "Registered",
        title: "Grievance Lodged & Geotagged",
        description: "Complaint registered with photographic evidence by citizen. Queued for departmental work order allocation.",
        date: "01 Nov 2026, 08:30 AM",
        completed: true,
        officer: "System Automated Routing"
      }
    ]
  },
  "CR-2026-8851": {
    ticketNumber: "CR-2026-8851",
    citizenName: "Sunita Agarwal",
    citizenContact: "******7731",
    ward: "Ward 08 (Central Zone)",
    category: "Garbage and Waste Management",
    issueType: "Debris Clearance",
    subject: "Illegal construction debris and garbage dumped blocking community garden gate",
    address: "Shastri Park Gate 2, Ward 08",
    submissionDate: "01 Nov 2026, 10:15 AM",
    expectedResolutionDate: "03 Nov 2026, 06:00 PM",
    currentStatus: "Verified",
    urgencyLevel: "Medium Priority",
    assignedOfficerId: null,
    assignedAuthority: {
      name: "Awaiting Allocation",
      designation: "Zonal Assignment Desk",
      department: "Unassigned",
      contact: "sanitation-central@civicreflex.gov.in"
    },
    timeline: [
      {
        stage: "Registered",
        title: "Grievance Lodged",
        description: "Citizen reported illegal waste dumping outside park entrance.",
        date: "01 Nov 2026, 10:15 AM",
        completed: true,
        officer: "System Automated Routing"
      },
      {
        stage: "Verified",
        title: "Community Verification Threshold Reached",
        description: "7 ward residents verified on-site presence of debris obstruction.",
        date: "01 Nov 2026, 11:00 AM",
        completed: true,
        officer: "Ward 08 Citizens Council"
      }
    ]
  },
  "CR-2026-8860": {
    ticketNumber: "CR-2026-8860",
    citizenName: "Rajesh K. Patel",
    citizenContact: "******4901",
    ward: "Ward 14 (South Zone)",
    category: "Road Damage / Potholes",
    issueType: "Pothole Repair",
    subject: "Duplicate report: Crater on M.G. Road near State Bank junction",
    address: "Opposite State Bank, Ward 14, M.G. Road",
    submissionDate: "01 Nov 2026, 02:30 PM",
    expectedResolutionDate: "04 Nov 2026, 06:00 PM",
    currentStatus: "Under Review",
    urgencyLevel: "High Priority",
    moderationStatus: "Pending Moderation",
    assignedOfficerId: null,
    assignedAuthority: {
      name: "Content Moderation Centre",
      designation: "Central Moderation Desk",
      department: "Digital Governance Cell",
      contact: "moderation@civicreflex.gov.in"
    },
    timeline: [
      {
        stage: "Registered",
        title: "Grievance Lodged",
        description: "Report flagged for duplicate check against CR-2026-8842.",
        date: "01 Nov 2026, 02:30 PM",
        completed: true,
        officer: "System Automated Scanner"
      }
    ]
  },
  "CR-2026-8861": {
    ticketNumber: "CR-2026-8861",
    citizenName: "Anonymous Citizen",
    citizenContact: "Protected (Privacy Compliant)",
    ward: "Ward 08 (Central Zone)",
    category: "Streetlight Issues",
    issueType: "Spam Report",
    subject: "Commercial tuition classes flex banner attached to municipal lamp post",
    address: "Gandhi Chowk Corner, Ward 08",
    submissionDate: "01 Nov 2026, 03:15 PM",
    expectedResolutionDate: "Pending Review",
    currentStatus: "Under Review",
    urgencyLevel: "Low Priority",
    moderationStatus: "Pending Moderation",
    assignedOfficerId: null,
    assignedAuthority: {
      name: "Content Moderation Centre",
      designation: "Central Moderation Desk",
      department: "Digital Governance Cell",
      contact: "moderation@civicreflex.gov.in"
    },
    timeline: [
      {
        stage: "Registered",
        title: "Submission Flagged for Non-Civic Content",
        description: "Automated scan detected commercial advertisement.",
        date: "01 Nov 2026, 03:15 PM",
        completed: true,
        officer: "AI Content Filter"
      }
    ]
  },
  "CR-2026-8862": {
    ticketNumber: "CR-2026-8862",
    citizenName: "Sunil M.",
    citizenContact: "******8835",
    ward: "Ward 11 (West Zone)",
    category: "Drainage and Waterlogging",
    issueType: "Blocked Drain",
    subject: "Choked drain opening near vegetable market entrance",
    address: "Vegetable Mandi Gate, Ward 11",
    submissionDate: "01 Nov 2026, 04:00 PM",
    expectedResolutionDate: "Pending Review",
    currentStatus: "Under Review",
    urgencyLevel: "Medium Priority",
    moderationStatus: "Pending Moderation",
    assignedOfficerId: null,
    assignedAuthority: {
      name: "Content Moderation Centre",
      designation: "Central Moderation Desk",
      department: "Digital Governance Cell",
      contact: "moderation@civicreflex.gov.in"
    },
    timeline: [
      {
        stage: "Registered",
        title: "Photo Proof Flagged for Inappropriate Content",
        description: "Image requires administrator review before public listing.",
        date: "01 Nov 2026, 04:00 PM",
        completed: true,
        officer: "Visual QC Scanner"
      }
    ]
  },
  "CR-2026-8863": {
    ticketNumber: "CR-2026-8863",
    citizenName: "Rajesh K. Patel",
    citizenContact: "******4901",
    ward: "Ward 22 (North Zone)",
    category: "Road Damage / Potholes",
    issueType: "Structural Defect",
    subject: "Report alleging structural flyover collapse on Sector 22 Link Road",
    address: "Sector 22 Link Road Flyover",
    submissionDate: "01 Nov 2026, 05:20 PM",
    expectedResolutionDate: "Immediate Review",
    currentStatus: "Under Review",
    urgencyLevel: "Critical Priority",
    moderationStatus: "Pending Moderation",
    assignedOfficerId: null,
    assignedAuthority: {
      name: "Senior Content Moderator",
      designation: "High Priority Review Squad",
      department: "Digital Governance Cell",
      contact: "moderation@civicreflex.gov.in"
    },
    timeline: [
      {
        stage: "Registered",
        title: "Flagged for Potential False Civic Alarm",
        description: "Contradicted by municipal sensors. High priority verification queued.",
        date: "01 Nov 2026, 05:20 PM",
        completed: true,
        officer: "Incident Verification Desk"
      }
    ]
  }
};

