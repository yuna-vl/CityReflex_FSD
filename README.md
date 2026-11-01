# CivicReflex – Citizen Civic Services & Accountability Portal

> **"Your City. Your Voice. Accountable Action."**  
> An authentic, citizen-first civic issue reporting, pedestrian safety auditing, and municipal accountability platform built with the MERN stack.

---

## 🏛️ Project Identity & Overview

**CivicReflex** is an academic Full Stack Development (MERN) capstone project designed with the visual design language, structure, and accessibility standards of authentic Indian Government public services portals (NIC / GIGW 2.0).

The platform addresses two core pillars of urban governance:
1. **Core Civic Issue Reporting (Module A):** Potholes, solid waste management, streetlight outages, drainage failures, and public works defects with geotagged evidence, SLA tracking, and citizen resolution verification.
2. **Blind Spots & Pedestrian Safety Audits (Module B):** Detection and crowdsourced auditing of unlit night stretches, missing sidewalks, and wheelchair-inaccessible spaces with day/night safety comparisons and automated cluster escalation.

---

## 🚀 Milestone 2 Implementation Scope (Delivered: Complete Public Homepage)

All requirements for Milestone 2 have been fulfilled:

- [x] **Preserved Approved Foundation:**
  - Color palette: Primary Navy (`#0B2545`), Government Blue (`#003366`), Dark Slate (`#243447`), Background (`#F4F6F8`), Gold Accent (`#CDA250`), Alert Red (`#B30000`), and Success Green (`#216E39`).
  - Multi-level Header: Official portal title, Indian Tricolor strip, font size adjusters (`A-`, `A`, `A+`), high-contrast accessibility theme toggle, and regional language selector.
  - Navigation bar, announcement ticker, institutional hero banner, Quick Grievance Tracker, and statistics KPI strip preserved.
- [x] **1. Citizen Quick Services Directory:**
  - Rectangular government-style service tiles with icons, short descriptions, and functional routes:
    - **Lodge a Grievance** (`/report`)
    - **Track Complaint** (`/track`)
    - **Report an Unsafe Location** (`/blind-spots`)
    - **View Public Grievances** (`/track`)
    - **Verify Resolution** (`/track?ticket=CR-2026-8843`)
    - **View Notifications** (`/notifications`)
- [x] **2. How CivicReflex Works (Structured Four-Step Process):**
  - Horizontal numbered process on desktop (`01` → `02` → `03` → `04`) with connected steps.
  - Adapts to a vertical timeline on mobile viewports.
  - Steps:
    1. Citizen reports a civic issue.
    2. Authorities verify and assign the complaint.
    3. Department takes corrective action.
    4. Citizen verifies the resolution.
- [x] **3. Civic Issue Categories:**
  - Dedicated category showcase with icons, descriptions, and active report counts:
    - **Road Damage / Potholes** (1,420 reports)
    - **Garbage and Waste Management** (1,890 reports)
    - **Streetlight Issues** (980 reports)
    - **Drainage and Waterlogging** (740 reports)
    - **Footpath and Accessibility** (524 reports)
    - **Public Safety** (612 reports)
- [x] **4. Blind Spots Feature ("Beyond Complaints: Report What Makes Your Streets Unsafe"):**
  - Visually distinct section with deep navy backdrop, gold trims, and safety innovation badges.
  - Highlights the crowdsourced experience-reporting system vs reactive breakdown filing.
  - 4 feature blocks: Poorly Lit Streets, Unsafe Areas, Missing Footpaths, Missing Accessibility Ramps.
  - Direct "Explore Blind Spots" button navigating to `/blind-spots`.
- [x] **5. Latest Notifications and Circulars:**
  - Official government-style table with columns:
    - **Serial Number** (S.No.)
    - **Notification Title** (with `NEW` indicator badges)
    - **Reference Number** (e.g., `CR/SWD/2026/CIR-1049`)
    - **Published Date**
    - **Status**
  - Clearly marked demonstration notices.
