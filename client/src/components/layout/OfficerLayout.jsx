import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useReports } from '../../hooks/useReports';
import Emblem from '../common/Emblem';
import {
  LayoutDashboard,
  HardHat,
  ClipboardCheck,
  User,
  LogOut,
  Menu,
  X,
  Shield
} from 'lucide-react';

export const OfficerLayout = () => {
  const { user, logout, loginAsDemo } = useAuth();
  const { reports } = useReports();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Close sidebar on path change
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setMobileSidebarOpen(false);
    setProfileDropdownOpen(false);
  }

  // Filter complaints assigned ONLY to this field officer's demonstration account
  const officerId = user?.id || 'OFF-PWD-014';
  const officerName = user?.name || 'Mr. V. Nair';

  const myAssignedGrievances = reports.filter(
    (r) => r.assignedOfficerId === officerId ||
           (r.assignedOfficer && r.assignedOfficer.includes(officerName))
  );

  const pendingActionCount = myAssignedGrievances.filter(
    (r) => r.status === 'Assigned' || r.status === 'In Progress'
  ).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      to: '/officer/dashboard',
      label: 'Officer Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/officer/assigned-work',
      label: 'My Assigned Work',
      icon: HardHat,
      badge: myAssignedGrievances.length,
      badgeVariant: 'primary'
    },
    {
      to: '/officer/inspections',
      label: 'Field Inspections',
      icon: ClipboardCheck,
      badge: pendingActionCount > 0 ? pendingActionCount : null,
      badgeVariant: 'alert'
    },
    {
      to: '/officer/profile',
      label: 'Squad Profile',
      icon: User,
      badge: null
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      {/* Top Tricolor Accent Strip */}
      <div className="tricolor-strip" aria-hidden="true" />

      {/* Field Operations Header */}
      <header
        style={{
          backgroundColor: '#0F1E36',
          color: '#FFFFFF',
          borderBottom: '3px solid var(--color-gold)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0.625rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          {/* Left Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <button
              type="button"
              className="d-md-none"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '4px'
              }}
              aria-label="Toggle Navigation Drawer"
            >
              {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }} onClick={() => navigate('/officer/dashboard')}>
              <Emblem size={40} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.02em', color: '#FFFFFF' }}>
                    CivicReflex
                  </span>
                  <span
                    style={{
                      backgroundColor: 'var(--color-gold)',
                      color: 'var(--color-primary-navy)',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '2px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Field Officer Console
                  </span>
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '1px' }}>
                  On-Ground Engineering Squad & Work Order Remediation Console
                </div>
              </div>
            </div>
          </div>

          {/* Right Role Switcher & Officer Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Quick Switch for Professor / Evaluator */}
            <div style={{ display: 'none', md: 'flex', gap: '0.5rem' }} className="d-sm-inline">
              <button
                type="button"
                onClick={() => {
                  loginAsDemo('AUTHORITY');
                  navigate('/authority/dashboard');
                }}
                style={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  color: '#CBD5E1',
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
                title="Switch session to Municipal Authority"
              >
                Authority Portal →
              </button>
              <button
                type="button"
                onClick={() => {
                  loginAsDemo('CITIZEN');
                  navigate('/dashboard');
                }}
                style={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  color: '#CBD5E1',
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
                title="Switch session to Citizen portal"
              >
                Public Portal →
              </button>
            </div>

            {/* Officer Profile Badge */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  backgroundColor: '#172A45',
                  border: '1px solid #2B456E',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-gold)',
                    color: 'var(--color-primary-navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.8125rem'
                  }}
                >
                  VN
                </div>
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {user?.name || 'Mr. V. Nair'}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#CBD5E1' }}>
                    {user?.designation || 'Junior Engineer (PWD)'}
                  </div>
                </div>
              </div>

              {profileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '110%',
                    width: '260px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    boxShadow: 'var(--shadow-card)',
                    zIndex: 1100,
                    padding: '0.75rem'
                  }}
                >
                  <div style={{ paddingBottom: '0.5rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.875rem' }}>
                      {user?.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      ID: {user?.id} • {user?.department}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-gov-blue)', marginTop: '2px', fontWeight: 600 }}>
                      {user?.ward}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/officer/profile');
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '6px 8px',
                      background: 'none',
                      border: 'none',
                      fontSize: '0.8125rem',
                      color: 'var(--color-dark-slate)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <User size={14} />
                    <span>View Officer & Squad Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '6px 8px',
                      background: 'none',
                      border: 'none',
                      fontSize: '0.8125rem',
                      color: 'var(--color-alert-red)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '4px'
                    }}
                  >
                    <LogOut size={14} />
                    <span>Sign Out of Field Session</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Body with Sidebar */}
      <div style={{ display: 'flex', flex: 1, maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
        {/* Left Field Operations Sidebar */}
        <aside
          style={{
            width: '260px',
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0
          }}
          className={`officer-sidebar ${mobileSidebarOpen ? 'open' : ''}`}
        >
          {/* Squad Designation Header */}
          <div
            style={{
              padding: '1.25rem 1rem',
              backgroundColor: '#F8FAFC',
              borderBottom: '1px solid var(--color-border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <HardHat size={16} color="var(--color-gold)" />
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                Field Engineering Unit
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
              PWD Squad #4 (Ward 14)
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Jurisdiction: Ward 14 (South Zone)
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '0.75rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.625rem 0.875rem',
                    borderRadius: '2px',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#FFFFFF' : 'var(--color-dark-slate)',
                    backgroundColor: isActive ? 'var(--color-gov-blue)' : 'transparent',
                    borderLeft: isActive ? '4px solid var(--color-gold)' : '4px solid transparent',
                    transition: 'all 0.15s ease'
                  })}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <Icon size={17} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && (
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '10px',
                        backgroundColor: item.badgeVariant === 'alert' ? 'var(--color-alert-red)' : 'var(--color-gov-blue)',
                        color: '#FFFFFF'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Field Security Notice */}
          <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)', backgroundColor: '#F8FAFC', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '4px' }}>
              <Shield size={13} color="var(--color-gov-blue)" />
              <strong style={{ color: 'var(--color-primary-navy)' }}>Field Officer Role Boundary</strong>
            </div>
            <div>Only work orders assigned to this demonstration ID are visible. Final sign-off is citizen-verified.</div>
          </div>
        </aside>

        {/* Dynamic Nested Content Area */}
        <main style={{ flex: 1, padding: '1.5rem', minWidth: 0, overflowX: 'hidden' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OfficerLayout;
