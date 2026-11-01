import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReports } from '../../hooks/useReports';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import {
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  Check,
  FileCheck
} from 'lucide-react';

export const AuthorityBlindSpotsPage = () => {
  const navigate = useNavigate();
  const { blindSpotClusters, approveAndEscalateCluster } = useReports();
  const { user } = useAuth();

  const [selectedCluster, setSelectedCluster] = useState(null);
  const [adminRemarks, setAdminRemarks] = useState(
    'Cluster exceeds safety risk threshold. Approved for priority field mitigation and contractor dispatch.'
  );
  const [escalateSuccess, setEscalateSuccess] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState('');

  const handleOpenClusterModal = (cluster) => {
    setSelectedCluster(cluster);
    setEscalateSuccess(false);
  };

  const handleApproveEscalation = (e) => {
    e.preventDefault();
    if (!selectedCluster) return;

    const res = approveAndEscalateCluster(selectedCluster.id, adminRemarks, user);
    if (res) {
      setGeneratedTicketId(res.ticketNumber);
      setEscalateSuccess(true);
      // Refresh current cluster state in modal
      setSelectedCluster((prev) => ({
        ...prev,
        approvalStatus: 'Approved & Converted to Ticket',
        resultingTicketId: res.ticketNumber
      }));
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
            Blind Spots Safety Audit & Cluster Administration
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Review citizen experience reports, nocturnal safety audits, and rule-based algorithmic auto-escalations.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant="secondary"
            onClick={() => navigate('/blind-spots')}
          >
            Public Blind Spots Map →
          </Button>
        </div>
      </div>

      {/* Simulated Rule-Based Escalation Banner */}
      <div style={{ marginBottom: '2rem' }}>
        <Alert type="info" title="Algorithmic Auto-Escalation Engine Active (Frontend Simulation)">
          CivicReflex continuously clusters independent citizen experience reports within a 250-meter radius. When <strong>&ge; 4 distinct verified citizens</strong> report a recurring safety hazard (e.g. unlit corridor, missing curb ramp), the cluster automatically qualifies for municipal work order sanctioning.
        </Alert>
      </div>

      {/* Auto-Escalation Review Cards */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="var(--color-gold)" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary-navy)', margin: 0 }}>
              Algorithmic Cluster Queue Requiring Executive Sanction
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Multi-Reporter Threshold Verification
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {blindSpotClusters.map((cluster) => {
            const isApproved = cluster.approvalStatus === 'Approved & Converted to Ticket';

            return (
              <div
                key={cluster.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: isApproved ? '1px solid var(--color-success-green)' : '2px solid var(--color-gold)',
                  borderRadius: '2px',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.8125rem', color: 'var(--color-gov-blue)' }}>
                      {cluster.id}
                    </span>
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '2px',
                        backgroundColor: isApproved ? '#DCFCE7' : '#FEF3C7',
                        color: isApproved ? '#14532D' : '#92400E'
                      }}
                    >
                      {cluster.approvalStatus}
                    </span>
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: '0 0 0.5rem 0' }}>
                    {cluster.title}
                  </h4>

                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
                    <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                    {cluster.location} • <strong>{cluster.ward}</strong>
                  </div>

                  {/* Multi-Reporter Metric Box */}
                  <div
                    style={{
                      backgroundColor: '#F8FAFC',
                      border: '1px solid var(--color-border)',
                      padding: '0.75rem',
                      borderRadius: '2px',
                      marginBottom: '1rem',
                      fontSize: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Distinct Citizen Auditors:</span>
                      <strong style={{ color: 'var(--color-primary-navy)' }}>
                        <Users size={12} style={{ display: 'inline', marginRight: '3px' }} />
                        {cluster.reportsCount} Verified Citizens (Threshold: {cluster.threshold})
                      </strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Time-of-Day Risk Window:</span>
                      <strong style={{ color: '#D97706' }}>
                        <Clock size={12} style={{ display: 'inline', marginRight: '3px' }} />
                        {cluster.timeOfDay}
                      </strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Recommended Division:</span>
                      <strong style={{ color: 'var(--color-gov-blue)' }}>
                        {cluster.recommendedDept}
                      </strong>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                    {cluster.details}
                  </p>
                </div>

                <div>
                  {isApproved ? (
                    <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: '0.75rem', borderRadius: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-success-green)', fontWeight: 700, fontSize: '0.8125rem', marginBottom: '2px' }}>
                        <CheckCircle2 size={15} />
                        <span>Work Order Generated</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#166534' }}>
                        Ticket ID: <strong>{cluster.resultingTicketId}</strong> committed to main register.
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(`/authority/grievances?ticket=${cluster.resultingTicketId}`)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-gov-blue)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          padding: '4px 0 0 0'
                        }}
                      >
                        Track Escalated Ticket in Register →
                      </button>
                    </div>
                  ) : (
                    <Button
                      variant="gold"
                      fullWidth
                      icon={FileCheck}
                      onClick={() => handleOpenClusterModal(cluster)}
                    >
                      Review & Approve Auto-Escalation
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review & Approve Escalation Modal */}
      {selectedCluster && (
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
              maxWidth: '680px',
              borderRadius: '2px',
              borderTop: '4px solid var(--color-gold)',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
              padding: '1.75rem'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-primary-navy)', margin: '0 0 0.5rem 0' }}>
              Authority Sanction: Convert Cluster to Formal Work Order
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
              Approving this auto-escalation generates a binding municipal grievance ticket that enters the master register and becomes assignable to field squads.
            </p>

            {escalateSuccess && (
              <div style={{ marginBottom: '1rem' }}>
                <Alert type="success" title="Cluster Converted to Official Grievance">
                  Generated Ticket ID: <strong>{generatedTicketId}</strong>. This complaint is now live in the Authority Grievance Register and Assignment Console!
                </Alert>
              </div>
            )}

            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', padding: '1rem', borderRadius: '2px', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '0.25rem' }}>
                {selectedCluster.title}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                {selectedCluster.location} • {selectedCluster.ward}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Audited by <strong>{selectedCluster.reportsCount} separate citizens</strong> ({selectedCluster.distinctReporters.join(', ')})
              </div>
            </div>

            <form onSubmit={handleApproveEscalation}>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ fontSize: '0.8125rem' }}>
                  Superintending Engineer Sanction Directives:
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={adminRemarks}
                  onChange={(e) => setAdminRemarks(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setSelectedCluster(null)}
                >
                  Close
                </Button>

                {!selectedCluster.resultingTicketId && (
                  <Button
                    variant="gold"
                    type="submit"
                    icon={Check}
                  >
                    Sanction Work Order Ticket
                  </Button>
                )}

                {selectedCluster.resultingTicketId && (
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => {
                      const t = selectedCluster.resultingTicketId;
                      setSelectedCluster(null);
                      navigate(`/authority/assignments?ticket=${t}`);
                    }}
                  >
                    Proceed to Assign to Officer →
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorityBlindSpotsPage;
