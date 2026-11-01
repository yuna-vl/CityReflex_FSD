import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { ReportsProvider } from './context/ReportsContext';

// Common Components & Route Guard
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public & Citizen Pages
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import CitizenServicesPage from './pages/Citizen/CitizenServicesPage';
import CitizenDashboardPage from './pages/Citizen/CitizenDashboardPage';
import ReportIssuePage from './pages/Reports/ReportIssuePage';
import BlindSpotsPage from './pages/BlindSpots/BlindSpotsPage';
import TrackComplaintPage from './pages/Tracking/TrackComplaintPage';
import NotificationsPage from './pages/Notifications/NotificationsPage';
import LoginPage from './pages/Auth/LoginPage';

// Authority Portal Layout & Pages
import AuthorityLayout from './components/layout/AuthorityLayout';
import AuthorityDashboardPage from './pages/Authority/AuthorityDashboardPage';
import AuthorityGrievancesPage from './pages/Authority/AuthorityGrievancesPage';
import AuthorityAssignmentsPage from './pages/Authority/AuthorityAssignmentsPage';
import AuthorityBlindSpotsPage from './pages/Authority/AuthorityBlindSpotsPage';
import AuthorityAnalyticsPage from './pages/Authority/AuthorityAnalyticsPage';
import AuthorityProfilePage from './pages/Authority/AuthorityProfilePage';

// Field Officer Portal Layout & Pages
import OfficerLayout from './components/layout/OfficerLayout';
import OfficerDashboardPage from './pages/Officer/OfficerDashboardPage';
import OfficerAssignedWorkPage from './pages/Officer/OfficerAssignedWorkPage';
import OfficerInspectionsPage from './pages/Officer/OfficerInspectionsPage';
import OfficerProfilePage from './pages/Officer/OfficerProfilePage';

// Milestone 4: System Administrator Portal Layout & Pages
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import AdminUsersPage from './pages/Admin/AdminUsersPage';
import AdminModerationPage from './pages/Admin/AdminModerationPage';
import AdminWardsPage from './pages/Admin/AdminWardsPage';
import AdminDepartmentsPage from './pages/Admin/AdminDepartmentsPage';
import AdminCategoriesPage from './pages/Admin/AdminCategoriesPage';
import AdminAuditLogsPage from './pages/Admin/AdminAuditLogsPage';
import AdminSettingsPage from './pages/Admin/AdminSettingsPage';
import AdminProfilePage from './pages/Admin/AdminProfilePage';

// Global & Component Styles
import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';

// 404 Institutional Fallback Component
const NotFoundPage = () => (
  <div className="portal-container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--color-primary-navy)', fontWeight: 700 }}>
      404
    </div>
    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-primary-navy)', margin: '0.5rem 0 1rem 0' }}>
      Public Page / Circular Not Found
    </h2>
    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
      The requested civic portal link may have been relocated, archived, or is currently under scheduled maintenance.
    </p>
    <a href="/" className="btn btn-primary">
      Return to Portal Homepage
    </a>
  </div>
);

export function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <ReportsProvider>
          <BrowserRouter>
            <Routes>
              {/* Public & Citizen Portal Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="services" element={<CitizenServicesPage />} />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['citizen']}>
                      <CitizenDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="my-complaints"
                  element={
                    <ProtectedRoute allowedRoles={['citizen']}>
                      <CitizenDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="report" element={<ReportIssuePage />} />
                <Route path="blind-spots" element={<BlindSpotsPage />} />
                <Route path="track" element={<TrackComplaintPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Authority Administration Portal Routes */}
              <Route
                path="authority"
                element={
                  <ProtectedRoute allowedRoles={['authority']}>
                    <AuthorityLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AuthorityDashboardPage />} />
                <Route path="dashboard" element={<AuthorityDashboardPage />} />
                <Route path="grievances" element={<AuthorityGrievancesPage />} />
                <Route path="assignments" element={<AuthorityAssignmentsPage />} />
                <Route path="blind-spots" element={<AuthorityBlindSpotsPage />} />
                <Route path="analytics" element={<AuthorityAnalyticsPage />} />
                <Route path="profile" element={<AuthorityProfilePage />} />
              </Route>

              {/* Field Officer Operations Console Routes */}
              <Route
                path="officer"
                element={
                  <ProtectedRoute allowedRoles={['field_officer']}>
                    <OfficerLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<OfficerDashboardPage />} />
                <Route path="dashboard" element={<OfficerDashboardPage />} />
                <Route path="assigned-work" element={<OfficerAssignedWorkPage />} />
                <Route path="inspections" element={<OfficerInspectionsPage />} />
                <Route path="profile" element={<OfficerProfilePage />} />
              </Route>

              {/* Milestone 4: System Administrator & Content Moderation Portal Routes */}
              <Route
                path="admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboardPage />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="moderation" element={<AdminModerationPage />} />
                <Route path="wards" element={<AdminWardsPage />} />
                <Route path="departments" element={<AdminDepartmentsPage />} />
                <Route path="categories" element={<AdminCategoriesPage />} />
                <Route path="audit-logs" element={<AdminAuditLogsPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="profile" element={<AdminProfilePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ReportsProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
}

export default App;
