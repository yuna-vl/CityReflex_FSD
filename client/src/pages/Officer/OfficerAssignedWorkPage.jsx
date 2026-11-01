import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useReports } from '../../hooks/useReports';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  Search,
  ClipboardCheck,
  MapPin
} from 'lucide-react';

export const OfficerAssignedWorkPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { reports } = useReports();

  const officerId = user?.id || 'OFF-PWD-014';
  const officerName = user?.name || 'Mr. V. Nair';

  const myAssignedReports = useMemo(() => {
    return reports.filter(
      (r) => r.assignedOfficerId === officerId ||
             (r.assignedOfficer && r.assignedOfficer.includes(officerName))
    );
  }, [reports, officerId, officerName]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filteredReports = useMemo(() => {
    return myAssignedReports.filter((r) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTicket = r.ticketNumber.toLowerCase().includes(q);
        const matchTitle = r.title.toLowerCase().includes(q);
        const matchLoc = r.location.toLowerCase().includes(q);
        if (!matchTicket && !matchTitle && !matchLoc) return false;
      }
      if (statusFilter !== 'ALL' && !r.status.toLowerCase().includes(statusFilter.toLowerCase())) {
        return false;
      }
      if (priorityFilter !== 'ALL' && r.severity?.toLowerCase() !== priorityFilter.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [myAssignedReports, searchQuery, statusFilter, priorityFilter]);

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
            My Assigned Field Work Orders
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Active civil engineering work orders allocated to Junior Engineer <strong>{officerName}</strong>.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/officer/inspections')}
        >
          Launch Site Inspection Form
        </Button>
      </div>

      {/* Filter Strip */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-subtle)',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Search My Work Orders</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search ticket or landmark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '28px', fontSize: '0.8125rem' }}
              />
              <Search size={14} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            </div>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Status</label>
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ fontSize: '0.8125rem' }}
            >
              <option value="ALL">All Work Orders</option>
              <option value="Assigned">Assigned (Pending Start)</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved (Awaiting Citizen Sign-off)</option>
              <option value="Citizen-Confirmed">Citizen-Confirmed</option>
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Priority</label>
            <select
              className="form-control"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{ fontSize: '0.8125rem' }}
            >
              <option value="ALL">All Priorities</option>
              <option value="Critical">Critical Priority</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border-light)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          Showing <strong>{filteredReports.length}</strong> assigned tickets. Select "Inspect / Execute" to log on-ground measurements and completion photos.
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-subtle)'
        }}
      >
        <Table
          columns={columns}
          data={filteredReports}
          emptyMessage="No assigned work orders matching the selected filter criteria."
          caption="Junior Engineer Work Orders Table"
        />
      </div>
    </div>
  );
};

export default OfficerAssignedWorkPage;
