import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  AlertCircle,
  EyeOff,
  Search,
  Bell,
  Home,
  Info,
  Layers,
  FileText,
  LayoutDashboard,
  Building2,
  HardHat,
  ShieldAlert,
  LogIn
} from 'lucide-react';
import { useReports } from '../../hooks/useReports';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const servicesDropdownRef = useRef(null);
  const location = useLocation();
  const { userReports } = useReports();
  const { role } = useAuth();

  // Close menus on route change during render
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className="main-navbar"
      style={{
        backgroundColor: 'var(--color-primary-navy)',
        borderBottom: '3px solid var(--color-gold)',
        position: 'sticky',
        top: 0,
        zIndex: 900,
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
      }}
      aria-label="Primary Portal Navigation"
    >
      <div
        className="portal-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Desktop Navigation Links */}
        <div
          className="desktop-nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1px'
          }}
        >
          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: isActive ? '#FFFFFF' : '#E2E8F0',
              backgroundColor: isActive ? 'var(--color-gov-blue)' : 'transparent',
              borderBottom: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
              padding: '0.85rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.15s ease',
              marginBottom: '-3px'
            })}
          >
            <Home size={15} aria-hidden="true" />
            <span>Home</span>
          </NavLink>

          {/* About Us */}
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: isActive ? '#FFFFFF' : '#E2E8F0',
              backgroundColor: isActive ? 'var(--color-gov-blue)' : 'transparent',
              borderBottom: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
              padding: '0.85rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.15s ease',
              marginBottom: '-3px'
            })}
          >
            <Info size={15} aria-hidden="true" />
            <span>About Us</span>
          </NavLink>

          {/* Citizen Services (With Dropdown Menu) */}
          <div
            ref={servicesDropdownRef}
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: location.pathname.startsWith('/services') || location.pathname.startsWith('/dashboard') ? '#FFFFFF' : '#E2E8F0',
                backgroundColor: location.pathname.startsWith('/services') || location.pathname.startsWith('/dashboard') ? 'var(--color-gov-blue)' : 'transparent',
                border: 'none',
                borderBottom: location.pathname.startsWith('/services') || location.pathname.startsWith('/dashboard') ? '3px solid var(--color-gold)' : '3px solid transparent',
                padding: '0.85rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background-color 0.15s ease',
                marginBottom: '-3px'
              }}
            >
              <Layers size={15} aria-hidden="true" />
              <span>Citizen Services</span>
              <ChevronDown size={14} aria-hidden="true" style={{ transform: servicesDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {/* Dropdown Content */}
            {servicesDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-primary-navy)',
                  minWidth: '270px',
                  boxShadow: 'var(--shadow-dropdown)',
                  border: '1px solid var(--color-border)',
                  borderTop: '3px solid var(--color-gold)',
                  borderRadius: '0 0 2px 2px',
                  zIndex: 950,
                  padding: '6px 0'
                }}
              >
                <NavLink
                  to="/dashboard"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.625rem 1rem',
                    color: 'var(--color-primary-navy)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    backgroundColor: '#FAFBFD',
                    borderBottom: '1px solid #EDF2F7'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FAFBFD')}
                >
                  <LayoutDashboard size={16} color="var(--color-gov-blue)" />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Citizen Dashboard</span>
                      <span style={{ fontSize: '0.6875rem', backgroundColor: 'var(--color-gold)', color: 'var(--color-primary-navy)', padding: '1px 6px', borderRadius: '2px', fontWeight: 700 }}>
                        {userReports.length}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>Your active complaint history</div>
                  </div>
                </NavLink>

                <NavLink
                  to="/report"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.625rem 1rem',
                    color: 'var(--color-primary-navy)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #F1F5F9'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <AlertCircle size={16} color="var(--color-alert-red)" />
                  <div>
                    <div>File New Grievance</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>Potholes, garbage, waterlogging</div>
                  </div>
                </NavLink>

                <NavLink
                  to="/track"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.625rem 1rem',
                    color: 'var(--color-primary-navy)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #F1F5F9'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Search size={16} color="var(--color-gov-blue)" />
                  <div>
                    <div>Track Complaint Status</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>Enter Ticket ID or Mobile #</div>
                  </div>
                </NavLink>

                <NavLink
                  to="/blind-spots"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.625rem 1rem',
                    color: 'var(--color-primary-navy)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #F1F5F9'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <EyeOff size={16} color="var(--color-gold)" />
                  <div>
                    <div>Blind Spots Safety Audit</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>Unlit roads & inaccessible zones</div>
                  </div>
                </NavLink>

                <NavLink
                  to="/about#sla"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.625rem 1rem',
                    color: 'var(--color-primary-navy)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderBottom: '1px solid #F1F5F9'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <FileText size={16} color="var(--color-success-green)" />
                  <div>
                    <div>Citizen Charter & SLAs</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>Service timelines & resolution benchmarks</div>
                  </div>
                </NavLink>

                {/* System Administrator Console Link */}
                <NavLink
                  to="/admin/dashboard"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.625rem 1rem',
                    color: '#991B1B',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    backgroundColor: '#FEF2F2',
                    borderBottom: '1px solid #F1F5F9'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEE2E2')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                >
                  <ShieldAlert size={16} color="#DC2626" />
                  <div>
                    <div>System Admin Console</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>User directory & content moderation</div>
                  </div>
                </NavLink>

                {/* Authority Portal Link */}
                <NavLink
                  to="/authority/dashboard"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.625rem 1rem',
                    color: 'var(--color-primary-navy)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    backgroundColor: '#F8FAFC',
                    borderBottom: '1px solid #F1F5F9'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EDF2F7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                >
                  <Building2 size={16} color="var(--color-gov-blue)" />
                  <div>
                    <div>Authority Portal</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>Grievance oversight & assignments</div>
                  </div>
                </NavLink>

                {/* Field Officer Console Link */}
                <NavLink
                  to="/officer/dashboard"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.625rem 1rem',
                    color: 'var(--color-primary-navy)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    backgroundColor: '#F8FAFC'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EDF2F7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                >
                  <HardHat size={16} color="var(--color-gold)" />
                  <div>
                    <div>Field Officer Console</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>Squad inspections & work execution</div>
                  </div>
                </NavLink>
              </div>
            )}
          </div>

          {/* Report an Issue */}
          <NavLink
            to="/report"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: isActive ? '#FFFFFF' : '#E2E8F0',
              backgroundColor: isActive ? 'var(--color-gov-blue)' : 'transparent',
              borderBottom: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
              padding: '0.85rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.15s ease',
              marginBottom: '-3px'
            })}
          >
            <AlertCircle size={15} aria-hidden="true" />
            <span>Report an Issue</span>
          </NavLink>

          {/* Blind Spots */}
          <NavLink
            to="/blind-spots"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: isActive ? '#FFFFFF' : '#E2E8F0',
              backgroundColor: isActive ? 'var(--color-gov-blue)' : 'transparent',
              borderBottom: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
              padding: '0.85rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.15s ease',
              marginBottom: '-3px'
            })}
          >
            <EyeOff size={15} aria-hidden="true" />
            <span>Blind Spots</span>
          </NavLink>

          {/* Track Complaint */}
          <NavLink
            to="/track"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: isActive ? '#FFFFFF' : '#E2E8F0',
              backgroundColor: isActive ? 'var(--color-gov-blue)' : 'transparent',
              borderBottom: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
              padding: '0.85rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.15s ease',
              marginBottom: '-3px'
            })}
          >
            <Search size={15} aria-hidden="true" />
            <span>Track Complaint</span>
          </NavLink>

          {/* Notifications */}
          <NavLink
            to="/notifications"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: isActive ? '#FFFFFF' : '#E2E8F0',
              backgroundColor: isActive ? 'var(--color-gov-blue)' : 'transparent',
              borderBottom: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
              padding: '0.85rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.15s ease',
              marginBottom: '-3px'
            })}
          >
            <Bell size={15} aria-hidden="true" />
            <span>Notifications</span>
          </NavLink>
        </div>

        {/* Right Action: Dynamic Role Portal Button & Quick Login */}
        <div style={{ display: 'none', md: 'flex', alignItems: 'center', gap: '0.5rem' }} className="d-sm-inline">
          {role === 'admin' ? (
            <NavLink
              to="/admin/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                fontSize: '0.8125rem',
                fontWeight: 700,
                padding: '0.35rem 0.875rem',
                borderRadius: '2px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <ShieldAlert size={14} color="#FFFFFF" />
              <span>Admin Console</span>
            </NavLink>
          ) : role === 'authority' ? (
            <NavLink
              to="/authority/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--color-gov-blue)',
                color: '#FFFFFF',
                fontSize: '0.8125rem',
                fontWeight: 700,
                padding: '0.35rem 0.875rem',
                borderRadius: '2px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <Building2 size={14} color="var(--color-gold)" />
              <span>Authority Portal</span>
            </NavLink>
          ) : role === 'field_officer' ? (
            <NavLink
              to="/officer/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#1E293B',
                border: '1px solid var(--color-gold)',
                color: '#FFFFFF',
                fontSize: '0.8125rem',
                fontWeight: 700,
                padding: '0.35rem 0.875rem',
                borderRadius: '2px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <HardHat size={14} color="var(--color-gold)" />
              <span>Field Console</span>
            </NavLink>
          ) : (
            <NavLink
              to="/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-primary-navy)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                padding: '0.35rem 0.875rem',
                borderRadius: '2px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <LayoutDashboard size={14} />
              <span>My Dashboard</span>
              <span
                style={{
                  backgroundColor: 'var(--color-primary-navy)',
                  color: '#FFFFFF',
                  fontSize: '0.6875rem',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontWeight: 700
                }}
              >
                {userReports.length}
              </span>
            </NavLink>
          )}

          <NavLink
            to="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#132E52',
              color: '#CBD5E1',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.35rem 0.625rem',
              borderRadius: '2px',
              textDecoration: 'none',
              border: '1px solid #234673'
            }}
            title="Official Login & Role Switcher"
          >
            <LogIn size={13} />
            <span>Login</span>
          </NavLink>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="mobile-nav-toggle" style={{ display: 'none' }}>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              padding: '0.5rem',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#07182C',
            borderTop: '1px solid #1A365D',
            padding: '0.5rem 1rem 1rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
          }}
          className="mobile-drawer"
        >
          <NavLink
            to="/"
            end
            style={{ color: '#FFFFFF', padding: '0.5rem 0', textDecoration: 'none', fontWeight: 600 }}
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            style={{ color: 'var(--color-gold)', padding: '0.5rem 0', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <LayoutDashboard size={16} />
            <span>My Complaints Dashboard ({userReports.length})</span>
          </NavLink>
          <NavLink
            to="/about"
            style={{ color: '#FFFFFF', padding: '0.5rem 0', textDecoration: 'none', fontWeight: 600 }}
          >
            About Us
          </NavLink>
          <NavLink
            to="/report"
            style={{ color: '#FFFFFF', padding: '0.5rem 0', textDecoration: 'none', fontWeight: 600 }}
          >
            Report an Issue
          </NavLink>
          <NavLink
            to="/blind-spots"
            style={{ color: '#FFFFFF', padding: '0.5rem 0', textDecoration: 'none', fontWeight: 600 }}
          >
            Blind Spots
          </NavLink>
          <NavLink
            to="/track"
            style={{ color: '#FFFFFF', padding: '0.5rem 0', textDecoration: 'none', fontWeight: 600 }}
          >
            Track Complaint
          </NavLink>
          <NavLink
            to="/notifications"
            style={{ color: '#FFFFFF', padding: '0.5rem 0', textDecoration: 'none', fontWeight: 600 }}
          >
            Notifications
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
