import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Alert from '../../components/common/Alert';
import { useReports } from '../../hooks/useReports';
import {
  User,
  PlusCircle,
  EyeOff,
  MapPin
} from 'lucide-react';

export const CitizenDashboardPage = () => {
  const navigate = useNavigate();
  const { userReports, currentUser } = useReports();
  const [filterStatus, setFilterStatus] = useState('ALL');

  const totalFiled = userReports.length;
  const resolvedCount = userReports.filter((r) => r.status.toLowerCase().includes('resolved') || r.status.toLowerCase().includes('closed')).length;
  const inProgressCount = totalFiled - resolvedCount;

  const filteredReports = filterStatus === 'ALL'
    ? userReports
    : filterStatus === 'RESOLVED'
    ? userReports.filter((r) => r.status.toLowerCase().includes('resolved'))
    : userReports.filter((r) => !r.status.toLowerCase().includes('resolved'));

  const historyColumns = [
    {
      header: 'Ticket ID',
      key: 'ticketNumber',
      width: '140px',
      render: (val) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-gov-blue)', fontSize: '0.875rem' }}>
          {val}
        </span>
      )
    },
    {
      header: 'Grievance Subject & Category',
      key: 'title',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.9375rem' }}>
            {val}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            {row.category} › {row.subcategory}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            <MapPin size={11} style={{ display: 'inline', marginRight: '3px' }} />
            {row.location}
          </div>
        </div>
      )
    },
    {
      header: 'Filing Date',
      key: 'reportedAt',
      width: '130px',
      render: (val) => <span style={{ fontSize: '0.8125rem' }}>{val.split(',')[0]}</span>
    },
    {
      header: 'Status',
      key: 'status',
      width: '130px',
      render: (val) => <Badge status={val} />
    },
    {
      header: 'Action',
      key: 'actions',
      width: '110px',
      align: 'center',
      render: (_, row) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate(`/track?ticket=${row.ticketNumber}`)}
          style={{ padding: '3px 10px', fontSize: '0.75rem' }}
        >
          Track Live
        </Button>
      )
    }
  ];

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Citizen Services', to: '/services' }, { label: 'Citizen Dashboard' }]} />

      <div className="portal-container" style={{ paddingTop: '2rem' }}>
        {/* Header Notice */}
        <Alert type="info" title="Citizen Account & Grievance History Layer">
          This dashboard connects to your active frontend state layer. Newly submitted complaints automatically synchronize across your complaint history, public registers, and the tracking engine.
        </Alert>

        {/* Citizen Profile Banner */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderTop: '4px solid var(--color-gov-blue)',
            padding: '1.5rem',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-subtle)',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#EEF3F8',
                color: 'var(--color-gov-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <User size={30} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                  {currentUser.name}
                </h2>
                <Badge variant="navy">Registered Citizen</Badge>
              </div>

              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                <span><strong>Jurisdiction:</strong> {currentUser.ward}</span>
                <span style={{ margin: '0 8px' }}>•</span>
                <span><strong>Contact:</strong> {currentUser.phone}</span>
                <span style={{ margin: '0 8px' }}>•</span>
                <span><strong>Registered Since:</strong> {currentUser.memberSince}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button
              variant="gold"
              icon={PlusCircle}
              onClick={() => navigate('/report')}
            >
              Lodge New Grievance
            </Button>
            <Button
              variant="secondary"
              icon={EyeOff}
              onClick={() => navigate('/blind-spots')}
            >
              Audit Blind Spots
            </Button>
          </div>
        </div>

        {/* User Summary KPI Strip */}
        <div className="grid-3" style={{ gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-gov-blue)', padding: '1.25rem', borderRadius: '2px' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Total Grievances Lodged by You
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary-navy)', margin: '0.25rem 0' }}>
              {totalFiled}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-gov-blue)' }}>
              Recorded in Ward Register
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid #B7791F', padding: '1.25rem', borderRadius: '2px' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Active / Under Remediation
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#B7791F', margin: '0.25rem 0' }}>
              {inProgressCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#B7791F' }}>
              Under active SLA clock
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-success-green)', padding: '1.25rem', borderRadius: '2px' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Resolved & Verified
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-success-green)', margin: '0.25rem 0' }}>
              {resolvedCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-success-green)' }}>
              Completed with community sign-off
            </div>
          </div>
        </div>

        {/* Grievance History Table Section */}
        <section style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                My Complaint History
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
                Complete chronological log of all grievances lodged by your account across municipal wards.
              </p>
            </div>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => setFilterStatus('ALL')}
                style={{
                  backgroundColor: filterStatus === 'ALL' ? 'var(--color-gov-blue)' : '#FFFFFF',
                  color: filterStatus === 'ALL' ? '#FFFFFF' : 'var(--color-dark-slate)',
                  border: '1px solid var(--color-border)',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                All ({totalFiled})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('PENDING')}
                style={{
                  backgroundColor: filterStatus === 'PENDING' ? 'var(--color-gov-blue)' : '#FFFFFF',
                  color: filterStatus === 'PENDING' ? '#FFFFFF' : 'var(--color-dark-slate)',
                  border: '1px solid var(--color-border)',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                In Progress ({inProgressCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('RESOLVED')}
                style={{
                  backgroundColor: filterStatus === 'RESOLVED' ? 'var(--color-gov-blue)' : '#FFFFFF',
                  color: filterStatus === 'RESOLVED' ? '#FFFFFF' : 'var(--color-dark-slate)',
                  border: '1px solid var(--color-border)',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Resolved ({resolvedCount})
              </button>
            </div>
          </div>

          <Table
            columns={historyColumns}
            data={filteredReports}
            emptyMessage="You have not submitted any complaints in this category yet."
            caption="Citizen Personal Grievances Register"
          />
        </section>
      </div>
    </div>
  );
};

export default CitizenDashboardPage;
