import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import Badge from '../../components/common/Badge';
import {
  Lock,
  Mail,
  Shield,
  Building2,
  HardHat,
  User,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '';

  const { login, loginAsDemo, user, role } = useAuth();

  const [activeTab, setActiveTab] = useState('authority'); // 'authority' | 'field_officer' | 'citizen' | 'admin'
  const [email, setEmail] = useState('authority@civicreflex.gov.in');
  const [password, setPassword] = useState('authority123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrorMessage('');
    if (tab === 'authority') {
      setEmail('authority@civicreflex.gov.in');
      setPassword('authority123');
    } else if (tab === 'field_officer') {
      setEmail('officer.pwd@civicreflex.gov.in');
      setPassword('officer123');
    } else if (tab === 'admin') {
      setEmail('admin@civicreflex.gov.in');
      setPassword('admin123');
    } else {
      setEmail('citizen@civicreflex.gov.in');
      setPassword('citizen123');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = login(email, password);
    if (res.success) {
      if (redirectPath) {
        navigate(redirectPath);
      } else if (res.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (res.user.role === 'authority') {
        navigate('/authority/dashboard');
      } else if (res.user.role === 'field_officer') {
        navigate('/officer/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setErrorMessage(res.error);
    }
  };

  const handleDirectDemoLogin = (roleKey) => {
    const loggedIn = loginAsDemo(roleKey);
    if (loggedIn) {
      if (redirectPath) {
        navigate(redirectPath);
      } else if (loggedIn.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (loggedIn.role === 'authority') {
        navigate('/authority/dashboard');
      } else if (loggedIn.role === 'field_officer') {
        navigate('/officer/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Official Login Portal' }]} />

      <div className="portal-container" style={{ paddingTop: '2rem', paddingBottom: '3.5rem', maxWidth: '1000px' }}>
        {/* Top Official Banner */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#EEF3F8',
              color: 'var(--color-gov-blue)',
              padding: '0.35rem 0.85rem',
              borderRadius: '2px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem'
            }}
          >
            <Shield size={14} />
            <span>Government Single Sign-On Simulation (GIGW 2.0 Standard)</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
            CivicReflex Authentication Portal
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', maxWidth: '640px', margin: '0 auto' }}>
            Select your administrative role or citizen account to access your designated municipal services and grievance workflow dashboard.
          </p>
        </div>

        {/* Currently Logged In Indicator if any */}
        {user && (
          <div style={{ marginBottom: '1.5rem' }}>
            <Alert type="info" title="Active Session Detected">
              You are currently signed in as <strong>{user.name}</strong> ({user.designation || user.role}).{' '}
              <button
                type="button"
                onClick={() => {
                  if (role === 'admin') navigate('/admin/dashboard');
                  else if (role === 'authority') navigate('/authority/dashboard');
                  else if (role === 'field_officer') navigate('/officer/dashboard');
                  else navigate('/dashboard');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-gov-blue)',
                  fontWeight: 700,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Click here to go directly to your portal dashboard →
              </button>
            </Alert>
          </div>
        )}

        <div className="grid-2" style={{ gap: '2rem', alignItems: 'flex-start' }}>
          {/* Left Column: Interactive Login Form */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderTop: '4px solid var(--color-gov-blue)',
              padding: '1.75rem',
              borderRadius: '2px',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            {/* 4 Role Tab Navigation */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '4px',
                backgroundColor: '#F1F5F9',
                padding: '4px',
                borderRadius: '2px',
                marginBottom: '1.5rem'
              }}
            >
              <button
                type="button"
                onClick={() => handleTabChange('authority')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem',
                  padding: '8px 2px',
                  border: 'none',
                  backgroundColor: activeTab === 'authority' ? 'var(--color-gov-blue)' : 'transparent',
                  color: activeTab === 'authority' ? '#FFFFFF' : 'var(--color-dark-slate)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                <Building2 size={12} />
                <span>Authority</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('field_officer')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem',
                  padding: '8px 2px',
                  border: 'none',
                  backgroundColor: activeTab === 'field_officer' ? 'var(--color-gov-blue)' : 'transparent',
                  color: activeTab === 'field_officer' ? '#FFFFFF' : 'var(--color-dark-slate)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                <HardHat size={12} />
                <span>Officer</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('admin')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem',
                  padding: '8px 2px',
                  border: 'none',
                  backgroundColor: activeTab === 'admin' ? '#DC2626' : 'transparent',
                  color: activeTab === 'admin' ? '#FFFFFF' : 'var(--color-dark-slate)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                <ShieldAlert size={12} />
                <span>Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('citizen')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem',
                  padding: '8px 2px',
                  border: 'none',
                  backgroundColor: activeTab === 'citizen' ? 'var(--color-gov-blue)' : 'transparent',
                  color: activeTab === 'citizen' ? '#FFFFFF' : 'var(--color-dark-slate)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                <User size={12} />
                <span>Citizen</span>
              </button>
            </div>

            <form onSubmit={handleLoginSubmit}>
              {errorMessage && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <Alert type="danger">{errorMessage}</Alert>
                </div>
              )}

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Mail size={14} />
                  <span>Official Email ID / Service Login</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Lock size={14} />
                  <span>Security Password</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                variant={activeTab === 'admin' ? 'alert' : 'primary'}
                type="submit"
                fullWidth
                icon={ArrowRight}
                style={activeTab === 'admin' ? { backgroundColor: '#DC2626', borderColor: '#B91C1C' } : {}}
              >
                Sign In to {activeTab === 'admin' ? 'System Administrator Console' : activeTab === 'authority' ? 'Authority Portal' : activeTab === 'field_officer' ? 'Field Officer Console' : 'Citizen Dashboard'}
              </Button>
            </form>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              Standard 256-bit simulated TLS session with NIC access log recording.
            </div>
          </div>

          {/* Right Column: Instant Evaluator One-Click Sign-In Cards */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', fontSize: '1.125rem', margin: '0 0 0.25rem 0' }}>
                Demonstration Credentials Directory
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                For evaluation and grading, click any role card below to authenticate instantaneously.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {/* 1. System Administrator Demo Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4px solid #DC2626',
                  padding: '0.875rem 1.125rem',
                  borderRadius: '2px',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldAlert size={16} color="#DC2626" />
                    <strong style={{ fontSize: '0.875rem', color: '#991B1B' }}>
                      System Administrator
                    </strong>
                  </div>
                  <Badge variant="alert">Milestone 4</Badge>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>
                  <strong>Admin:</strong> CivicReflex System Administrator (NIC IT Cell)
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', backgroundColor: '#F8FAFC', padding: '3px 6px', borderRadius: '2px', marginBottom: '0.5rem' }}>
                  admin@civicreflex.gov.in • admin123
                </div>
                <button
                  type="button"
                  onClick={() => handleDirectDemoLogin('ADMIN')}
                  style={{
                    width: '100%',
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  One-Click Login as System Admin →
                </button>
              </div>

              {/* 2. Authority Demo Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4px solid var(--color-primary-navy)',
                  padding: '0.875rem 1.125rem',
                  borderRadius: '2px',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building2 size={16} color="var(--color-gov-blue)" />
                    <strong style={{ fontSize: '0.875rem', color: 'var(--color-primary-navy)' }}>
                      Municipal Authority Officer
                    </strong>
                  </div>
                  <Badge variant="navy">Authority</Badge>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>
                  <strong>Officer:</strong> Er. Rameshwar Rao (Executive Engineer & Zonal Nodal Admin)
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', backgroundColor: '#F8FAFC', padding: '3px 6px', borderRadius: '2px', marginBottom: '0.5rem' }}>
                  authority@civicreflex.gov.in • authority123
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => handleDirectDemoLogin('AUTHORITY')}
                >
                  One-Click Login as Authority →
                </Button>
              </div>

              {/* 3. Field Officer Demo Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4px solid var(--color-gold)',
                  padding: '0.875rem 1.125rem',
                  borderRadius: '2px',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HardHat size={16} color="var(--color-gold)" />
                    <strong style={{ fontSize: '0.875rem', color: 'var(--color-primary-navy)' }}>
                      Field Junior Engineer (Inspection Squad)
                    </strong>
                  </div>
                  <Badge variant="gold">Field Role</Badge>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>
                  <strong>Officer:</strong> Mr. V. Nair (Junior Engineer, PWD Ward 14 Squad)
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', backgroundColor: '#F8FAFC', padding: '3px 6px', borderRadius: '2px', marginBottom: '0.5rem' }}>
                  officer.pwd@civicreflex.gov.in • officer123
                </div>
                <Button
                  variant="gold"
                  size="sm"
                  fullWidth
                  onClick={() => handleDirectDemoLogin('FIELD_OFFICER')}
                >
                  One-Click Login as Field Officer →
                </Button>
              </div>

              {/* 4. Citizen Demo Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4px solid var(--color-success-green)',
                  padding: '0.875rem 1.125rem',
                  borderRadius: '2px',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={16} color="var(--color-success-green)" />
                    <strong style={{ fontSize: '0.875rem', color: 'var(--color-primary-navy)' }}>
                      Registered Citizen Resident
                    </strong>
                  </div>
                  <Badge variant="success">Citizen</Badge>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>
                  <strong>Citizen:</strong> Vikram R. Sharma (Ward 14 South Zone)
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', backgroundColor: '#F8FAFC', padding: '3px 6px', borderRadius: '2px', marginBottom: '0.5rem' }}>
                  citizen@civicreflex.gov.in • citizen123
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => handleDirectDemoLogin('CITIZEN')}
                >
                  One-Click Login as Citizen →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