- [x] **6. Public Transparency & Redressal Performance:**
  - Key transparency figures:
    - Total grievances received (`48,219`)
    - Resolved grievances (`43,892` – `91.02%`)
    - Pending grievances (`4,327` – `8.98%`)
    - Average resolution time (`46.8 Hours`)
  - Simple visual chart:
    - Cumulative proportional progress bar (91.02% Resolved vs 8.98% Pending).
    - Departmental SLA compliance progress bars.
    - Prominent academic disclosure badge.
- [x] **7. Comprehensive Institutional Footer:**
  - About CivicReflex, Citizen Services, Important Links, Accessibility Statement, Privacy Policy, Terms and Conditions, Contact Information, and Project Information.
  - Interactive policy modals for GIGW Accessibility, Privacy, Terms, Hyperlinks, and Copyright.
  - Explicit non-affiliation disclaimer stating no affiliation with any actual government ministry, municipal corporation, or NIC.
- [x] **8. Shared Frontend State Layer & Citizen Dashboard (Seamless Cross-Module Sync):**
  - **Shared State Provider (`ReportsContext` & `useReports`):** Central state layer with `localStorage` persistence managing reports, audit tickets, user grievances, and the citizen profile.
  - **Citizen Grievance Dashboard (`/dashboard`, `/my-complaints`):** Dedicated citizen command center showing grievance KPIs (Total Filed, Active Under Remediation, Resolved & Verified) and complete interactive complaint history with filtering.
  - **Instant Cross-Module Propagation:** When a citizen submits a pothole or civic complaint at `/report`:
    - A unique ticket ID (`CR-2026-XXXX`) is issued and routed automatically to the appropriate municipal authority with SLA hours.
    - The complaint immediately surfaces in the Citizen Dashboard (`/dashboard`) and Personal History table.
    - It appears instantly in the Navbar's "My Dashboard" live badge count.
    - It can be audited and live-tracked immediately at `/track?ticket=CR-2026-XXXX`.
    - It is discoverable in the Homepage's Quick Grievance Tracker.
    - Ward residents can cast community verification votes directly via the tracking engine.

---

## 🏛️ Milestone 3 Implementation Scope (Delivered: Authority Administration & Field Officer Portal)

All requirements for Milestone 3 have been fulfilled:

### 1. User Roles & Role-Based Route Protection
- **Role Separation:** `Citizen`, `Authority`, `Field Officer` with GIGW 2.0 boundary enforcement.
- **`ProtectedRoute` Component:** Guards routes against unauthorized role access. If an authority user attempts to enter `/dashboard` as their primary view, or a citizen attempts to enter `/authority/*`, a formal role-boundary notice is displayed with one-click role switching for academic evaluation.
- **Demonstration Accounts Directory:**

| Role | Name | Email | Password | Assigned Scope |
| :--- | :--- | :--- | :--- | :--- |
| **System Administrator** | CivicReflex Admin | `admin@civicreflex.gov.in` | `admin123` | Root Governance & Moderation Console |
| **Municipal Authority** | Er. Rameshwar Rao | `authority@civicreflex.gov.in` | `authority123` | Zonal Administrator (Wards 01-24) |
| **Field Officer Squad** | Mr. V. Nair | `officer.pwd@civicreflex.gov.in` | `officer123` | Junior Engineer (Ward 14 Squad) |
| **Registered Citizen** | Vikram R. Sharma | `citizen@civicreflex.gov.in` | `citizen123` | Citizen Resident (Ward 14) |

### 2. Authority Administration Portal (`/authority/*`)
- **Executive Municipal Dashboard (`/authority/dashboard`):**
  - KPI Cards: Total Grievances, Awaiting Verification, Unassigned Complaints, In Progress, Resolved, Escalated.
  - Grievance Trend Chart (7-day registration velocity).
  - Category Distribution with proportional breakdown.
  - Ward Performance with resolution rates.
  - Recent Grievances Register.
  - Priority Action Alerts (high/critical unresolved hazards).
- **Comprehensive Grievance Register (`/authority/grievances`):**
  - Search by complaint ID or location.
  - Filter by category, ward, status, and priority.
  - Pagination (8 per page) with sorting.
  - Detailed Complaint Modal / Drawer with photo evidence, reporter info, statutory SLA deadline, full lifecycle audit log, and authorized status transition controls.
