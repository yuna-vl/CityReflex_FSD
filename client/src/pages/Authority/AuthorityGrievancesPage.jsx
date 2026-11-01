import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useReports } from '../../hooks/useReports';
import { useAuth } from '../../hooks/useAuth';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import {
  Search,
  Eye,
  X,
  MapPin,
  Send,
  ArrowRight
} from 'lucide-react';

export const AuthorityGrievancesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedTicketParam = searchParams.get('ticket') || '';

  const { reports, getTicket, updateGrievanceStatus } = useReports();
  const { user } = useAuth();

  // Filters state
  const [searchQuery, setSearchQuery] = useState(selectedTicketParam);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [wardFilter, setWardFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('NEWEST');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Selected complaint detail modal
  const [selectedTicket, setSelectedTicket] = useState(() => {
    if (selectedTicketParam) {
      return getTicket(selectedTicketParam);
    }
    return null;
  });

  // Status transition form within modal
  const [newStatus, setNewStatus] = useState('');
  const [statusRemarks, setStatusRemarks] = useState('');
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(false);

  // Sync selectedTicket when param changes
  const [prevParam, setPrevParam] = useState(selectedTicketParam);
  if (selectedTicketParam !== prevParam) {
    setPrevParam(selectedTicketParam);
    if (selectedTicketParam) {
      const found = getTicket(selectedTicketParam);
      setSelectedTicket(found);
      setStatusUpdateSuccess(false);
    }
  }

  // Filter & Sort Logic
  const filteredReports = useMemo(() => {
    return reports
      .filter((r) => {
        // Search
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchTicket = r.ticketNumber.toLowerCase().includes(q);
          const matchTitle = r.title.toLowerCase().includes(q);
          const matchLoc = r.location.toLowerCase().includes(q);
          if (!matchTicket && !matchTitle && !matchLoc) return false;
        }
        // Category
        if (categoryFilter !== 'ALL' && !r.category.toLowerCase().includes(categoryFilter.toLowerCase())) {
          return false;
        }
        // Ward
        if (wardFilter !== 'ALL' && !r.wardNumber?.includes(wardFilter) && !r.location?.includes(wardFilter)) {
          return false;
        }
        // Status
        if (statusFilter !== 'ALL' && !r.status.toLowerCase().includes(statusFilter.toLowerCase())) {
          return false;
        }
        // Priority
        if (priorityFilter !== 'ALL' && r.severity?.toLowerCase() !== priorityFilter.toLowerCase()) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'NEWEST') return b.ticketNumber.localeCompare(a.ticketNumber);
        return a.ticketNumber.localeCompare(b.ticketNumber);
      });
  }, [reports, searchQuery, categoryFilter, wardFilter, statusFilter, priorityFilter, sortOrder]);

  // Paginated records
  const totalPages = Math.ceil(filteredReports.length / pageSize) || 1;
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReports.slice(start, start + pageSize);
  }, [filteredReports, currentPage, pageSize]);

  const handleOpenDetail = (ticketNumber) => {
    const found = getTicket(ticketNumber);
    setSelectedTicket(found);
    setStatusRemarks('');
    setStatusUpdateSuccess(false);
    if (found) {
      setNewStatus(found.currentStatus);
    }
    setSearchParams({ ticket: ticketNumber });
  };

  const handleCloseDetail = () => {
    setSelectedTicket(null);
    setSearchParams({});
  };

  const handleStatusTransitionSubmit = (e) => {
    e.preventDefault();
    if (!selectedTicket || !newStatus) return;

    updateGrievanceStatus(selectedTicket.ticketNumber, newStatus, statusRemarks, user);
    setStatusUpdateSuccess(true);
    // Refresh modal ticket
    const refreshed = getTicket(selectedTicket.ticketNumber);
    setSelectedTicket(refreshed);
  };

  // Table Columns (S.No, Ticket ID, Category, Location, Ward, Date, Priority, Status, Action)
  const columns = [
    {
      header: 'S.No',
      key: 'serial',
      width: '60px',
      align: 'center',
      render: (_, __, idx) => (currentPage - 1) * pageSize + idx + 1
    },
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
      header: 'Complaint Subject & Category',
      key: 'title',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--color-primary-navy)', fontSize: '0.875rem' }}>
            {val}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            {row.category}
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
      header: 'Reported Date',
      key: 'reportedAt',
      width: '120px',
      render: (val) => <span style={{ fontSize: '0.8125rem' }}>{val ? val.split(',')[0].split(' ')[0] : 'Today'}</span>
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
      width: '110px',
      align: 'center',
      render: (_, row) => (
        <Button
          variant="secondary"
          size="sm"
          icon={Eye}
          onClick={() => handleOpenDetail(row.ticketNumber)}
          style={{ padding: '3px 8px', fontSize: '0.75rem' }}
        >
          View Log
        </Button>
      )
    }
  ];

  return (
    <div>
      {/* Header Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
            Comprehensive Grievance Register
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Master municipal grievance repository with multi-field search, status transitions, and audit trails.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant="gold"
            icon={ArrowRight}
            onClick={() => navigate('/authority/assignments')}
          >
            Go to Work Order Assignments
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
          {/* Search Query */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Search Ticket ID / Location</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. CR-2026-8842 or M.G. Road"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ paddingLeft: '28px', fontSize: '0.8125rem' }}
              />
              <Search size={14} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Category</label>
            <select
              className="form-control"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{ fontSize: '0.8125rem' }}
            >
              <option value="ALL">All Civic Categories</option>
              <option value="Road">Road Damage / Potholes</option>
              <option value="Garbage">Garbage and Waste</option>
              <option value="Streetlight">Streetlight Issues</option>
              <option value="Drainage">Drainage and Waterlogging</option>
              <option value="Footpath">Footpath & Accessibility</option>
              <option value="Safety">Public Safety</option>
            </select>
          </div>

          {/* Ward Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Ward Jurisdiction</label>
            <select
              className="form-control"
              value={wardFilter}
              onChange={(e) => {
                setWardFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{ fontSize: '0.8125rem' }}
            >
              <option value="ALL">All Wards (01 - 24)</option>
              <option value="14">Ward 14 (South Zone)</option>
              <option value="08">Ward 08 (Central Zone)</option>
              <option value="22">Ward 22 (North Zone)</option>
              <option value="11">Ward 11 (West Zone)</option>
              <option value="03">Ward 03 (Central Zone)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Lifecycle Status</label>
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{ fontSize: '0.8125rem' }}
            >
              <option value="ALL">All Lifecycle Statuses</option>
              <option value="Reported">Reported</option>
              <option value="Verified">Verified</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Citizen-Confirmed">Citizen-Confirmed</option>
              <option value="Escalated">Escalated / Reopened</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Priority Level</label>
            <select
              className="form-control"
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{ fontSize: '0.8125rem' }}
            >
              <option value="ALL">All Priorities</option>
              <option value="Critical">Critical Priority</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* Results Counter & Sort */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border-light)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
          <div>
            Showing <strong>{filteredReports.length}</strong> matching grievances (Page {currentPage} of {totalPages})
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ fontSize: '0.75rem', padding: '2px 6px', border: '1px solid var(--color-border)' }}
            >
              <option value="NEWEST">Newest First</option>
              <option value="OLDEST">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
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
        <Table
          columns={columns}
          data={paginatedReports}
          emptyMessage="No grievances matching the selected filter criteria."
          caption="Municipal Grievance Register Database"
        />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '2px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: currentPage === page ? 'var(--color-gov-blue)' : '#FFFFFF',
                  color: currentPage === page ? '#FFFFFF' : 'var(--color-dark-slate)',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  cursor: 'pointer'
                }}
              >
                {page}
              </button>
            ))}

            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Detailed Complaint Modal / Drawer */}
      {selectedTicket && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxWidth: '850px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '2px',
              borderTop: '4px solid var(--color-gov-blue)',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
              padding: '1.75rem'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-primary-navy)' }}>
                    {selectedTicket.ticketNumber}
                  </span>
                  <Badge status={selectedTicket.currentStatus} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '2px', backgroundColor: '#FEF3C7', color: '#92400E' }}>
                    {selectedTicket.urgencyLevel}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary-navy)', margin: '0.25rem 0' }}>
                  {selectedTicket.subject}
                </h3>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  {selectedTicket.address} • {selectedTicket.ward}
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseDetail}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={24} />
              </button>
            </div>

            {statusUpdateSuccess && (
              <div style={{ marginBottom: '1rem' }}>
                <Alert type="success" title="Status Transition Successfully Committed">
                  Grievance record updated to <strong>{selectedTicket.currentStatus}</strong>. Change propagated to citizen audit tracking and field logs.
                </Alert>
              </div>
            )}

            {/* Complaint Detail Columns */}
            <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
              {/* Left Column: Evidence Photo & Description */}
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
                  Citizen Photographic Evidence
                </div>
                <div style={{ border: '1px solid var(--color-border)', borderRadius: '2px', overflow: 'hidden', height: '220px', backgroundColor: '#F1F5F9', marginBottom: '1rem' }}>
                  <img
                    src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80"
                    alt="Civic defect evidence"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
                  Grievance Description & Impact
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '2px', margin: 0 }}>
                  {selectedTicket.description || 'Deep surface crater creating a direct hazard for vehicular and pedestrian traffic. Immediate road patch required.'}
                </p>
              </div>

              {/* Right Column: Metadata & Assignment Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', padding: '1rem', borderRadius: '2px' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-gov-blue)', marginBottom: '0.5rem' }}>
                    Reporter Information (Anonymity Compliant)
                  </div>
                  <div style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
                    <div><strong>Citizen:</strong> {selectedTicket.citizenName || 'Registered Ward Resident'}</div>
                    <div><strong>Contact:</strong> {selectedTicket.citizenContact || 'Verified Citizen Account'}</div>
                    <div><strong>Submission Date:</strong> {selectedTicket.submissionDate}</div>
                    <div><strong>Statutory SLA Deadline:</strong> {selectedTicket.expectedResolutionDate}</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', padding: '1rem', borderRadius: '2px' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-gov-blue)', marginBottom: '0.5rem' }}>
                    Current Assignment & Responsible Nodal Desk
                  </div>
                  <div style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
                    <div><strong>Department:</strong> {selectedTicket.assignedAuthority?.department || 'Unassigned'}</div>
                    <div><strong>Assigned Officer:</strong> {selectedTicket.assignedAuthority?.name || 'Awaiting Allocation'}</div>
                    <div><strong>Contact:</strong> {selectedTicket.assignedAuthority?.contact || 'N/A'}</div>
                  </div>
                </div>

                {/* Authority Lifecycle Status Transition Form */}
                <div style={{ border: '2px solid var(--color-gold)', padding: '1rem', borderRadius: '2px', backgroundColor: '#FFFDF9' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '0.5rem' }}>
                    Execute Authorized Status Transition
                  </div>
                  <form onSubmit={handleStatusTransitionSubmit}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Transition Status To:</label>
                      <select
                        className="form-control"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        style={{ fontSize: '0.8125rem' }}
                      >
                        <option value="Reported">Reported</option>
                        <option value="Verified">Verified</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Citizen-Confirmed">Citizen-Confirmed</option>
                        <option value="Reopened - Under Investigation">Reopened - Under Investigation</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Officer Administrative Remarks:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Remediation verified on site / Dispatched contractor squad"
                        value={statusRemarks}
                        onChange={(e) => setStatusRemarks(e.target.value)}
                        style={{ fontSize: '0.8125rem' }}
                        required
                      />
                    </div>

                    <Button variant="primary" size="sm" fullWidth type="submit" icon={Send}>
                      Commit Status Transition to Audit History
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Complete Status History Audit Trail */}
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-navy)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
                Complete Statutory Lifecycle Audit Trail
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedTicket.timeline?.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      fontSize: '0.8125rem',
                      padding: '0.5rem 0.75rem',
                      backgroundColor: '#F8FAFC',
                      borderLeft: '3px solid var(--color-gov-blue)',
                      borderRadius: '2px'
                    }}
                  >
                    <div style={{ minWidth: '90px', fontWeight: 700, color: 'var(--color-gov-blue)' }}>
                      {step.stage}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--color-primary-navy)' }}>
                        {step.title}
                      </div>
                      <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                        {step.description}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        Timestamp: {step.date} • Officer: {step.officer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <Button variant="secondary" onClick={handleCloseDetail}>
                Close Modal
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorityGrievancesPage;
