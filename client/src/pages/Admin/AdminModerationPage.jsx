import React, { useState, useMemo } from 'react';
import { useReports } from '../../hooks/useReports';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Alert from '../../components/common/Alert';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  Copy,
  HelpCircle,
  AlertTriangle,
  Eye,
  X,
  Shield
} from 'lucide-react';

export const AdminModerationPage = () => {
  const { user: currentAdmin } = useAuth();
  const { reports, recordModerationDecision } = useReports();

  // Active filter tab
  const [activeTab, setActiveTab] = useState('PENDING'); // 'PENDING' | 'DUPLICATE' | 'SPAM' | 'PHOTO' | 'FALSE' | 'MODERATED'
  const [searchQuery, setSearchQuery] = useState('');

  // Selected complaint for review modal
  const [reviewReport, setReviewReport] = useState(null);

  // Review action modal inputs
  const [activeAction, setActiveAction] = useState('none'); // 'approve' | 'reject' | 'duplicate' | 'clarify' | 'escalate' | 'none'
  const [rejectionReason, setRejectionReason] = useState('');
  const [primaryTicketId, setPrimaryTicketId] = useState('');
  const [clarificationNotes, setClarificationNotes] = useState('');
  const [escalationRemarks, setEscalationRemarks] = useState('');
  const [actionFeedback, setActionFeedback] = useState(null);
  const [zoomPhotoUrl, setZoomPhotoUrl] = useState(null);

  // Filtered reports
  const filteredReports = useMemo(() => {
    return (reports || []).filter((r) => {
      // Status category
      const isPending = r.moderationStatus === 'Pending Moderation' || r.status === 'Under Review';
      const isModerated = r.moderationStatus && r.moderationStatus !== 'Pending Moderation' && r.status !== 'Under Review';

      if (activeTab === 'PENDING' && !isPending) return false;
      if (activeTab === 'MODERATED' && !isModerated) return false;

      if (activeTab === 'DUPLICATE') {
        const isDup = (r.flagReason || '').toLowerCase().includes('duplicate') || r.moderationStatus === 'Duplicate';
        if (!isDup) return false;
      }
      if (activeTab === 'SPAM') {
        const isSpam = (r.flagReason || '').toLowerCase().includes('spam') || (r.flagReason || '').toLowerCase().includes('advertisement');
        if (!isSpam) return false;
      }
      if (activeTab === 'PHOTO') {
        const isPhoto = (r.flagReason || '').toLowerCase().includes('photo') || (r.flagReason || '').toLowerCase().includes('selfie');
        if (!isPhoto) return false;
      }
      if (activeTab === 'FALSE') {
        const isFalse = (r.flagReason || '').toLowerCase().includes('false') || (r.flagReason || '').toLowerCase().includes('alarmist');
        if (!isFalse) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTicket = (r.ticketNumber || '').toLowerCase().includes(q);
        const matchTitle = (r.title || '').toLowerCase().includes(q);
        const matchReporter = (r.reporterName || '').toLowerCase().includes(q);
        const matchFlag = (r.flagReason || '').toLowerCase().includes(q);
        if (!matchTicket && !matchTitle && !matchReporter && !matchFlag) {
          return false;
        }
      }

      return true;
    });
  }, [reports, activeTab, searchQuery]);

  // Tab counts
  const pendingCount = (reports || []).filter((r) => r.moderationStatus === 'Pending Moderation' || r.status === 'Under Review').length;
  const duplicateCount = (reports || []).filter((r) => (r.flagReason || '').toLowerCase().includes('duplicate')).length;
  const spamCount = (reports || []).filter((r) => (r.flagReason || '').toLowerCase().includes('spam') || (r.flagReason || '').toLowerCase().includes('advertisement')).length;
  const photoCount = (reports || []).filter((r) => (r.flagReason || '').toLowerCase().includes('photo') || (r.flagReason || '').toLowerCase().includes('selfie')).length;
  const falseCount = (reports || []).filter((r) => (r.flagReason || '').toLowerCase().includes('false') || (r.flagReason || '').toLowerCase().includes('alarmist')).length;
  const moderatedCount = (reports || []).filter((r) => r.moderationStatus && r.moderationStatus !== 'Pending Moderation' && r.status !== 'Under Review').length;

  // Open review modal
  const handleOpenReview = (report) => {
    setReviewReport(report);
    setActiveAction('none');
    setRejectionReason('');
    setPrimaryTicketId(report.primaryTicketMatch || 'CR-2026-8842');
    setClarificationNotes('');
    setEscalationRemarks('');
  };

  // Submit Moderation Action
  const handleActionSubmit = (e) => {
    e.preventDefault();
    if (!reviewReport) return;

    let decision = 'Approved';
    let reason = '';

    if (activeAction === 'approve') {
      decision = 'Approved';
      reason = 'Complaint reviewed and verified as authentic civic infrastructure grievance.';
    } else if (activeAction === 'reject') {
      decision = 'Rejected';
      if (!rejectionReason.trim()) {
        alert('Please provide a mandatory reason for rejecting this complaint.');
        return;
      }
      reason = rejectionReason;
    } else if (activeAction === 'duplicate') {
      decision = 'Duplicate';
      if (!primaryTicketId.trim()) {
        alert('Please specify the primary ticket number to link this duplicate complaint.');
        return;
      }
      reason = `Duplicate of primary ticket ${primaryTicketId}`;
    } else if (activeAction === 'clarify') {
      decision = 'Clarification Requested';
      if (!clarificationNotes.trim()) {
        alert('Please write clarification instructions for the citizen.');
        return;
      }
      reason = clarificationNotes;
    } else if (activeAction === 'escalate') {
      decision = 'Escalated';
      reason = escalationRemarks || 'Escalated to Senior Municipal Vigilance Cell for administrative inquiry.';
    }

    const res = recordModerationDecision(reviewReport.ticketNumber, {
      decision,
      reason,
      primaryTicketId: activeAction === 'duplicate' ? primaryTicketId : null,
      clarificationNotes: activeAction === 'clarify' ? clarificationNotes : null,
      adminUser: currentAdmin
    });

    if (res.success) {
      setActionFeedback({
        type: decision === 'Approved' ? 'success' : decision === 'Rejected' ? 'alert' : 'warning',
        message: `Decision [${decision}] successfully committed for ticket ${reviewReport.ticketNumber}. Non-destructive record logged into audit register.`
      });
      setReviewReport(null);
      setActiveAction('none');
    }
  };

  // Primary ticket comparison helper
  const primaryMatchTicket = useMemo(() => {
    if (!reviewReport || !reviewReport.primaryTicketMatch) return null;
    return (reports || []).find((r) => r.ticketNumber === reviewReport.primaryTicketMatch);
  }, [reviewReport, reports]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
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
          borderLeft: '4px solid #DC2626',
          borderRadius: '2px',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            Civic Content Integrity & Moderation Directorate
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', fontSize: '1.5rem', margin: '0.25rem 0' }}>
            Content Moderation Centre
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
            Review flagged grievances, identify duplicate tickets, filter commercial spam, evaluate photograph integrity, and request citizen clarification.
          </p>
        </div>

        <Badge variant={pendingCount > 0 ? 'alert' : 'success'}>
          {pendingCount > 0 ? `${pendingCount} Flagged Complaints Awaiting Review` : 'All Flags Cleared'}
        </Badge>
      </div>

      {actionFeedback && (
        <Alert
          type={actionFeedback.type}
          title="Moderation Record Committed"
          dismissible
          onDismiss={() => setActionFeedback(null)}
        >
          {actionFeedback.message}
        </Alert>
      )}

      {/* Tabs and Search Bar */}
      <Card>
        <Card.Body>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Tab navigation */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setActiveTab('PENDING')}
                style={{
                  backgroundColor: activeTab === 'PENDING' ? '#DC2626' : '#F1F5F9',
                  color: activeTab === 'PENDING' ? '#FFFFFF' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Pending Review</span>
                <span style={{ backgroundColor: activeTab === 'PENDING' ? '#991B1B' : '#E2E8F0', color: activeTab === 'PENDING' ? '#FFFFFF' : '#334155', padding: '1px 6px', borderRadius: '10px', fontSize: '0.6875rem' }}>
                  {pendingCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('DUPLICATE')}
                style={{
                  backgroundColor: activeTab === 'DUPLICATE' ? 'var(--color-primary-navy)' : '#F1F5F9',
                  color: activeTab === 'DUPLICATE' ? '#FFFFFF' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Duplicate Reports ({duplicateCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('SPAM')}
                style={{
                  backgroundColor: activeTab === 'SPAM' ? 'var(--color-primary-navy)' : '#F1F5F9',
                  color: activeTab === 'SPAM' ? '#FFFFFF' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Commercial / Spam ({spamCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('PHOTO')}
                style={{
                  backgroundColor: activeTab === 'PHOTO' ? 'var(--color-primary-navy)' : '#F1F5F9',
                  color: activeTab === 'PHOTO' ? '#FFFFFF' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Photo Quality / Selfies ({photoCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('FALSE')}
                style={{
                  backgroundColor: activeTab === 'FALSE' ? 'var(--color-primary-navy)' : '#F1F5F9',
                  color: activeTab === 'FALSE' ? '#FFFFFF' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                False Claims ({falseCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('MODERATED')}
                style={{
                  backgroundColor: activeTab === 'MODERATED' ? 'var(--color-primary-navy)' : '#F1F5F9',
                  color: activeTab === 'MODERATED' ? '#FFFFFF' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}
              >
                Moderation History ({moderatedCount})
              </button>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', maxWidth: '400px' }}>
              <input
                type="text"
                placeholder="Search by ticket ID, keyword, reporter, or flag reason..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '2.25rem', fontSize: '0.8125rem' }}
              />
              <Search
                size={16}
                color="var(--color-text-muted)"
                style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Moderation Queue Table */}
      <Card>
        <Card.Header variant="navy">
          <Card.Title icon={ShieldAlert}>
            Moderation Queue Register ({filteredReports.length} Reports in View)
          </Card.Title>
        </Card.Header>
        <Card.Body noPadding>
          <div className="table-responsive">
            <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ width: '130px' }}>Ticket ID</th>
                  <th style={{ width: '80px' }}>Photo</th>
                  <th>Grievance Details</th>
                  <th>Diagnostic Flag Reason</th>
                  <th style={{ width: '130px' }}>Moderation State</th>
                  <th style={{ width: '130px', textAlign: 'right' }}>Review Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-text-muted)' }}>
                      No grievance reports found matching the selected moderation tab or search filter.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((r) => {
                    const isPending = r.moderationStatus === 'Pending Moderation' || r.status === 'Under Review';

                    return (
                      <tr key={r.id} style={{ backgroundColor: isPending ? '#FFFBEB' : undefined }}>
                        {/* Ticket Number */}
                        <td>
                          <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-gov-blue)', fontSize: '0.8125rem' }}>
                            {r.ticketNumber}
                          </div>
                          <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                            {r.reportedAt}
                          </div>
                        </td>

                        {/* Photo Thumbnail */}
                        <td>
                          {r.photoUrl ? (
                            <img
                              src={r.photoUrl}
                              alt="Evidence thumbnail"
                              onClick={() => setZoomPhotoUrl(r.photoUrl)}
                              style={{
                                width: '48px',
                                height: '48px',
                                objectFit: 'cover',
                                borderRadius: '2px',
                                border: '1px solid var(--color-border)',
                                cursor: 'zoom-in'
                              }}
                              title="Click to zoom photograph"
                            />
                          ) : (
                            <div style={{ width: '48px', height: '48px', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', color: '#64748B' }}>
                              No Pic
                            </div>
                          )}
                        </td>

                        {/* Title & Details */}
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.875rem' }}>
                            {r.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px', display: 'flex', gap: '0.5rem' }}>
                            <span><strong>Category:</strong> {r.category}</span>
                            <span>•</span>
                            <span><strong>Ward:</strong> {r.wardNumber || r.location}</span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                            Reporter: {r.reporterName || 'Citizen Resident'}
                          </div>
                        </td>

                        {/* Flag Reason */}
                        <td>
                          {r.flagReason ? (
                            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '4px 8px', borderRadius: '2px', fontSize: '0.75rem', color: '#991B1B', lineHeight: 1.3 }}>
                              <strong>Flag:</strong> {r.flagReason}
                              {r.primaryTicketMatch && (
                                <div style={{ marginTop: '2px', color: '#1E40AF', fontWeight: 600 }}>
                                  Matched Ticket: {r.primaryTicketMatch}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                              Standard Submission
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '2px',
                              backgroundColor:
                                r.moderationStatus === 'Approved' ? '#DCFCE7' :
                                r.moderationStatus === 'Rejected' ? '#FEE2E2' :
                                r.moderationStatus === 'Duplicate' ? '#E0E7FF' :
                                r.moderationStatus === 'Clarification Requested' ? '#FEF3C7' :
                                '#FEF08A',
                              color:
                                r.moderationStatus === 'Approved' ? '#166534' :
                                r.moderationStatus === 'Rejected' ? '#991B1B' :
                                r.moderationStatus === 'Duplicate' ? '#3730A3' :
                                r.moderationStatus === 'Clarification Requested' ? '#92400E' :
                                '#854D0E',
                              display: 'inline-block'
                            }}
                          >
                            {r.moderationStatus || 'Pending'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ textAlign: 'right' }}>
                          <Button
                            variant={isPending ? 'gold' : 'secondary'}
                            size="sm"
                            icon={Eye}
                            onClick={() => handleOpenReview(r)}
                          >
                            {isPending ? 'Review' : 'Inspect'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* FULL REVIEW MODAL */}
      {reviewReport && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            backgroundColor: 'rgba(0,0,0,0.6)',
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
              borderRadius: '2px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              overflow: 'hidden',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                backgroundColor: 'var(--color-primary-navy)',
                color: '#FFFFFF',
                padding: '1rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={18} color="var(--color-gold)" />
                <h3 style={{ margin: 0, fontSize: '1.0625rem', fontFamily: 'var(--font-serif)' }}>
                  Grievance Content Review & Verdict: {reviewReport.ticketNumber}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReviewReport(null)}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Flag Diagnostic Banner */}
              {reviewReport.flagReason && (
                <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '0.75rem 1rem', borderRadius: '2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991B1B', fontWeight: 700, fontSize: '0.8125rem' }}>
                    <AlertTriangle size={16} />
                    <span>AUTOMATED MODERATION DIAGNOSTIC FLAG</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#B91C1C', marginTop: '0.25rem' }}>
                    {reviewReport.flagReason}
                  </div>
                </div>
              )}

              {/* Duplicate Comparison Panel */}
              {primaryMatchTicket && (
                <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '0.75rem 1rem', borderRadius: '2px' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#1E40AF', fontWeight: 800 }}>
                    Comparison with Active Primary Ticket ({primaryMatchTicket.ticketNumber})
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                    <div style={{ backgroundColor: '#FFFFFF', padding: '0.5rem', border: '1px solid #DBEAFE' }}>
                      <strong style={{ color: 'var(--color-primary-navy)' }}>Active Primary Ticket:</strong>
                      <div style={{ marginTop: '2px' }}>{primaryMatchTicket.title}</div>
                      <div style={{ color: '#64748B' }}>Status: {primaryMatchTicket.status} • {primaryMatchTicket.location}</div>
                    </div>
                    <div style={{ backgroundColor: '#FFFFFF', padding: '0.5rem', border: '1px solid #DBEAFE' }}>
                      <strong style={{ color: '#DC2626' }}>Current Flagged Report:</strong>
                      <div style={{ marginTop: '2px' }}>{reviewReport.title}</div>
                      <div style={{ color: '#64748B' }}>Status: {reviewReport.status} • {reviewReport.location}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grievance Content & Media */}
              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '1.25rem' }}>
                {/* Photo Preview */}
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Uploaded Evidence
                  </div>
                  {reviewReport.photoUrl ? (
                    <img
                      src={reviewReport.photoUrl}
                      alt="Uploaded proof"
                      onClick={() => setZoomPhotoUrl(reviewReport.photoUrl)}
                      style={{
                        width: '100%',
                        height: '140px',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        border: '1px solid var(--color-border)',
                        cursor: 'zoom-in'
                      }}
                      title="Click to expand full size"
                    />
                  ) : (
                    <div style={{ width: '100%', height: '140px', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#64748B' }}>
                      No Photo Proof
                    </div>
                  )}
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '4px', textAlign: 'center' }}>
                    Click photo to zoom
                  </div>
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-primary-navy)' }}>
                    {reviewReport.title}
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.75rem' }}>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)' }}>Category:</span>
                      <div style={{ fontWeight: 600 }}>{reviewReport.category}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)' }}>Location / Ward:</span>
                      <div style={{ fontWeight: 600 }}>{reviewReport.location}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)' }}>Reported Date:</span>
                      <div style={{ fontWeight: 600 }}>{reviewReport.reportedAt}</div>
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '2px', fontSize: '0.8125rem', lineHeight: 1.5 }}>
                    <strong style={{ color: 'var(--color-primary-navy)' }}>Complaint Description:</strong>
                    <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)' }}>
                      {reviewReport.description || 'No extended text submitted.'}
                    </p>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Reported by: <strong>{reviewReport.reporterName || 'Citizen Resident'}</strong>
                  </div>
                </div>
              </div>

              {/* Moderation History if any */}
              {(reviewReport.moderationHistory || []).length > 0 && (
                <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '0.75rem' }}>
                  <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.8125rem', color: 'var(--color-primary-navy)' }}>
                    Non-Destructive Moderation Audit History
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {reviewReport.moderationHistory.map((item, idx) => (
                      <div key={idx} style={{ fontSize: '0.75rem', padding: '0.35rem 0.625rem', backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: '2px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                          <strong>[{item.decision}]</strong>: {item.reason || item.notes} (by {item.moderator})
                        </span>
                        <span style={{ color: 'var(--color-text-muted)' }}>{item.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verdict Action Buttons & Forms */}
              <div style={{ borderTop: '2px solid var(--color-border-dark)', paddingTop: '1rem' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Select Content Moderation Verdict
                </div>

                {/* 5 Verdict Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setActiveAction('approve')}
                    style={{
                      backgroundColor: activeAction === 'approve' ? '#16A34A' : '#DCFCE7',
                      color: activeAction === 'approve' ? '#FFFFFF' : '#166534',
                      border: '1px solid #86EFAC',
                      padding: '6px 12px',
                      borderRadius: '2px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CheckCircle2 size={15} /> 1. Approve & Route
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveAction('reject')}
                    style={{
                      backgroundColor: activeAction === 'reject' ? '#DC2626' : '#FEE2E2',
                      color: activeAction === 'reject' ? '#FFFFFF' : '#991B1B',
                      border: '1px solid #FCA5A5',
                      padding: '6px 12px',
                      borderRadius: '2px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <XCircle size={15} /> 2. Reject Grievance
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveAction('duplicate')}
                    style={{
                      backgroundColor: activeAction === 'duplicate' ? '#4F46E5' : '#E0E7FF',
                      color: activeAction === 'duplicate' ? '#FFFFFF' : '#3730A3',
                      border: '1px solid #C7D2FE',
                      padding: '6px 12px',
                      borderRadius: '2px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Copy size={15} /> 3. Mark as Duplicate
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveAction('clarify')}
                    style={{
                      backgroundColor: activeAction === 'clarify' ? '#D97706' : '#FEF3C7',
                      color: activeAction === 'clarify' ? '#FFFFFF' : '#92400E',
                      border: '1px solid #FDE68A',
                      padding: '6px 12px',
                      borderRadius: '2px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <HelpCircle size={15} /> 4. Seek Clarification
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveAction('escalate')}
                    style={{
                      backgroundColor: activeAction === 'escalate' ? '#7C3AED' : '#F3E8FF',
                      color: activeAction === 'escalate' ? '#FFFFFF' : '#6B21A8',
                      border: '1px solid #DDD6FE',
                      padding: '6px 12px',
                      borderRadius: '2px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <ShieldAlert size={15} /> 5. Escalate to Vigilance
                  </button>
                </div>

                {/* Sub-form inputs based on selected action */}
                {activeAction !== 'none' && (
                  <form onSubmit={handleActionSubmit} style={{ marginTop: '1rem', backgroundColor: '#F8FAFC', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '2px' }}>
                    {activeAction === 'approve' && (
                      <div>
                        <div style={{ fontSize: '0.8125rem', color: '#166534', fontWeight: 600 }}>
                          Ready to approve this grievance. The moderation flag will be cleared, status changed to "Reported", and ticket automatically made available for departmental assignment by the Municipal Authority.
                        </div>
                      </div>
                    )}

                    {activeAction === 'reject' && (
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" htmlFor="rej-reason">
                          Mandatory Rejection Justification <span className="required">*</span>
                        </label>
                        <input
                          id="rej-reason"
                          type="text"
                          required
                          className="form-control"
                          placeholder="e.g. Non-civic commercial advertising banner / irrelevant selfie photo"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                        />
                      </div>
                    )}

                    {activeAction === 'duplicate' && (
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" htmlFor="dup-id">
                          Confirm Primary Ticket ID <span className="required">*</span>
                        </label>
                        <input
                          id="dup-id"
                          type="text"
                          required
                          className="form-control"
                          placeholder="CR-2026-8842"
                          value={primaryTicketId}
                          onChange={(e) => setPrimaryTicketId(e.target.value)}
                        />
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                          This report will be linked to the primary ticket and marked as Duplicate.
                        </div>
                      </div>
                    )}

                    {activeAction === 'clarify' && (
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" htmlFor="clar-notes">
                          Clarification Instructions for Citizen <span className="required">*</span>
                        </label>
                        <textarea
                          id="clar-notes"
                          rows={2}
                          required
                          className="form-control"
                          placeholder="e.g. Please upload an in-focus photograph clearly showing the drain blockage without personal portrait occlusion."
                          value={clarificationNotes}
                          onChange={(e) => setClarificationNotes(e.target.value)}
                        />
                      </div>
                    )}

                    {activeAction === 'escalate' && (
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" htmlFor="esc-notes">
                          Vigilance Escalation Memo
                        </label>
                        <input
                          id="esc-notes"
                          type="text"
                          className="form-control"
                          placeholder="e.g. Submitting false reports alleging structural flyover collapse causing public panic."
                          value={escalationRemarks}
                          onChange={(e) => setEscalationRemarks(e.target.value)}
                        />
                      </div>
                    )}

                    <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <Button variant="secondary" size="sm" type="button" onClick={() => setActiveAction('none')}>
                        Cancel
                      </Button>
                      <Button variant="primary" size="sm" type="submit">
                        Commit Verdict
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
              <Button variant="secondary" size="sm" onClick={() => setReviewReport(null)}>
                Close Review
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {zoomPhotoUrl && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 80,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={() => setZoomPhotoUrl(null)}
        >
          <div style={{ position: 'relative', maxWidth: '800px', maxHeight: '80vh' }}>
            <img
              src={zoomPhotoUrl}
              alt="High resolution inspection"
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', border: '2px solid #FFFFFF' }}
            />
            <button
              type="button"
              onClick={() => setZoomPhotoUrl(null)}
              style={{
                position: 'absolute',
                top: '-35px',
                right: 0,
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminModerationPage;
