import React, { useState } from 'react';
import { useReports } from '../../hooks/useReports';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import {
  Save,
  Shield,
  Clock,
  Bell,
  Globe
} from 'lucide-react';

export const AdminSettingsPage = () => {
  const { user: currentAdmin } = useAuth();
  const { systemSettings, saveSystemSettings } = useReports();

  const [formData, setFormData] = useState(systemSettings || {
    portalName: 'CivicReflex – Citizen Civic Services & Accountability Portal',
    municipalCorporation: 'Capital City Municipal Corporation',
    helpline: '1800-11-2026 (Toll-Free)',
    portalUrl: 'https://civicreflex.gov.in',
    highSlaHours: 24,
    mediumSlaHours: 48,
    lowSlaHours: 120,
    autoEscalationDays: 3,
    duplicateGeoRadiusMeters: 15,
    autoQuarantineSpam: true,
    aiSpamSensitivity: 'Standard',
    enableSmsAlerts: true,
    enableEmailAlerts: true,
    dailyDigestTime: '08:00 AM',
    defaultContrastMode: 'Standard Contrast',
    fontScalingDefault: 'Normal (100%)'
  });

  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSystemSettings(formData, currentAdmin);
    setFeedback({
      type: 'success',
      message: 'Global system configuration parameters successfully updated and recorded in the audit register.'
    });
  };

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
          borderLeft: '4px solid #10B981',
          borderRadius: '2px',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            Central Platform Policies & Architectural Defaults
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', fontSize: '1.5rem', margin: '0.25rem 0' }}>
            System Settings & Governance Rules
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
            Manage portal identity, statutory grievance SLA thresholds, automated moderation sensitivity, and citizen notification rules.
          </p>
        </div>
      </div>

      {feedback && (
        <Alert
          type={feedback.type}
          title="Configuration Saved"
          dismissible
          onDismiss={() => setFeedback(null)}
        >
          {feedback.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Section 1: Platform Identity */}
        <Card>
          <Card.Header variant="navy">
            <Card.Title icon={Globe}>Platform Identity & Public Metadata</Card.Title>
          </Card.Header>
          <Card.Body>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="portal-title">Public Portal Title</label>
                <input
                  id="portal-title"
                  type="text"
                  className="form-control"
                  value={formData.portalName}
                  onChange={(e) => setFormData({ ...formData, portalName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="corp-name">Designated Municipal Corporation</label>
                <input
                  id="corp-name"
                  type="text"
                  className="form-control"
                  value={formData.municipalCorporation}
                  onChange={(e) => setFormData({ ...formData, municipalCorporation: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="helpline-num">Official Citizen Helpline</label>
                <input
                  id="helpline-num"
                  type="text"
                  className="form-control"
                  value={formData.helpline}
                  onChange={(e) => setFormData({ ...formData, helpline: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="portal-url">Canonical Government Domain URL</label>
                <input
                  id="portal-url"
                  type="text"
                  className="form-control"
                  value={formData.portalUrl}
                  onChange={(e) => setFormData({ ...formData, portalUrl: e.target.value })}
                />
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Section 2: Statutory Grievance SLAs */}
        <Card>
          <Card.Header variant="navy">
            <Card.Title icon={Clock}>Statutory Grievance SLA Thresholds & Escalations</Card.Title>
          </Card.Header>
          <Card.Body>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="sla-high">High Priority SLA (Hours)</label>
                <input
                  id="sla-high"
                  type="number"
                  className="form-control"
                  value={formData.highSlaHours}
                  onChange={(e) => setFormData({ ...formData, highSlaHours: Number(e.target.value) })}
                />
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Safety hazards, sewage leaks
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="sla-med">Medium Priority SLA (Hours)</label>
                <input
                  id="sla-med"
                  type="number"
                  className="form-control"
                  value={formData.mediumSlaHours}
                  onChange={(e) => setFormData({ ...formData, mediumSlaHours: Number(e.target.value) })}
                />
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Streetlights, footpath pavers
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="sla-low">Low Priority SLA (Hours)</label>
                <input
                  id="sla-low"
                  type="number"
                  className="form-control"
                  value={formData.lowSlaHours}
                  onChange={(e) => setFormData({ ...formData, lowSlaHours: Number(e.target.value) })}
                />
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  General signage, cosmetic works
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="auto-esc">Overdue Escalation (Days)</label>
                <input
                  id="auto-esc"
                  type="number"
                  className="form-control"
                  value={formData.autoEscalationDays}
                  onChange={(e) => setFormData({ ...formData, autoEscalationDays: Number(e.target.value) })}
                />
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Escalate unassigned complaints
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Section 3: Content Moderation & NLP Filters */}
        <Card>
          <Card.Header variant="navy">
            <Card.Title icon={Shield}>Automated Moderation & Integrity Rules</Card.Title>
          </Card.Header>
          <Card.Body>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="dup-radius">GIS Duplicate Radius (Meters)</label>
                <input
                  id="dup-radius"
                  type="number"
                  className="form-control"
                  value={formData.duplicateGeoRadiusMeters}
                  onChange={(e) => setFormData({ ...formData, duplicateGeoRadiusMeters: Number(e.target.value) })}
                />
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Proximity check for active tickets
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="spam-sens">Spam Filter Sensitivity</label>
                <select
                  id="spam-sens"
                  className="form-control"
                  value={formData.aiSpamSensitivity}
                  onChange={(e) => setFormData({ ...formData, aiSpamSensitivity: e.target.value })}
                >
                  <option value="Conservative">Conservative</option>
                  <option value="Standard">Standard (Recommended)</option>
                  <option value="Aggressive">Aggressive</option>
                </select>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Text and commercial advertisement check
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Auto-Quarantine Spam Flags</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="auto-quarantine"
                    checked={formData.autoQuarantineSpam}
                    onChange={(e) => setFormData({ ...formData, autoQuarantineSpam: e.target.checked })}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label htmlFor="auto-quarantine" style={{ fontSize: '0.8125rem', color: 'var(--color-text-primary)' }}>
                    Hold flagged reports in queue before routing
                  </label>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Section 4: Citizen Notification Dispatches */}
        <Card>
          <Card.Header variant="navy">
            <Card.Title icon={Bell}>Notification Gateway Dispatches</Card.Title>
          </Card.Header>
          <Card.Body>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">SMS Gateway Notifications</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="sms-dispatch"
                    checked={formData.enableSmsAlerts}
                    onChange={(e) => setFormData({ ...formData, enableSmsAlerts: e.target.checked })}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label htmlFor="sms-dispatch" style={{ fontSize: '0.8125rem', color: 'var(--color-text-primary)' }}>
                    Dispatch OTP and status SMS alerts
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Official Email Receipts</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="email-dispatch"
                    checked={formData.enableEmailAlerts}
                    onChange={(e) => setFormData({ ...formData, enableEmailAlerts: e.target.checked })}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label htmlFor="email-dispatch" style={{ fontSize: '0.8125rem', color: 'var(--color-text-primary)' }}>
                    Email PDF acknowledgment receipts
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="digest-time">Daily Authority Digest Time</label>
                <input
                  id="digest-time"
                  type="text"
                  className="form-control"
                  value={formData.dailyDigestTime}
                  onChange={(e) => setFormData({ ...formData, dailyDigestTime: e.target.value })}
                />
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Save Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: '#FFFFFF', padding: '1rem 1.5rem', border: '1px solid var(--color-border)', borderRadius: '2px' }}>
          <Button
            variant="secondary"
            size="md"
            type="button"
            onClick={() => setFormData(systemSettings)}
          >
            Reset to Saved Values
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Save}
            type="submit"
          >
            Save System Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
