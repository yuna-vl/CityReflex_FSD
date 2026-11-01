import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Alert from '../../components/common/Alert';
import { useReports } from '../../hooks/useReports';
import {
  Search,
  CheckCircle2,
  ThumbsUp,
  LayoutDashboard,
  RotateCcw,
  Check
} from 'lucide-react';

export const TrackComplaintPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const ticketParam = searchParams.get('ticket') || '';

  const { getTicket, verifyTicket, confirmCitizenResolution, reopenGrievance, userReports } = useReports();

  const [inputTicket, setInputTicket] = useState(ticketParam || 'CR-2026-8842');
  const [activeTicketId, setActiveTicketId] = useState(ticketParam || 'CR-2026-8842');
  const [errorMsg, setErrorMsg] = useState('');
  const [verificationBonus, setVerificationBonus] = useState(0);

  // Sync active ticket when URL parameter changes during render
  const [prevParam, setPrevParam] = useState(ticketParam);
  if (ticketParam !== prevParam) {
    setPrevParam(ticketParam);
    if (ticketParam) {
      setActiveTicketId(ticketParam);
      setInputTicket(ticketParam);
      setErrorMsg('');
    }
  }

  const query = activeTicketId.trim().toUpperCase();
  const currentTicket = getTicket(query) || getTicket('CR-2026-8842');
  const isVoted = currentTicket?.verifiedByUser || false;
  const verificationVotes = 18 + (isVoted ? 1 : 0) + verificationBonus;

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = inputTicket.trim().toUpperCase();
    if (!clean) {
      setErrorMsg('Please enter a valid ticket number.');
      return;
    }

    const found = getTicket(clean);
    if (found) {
      setActiveTicketId(clean);
      setErrorMsg('');
      setSearchParams({ ticket: clean });
    } else {
      setErrorMsg(`No record found for ticket "${clean}". Displaying default audit record.`);
    }
  };

  const handleVerificationVote = () => {
    if (!isVoted && currentTicket) {
      verifyTicket(currentTicket.ticketNumber);
      setVerificationBonus((prev) => prev + 1);
    }
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Citizen Services', to: '/services' }, { label: 'Track Complaint' }]} />

      <div className="portal-container" style={{ paddingTop: '2rem' }}>
        <div className="section-heading">
          <span>Grievance Lifecycle & Public Audit Trail</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              variant="secondary"
              size="sm"
              icon={LayoutDashboard}
              onClick={() => navigate('/dashboard')}
            >
              My Dashboard
            </Button>
            <Badge variant="navy">Real-time Redressal Engine</Badge>
          </div>
        </div>

        {/* Search Bar Strip */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            padding: '1.25rem',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-subtle)',
            marginBottom: '2rem'
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 300px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Complaint / Ticket ID (e.g. CR-2026-8842)"
                value={inputTicket}
                onChange={(e) => setInputTicket(e.target.value)}
                style={{ fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 700 }}
              />
            </div>
            <Button variant="primary" type="submit" icon={Search}>
              Search Audit Log
            </Button>
          </form>

          {/* Quick links to user's complaints and demo tickets */}
          <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            <strong>Quick Select Grievance: </strong>
            {userReports.map((r, index) => (
              <React.Fragment key={r.ticketNumber}>
                {index > 0 && <span> • </span>}
                <button
                  type="button"
                  onClick={() => {
                    setInputTicket(r.ticketNumber);
                    setActiveTicketId(r.ticketNumber);
                    setErrorMsg('');
                    setSearchParams({ ticket: r.ticketNumber });
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: r.isUserSubmitted ? 'var(--color-alert-red)' : 'var(--color-gov-blue)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontWeight: 700,
                    padding: 0
                  }}
                >
                  {r.ticketNumber} ({r.subcategory}{r.isUserSubmitted ? ' - Just Filed' : ''})
                </button>
              </React.Fragment>
            ))}
          </div>

          {errorMsg && (
            <div style={{ marginTop: '1rem' }}>
              <Alert type="warning">{errorMsg}</Alert>
            </div>
          )}
        </div>

        {/* Ticket Details & Timeline */}
        {currentTicket && (
          <div>
            {/* Header Summary Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderTop: '4px solid var(--color-gov-blue)',
                padding: '1.5rem',
                borderRadius: '2px',
                boxShadow: 'var(--shadow-card)',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--color-primary-navy)' }}>
                      {currentTicket.ticketNumber}
                    </span>
                    <Badge status={currentTicket.currentStatus} />
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#FEF3C7', color: '#92400E', padding: '2px 8px', fontWeight: 700, borderRadius: '2px' }}>
                      {currentTicket.urgencyLevel}
                    </span>
                    {currentTicket.isUserSubmitted && (
                      <span className="badge badge-new">Submitted By You</span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary-navy)', margin: '0.5rem 0 0.25rem 0' }}>
                    {currentTicket.subject}
                  </h3>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    {currentTicket.address} • {currentTicket.ward}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Statutory Resolution SLA Target:</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-success-green)', marginTop: '2px' }}>
                    {currentTicket.expectedResolutionDate}
                  </div>
                </div>
              </div>

              {/* Authority Nodal Box */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1rem',
                  backgroundColor: '#F8FAFC',
                  padding: '1rem',
                  borderRadius: '2px',
                  border: '1px solid var(--color-border)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Assigned Field Officer
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', marginTop: '2px' }}>
                    {currentTicket.assignedAuthority.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    {currentTicket.assignedAuthority.designation}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Department Division
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--color-dark-slate)', marginTop: '2px' }}>
                    {currentTicket.assignedAuthority.department}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gov-blue)' }}>
                    {currentTicket.assignedAuthority.contact}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Citizen Verification Status
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--color-success-green)', marginTop: '2px' }}>
                    {verificationVotes} Ward Citizen Endorsements
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Minimum 3 votes needed for official sign-off
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Multi-Stage Progress Lifecycle */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div className="section-heading">
                <span>Multi-Stage Redressal Timeline</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                  Audited under Municipal By-laws 2026
                </span>
              </div>

              <div
                style={{
                  position: 'relative',
                  paddingLeft: '2rem',
                  borderLeft: '3px solid #CBD5E1',
                  marginLeft: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}
              >
                {currentTicket.timeline.map((step, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    {/* Circle Node Indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-2.75rem',
                        top: '2px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: step.completed ? 'var(--color-success-green)' : '#FFFFFF',
                        border: step.completed ? '2px solid var(--color-success-green)' : '2px solid #94A3B8',
                        color: step.completed ? '#FFFFFF' : '#94A3B8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}
                    >
                      {step.completed ? '✓' : idx + 1}
                    </div>

                    {/* Step Card Content */}
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border)',
                        padding: '1rem 1.25rem',
                        borderRadius: '2px',
                        boxShadow: 'var(--shadow-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.9375rem' }}>
                          {step.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          {step.date}
                        </div>
                      </div>

                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0.5rem 0', lineHeight: 1.5 }}>
                        {step.description}
                      </p>

                      <div style={{ fontSize: '0.75rem', color: 'var(--color-gov-blue)', fontWeight: 600 }}>
                        Responsible Desk: {step.officer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Community Verification & Citizen Confirmation Protocol */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: currentTicket.currentStatus === 'Citizen-Confirmed' ? '2px solid var(--color-success-green)' :
                        currentTicket.currentStatus === 'Reopened - Under Investigation' ? '2px solid var(--color-alert-red)' :
                        '2px solid var(--color-gold)',
                padding: '1.5rem',
                borderRadius: '2px',
                marginBottom: '2rem'
              }}
            >
              {currentTicket.currentStatus === 'Citizen-Confirmed' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#DCFCE7',
                      color: 'var(--color-success-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-success-green)', margin: '0 0 0.25rem 0' }}>
                      Citizen-Confirmed: Grievance Formally Closed
                    </h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                      The affected ward resident has physically verified on site that the remediation work was completed to satisfaction.
                    </p>
                  </div>
                </div>
              ) : currentTicket.currentStatus === 'Reopened - Under Investigation' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#FEE2E2',
                      color: 'var(--color-alert-red)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <RotateCcw size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-alert-red)', margin: '0 0 0.25rem 0' }}>
                      Grievance Reopened: Issue Persists on Ground
                    </h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                      Citizen physical inspection rejected previous remediation. Auto-escalated to Executive Engineer for re-inspection and contractor penalty audit.
                    </p>
                  </div>
                </div>
              ) : currentTicket.currentStatus === 'Resolved' ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span className="badge badge-resolved">Field Remediation Submitted</span>
                      <strong style={{ color: 'var(--color-primary-navy)' }}>Citizen Final Sign-Off Mandated</strong>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0, maxWidth: '640px' }}>
                      The field engineering squad has reported completion of this work order. As a resident of <strong>{currentTicket.ward}</strong>, does this resolve the issue on the ground?
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button
                      variant="success"
                      icon={Check}
                      onClick={() => confirmCitizenResolution(currentTicket.ticketNumber, 'Confirmed on site')}
                    >
                      Confirm Resolution (Sign-Off)
                    </Button>
                    <Button
                      variant="danger"
                      icon={RotateCcw}
                      onClick={() => reopenGrievance(currentTicket.ticketNumber, 'Defect persists on ground after inspection')}
                    >
                      Dispute & Reopen
                    </Button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
                      Community Verification Protocol
                    </h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0, maxWidth: '640px' }}>
                      Are you a resident of <strong>{currentTicket.ward}</strong>? Have you physically inspected this location and confirmed that the work was satisfactorily completed?
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Button
                      variant={isVoted ? 'success' : 'gold'}
                      icon={isVoted ? CheckCircle2 : ThumbsUp}
                      onClick={handleVerificationVote}
                      disabled={isVoted}
                    >
                      {isVoted ? 'Verified by You' : 'Verify Remediation'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackComplaintPage;
