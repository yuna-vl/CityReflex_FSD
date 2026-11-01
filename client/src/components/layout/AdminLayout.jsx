import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useReports } from '../../hooks/useReports';
import Emblem from '../common/Emblem';
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  MapPin,
  Building2,
  Tag,
  ScrollText,
  Settings,
  UserCheck,
  LogOut,
  Menu,
  X,
  Shield
} from 'lucide-react';

export const AdminLayout = () => {
  const { user, logout, loginAsDemo } = useAuth();
  const { reports, usersList, wardsList } = useReports();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Close drawers on route change
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setMobileSidebarOpen(false);
    setProfileDropdownOpen(false);
  }

  // Live count badges
  const pendingModerationCount = (reports || []).filter(
    (r) => r.moderationStatus === 'Pending Moderation' || r.status === 'Under Review'
  ).length;

  const totalUsersCount = (usersList || []).length;
  const totalWardsCount = (wardsList || []).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'System Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/admin/users',
      label: 'User Management',
      icon: Users,
      badge: totalUsersCount > 0 ? totalUsersCount : null,
      badgeVariant: 'neutral'
    },
    {
      to: '/admin/moderation',
      label: 'Content Moderation',
      icon: ShieldAlert,
      badge: pendingModerationCount > 0 ? pendingModerationCount : null,
      badgeVariant: 'alert'
    },
    {
      to: '/admin/wards',
      label: 'Ward Directory',
      icon: MapPin,
      badge: totalWardsCount > 0 ? totalWardsCount : null,
      badgeVariant: 'neutral'
    },
    {
      to: '/admin/departments',
      label: 'Departments',
      icon: Building2,
      badge: null
    },
    {
      to: '/admin/categories',
      label: 'Civic Categories',
      icon: Tag,
      badge: null
    },
    {
      to: '/admin/audit-logs',
      label: 'System Audit Logs',
      icon: ScrollText,
      badge: null
    },
    {
      to: '/admin/settings',
      label: 'System Settings',
      icon: Settings,
      badge: null
    },
    {
      to: '/admin/profile',
      label: 'Admin Credentials',
      icon: UserCheck,
      badge: null
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      {/* Top Tricolor Accent Strip */}
      <div className="tricolor-strip" aria-hidden="true" />

      {/* Official Government Admin Header */}
      <header
        style={{
          backgroundColor: '#0A192F', // Deepest Navy for System Administration
          color: '#FFFFFF',
          borderBottom: '2px solid var(--color-gold)',
          padding: '0.625rem 1.25rem',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          {/* Left Emblem & Portal Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '4px'
              }}
              className="d-md-none"
              aria-label="Toggle Administrative Sidebar"
            >
              {mobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Emblem size="sm" />

            <div style={{ borderLeft: '1px solid #1E293B', paddingLeft: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    letterSpacing: '0.02em',
                    color: '#FFFFFF'
                  }}
                >
                  CivicReflex
                </span>
                <span
                  style={{
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '2px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  System Administrator Console
                </span>
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '1px' }}>
                Digital Governance & Platform Moderation Directorate • NIC GovNet Infrastructure
              </div>
            </div>
          </div>

          {/* Right Admin Controls & Quick Switchers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Quick Demo Mode Switchers */}
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
                title="Switch to Municipal Authority Portal"
              >
                Authority Portal →
              </button>
              <button
                type="button"
                onClick={() => {
                  loginAsDemo('FIELD_OFFICER');
                  navigate('/officer/dashboard');
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
                title="Switch to Field Officer Console"
              >
                Officer Console →
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
                title="Switch to Citizen Public Portal"
              >
                Public Portal →
              </button>
            </div>

            {/* Admin Profile Dropdown trigger */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  backgroundColor: '#112240',
                  border: '1px solid #233554',
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
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.75rem'
                  }}
                >
                  SA
                </div>
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {user?.name || 'System Administrator'}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-gold)' }}>
                    NIC-SYS-ADM-001
                  </div>
                </div>
              </div>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: '280px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    borderRadius: '2px',
                    zIndex: 50,
                    padding: '0.75rem 0'
                  }}
                >
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-light)' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
                      {user?.name || 'System Administrator'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {user?.email || 'admin@civicreflex.gov.in'}
                    </div>
                    <div style={{ marginTop: '0.35rem', display: 'flex', gap: '0.25rem' }}>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          backgroundColor: '#FEE2E2',
                          color: '#991B1B',
                          padding: '2px 6px',
                          borderRadius: '2px',
                          fontWeight: 700
                        }}
                      >
                        FULL ROOT PRIVILEGES
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '0.5rem 0' }}>
                    <NavLink
                      to="/admin/profile"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        color: 'var(--color-text-primary)',
                        fontSize: '0.8125rem',
                        textDecoration: 'none'
                      }}
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <UserCheck size={16} color="var(--color-gov-blue)" />
                      Admin Security Profile
                    </NavLink>
                    <NavLink
                      to="/admin/settings"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        color: 'var(--color-text-primary)',
                        fontSize: '0.8125rem',
                        textDecoration: 'none'
                      }}
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Settings size={16} color="var(--color-gov-blue)" />
                      System Global Policies
                    </NavLink>
                  </div>

                  <div style={{ borderTop: '1px solid var(--color-border-light)', padding: '0.5rem 1rem 0 1rem' }}>
                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '0.5rem 0',
                        color: 'var(--color-alert-red)',
                        background: 'none',
                        border: 'none',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <LogOut size={16} />
                      Sign Out Administrative Session
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Administrative Container */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        {/* Left Administrative Sidebar */}
        <aside
          style={{
            width: '260px',
            backgroundColor: '#0F172A', // Dark Slate Blue Navigation
            borderRight: '1px solid #1E293B',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.25rem 0'
          }}
          className="admin-sidebar"
        >
          <div>
            <div style={{ padding: '0 1.25rem 1rem 1.25rem', borderBottom: '1px solid #1E293B', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 800, letterSpacing: '0.06em' }}>
                System Administration Modules
              </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0 0.75rem' }}>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.to;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.625rem 0.875rem',
                      borderRadius: '2px',
                      textDecoration: 'none',
                      fontSize: '0.8125rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#FFFFFF' : '#94A3B8',
                      backgroundColor: isActive ? '#1E293B' : 'transparent',
                      borderLeft: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <IconComponent size={18} color={isActive ? 'var(--color-gold)' : '#94A3B8'} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== null && (
                      <span
                        style={{
                          backgroundColor: item.badgeVariant === 'alert' ? '#DC2626' : '#334155',
                          color: '#FFFFFF',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '10px',
                          minWidth: '20px',
                          textAlign: 'center'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Sidebar System Diagnostic Footer */}
          <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #1E293B', backgroundColor: '#0B1120' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Shield size={14} color="#10B981" />
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                System Core: Healthy
              </span>
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#64748B', lineHeight: 1.4 }}>
              Demonstration Build: v4.0.0-gov<br />
              NIC Server Gateway: Online
            </div>
          </div>
        </aside>

        {/* Mobile Slide-Out Drawer */}
        {mobileSidebarOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              display: 'flex'
            }}
          >
            <div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)'
              }}
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div
              style={{
                position: 'relative',
                width: '280px',
                backgroundColor: '#0F172A',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem 0',
                zIndex: 60
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem 1rem 1.25rem', borderBottom: '1px solid #1E293B' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 800 }}>
                    Admin Console Modules
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(false)}
                    style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
                  >
                    <X size={20} />
                  </button>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.75rem' }}>
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = location.pathname === item.to;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileSidebarOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.625rem 0.875rem',
                          borderRadius: '2px',
                          textDecoration: 'none',
                          fontSize: '0.8125rem',
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? '#FFFFFF' : '#94A3B8',
                          backgroundColor: isActive ? '#1E293B' : 'transparent',
                          borderLeft: isActive ? '3px solid var(--color-gold)' : '3px solid transparent'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <IconComponent size={18} color={isActive ? 'var(--color-gold)' : '#94A3B8'} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== null && (
                          <span
                            style={{
                              backgroundColor: item.badgeVariant === 'alert' ? '#DC2626' : '#334155',
                              color: '#FFFFFF',
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              padding: '1px 6px',
                              borderRadius: '10px'
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              <div style={{ padding: '1rem', borderTop: '1px solid #1E293B' }}>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#EF4444',
                    background: 'none',
                    border: 'none',
                    fontSize: '0.8125rem',
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main
          style={{
            flex: 1,
            padding: '1.5rem',
            overflowX: 'hidden',
            backgroundColor: '#F8FAFC'
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Official Government Footer */}
      <footer
        style={{
          backgroundColor: '#0F172A',
          color: '#94A3B8',
          borderTop: '1px solid #1E293B',
          padding: '1rem 1.25rem',
          fontSize: '0.75rem',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            CivicReflex System Administration & Content Moderation Portal • GIGW 2.0 & Digital India Standards
          </div>
          <div>
            Designed and Maintained for Demonstration by National Informatics Centre (NIC) • Platform Build v4.0.0
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;

