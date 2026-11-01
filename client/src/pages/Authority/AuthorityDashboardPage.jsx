import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReports } from '../../hooks/useReports';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import {
  Inbox,
  Clock,
  UserX,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  PieChart,
  ShieldAlert
} from 'lucide-react';

export const AuthorityDashboardPage = () => {
  const navigate = useNavigate();
  const { reports } = useReports();

  // Metrics Calculation from Shared State
  const totalGrievances = reports.length;
  const awaitingVerification = reports.filter((r) => r.status === 'Reported' || r.status === 'Under Review').length;
  const unassignedCount = reports.filter((r) => !r.assignedOfficerId || r.assignedDepartment === 'Unassigned' || r.status === 'Reported').length;
  const inProgressCount = reports.filter((r) => r.status === 'In Progress' || r.status === 'Assigned').length;
  const resolvedCount = reports.filter((r) => r.status === 'Resolved' || r.status === 'Citizen-Confirmed' || r.status === 'Closed').length;
  const escalatedCount = reports.filter((r) => r.status.toLowerCase().includes('escalated') || r.status.toLowerCase().includes('reopened')).length;

  // Priority Alerts (Critical or High priority not yet resolved)
  const priorityAlerts = reports.filter(
    (r) => (r.severity === 'Critical' || r.severity === 'High') &&
           r.status !== 'Resolved' && r.status !== 'Citizen-Confirmed'
  );

  // Category Distribution
  const categoryStats = [
    { name: 'Road Damage / Potholes', count: reports.filter((r) => r.category.includes('Road') || r.category.includes('Pothole')).length, color: '#0B2545' },
    { name: 'Garbage & Waste', count: reports.filter((r) => r.category.includes('Garbage') || r.category.includes('Waste')).length, color: '#CDA250' },
    { name: 'Streetlight Issues', count: reports.filter((r) => r.category.includes('Streetlight') || r.category.includes('Lighting')).length, color: '#003366' },
    { name: 'Drainage & Water', count: reports.filter((r) => r.category.includes('Drainage') || r.category.includes('Water')).length, color: '#3182CE' },
    { name: 'Footpath & Accessibility', count: reports.filter((r) => r.category.includes('Footpath') || r.category.includes('Accessibility')).length, color: '#38A169' }
  ];

  // Ward Performance Data
  const wardData = [
    { ward: 'Ward 14 (South Zone)', total: 18, resolved: 14, rate: 77.7 },
    { ward: 'Ward 08 (Central Zone)', total: 15, resolved: 12, rate: 80.0 },
    { ward: 'Ward 22 (North Zone)', total: 12, resolved: 8, rate: 66.6 },
    { ward: 'Ward 11 (West Zone)', total: 9, resolved: 7, rate: 77.7 },
    { ward: 'Ward 03 (Central Zone)', total: 8, resolved: 6, rate: 75.0 }
  ];

  // Trend Data for Grievance Registrations (Past 7 Days Simulation)
  const trendDays = [
    { day: '26 Oct', count: 4 },
    { day: '27 Oct', count: 7 },
    { day: '28 Oct', count: 9 },
    { day: '29 Oct', count: 12 },
    { day: '30 Oct', count: 8 },
    { day: '31 Oct', count: 14 },
    { day: '01 Nov', count: 11 }
  ];
  const maxDayCount = 16;

  // Recent Grievances Columns
  const recentColumns = [
    {
      header: 'Ticket ID',
      key: 'ticketNumber',
      width: '130px',
      render: (val) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-gov-blue)' }}>
          {val}
        </span>
      )
    },
    {
      header: 'Subject & Category',
      key: 'title',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--color-primary-navy)', fontSize: '0.875rem' }}>
            {val}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            {row.category} • {row.wardNumber || row.location}
          </div>
        </div>
      )
    },
    {
      header: 'Priority',
      key: 'severity',
      width: '100px',
      render: (val) => (
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '2px',
            backgroundColor: val === 'Critical' ? '#FEE2E2' : val === 'High' ? '#FEF3C7' : '#F1F5F9',
            color: val === 'Critical' ? '#991B1B' : val === 'High' ? '#92400E' : '#334155'
          }}
        >
          {val}
        </span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      width: '130px',
      render: (val) => <Badge status={val} />
    },
    {
      header: 'Action',
      key: 'action',
      width: '110px',
      align: 'center',
      render: (_, row) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate(`/authority/grievances?ticket=${row.ticketNumber}`)}
          style={{ padding: '3px 8px', fontSize: '0.75rem' }}
        >
          Inspect
        </Button>
      )
    }
  ];

  return (
    <div>
      {/* Top Banner Notice */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
            Executive Municipal Grievance Dashboard
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Real-time urban infrastructure monitoring, citizen redressal velocity, and work order assignment oversight.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant="gold"
            icon={ArrowRight}
            onClick={() => navigate('/authority/assignments')}
          >
            Dispatch Assignments ({unassignedCount})
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/authority/grievances')}
          >
            All Grievances
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        {/* Total Grievances */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-primary-navy)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Grievances</span>
            <Inbox size={18} color="var(--color-primary-navy)" />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-primary-navy)', margin: '0.35rem 0' }}>
            {totalGrievances}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Registered in South & Central Zones</div>
        </div>

        {/* Awaiting Verification */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid #D97706', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Awaiting Verification</span>
            <Clock size={18} color="#D97706" />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: '#D97706', margin: '0.35rem 0' }}>
            {awaitingVerification}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#D97706' }}>Under initial citizen verification</div>
        </div>

        {/* Unassigned Complaints */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid #E11D48', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Unassigned Complaints</span>
            <UserX size={18} color="#E11D48" />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: '#E11D48', margin: '0.35rem 0' }}>
            {unassignedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#E11D48' }}>Requires field squad dispatch</div>
        </div>

        {/* In Progress */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-gov-blue)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>In Progress / Active</span>
            <RefreshCw size={18} color="var(--color-gov-blue)" />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-gov-blue)', margin: '0.35rem 0' }}>
            {inProgressCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-gov-blue)' }}>Field remediation underway</div>
        </div>

        {/* Resolved */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-success-green)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Resolved & Closed</span>
            <CheckCircle2 size={18} color="var(--color-success-green)" />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-success-green)', margin: '0.35rem 0' }}>
            {resolvedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-success-green)' }}>Remediation sign-off complete</div>
        </div>

        {/* Escalated */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-alert-red)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Escalated / Reopened</span>
            <AlertTriangle size={18} color="var(--color-alert-red)" />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-alert-red)', margin: '0.35rem 0' }}>
            {escalatedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-alert-red)' }}>SLA breached / Citizen dispute</div>
        </div>
      </div>

      {/* Priority Alerts Section (Section E) */}
      {priorityAlerts.length > 0 && (
        <div
          style={{
            backgroundColor: '#FFF1F2',
            border: '1px solid #FECDD3',
            borderLeft: '4px solid var(--color-alert-red)',
            padding: '1.25rem',
            borderRadius: '2px',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={20} color="var(--color-alert-red)" />
              <strong style={{ color: '#9F1239', fontSize: '0.9375rem' }}>
                Priority Action Alerts: {priorityAlerts.length} Unresolved High/Critical Safety Hazards
              </strong>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#9F1239', fontWeight: 600 }}>
              Immediate Zonal Attention Mandated by By-laws
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {priorityAlerts.slice(0, 3).map((item) => (
              <div
                key={item.ticketNumber}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #FFE4E6',
                  padding: '0.75rem 1rem',
                  borderRadius: '2px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-alert-red)', fontSize: '0.8125rem' }}>
                    {item.ticketNumber} • {item.severity}
                  </div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary-navy)', marginTop: '2px' }}>
                    {item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {item.location}
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/authority/assignments?ticket=${item.ticketNumber}`)}
                  style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                >
                  Dispatch
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid: Charts & Analytics Summary */}
      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Section A: Grievance Trend Chart (SVG / CSS) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            padding: '1.5rem',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                Grievance Inflow Velocity (7-Day Trend)
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                New citizen grievance registrations recorded per day
              </div>
            </div>
            <TrendingUp size={18} color="var(--color-gov-blue)" />
          </div>

          {/* SVG & Bar Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '170px', paddingTop: '1rem', borderBottom: '1px solid var(--color-border-light)' }}>
            {trendDays.map((t) => {
              const heightPercent = Math.round((t.count / maxDayCount) * 100);
              return (
                <div key={t.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '6px' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
                    {t.count}
                  </span>
                  <div
                    style={{
                      width: '28px',
                      height: `${heightPercent}%`,
                      backgroundColor: 'var(--color-gov-blue)',
                      borderRadius: '2px 2px 0 0',
                      transition: 'height 0.3s ease'
                    }}
                    title={`${t.count} grievances on ${t.day}`}
                  />
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    {t.day}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            <span>7-Day Inflow: 65 Complaints</span>
            <span style={{ color: 'var(--color-success-green)', fontWeight: 600 }}>SLA Intake Index: Normal</span>
          </div>
        </div>

        {/* Section B: Category Distribution */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            padding: '1.5rem',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                Category Distribution
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                Active grievances segmented by municipal division
              </div>
            </div>
            <PieChart size={18} color="var(--color-gold)" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {categoryStats.map((cat) => {
              const pct = totalGrievances > 0 ? Math.round((cat.count / totalGrievances) * 100) : 0;
              return (
                <div key={cat.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-primary-navy)' }}>{cat.name}</span>
                    <span style={{ fontWeight: 700, color: 'var(--color-text-secondary)' }}>{cat.count} ({pct}%)</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#EEF2F6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.max(pct, 5)}%`, height: '100%', backgroundColor: cat.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section C: Ward Performance */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          padding: '1.5rem',
          borderRadius: '2px',
          boxShadow: 'var(--shadow-subtle)',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: 0 }}>
              Zonal Ward Redressal & Resolution Velocity
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Comparison of complaint volume and resolution rates across jurisdictional wards
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => navigate('/authority/analytics')}>
            Full Ward Analytics →
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {wardData.map((w) => (
            <div
              key={w.ward}
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid var(--color-border)',
                padding: '1rem',
                borderRadius: '2px'
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                {w.ward}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                <span>Total: {w.total}</span>
                <span style={{ color: 'var(--color-success-green)', fontWeight: 700 }}>Resolved: {w.resolved}</span>
              </div>
              <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.35rem' }}>
                <div style={{ width: `${w.rate}%`, height: '100%', backgroundColor: 'var(--color-success-green)' }} />
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gov-blue)' }}>
                {w.rate}% Resolution Rate
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section D: Recent Grievances Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-subtle)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: 0 }}>
              Recent Grievances Register
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Chronological log of latest citizen reports across South and Central municipal divisions
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/authority/grievances')}
          >
            View Complete Register ({reports.length}) →
          </Button>
        </div>

        <Table
          columns={recentColumns}
          data={reports.slice(0, 5)}
          emptyMessage="No grievances recorded."
          caption="Recent Municipal Grievance Inflow"
        />
      </div>
    </div>
  );
};

export default AuthorityDashboardPage;