- **Work Order & Field Assignment Console (`/authority/assignments`):**
  - Unassigned complaints queue.
  - Interactive allocation form: Select Department division, choose Field Junior Engineer, set Priority (SLA benchmark), add engineering directives.
  - Immediate state synchronization into the selected field officer's work orders.
- **Blind Spots Experience Audit & Auto-Escalation (`/authority/blind-spots`):**
  - Review clusters of poorly lit streets, missing ramps, and missing footpaths.
  - Multi-reporter algorithmic threshold simulation (&ge; 4-5 verified citizens in a 250m radius).
  - Authority review and sanction modal: converting a cluster into an official municipal grievance ticket (`CR-2026-BLIND-XXXX`) committed to the master register.
- **Ward Analytics & SLA Compliance (`/authority/analytics`):**
  - Ward-wise redressal comparison table with progress meters.
  - Departmental SLA compliance against Citizen Charter deadlines.
  - High-priority hazard segmentation.
- **Official Profile (`/authority/profile`):**
  - Delegated statutory powers under Municipal Code 2026.

### 3. Field Officer Operations Console (`/officer/*`)
- **Field Officer Dashboard (`/officer/dashboard`):**
  - KPI Cards: Total Assigned, Pending Inspection, Work In Progress, Completed Work.
  - Filters strictly to complaints assigned to the officer's demonstration ID (`OFF-PWD-014`).
- **My Assigned Work (`/officer/assigned-work`):**
  - Searchable and filterable table of work orders under the officer's engineering mandate.
- **Field Inspections & Work Order Execution Console (`/officer/inspections`):**
  - Six standardized field actions:
    1. *Mark Inspection Started:* Logs physical site arrival timestamp.
    2. *Submit Inspection Remarks:* Records defect measurements (depth/width) and recommended squad.
    3. *Mark Work In Progress:* Advances live status to "In Progress".
    4. *Upload Before Photograph:* Local image file input with instant preview.
    5. *Upload After Photograph:* Local image file input with instant preview (and one-click demo proof button).
    6. *Submit Completion Certification:* Submits technical completion report and moves status to "Resolved".
  - *Demarcation of Duties:* Field officers cannot mark work as "Citizen-Confirmed"; that step is strictly reserved for citizen verification.
