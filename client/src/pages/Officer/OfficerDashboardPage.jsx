import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useReports } from '../../hooks/useReports';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Alert from '../../components/common/Alert';
import {
  HardHat,
  Clock,
  RefreshCw,
  CheckCircle2,
  MapPin,
  ClipboardCheck
} from 'lucide-react';

export const OfficerDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { reports } = useReports();

  const officerId = user?.id || 'OFF-PWD-014';
  const officerName = user?.name || 'Mr. V. Nair';

  // Filter complaints assigned ONLY to this demonstration account
  const myAssignedReports = reports.filter(
    (r) => r.assignedOfficerId === officerId ||
           (r.assignedOfficer && r.assignedOfficer.includes(officerName))
  );

  // Metrics
  const totalAssigned = myAssignedReports.length;
  const pendingInspection = myAssignedReports.filter(
    (r) => r.status === 'Assigned' || r.status === 'Reported' || r.status === 'Verified'
  ).length;
  const workInProgress = myAssignedReports.filter((r) => r.status === 'In Progress').length;
  const completedWork = myAssignedReports.filter(
    (r) => r.status === 'Resolved' || r.status === 'Citizen-Confirmed'
  ).length;

  const columns = [
    {
      header: 'Ticket ID',
      key: 'ticketNumber',
      width: '135px',
      render: (val) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-gov-blue)' }}>
          {val}
        </span>
      )
    },
    {
      header: 'Complaint Category & Subject',
      key: 'title',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--color-primary-navy)', fontSize: '0.875rem' }}>
            {val}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            {row.category} • {row.subcategory || 'General Work Order'}
          </div>
        </div>
      )
    },
    {
      header: 'Location / Landmark',
      key: 'location',
      width: '200px',
      render: (val, row) => (
        <div style={{ fontSize: '0.8125rem' }}>
          <div>{row.landmark || val}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            <MapPin size={11} style={{ display: 'inline', marginRight: '3px' }} />
            {row.wardNumber || row.location}
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Date',
      key: 'reportedAt',
      width: '120px',
      render: (val) => <span style={{ fontSize: '0.8125rem' }}>{val ? val.split(',')[0].split(' ')[0] : 'Recent'}</span>
    },
    {
      header: 'Priority',
      key: 'severity',
      width: '95px',
      align: 'center',
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
          {val || 'Medium'}
        </span>
      )
    },
    {
      header: 'Current Status',
      key: 'status',
      width: '130px',
      align: 'center',
      render: (val) => <Badge status={val} />
    },
    {
      header: 'Action',
      key: 'actions',
      width: '140px',
      align: 'center',
      render: (_, row) => (
        <Button
          variant="gold"
          size="sm"
          icon={ClipboardCheck}
          onClick={() => navigate(`/officer/inspections?ticket=${row.ticketNumber}`)}
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
        >
          Inspect / Execute
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
            Field Operations & Engineering Console
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Welcome, <strong>{officerName}</strong>. Viewing work orders assigned to <strong>{user?.engineeringSquad || 'PWD Squad #4 (Ward 14)'}</strong>.
          </p>
        </div>

        <Button
          variant="primary"
          icon={ClipboardCheck}
          onClick={() => navigate('/officer/inspections')}
        >
          Open Field Inspection Console
        </Button>
      </div>

      <Alert type="info" title="Demonstration Role Boundary Active">
        This console displays only grievances specifically allocated to <strong>{officerName} (ID: {officerId})</strong> by the Municipal Authority. Actions executed here update the live central state and become visible to citizens and executive authorities in real time.
      </Alert>

      {/* KPI Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          margin: '1.5rem 0 2rem 0'
        }}
      >
        {/* Total Assigned */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-primary-navy)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Assigned</span>
            <HardHat size={18} color="var(--color-primary-navy)" />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-primary-navy)', margin: '0.25rem 0' }}>
            {totalAssigned}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Work orders allocated to your squad</div>
        </div>

        {/* Pending Inspection */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid #D97706', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Pending Inspection</span>
            <Clock size={18} color="#D97706" />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: '#D97706', margin: '0.25rem 0' }}>
            {pendingInspection}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#D97706' }}>Awaiting physical site measurement</div>
        </div>

        {/* Work In Progress */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-gov-blue)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Work In Progress</span>
            <RefreshCw size={18} color="var(--color-gov-blue)" />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-gov-blue)', margin: '0.25rem 0' }}>
            {workInProgress}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-gov-blue)' }}>Contractor squad active on ground</div>
        </div>

        {/* Completed Work */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-success-green)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Completed Work</span>
            <CheckCircle2 size={18} color="var(--color-success-green)" />
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-success-green)', margin: '0.25rem 0' }}>
            {completedWork}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-success-green)' }}>Awaiting Citizen Sign-off</div>
        </div>
      </div>

      {/* Main "My Assigned Work" Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-subtle)',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: 0 }}>
              My Assigned Work Orders
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Complaints under active mandate of {user?.name || 'Mr. V. Nair'} ({user?.department})
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/officer/assigned-work')}
          >
            View Filterable List ({myAssignedReports.length}) →
          </Button>
        </div>

        <Table
          columns={columns}
          data={myAssignedReports}
          emptyMessage="No work orders currently assigned to your demonstration account. Switch to Authority Portal to assign complaints to Mr. V. Nair."
          caption="Field Officer Assigned Work Orders Register"
        />
      </div>
    </div>
  );
};

export default OfficerDashboardPage;
