import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReports } from '../../hooks/useReports';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import {
  Users,
  FileText,
  ShieldAlert,
  MapPin,
  Building2,
  Activity,
  ArrowRight,
  Clock,
  HardDrive,
  Database,
  Layers
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { reports, usersList, wardsList, departmentsList, auditLogs } = useReports();

  // Metrics computation
  const totalUsers = usersList?.length || 0;
  const totalGrievances = reports?.length || 0;

  const pendingModeration = (reports || []).filter(
    (r) => r.moderationStatus === 'Pending Moderation' || r.status === 'Under Review'
  );

  const activeWardsCount = (wardsList || []).filter((w) => w.status === 'Active').length;
  const totalDepartmentsCount = (departmentsList || []).length;

  // User breakdown by role
  const citizenCount = (usersList || []).filter((u) => u.role === 'citizen').length;
  const authorityCount = (usersList || []).filter((u) => u.role === 'authority').length;
  const officerCount = (usersList || []).filter((u) => u.role === 'field_officer').length;
  const adminCount = (usersList || []).filter((u) => u.role === 'admin').length;
  const suspendedCount = (usersList || []).filter((u) => u.accountStatus === 'Suspended').length;

  // Category distribution
  const categoryCounts = (reports || []).reduce((acc, r) => {
    const cat = r.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  // Status distribution
  const statusCounts = (reports || []).reduce((acc, r) => {
    const st = r.status || 'Reported';
    acc[st] = (acc[st] || 0) + 1;
    return acc;
  }, {});

  // Moderation flag reasons
  const duplicateFlags = pendingModeration.filter((r) => (r.flagReason || '').toLowerCase().includes('duplicate')).length;
  const spamFlags = pendingModeration.filter((r) => (r.flagReason || '').toLowerCase().includes('spam') || (r.flagReason || '').toLowerCase().includes('advertisement')).length;
  const photoFlags = pendingModeration.filter((r) => (r.flagReason || '').toLowerCase().includes('photo') || (r.flagReason || '').toLowerCase().includes('selfie')).length;
  const falseClaimFlags = pendingModeration.filter((r) => (r.flagReason || '').toLowerCase().includes('false') || (r.flagReason || '').toLowerCase().includes('alarmist')).length;

  // Recent audit activity (latest 6)
  const recentLogs = (auditLogs || []).slice(0, 6);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Title & Context Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: '#FFFFFF',
          padding: '1.25rem 1.5rem',
          border: '1px solid var(--color-border)',
          borderLeft: '4px solid var(--color-gold)',
          borderRadius: '2px',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            National Informatics Centre • Central Digital Governance Directorate
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', fontSize: '1.5rem', margin: '0.25rem 0' }}>
            System Administration & Platform Command Overview
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
            Unified real-time telemetry, user directory enforcement, content moderation pipelines, and municipal ward infrastructure governance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant="secondary"
            size="sm"
            icon={ShieldAlert}
            onClick={() => navigate('/admin/moderation')}
          >
            Review Moderation Queue ({pendingModeration.length})
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Users}
            onClick={() => navigate('/admin/users')}
          >
            Manage User Accounts
          </Button>
        </div>
      </div>

      {/* 1. Six Primary KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}
      >
        {/* KPI 1: Total Users */}
        <div
          onClick={() => navigate('/admin/users')}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderTop: '3px solid var(--color-gov-blue)',
            padding: '1.25rem',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
              Registered Users
            </span>
            <Users size={18} color="var(--color-gov-blue)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary-navy)', margin: '0.5rem 0 0.25rem 0' }}>
            {totalUsers}
          </div>
          <div style={{ fontSize: '0.75rem', color: suspendedCount > 0 ? 'var(--color-alert-red)' : 'var(--color-text-muted)' }}>
            {suspendedCount > 0 ? `${suspendedCount} accounts suspended` : 'All accounts verified active'}
          </div>
        </div>

        {/* KPI 2: Total Grievances */}
        <div
          onClick={() => navigate('/admin/audit-logs')}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderTop: '3px solid #0284C7',
            padding: '1.25rem',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
              Total Grievances
            </span>
            <FileText size={18} color="#0284C7" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary-navy)', margin: '0.5rem 0 0.25rem 0' }}>
            {totalGrievances}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-success-green)' }}>
            Across all {activeWardsCount} municipal wards
          </div>
        </div>

        {/* KPI 3: Pending Moderation */}
        <div
          onClick={() => navigate('/admin/moderation')}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderTop: '3px solid #DC2626',
            padding: '1.25rem',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
              Pending Moderation
            </span>
            <ShieldAlert size={18} color="#DC2626" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#DC2626', margin: '0.5rem 0 0.25rem 0' }}>
            {pendingModeration.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#991B1B', fontWeight: 600 }}>
            Action required: Flagged reports
          </div>
        </div>

        {/* KPI 4: Active Wards */}
        <div
          onClick={() => navigate('/admin/wards')}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderTop: '3px solid #D97706',
            padding: '1.25rem',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
              Active Wards
            </span>
            <MapPin size={18} color="#D97706" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary-navy)', margin: '0.5rem 0 0.25rem 0' }}>
            {activeWardsCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Covering 4 geographic municipal zones
          </div>
        </div>

        {/* KPI 5: Departments */}
        <div
          onClick={() => navigate('/admin/departments')}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderTop: '3px solid #4F46E5',
            padding: '1.25rem',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
              Departments
            </span>
            <Building2 size={18} color="#4F46E5" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary-navy)', margin: '0.5rem 0 0.25rem 0' }}>
            {totalDepartmentsCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Integrated civic services
          </div>
        </div>

        {/* KPI 6: Platform Health */}
        <div
          onClick={() => navigate('/admin/settings')}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderTop: '3px solid #16A34A',
            padding: '1.25rem',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
              Platform Health
            </span>
            <Activity size={18} color="#16A34A" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16A34A', margin: '0.5rem 0 0.25rem 0' }}>
            100%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 600 }}>
            NIC GovNet Gateway: Nominal
          </div>
        </div>
      </div>

      {/* 2. Middle Row: User Registration Overview & Moderation Queue Summary */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: '1.5rem'
        }}
        className="reporting-grid"
      >
        {/* Left: User Directory Overview */}
        <Card>
          <Card.Header variant="navy">
            <Card.Title icon={Users}>User Directory & Role Distribution</Card.Title>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/users')}>
              View All Users →
            </Button>
          </Card.Header>
          <Card.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-navy)' }}>{citizenCount}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Citizens</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-gov-blue)' }}>{authorityCount}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Authorities</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0D9488' }}>{officerCount}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Field Officers</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#DC2626' }}>{adminCount}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Admins</div>
                </div>
              </div>

              {/* Progress Bar of Role Proportions */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
                  <span>Directory Proportions</span>
                  <span>{totalUsers} Total Accounts</span>
                </div>
                <div style={{ display: 'flex', height: '10px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#E2E8F0' }}>
                  <div style={{ width: `${(citizenCount / totalUsers) * 100}%`, backgroundColor: 'var(--color-primary-navy)' }} title={`Citizens: ${citizenCount}`} />
                  <div style={{ width: `${(authorityCount / totalUsers) * 100}%`, backgroundColor: 'var(--color-gov-blue)' }} title={`Authorities: ${authorityCount}`} />
                  <div style={{ width: `${(officerCount / totalUsers) * 100}%`, backgroundColor: '#0D9488' }} title={`Field Officers: ${officerCount}`} />
                  <div style={{ width: `${(adminCount / totalUsers) * 100}%`, backgroundColor: '#DC2626' }} title={`Admins: ${adminCount}`} />
                </div>
              </div>

              <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '0.75rem 1rem', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldAlert size={16} color="#DC2626" />
                  <span style={{ fontSize: '0.8125rem', color: '#991B1B', fontWeight: 600 }}>
                    Suspended Accounts: {suspendedCount}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/admin/users?filter=Suspended')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#DC2626',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  Inspect Suspensions
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Right: Content Moderation Queue Summary */}
        <Card>
          <Card.Header variant="navy">
            <Card.Title icon={ShieldAlert}>Content Moderation Queue</Card.Title>
            <Badge variant="alert">{pendingModeration.length} Flags Awaiting</Badge>
          </Card.Header>
          <Card.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                Submissions automatically queued by automated NLP and GIS filters pending administrative verification:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: '2px' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary-navy)' }}>
                    Duplicate Grievance Flags (GIS Co-location)
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#D97706' }}>
                    {duplicateFlags}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: '2px' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary-navy)' }}>
                    Commercial / Non-Civic Spam
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#DC2626' }}>
                    {spamFlags}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: '2px' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary-navy)' }}>
                    Inappropriate Photo Evidence (Quality / Selfies)
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#EA580C' }}>
                    {photoFlags}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: '2px' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary-navy)' }}>
                    Potentially False / Alarmist Complaints
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#7C3AED' }}>
                    {falseClaimFlags}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  icon={ArrowRight}
                  onClick={() => navigate('/admin/moderation')}
                >
                  Enter Content Moderation Centre
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* 3. Third Row: Grievance Category Breakdown & Status Breakdown */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '1.5rem'
        }}
        className="reporting-grid"
      >
        {/* Category Breakdown */}
        <Card>
          <Card.Header variant="navy">
            <Card.Title icon={Layers}>Grievances by Category</Card.Title>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/categories')}>
              Manage Categories →
            </Button>
          </Card.Header>
          <Card.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.entries(categoryCounts).map(([cat, count]) => {
                const percentage = totalGrievances > 0 ? ((count / totalGrievances) * 100).toFixed(0) : 0;
                return (
                  <div key={cat}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{cat}</span>
                      <span style={{ color: 'var(--color-text-secondary)', fontWeight: 700 }}>{count} ({percentage}%)</span>
                    </div>
                    <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${percentage}%`,
                          backgroundColor: 'var(--color-gov-blue)'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card.Body>
        </Card>

        {/* Grievance Lifecycle Status */}
        <Card>
          <Card.Header variant="navy">
            <Card.Title icon={Activity}>Grievance Lifecycle Status</Card.Title>
          </Card.Header>
          <Card.Body>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {Object.entries(statusCounts).map(([status, count]) => (
                <div
                  key={status}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
                    {status}
                  </span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-navy)' }}>
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* 4. Bottom Row: Recent Platform Activity & System Health Telemetry */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '1.5rem'
        }}
        className="reporting-grid"
      >
        {/* Recent Platform Activity Feed */}
        <Card>
          <Card.Header variant="navy">
            <Card.Title icon={Clock}>Recent Platform Activity (Audit Register)</Card.Title>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/audit-logs')}>
              Full Register →
            </Button>
          </Card.Header>
          <Card.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '0.625rem 0.75rem',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    fontSize: '0.8125rem'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          backgroundColor: log.role === 'admin' ? '#FEE2E2' : log.role === 'authority' ? '#DBEAFE' : log.role === 'field_officer' ? '#CCFBF1' : '#F1F5F9',
                          color: log.role === 'admin' ? '#991B1B' : log.role === 'authority' ? '#1E40AF' : log.role === 'field_officer' ? '#115E59' : '#334155',
                          padding: '1px 5px',
                          borderRadius: '2px',
                          textTransform: 'uppercase'
                        }}
                      >
                        {log.role}
                      </span>
                      <strong style={{ color: 'var(--color-primary-navy)' }}>{log.action}</strong>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>[{log.relatedRecord}]</span>
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                      {log.description}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                      Operator: {log.user}
                    </div>
                  </div>

                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', marginLeft: '0.75rem' }}>
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Demonstration System Health Telemetry */}
        <Card>
          <Card.Header variant="navy">
            <Card.Title icon={HardDrive}>System Telemetry & Architecture</Card.Title>
            <Badge variant="success">Online</Badge>
          </Card.Header>
          <Card.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Frontend Architecture</span>
                <strong style={{ color: 'var(--color-primary-navy)' }}>React.js (ES6+ / Vite)</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>State Layer Persistence</span>
                <strong style={{ color: 'var(--color-primary-navy)' }}>React Context + LocalStorage</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Simulated Query Latency</span>
                <strong style={{ color: 'var(--color-success-green)' }}>12 ms (In-Memory Buffer)</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Estimated Storage Used</span>
                <strong style={{ color: 'var(--color-primary-navy)' }}>~34 KB / 5 MB Quota</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>GIGW 2.0 Compliance Level</span>
                <strong style={{ color: 'var(--color-gov-blue)' }}>Level AA (Government Ready)</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Deployment Target</span>
                <strong style={{ color: 'var(--color-primary-navy)' }}>Academic Full Stack Foundation</strong>
              </div>

              <div style={{ marginTop: '0.5rem', backgroundColor: '#F1F5F9', padding: '0.75rem', borderRadius: '2px', border: '1px dashed var(--color-border-dark)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gov-blue)', fontWeight: 700, fontSize: '0.75rem' }}>
                  <Database size={14} />
                  <span>Future MERN Backend Plug Points</span>
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem', lineHeight: 1.4 }}>
                  All state updates in ReportsContext follow RESTful API payload structures for seamless drop-in replacement with Express.js endpoints and MongoDB Mongoose models.
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
