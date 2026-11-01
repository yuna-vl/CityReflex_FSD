import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Alert from './Alert';
import Button from './Button';
import { ShieldAlert, UserCheck, ArrowRight, LogIn } from 'lucide-react';

export const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { user, role, isAuthenticated, loginAsDemo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Not Authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="portal-container" style={{ padding: '3rem 1rem', maxWidth: '720px' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderTop: '4px solid var(--color-alert-red)',
            padding: '2rem',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-card)',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#FEE2E2',
              color: 'var(--color-alert-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}
          >
            <ShieldAlert size={32} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', margin: '0 0 0.5rem 0' }}>
            Administrative Authentication Required
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            This portal module requires verified government service credentials. Please sign in with your official account or use a demonstration profile to continue.
          </p>

          <Button
            variant="primary"
            icon={LogIn}
            onClick={() => navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`)}
          >
            Go to Official Login Portal
          </Button>
        </div>
      </div>
    );
  }

  // 2. Role Not Permitted
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    const targetRole = allowedRoles[0];
    const roleLabels = {
      authority: 'Municipal Authority Officer',
      field_officer: 'Field Junior Engineer / Inspector',
      citizen: 'Registered Citizen',
      admin: 'System Administrator'
    };

    const dashboardMap = {
      authority: '/authority/dashboard',
      field_officer: '/officer/dashboard',
      citizen: '/dashboard',
      admin: '/admin/dashboard'
    };

    return (
      <div className="portal-container" style={{ padding: '3rem 1rem', maxWidth: '760px' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderTop: '4px solid var(--color-gold)',
            padding: '2rem',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShieldAlert size={28} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', margin: 0, fontSize: '1.25rem' }}>
                Role-Based Access Control Notice
              </h3>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                GIGW 2.0 Security Compliance & Separation of Municipal Duties
              </div>
            </div>
          </div>

          <Alert type="warning" title="Jurisdiction / Role Boundary">
            You are currently signed in as <strong>{user.name}</strong> ({user.designation || user.role}). This section is restricted to <strong>{roleLabels[targetRole] || targetRole}</strong> credentials.
          </Alert>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '1.25rem 0' }}>
            To evaluate or test this module during this demonstration, you can instantly switch to the authorized <strong>{roleLabels[targetRole]}</strong> demonstration account, or return to your dedicated dashboard.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Button
              variant="gold"
              icon={UserCheck}
              onClick={() => {
                loginAsDemo(targetRole);
              }}
            >
              Switch to {roleLabels[targetRole]} Demo Account
            </Button>

            <Button
              variant="secondary"
              icon={ArrowRight}
              onClick={() => navigate(dashboardMap[role] || '/')}
            >
              Go to My Active Portal
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
