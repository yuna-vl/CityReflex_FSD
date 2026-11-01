import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Alert from '../../components/common/Alert';
import {
  UserCheck,
  Shield,
  KeyRound,
  CheckCircle2,
  Save
} from 'lucide-react';

export const AdminProfilePage = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'CivicReflex System Administrator',
    email: user?.email || 'admin@civicreflex.gov.in',
    phone: user?.phone || '+91 99000 11223',
    designation: user?.designation || 'Principal System Administrator & Chief Data Custodian',
    department: user?.department || 'Digital Governance & Information Technology Cell',
    ward: user?.ward || 'Central IT Cell (State Capital HQ)'
  });

  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setFeedback({
      type: 'success',
      message: 'Administrative contact credentials successfully updated.'
    });
  };

  const securityPermissions = [
    { title: 'User Management & Role Assignment', desc: 'Create, update, and suspend accounts across all roles.' },
    { title: 'Content Moderation & Spam Quarantine', desc: 'Review flagged duplicate reports, commercial spam, and inappropriate photos.' },
    { title: 'Municipal Ward Jurisdiction Mapping', desc: 'Configure ward numbers, geographic zones, and mapped authorities.' },
    { title: 'Civic Taxonomy & SLA Administration', desc: 'Add categories, modify default priority levels, and set statutory SLA deadlines.' },
    { title: 'Forensic Audit Register Oversight', desc: 'Inspect chronological append-only records of all platform operations.' },
    { title: 'System Policies & SLA Governance', desc: 'Define global portal metadata, duplicate radius, and notification dispatch rules.' }
  ];

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
            Security Officer Credentials & Digital Certificate
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', fontSize: '1.5rem', margin: '0.25rem 0' }}>
            System Administrator Security Profile
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
            Root governance identity, National Informatics Centre credentials, administrative authorizations, and access keys.
          </p>
        </div>

        <Badge variant="alert">FULL ROOT ACCESS</Badge>
      </div>

      {feedback && (
        <Alert
          type={feedback.type}
          title="Security Profile"
          dismissible
          onDismiss={() => setFeedback(null)}
        >
          {feedback.message}
        </Alert>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: '1.5rem'
        }}
        className="reporting-grid"
      >
        {/* Left: Administrative Credentials Form */}
        <Card>
          <Card.Header variant="navy">
            <Card.Title icon={UserCheck}>Official Administrator Credentials</Card.Title>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="adm-name">Official Administrator Name <span className="required">*</span></label>
                <input
                  id="adm-name"
                  type="text"
                  required
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="adm-email">Official GovNet Email <span className="required">*</span></label>
                  <input
                    id="adm-email"
                    type="email"
                    required
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="adm-phone">Authorized Contact Phone</label>
                  <input
                    id="adm-phone"
                    type="text"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="adm-desig">Administrative Designation</label>
                <input
                  id="adm-desig"
                  type="text"
                  className="form-control"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="adm-dept">Department Cell</label>
                  <input
                    id="adm-dept"
                    type="text"
                    className="form-control"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="adm-ward">Operating Headquarters</label>
                  <input
                    id="adm-ward"
                    type="text"
                    className="form-control"
                    value={formData.ward}
                    onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="primary"
                  size="md"
                  icon={Save}
                  type="submit"
                >
                  Update Credentials
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>

        {/* Right: Security Clearance & Active Permissions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Security Badge Card */}
          <Card>
            <Card.Header variant="navy">
              <Card.Title icon={Shield}>NIC Digital Security Badge</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8125rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Security Badge Number</span>
                  <strong style={{ fontFamily: 'monospace', color: '#DC2626' }}>NIC-SYS-ADM-001</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Clearance Classification</span>
                  <strong style={{ color: 'var(--color-gov-blue)' }}>Tier-1 Restricted Authority</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Access Gateway</span>
                  <strong style={{ color: 'var(--color-primary-navy)' }}>NIC GovNet Gateway (10.14.0.12)</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Session State</span>
                  <strong style={{ color: 'var(--color-success-green)' }}>Active (Multi-Factor Verified)</strong>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Root Permissions Checklist */}
          <Card>
            <Card.Header variant="navy">
              <Card.Title icon={KeyRound}>Assigned Root Privileges</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {securityPermissions.map((perm, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.75rem' }}>
                    <CheckCircle2 size={16} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ color: 'var(--color-primary-navy)' }}>{perm.title}</strong>
                      <div style={{ color: 'var(--color-text-muted)', lineHeight: 1.3 }}>{perm.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