- **Officer Profile (`/officer/profile`):**
  - Squad details (PWD Squad #4), assigned ward, tool equipment checklist.

### 4. End-to-End Civic Lifecycle Synchronization
```
[Citizen] Submits Pothole Report at /report
    │
    ▼
[Shared State] Ticket CR-2026-XXXX generated, appears in Master Register
    │
    ▼
[Authority] Views unassigned ticket in /authority/assignments, allocates to Mr. V. Nair
    │
    ▼
[Field Officer] Sees ticket in /officer/dashboard, marks "Inspection Started" & "Work In Progress"
    │
    ▼
[Field Officer] Uploads after-remediation proof and submits completion report -> status "Resolved"
    │
    ▼
[Citizen] Views resolved ticket in /track or /dashboard, verifies work on site:
    ├── Confirms satisfaction -> Transitions to "Citizen-Confirmed"
    └── Disputes persistent defect -> Reopens to "Reopened - Under Investigation"
```

---

## 🛡️ Milestone 4 Implementation Scope (Delivered: System Administrator Portal & Content Moderation Centre)

All requirements for Milestone 4 have been fulfilled:

### 1. System Administrator Role & Route Protection
- **Role Boundary:** Clear demarcation between **Municipal Authority** (operational grievance supervisor who assigns field officers) and **System Administrator** (system governance, user directory control, content moderation, taxonomy management, and forensic audit log supervision).
- **Dedicated Admin Layout (`AdminLayout.jsx`):**
  - Deep Navy institutional header (`#0A192F`) with gold trim and national emblem.
  - Distinctive `[SYSTEM ADMINISTRATOR CONSOLE]` red identifier badge.
  - Interactive profile dropdown with user identity, root permission badges, and instant demo session switchers.
  - Administrative left sidebar with 9 module links, active state indicators, and live counter badges (e.g. pending moderation flags in red).
  - Responsive mobile slide-out drawer with backdrop blur.
  - Institutional footer with GIGW 2.0 & Digital India accreditation notices.

### 2. Administrator Modules & Routes (`/admin/*`)
1. **System Overview Dashboard (`/admin/dashboard`):**
   - 6 Primary KPI Cards: Registered Users, Total Grievances, Pending Moderation, Active Municipal Wards, Covered Departments, Platform Health (100% nominal).
   - User Directory & Role Distribution breakdown with visual proportion bar.
   - Content Moderation Queue summary categorized by diagnostic flag reasons.
   - Grievance Category breakdown & Lifecycle Status distribution.
   - Recent Platform Activity feed streaming live from the append-only audit register.
   - Demonstration System Health Telemetry (12ms in-memory query latency, ~34KB storage utilization, GIGW 2.0 Level AA compliance).
2. **User Management & Access Control (`/admin/users`):**
   - Complete directory of citizens, authorities, junior engineers, and administrators.
   - Multi-parameter filtering by Role (`All`, `citizen`, `authority`, `field_officer`, `admin`) and Status (`All`, `Active`, `Suspended`).
   - Real-time search across Name, Email, Phone, Ward, and User ID.
   - Sorting by Registration Date, Name (A-Z), and Complaints Filed.
   - User Account Dossier Modal displaying profile details, contact information, and associated complaints.
   - **Account Suspension & Reinstatement Modal:** Enforces mandatory administrative reasons. Once suspended, the account is immediately blocked from logging in.
   - **Self-Suspension Guard:** The currently authenticated administrator cannot suspend their own session.
   - **Add Demonstration User Modal:** Allows on-the-fly creation of test citizen, authority, or field officer profiles.
3. **Content Moderation Centre (`/admin/moderation`):**
   - High-priority moderation queue for flagged submissions with category tabs:
     - *All Flagged*, *Duplicate Reports*, *Commercial / Spam*, *Photo Quality / Selfies*, *False Claims*, and *Moderated History*.
   - **Comprehensive Review Modal:**
     - Left column: Full photographic evidence with click-to-zoom modal, description, location, and reporter identity.
     - Diagnostic Flag Banner: Automated NLP and GIS trigger details.
     - Duplicate Comparison Panel: Side-by-side comparison with the active primary ticket (e.g. `CR-2026-8842`).
   - **5 Non-Destructive Moderation Actions:**
     1. *Approve & Route:* Clears flag, sets status to `Reported`, queues for authority assignment.
     2. *Reject Grievance:* Requires mandatory justification, sets status to `Rejected by Moderation`.
     3. *Mark as Duplicate:* Links report to confirmed primary ticket ID, sets status to `Duplicate`.
     4. *Seek Clarification:* Prompts citizen for updated photo or details, sets status to `Clarification Requested`.
     5. *Escalate to Vigilance:* Escalates alarmist/false reports to Senior Municipal Vigilance Cell.
   - Non-destructive data integrity: Complaints are never silently deleted; decisions are appended to the ticket's `moderationHistory` array and logged into the forensic audit register.
4. **Municipal Ward Directory (`/admin/wards`):**
   - Directory of municipal wards across South, Central, North, West, and East Zones.
   - Tracks assigned executive authority, mapped field officers, grievance counts, and resolution percentages.
   - Add & Edit Ward modals to configure boundaries and officer assignments.
5. **Municipal Departments Directorate (`/admin/departments`):**
   - Registry of line divisions: Roads and Infrastructure, Solid Waste Management, Electrical Maintenance, Drainage, and Accessibility.
   - Configures department code, nodal executive officer, engineering headcount, allocated budget, and SLA compliance.
6. **Civic Service Categories & SLA Benchmarks (`/admin/categories`):**
   - Civic taxonomy management mapping categories to responsible departments and default priority levels.
   - Configures statutory resolution deadlines (SLA hours).
   - **Live Intake Activation Toggle:** Deactivating a category immediately hides it from the citizen grievance form (`/report`), while preserving historical tickets and reporting intact.
7. **Forensic Audit Register (`/admin/audit-logs`):**
   - Immutable, append-only chronological log of all platform operations (logins, submissions, assignments, inspections, moderation verdicts, user suspensions).
   - Filter by Operator Role (`admin`, `authority`, `field_officer`, `citizen`, `system`) and Event Domain.
   - Searchable by ticket number, user ID, or keyword.
   - Detail modal to inspect full audit event payload.
   - Simulated CSV/PDF export of the tamper-evident audit register.
8. **System Settings & Governance Rules (`/admin/settings`):**
   - Platform Identity (Portal Title, Municipal Corporation, Citizen Helpline, Domain URL).
   - Statutory SLA policies (High, Medium, Low hours, overdue escalation days).
   - Automated moderation rules (GIS duplicate radius in meters, AI spam filter sensitivity, auto-quarantine).
   - Citizen notification gateway settings (SMS alerts, email receipts, daily digest time).
   - Persistent configuration commit with audit log registration.
9. **Administrator Security Profile (`/admin/profile`):**
   - Government employee identity, National Informatics Centre Badge Number (`NIC-SYS-ADM-001`), and tier-1 root clearance.
   - Editable contact information and official designation.
   - Active statutory security authorizations checklist.

---

## 📁 Folder Structure

```text
CityReflex_FSD/
├── client/
│   ├── public/
│   │   └── favicon.svg                    # Original CivicReflex SVG emblem
│   ├── src/
│   │   ├── assets/                        # Brand and graphical assets
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Alert.jsx              # Status notice boxes (info, warning, danger, success)
│   │   │   │   ├── Badge.jsx              # Status badges (pending, in-progress, resolved, escalated)
│   │   │   │   ├── Breadcrumbs.jsx        # Institutional breadcrumb trail
│   │   │   │   ├── Button.jsx             # Rectangular Gov-style buttons
│   │   │   │   ├── Card.jsx               # Reusable portal cards with subcomponents
│   │   │   │   ├── Emblem.jsx             # Original CivicReflex circular seal SVG
│   │   │   │   ├── ProtectedRoute.jsx     # GIGW 2.0 role-based route guard
│   │   │   │   ├── StatsCard.jsx          # Institutional KPI metric boxes
│   │   │   │   └── Table.jsx              # Responsive government data table
│   │   │   ├── layout/
│   │   │   │   ├── AdminLayout.jsx        # System Administrator & Moderation console layout
│   │   │   │   ├── AuthorityLayout.jsx    # Institutional layout with executive sidebar
│   │   │   │   ├── BrandingHeader.jsx     # Emblem, title, subtitle, helpline & tags
│   │   │   │   ├── Footer.jsx             # NIC-standard 4-column footer with policy dialogs
│   │   │   │   ├── Layout.jsx             # Master public layout with skip-link & tricolor
│   │   │   │   ├── OfficerLayout.jsx      # Field squad operations console layout
│   │   │   │   └── TopUtilityBar.jsx      # A-/A/A+, High Contrast, Language, Screen Reader
│   │   │   └── navigation/
│   │   │       ├── AnnouncementTicker.jsx # Scrolling notices strip with controls
│   │   │       └── Navbar.jsx             # Navy navbar, accessible dropdown, mobile drawer
│   │   ├── context/
│   │   │   ├── AccessibilityContext.jsx   # Font-size, contrast & language state provider
│   │   │   ├── AuthContext.jsx            # Role-based auth provider (Citizen, Authority, Officer)
│   │   │   ├── authContextInstance.js     # React Context instance for Auth
│   │   │   ├── ReportsContext.jsx         # Central shared state (Grievances, Assignments, Inspections)
│   │   │   └── reportsContextInstance.js  # React Context instance for clean decoupling
│   │   ├── data/
│   │   │   ├── mockNotifications.js       # Gazette notices, circular numbers & demo notices
│   │   │   ├── mockReports.js             # 6 Civic Categories & detailed grievance records
│   │   │   ├── mockStatistics.js          # KPI metrics, Citizen Charter SLAs & transparency charts
│   │   │   ├── mockTickets.js             # Multi-stage lifecycle tracking files
│   │   │   └── mockUsers.js               # Demonstration credentials & officer directory
│   │   ├── hooks/
│   │   │   ├── useAccessibility.js        # Accessibility hook helper
│   │   │   ├── useAuth.js                 # Authentication & role hook helper
│   │   │   └── useReports.js              # Shared reports & complaint tracking hook
│   │   ├── pages/
│   │   │   ├── About/
│   │   │   │   └── AboutPage.jsx          # Mission, Citizen Charter, Ward Directory
│   │   │   ├── Admin/
│   │   │   │   ├── AdminAuditLogsPage.jsx   # Append-only immutable forensic audit register
│   │   │   │   ├── AdminCategoriesPage.jsx  # Civic taxonomy & statutory SLA benchmarks
│   │   │   │   ├── AdminDashboardPage.jsx   # Platform overview telemetry & KPI metrics
│   │   │   │   ├── AdminDepartmentsPage.jsx # Municipal line departments directory
│   │   │   │   ├── AdminModerationPage.jsx  # Content moderation & NLP spam review centre
│   │   │   │   ├── AdminProfilePage.jsx     # Administrator credentials & root clearance
│   │   │   │   ├── AdminSettingsPage.jsx    # System configuration & policy rules
│   │   │   │   ├── AdminUsersPage.jsx       # User accounts directory & suspension manager
│   │   │   │   └── AdminWardsPage.jsx       # Municipal ward boundaries & zonal allocation
│   │   │   ├── Auth/
│   │   │   │   └── LoginPage.jsx          # GIGW 2.0 government sign-in portal & demo accounts
│   │   │   ├── Authority/
│   │   │   │   ├── AuthorityAnalyticsPage.jsx   # Ward turnaround & SLA compliance analytics
│   │   │   │   ├── AuthorityAssignmentsPage.jsx # Work order allocation console
│   │   │   │   ├── AuthorityBlindSpotsPage.jsx  # Experience reports review & auto-escalation
│   │   │   │   ├── AuthorityDashboardPage.jsx   # Executive municipal dashboard & charts
│   │   │   │   ├── AuthorityGrievancesPage.jsx  # Master grievance register & status transition
│   │   │   │   └── AuthorityProfilePage.jsx     # Delegated statutory municipal powers
│   │   │   ├── BlindSpots/
│   │   │   │   └── BlindSpotsPage.jsx     # Module B safety audit & cluster escalations
│   │   │   ├── Citizen/
│   │   │   │   ├── CitizenDashboardPage.jsx # Citizen grievance dashboard & personal history log
│   │   │   │   └── CitizenServicesPage.jsx# Services catalog & escalation matrix
│   │   │   ├── Home/
│   │   │   │   └── HomePage.jsx           # Complete Public Homepage (Milestone 2)
│   │   │   ├── Notifications/
│   │   │   │   └── NotificationsPage.jsx  # Gazette circulars & category filters
│   │   │   ├── Officer/
│   │   │   │   ├── OfficerAssignedWorkPage.jsx # Filterable table of assigned work orders
│   │   │   │   ├── OfficerDashboardPage.jsx    # Field squad KPI metrics & pending inspections
│   │   │   │   ├── OfficerInspectionsPage.jsx  # 6-action inspection & photo upload console
│   │   │   │   └── OfficerProfilePage.jsx      # Engineering squad equipment checklist
│   │   │   ├── Reports/
│   │   │   │   └── ReportIssuePage.jsx    # Module A grievance registration simulator
│   │   │   └── Tracking/
│   │   │       └── TrackComplaintPage.jsx # Multi-stage audit trail & citizen confirmation
│   │   ├── styles/
│   │   │   ├── components.css             # Component classes & responsive media queries
│   │   │   ├── global.css                 # Base styles, typography, reset, grid utilities
│   │   │   └── variables.css              # Institutional color tokens & high-contrast theme
│   │   ├── App.jsx                        # React Router routing & provider tree
│   │   ├── index.css                      # Design system imports
│   │   └── main.jsx                       # Application entry point
│   ├── index.html                         # HTML5 template with Noto Google Fonts
│   ├── package.json                       # Dependencies & scripts
│   └── vite.config.js                     # Vite build config
└── README.md                              # Comprehensive portal documentation
```

---

## 💻 How to Run the Frontend

1. Open PowerShell and navigate to the `client` directory:
   ```powershell
   cd client
   ```
2. Start the Vite development server:
   ```powershell
   npm run dev
   ```
3. Open your browser and navigate to:
   ```text
   http://localhost:5173/
   ```
4. Build for production and test:
   ```powershell
   npm run build
   npm run preview
   ```
