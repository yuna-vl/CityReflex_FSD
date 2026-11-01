import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Alert from '../../components/common/Alert';
import { CIVIC_CATEGORIES } from '../../data/mockReports';
import { SLA_TARGETS } from '../../data/mockStatistics';
import {
  AlertCircle,
  EyeOff,
  Search,
  Clock,
  ArrowRight,
  Shield,
  FileCheck,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export const CitizenServicesPage = () => {
  const navigate = useNavigate();

  const escalationTiers = [
    { level: 'Tier 1 (0 – 72 Hours)', role: 'Junior Engineer / Ward Sanitary Inspector', responsibilities: 'Site inspection, contractor work order issuance, initial remediation' },
    { level: 'Tier 2 (SLA Breached +24h)', role: 'Executive Engineer / Zonal Joint Commissioner', responsibilities: 'Automated system escalation, inspection query, vendor penalty notice' },
    { level: 'Tier 3 (SLA Breached +72h)', role: 'Municipal Commissioner & Public Grievance Ombudsman', responsibilities: 'Direct executive hearing, emergency squad deployment, contractor blacklisting review' }
  ];

  const escalationColumns = [
    { header: 'Escalation Hierarchy', key: 'level', render: (val) => <strong style={{ color: 'var(--color-primary-navy)' }}>{val}</strong> },
    { header: 'Designated Authority', key: 'role', render: (val) => <span style={{ fontWeight: 600, color: 'var(--color-gov-blue)' }}>{val}</span> },
    { header: 'Statutory Action Triggered', key: 'responsibilities' }
  ];

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Citizen Services' }]} />

      <div className="portal-container" style={{ paddingTop: '2rem' }}>
        <div className="section-heading">
          <span>Citizen Public Services Directory</span>
          <Badge variant="navy">Public Charter 2026</Badge>
        </div>

        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          CivicReflex provides a unified single-window portal for reporting public works defects, environmental hazards, sanitation lapses, and pedestrian safety risks.
        </p>

        {/* 3 Main Action Tiles */}
        <div className="grid-3" style={{ gap: '1.25rem', marginBottom: '2.5rem' }}>
          <Card interactive>
            <Card.Header variant="navy">
              <Card.Title icon={AlertCircle}>File a Grievance</Card.Title>
            </Card.Header>
            <Card.Body>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Report potholes, broken pavements, overflowing garbage, drainage chokes, and broken lights.
              </p>
              <div style={{ marginTop: '0.75rem' }}>
                <Badge status="in-progress">24-72h SLA</Badge>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" size="sm" onClick={() => navigate('/report')} style={{ width: '100%' }}>
                Start Reporting
              </Button>
            </Card.Footer>
          </Card>

          <Card interactive>
            <Card.Header variant="navy">
              <Card.Title icon={EyeOff}>Blind Spots Audit</Card.Title>
            </Card.Header>
            <Card.Body>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Flag dark roads, missing footpaths, and inaccessible zones for women and pedestrian safety.
              </p>
              <div style={{ marginTop: '0.75rem' }}>
                <Badge variant="gold">Safety Priority</Badge>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button variant="gold" size="sm" onClick={() => navigate('/blind-spots')} style={{ width: '100%' }}>
                Audit Public Space
              </Button>
            </Card.Footer>
          </Card>

          <Card interactive>
            <Card.Header variant="navy">
              <Card.Title icon={Search}>Track Status</Card.Title>
            </Card.Header>
            <Card.Body>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Inspect multi-stage inspection logs, engineer remarks, and verify completion before closure.
              </p>
              <div style={{ marginTop: '0.75rem' }}>
                <Badge variant="verified">Public Audit</Badge>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" size="sm" onClick={() => navigate('/track')} style={{ width: '100%' }}>
                Check Status
              </Button>
            </Card.Footer>
          </Card>
        </div>

        {/* Categories Breakdown */}
        <section style={{ marginBottom: '2.5rem' }}>
          <div className="section-heading">
            <span>Recognized Civic Redressal Categories</span>
          </div>
          <div className="grid-3" style={{ gap: '1rem' }}>
            {CIVIC_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  padding: '1rem',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-navy)', fontSize: '0.9375rem' }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {cat.count.toLocaleString()} Active Reports
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`/report?category=${cat.id}`)}
                >
                  Report
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Statutory Escalation Matrix */}
        <section id="escalation" style={{ marginBottom: '2.5rem' }}>
          <div className="section-heading">
            <span>Automatic Statutory Escalation Matrix</span>
            <Badge variant="escalated">SLA Breach Protocol</Badge>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            If a field division does not resolve an issue within the Citizen Charter timeline, the CivicReflex system automatically triggers non-compliance notices to superior authorities.
          </p>
          <Table columns={escalationColumns} data={escalationTiers} caption="Escalation Matrix" />
        </section>
      </div>
    </div>
  );
};

export default CitizenServicesPage;

