import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useReports } from '../../hooks/useReports';
import { useAuth } from '../../hooks/useAuth';
import { FIELD_OFFICERS_DIRECTORY, DEPARTMENTS_LIST } from '../../data/mockUsers';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Alert from '../../components/common/Alert';
import {
  Building2,
  HardHat,
  AlertCircle,
  CheckCircle2,
  Send,
  MapPin,
  FileText
} from 'lucide-react';

export const AuthorityAssignmentsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedTicket = searchParams.get('ticket') || '';

  const { reports, assignGrievance } = useReports();
  const { user } = useAuth();

  // Find all unassigned or pending complaints
  const unassignedGrievances = reports.filter(
    (r) => !r.assignedOfficerId || r.assignedDepartment === 'Unassigned' || r.status === 'Reported' || r.status === 'Verified'
  );

  // Active Dispatched Assignments list
  const activeAssignments = reports.filter(
    (r) => r.assignedOfficerId && r.assignedDepartment !== 'Unassigned' && r.status !== 'Reported'
  );

  const [selectedTicketNumber, setSelectedTicketNumber] = useState(
    preselectedTicket || (unassignedGrievances[0]?.ticketNumber || '')
  );

  // Sync if preselectedTicket changes
  const [prevParam, setPrevParam] = useState(preselectedTicket);
  if (preselectedTicket !== prevParam) {
    setPrevParam(preselectedTicket);
    if (preselectedTicket) {
      setSelectedTicketNumber(preselectedTicket);
    }
  }

  const selectedGrievance = reports.find((r) => r.ticketNumber === selectedTicketNumber) || unassignedGrievances[0];

  // Assignment Form State
  const [selectedDepartment, setSelectedDepartment] = useState('Roads and Infrastructure');
  const [selectedOfficerId, setSelectedOfficerId] = useState('OFF-PWD-014');
  const [selectedPriority, setSelectedPriority] = useState('High');
  const [assignmentRemarks, setAssignmentRemarks] = useState(
    'Deploy quick response inspection squad for physical defect measurement and asphalt compaction.'
  );
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);
  const [lastAssignedTicket, setLastAssignedTicket] = useState('');

  // Filter officers by selected department or show matching
  const matchingOfficers = FIELD_OFFICERS_DIRECTORY.filter(
    (off) => off.department === selectedDepartment
  );
  const availableOfficers = matchingOfficers.length > 0 ? matchingOfficers : FIELD_OFFICERS_DIRECTORY;

  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
    const firstMatching = FIELD_OFFICERS_DIRECTORY.find((o) => o.department === dept);
    if (firstMatching) {
      setSelectedOfficerId(firstMatching.id);
    }
  };

  const handleConfirmAssignment = (e) => {
    e.preventDefault();
    if (!selectedGrievance) return;

    const assignedOfficerObj = FIELD_OFFICERS_DIRECTORY.find((o) => o.id === selectedOfficerId);
    const officerName = assignedOfficerObj ? assignedOfficerObj.name : 'Mr. V. Nair';

    assignGrievance(selectedGrievance.ticketNumber, {
      department: selectedDepartment,
      officerId: selectedOfficerId,
      officerName: officerName,
      priority: selectedPriority,
      remarks: assignmentRemarks,
      adminUser: user
    });

    setLastAssignedTicket(selectedGrievance.ticketNumber);
    setAssignmentSuccess(true);

    // Pick next unassigned if available
    const remaining = unassignedGrievances.filter((r) => r.ticketNumber !== selectedGrievance.ticketNumber);
    if (remaining.length > 0) {
      setSelectedTicketNumber(remaining[0].ticketNumber);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
            Work Order & Field Assignment Console
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Allocate incoming grievances to specialized municipal departments and field junior engineers with statutory SLA benchmarks.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant="secondary"
            onClick={() => navigate('/authority/grievances')}
          >
            All Grievances
          </Button>
          <Button
            variant="gold"
            onClick={() => navigate('/officer/dashboard')}
          >
            Preview Field Officer Console →
          </Button>
        </div>
      </div>

      {assignmentSuccess && (
        <div style={{ marginBottom: '1.5rem' }}>
          <Alert type="success" title="Work Order Successfully Dispatched">
            Ticket <strong>{lastAssignedTicket}</strong> has been allocated to <strong>{FIELD_OFFICERS_DIRECTORY.find(o => o.id === selectedOfficerId)?.name}</strong> ({selectedDepartment}). It is now live in their field assigned work orders!
          </Alert>
        </div>
      )}

      {/* Main Assignment Section: 2 Columns */}
      <div className="grid-2" style={{ gap: '2rem', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        {/* Left Column: Unassigned Complaints Queue */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                Pending Allocation Queue
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                Select a complaint to allocate to a field squad
              </div>
            </div>
            <span
              style={{
                backgroundColor: unassignedGrievances.length > 0 ? '#FEE2E2' : '#DCFCE7',
                color: unassignedGrievances.length > 0 ? '#991B1B' : '#14532D',
                padding: '2px 8px',
                borderRadius: '2px',
                fontWeight: 700,
                fontSize: '0.75rem'
              }}
            >
              {unassignedGrievances.length} Awaiting Assignment
            </span>
          </div>

          {unassignedGrievances.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              <CheckCircle2 size={36} color="var(--color-success-green)" style={{ margin: '0 auto 0.75rem auto' }} />
              <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)' }}>All Grievances Currently Assigned</div>
              <div style={{ fontSize: '0.8125rem', marginTop: '4px' }}>Every active grievance in your zonal jurisdiction has an assigned field officer.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '520px', overflowY: 'auto' }}>
              {unassignedGrievances.map((g) => {
                const isSelected = selectedGrievance?.ticketNumber === g.ticketNumber;
                return (
                  <div
                    key={g.ticketNumber}
                    onClick={() => {
                      setSelectedTicketNumber(g.ticketNumber);
                      setAssignmentSuccess(false);
                    }}
                    style={{
                      border: isSelected ? '2px solid var(--color-gov-blue)' : '1px solid var(--color-border)',
                      backgroundColor: isSelected ? '#F0F7FF' : '#FFFFFF',
                      padding: '1rem',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--color-gov-blue)', fontSize: '0.875rem' }}>
                        {g.ticketNumber}
                      </span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <Badge status={g.status} />
                        <span style={{ fontSize: '0.6875rem', backgroundColor: '#FEF3C7', color: '#92400E', fontWeight: 700, padding: '1px 6px', borderRadius: '2px' }}>
                          {g.severity}
                        </span>
                      </div>
                    </div>

                    <div style={{ fontWeight: 600, color: 'var(--color-primary-navy)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                      {g.title}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span><strong>Category:</strong> {g.category}</span>
                      <span>•</span>
                      <span><strong>Ward:</strong> {g.wardNumber || g.location}</span>
                    </div>

                    <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                      Reported: {g.reportedAt} • Verified by {g.verifiedCount || 0} residents
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Interactive Assignment Dispatch Form */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderTop: '4px solid var(--color-gov-blue)',
            borderRadius: '2px',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          {selectedGrievance ? (
            <div>
              <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                  Target Grievance for Work Order Dispatch
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.125rem', color: 'var(--color-primary-navy)' }}>
                    {selectedGrievance.ticketNumber}
                  </span>
                  <Badge status={selectedGrievance.status} />
                </div>
                <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.9375rem' }}>
                  {selectedGrievance.title}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                  {selectedGrievance.location}
                </div>
              </div>

              <form onSubmit={handleConfirmAssignment}>
                {/* 1. Select Department */}
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Building2 size={14} color="var(--color-gov-blue)" />
                    <span>Assign to Municipal Department Division:</span>
                  </label>
                  <select
                    className="form-control"
                    value={selectedDepartment}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    required
                  >
                    {DEPARTMENTS_LIST.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* 2. Select Field Officer */}
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <HardHat size={14} color="var(--color-gold)" />
                    <span>Select Nodal Field Officer / Junior Engineer:</span>
                  </label>
                  <select
                    className="form-control"
                    value={selectedOfficerId}
                    onChange={(e) => setSelectedOfficerId(e.target.value)}
                    required
                  >
                    {availableOfficers.map((officer) => (
                      <option key={officer.id} value={officer.id}>
                        {officer.name} — {officer.designation} ({officer.ward}) [{officer.activeWorkOrders} active]
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Priority Level */}
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <AlertCircle size={14} color="var(--color-alert-red)" />
                    <span>SLA Urgency & Work Order Priority:</span>
                  </label>
                  <select
                    className="form-control"
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    required
                  >
                    <option value="Critical">Critical Priority (Immediate Hazard - 24 Hours SLA)</option>
                    <option value="High">High Priority (Standard Infrastructure Repair - 72 Hours SLA)</option>
                    <option value="Medium">Medium Priority (Scheduled Maintenance - 120 Hours SLA)</option>
                    <option value="Low">Low Priority (Routine Overhaul - 168 Hours SLA)</option>
                  </select>
                </div>

                {/* 4. Assignment Remarks / Work Order Directives */}
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <FileText size={14} color="var(--color-gov-blue)" />
                    <span>Engineering Work Order Directives & Remarks:</span>
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Provide specific technical instructions for field squad assessment..."
                    value={assignmentRemarks}
                    onChange={(e) => setAssignmentRemarks(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Action */}
                <Button
                  variant="gold"
                  type="submit"
                  fullWidth
                  icon={Send}
                  style={{ padding: '0.75rem', fontWeight: 700 }}
                >
                  Confirm & Dispatch Work Order to Field Officer
                </Button>
              </form>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
              Select a grievance from the left queue to initiate assignment.
            </div>
          )}
        </div>
      </div>

      {/* Dispatched Work Orders Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-subtle)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: 0 }}>
              Active Dispatched Field Work Orders
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Complaints currently allocated to zonal engineering squads and sanitary divisions
            </div>
          </div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-gov-blue)' }}>
            Total Allocated: {activeAssignments.length}
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Ticket ID</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Subject</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Assigned Department</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Field Officer</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Priority</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeAssignments.map((a) => (
                <tr key={a.ticketNumber} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-gov-blue)' }}>
                    {a.ticketNumber}
                  </td>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--color-primary-navy)' }}>
                    {a.title}
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    {a.assignedDepartment}
                  </td>
                  <td style={{ padding: '8px 12px', color: 'var(--color-primary-navy)', fontWeight: 600 }}>
                    {a.assignedOfficer}
                  </td>
                  <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 6px', borderRadius: '2px', backgroundColor: a.severity === 'Critical' ? '#FEE2E2' : '#FEF3C7', color: a.severity === 'Critical' ? '#991B1B' : '#92400E' }}>
                      {a.severity}
                    </span>
                  </td>
                  <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                    <Badge status={a.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuthorityAssignmentsPage;
