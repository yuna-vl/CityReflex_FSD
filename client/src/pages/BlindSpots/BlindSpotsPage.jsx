import React, { useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Alert from '../../components/common/Alert';
import {
  EyeOff,
  Sun,
  Moon,
  ShieldAlert,
  Flame,
  Accessibility,
  Footprints,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const BlindSpotsPage = () => {
  const [viewMode, setViewMode] = useState('night'); // 'day' | 'night'
  const [auditCategory, setAuditCategory] = useState('lighting');
  const [illuminationRating, setIlluminationRating] = useState(1);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [auditSuccess, setAuditSuccess] = useState(false);

  // Mock Blind Spot Clusters for Demonstration
  const mockClusters = [
    {
      id: 'CLUSTER-BLIND-01',
      title: 'Sector 4 Link Road Dark Stretch',
      ward: 'Ward 22 (North Zone)',
      riskLevel: 'Critical Cluster (7 Reports)',
      type: 'Zero Street Illumination & Deserted Walkway',
      dayRating: 'Safe & Clear (Visibility: Good)',
      nightRating: 'Dangerous Pitch Black (Zero Light)',
      escalationStatus: 'Auto-Escalated to Zonal Safety Committee',
      reportsCount: 7,
      missingInfra: '7 Non-functional light poles, overgrown tree canopy'
    },
    {
      id: 'CLUSTER-BLIND-02',
      title: 'Central Bus Terminal South Gate Curb',
      ward: 'Ward 03 (Central Zone)',
      riskLevel: 'High Accessibility Barrier (5 Reports)',
      type: 'Missing Wheelchair Ramp & High Curb Stone (8 Inches)',
      dayRating: 'Heavy Footfall / High Barrier',
      nightRating: 'Fall Hazard due to poor curb markings',
      escalationStatus: 'Escalated to Accessibility Cell',
      reportsCount: 5,
      missingInfra: 'Drop curb ramp, broken tactile paving blocks'
    },
    {
      id: 'CLUSTER-BLIND-03',
      title: 'Old Canal Road Pedestrian Walkway',
      ward: 'Ward 14 (South Zone)',
      riskLevel: 'Moderate Safety Risk (3 Reports)',
      type: 'Missing Footpath Link & Blind Turn',
      dayRating: 'Mixed vehicular / pedestrian conflict',
      nightRating: 'Poorly Lit Curve with no sidewalk barrier',
      escalationStatus: 'Scheduled for Field Verification',
      reportsCount: 3,
      missingInfra: 'Continuous sidewalk, sodium vapor lamp upgrade'
    }
  ];

  const handleSimulateSubmit = (e) => {
    e.preventDefault();
    setAuditSuccess(true);
    setTimeout(() => {
      setAuditSuccess(false);
    }, 5000);
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Citizen Services', to: '/services' }, { label: 'Blind Spots Initiative' }]} />

      <div className="portal-container" style={{ paddingTop: '2rem' }}>
        {/* Milestone 1 Scope Notice */}
        <Alert type="info" title="Module B: Blind Spots – Urban Pedestrian Safety Audit">
          Focuses on invisible civic hazards: unlit night stretches, missing sidewalks, and wheelchair inaccessible infrastructure. Multi-report clusters automatically trigger safety escalations.
        </Alert>

        {/* Header Hero Banner */}
        <div
          style={{
            backgroundColor: viewMode === 'night' ? '#07182C' : '#F8FAFC',
            color: viewMode === 'night' ? '#FFFFFF' : 'var(--color-primary-navy)',
            border: '1px solid var(--color-border)',
            borderLeft: '5px solid var(--color-gold)',
            padding: '1.75rem',
            borderRadius: '2px',
            marginBottom: '2rem',
            transition: 'background-color 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <EyeOff size={24} color="var(--color-gold)" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', margin: 0, color: 'inherit' }}>
                  Blind Spots & Public Safety Auditing
                </h2>
              </div>
              <p style={{ fontSize: '0.9375rem', color: viewMode === 'night' ? '#CBD5E1' : 'var(--color-text-secondary)', marginTop: '0.5rem', maxWidth: '720px' }}>
                A civic safety framework tracking conditions that change dramatically by time of day. Document poorly lit paths, missing ramps, and pedestrian hazards to trigger automated cluster escalation.
              </p>
            </div>

            {/* Day / Night Visualization Toggle */}
            <div
              style={{
                backgroundColor: viewMode === 'night' ? '#0F294D' : '#E2E8F0',
                padding: '4px',
                borderRadius: '3px',
                display: 'flex',
                gap: '4px'
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('day')}
                aria-pressed={viewMode === 'day'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: viewMode === 'day' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'day' ? 'var(--color-primary-navy)' : '#64748B',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Sun size={14} color="#D97706" />
                <span>Day Mode Audit</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('night')}
                aria-pressed={viewMode === 'night'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: viewMode === 'night' ? 'var(--color-gold)' : 'transparent',
                  color: viewMode === 'night' ? 'var(--color-primary-navy)' : '#94A3B8',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Moon size={14} />
                <span>Night Mode Audit (Active)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Blind Spot Audits */}
        <div className="grid-4" style={{ gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderTop: '3px solid var(--color-alert-red)', padding: '1.25rem', borderRadius: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <EyeOff size={18} color="var(--color-alert-red)" />
              <strong style={{ fontSize: '0.9375rem', color: 'var(--color-primary-navy)' }}>Unlit Corridors</strong>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              Streets where streetlight failure or sparse pole distribution creates pitch-dark zones after 19:00 hrs.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderTop: '3px solid var(--color-gold)', padding: '1.25rem', borderRadius: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Accessibility size={18} color="#B88E3E" />
              <strong style={{ fontSize: '0.9375rem', color: 'var(--color-primary-navy)' }}>Missing Ramps</strong>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              Curbs, bus stops, and public buildings lacking smooth ramps for wheelchair users and stroller access.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderTop: '3px solid var(--color-gov-blue)', padding: '1.25rem', borderRadius: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Footprints size={18} color="var(--color-gov-blue)" />
              <strong style={{ fontSize: '0.9375rem', color: 'var(--color-primary-navy)' }}>Broken Footpaths</strong>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              Abrupt sidewalk ends forcing pedestrians into fast-moving traffic lanes, especially near blind curves.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderTop: '3px solid var(--color-success-green)', padding: '1.25rem', borderRadius: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Flame size={18} color="var(--color-success-green)" />
              <strong style={{ fontSize: '0.9375rem', color: 'var(--color-primary-navy)' }}>Cluster Escalation</strong>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              When 3 or more citizens tag adjacent hazards, the system creates a high-priority Municipal Intervention Cluster.
            </p>
          </div>
        </div>

        {/* Interactive Hazard Submission & Active Clusters */}
        <div className="grid-2" style={{ gap: '2rem', marginBottom: '2.5rem' }}>
          {/* Left: Tag a Blind Spot Form */}
          <Card>
            <Card.Header variant="navy">
              <Card.Title icon={ShieldAlert}>Tag a Public Blind Spot (Audit Simulator)</Card.Title>
            </Card.Header>
            <Card.Body>
              {auditSuccess && (
                <Alert type="success" title="Hazard Recorded in Safety Audit Pool">
                  Thank you! Your observation has been logged and correlated with existing ward data for automated cluster analysis.
                </Alert>
              )}

              <form onSubmit={handleSimulateSubmit}>
                <div className="form-group">
                  <label className="form-label">Blind Spot Classification</label>
                  <select
                    className="form-control"
                    value={auditCategory}
                    onChange={(e) => setAuditCategory(e.target.value)}
                  >
                    <option value="lighting">Dark Stretch / Streetlight Failure</option>
                    <option value="ramp">Missing Wheelchair Ramp / Broken Tactile</option>
                    <option value="footpath">Missing Sidewalk / Pedestrian Conflict</option>
                    <option value="unsafe">Unsafe Deserted Corner / Overgrown Brush</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Location / Ward</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Sector 4 Link Road, Ward 22"
                    placeholder="Enter street name or landmark"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Time-of-Day Illumination Score: <strong>{illuminationRating} / 5</strong> ({illuminationRating === 1 ? 'Pitch Black' : illuminationRating <= 3 ? 'Dim / Unsafe' : 'Well Lit'})
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={illuminationRating}
                    onChange={(e) => setIlluminationRating(Number(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                    <span>1: Pitch Black (Extreme Risk)</span>
                    <span>3: Moderate Lighting</span>
                    <span>5: Fully Lit & Visible</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Specific Pedestrian Risk</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="e.g. Broken pavement edge, zero lighting between bus stop and residential gate, women safety hazard after 20:00..."
                    defaultValue="Seven non-functional sodium lamps leave entire corridor dark. Women commuters returning from metro station are forced to walk on road."
                  />
                </div>

                <Button variant="gold" type="submit" icon={CheckCircle2}>
                  Submit Audit Observation (Demo)
                </Button>
              </form>
            </Card.Body>
          </Card>

          {/* Right: Active Auto-Escalated Clusters */}
          <div>
            <div className="section-heading" style={{ fontSize: '1.125rem' }}>
              <span>High-Priority Escalated Clusters</span>
              <Badge variant="escalated">Live Municipal Feed</Badge>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
              Clusters formed automatically by spatial grouping of citizen reports. These are prioritized in the Municipal Commissioner's Safety Dashboard.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mockClusters.map((cluster) => (
                <div
                  key={cluster.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    borderLeft: '4px solid var(--color-alert-red)',
                    padding: '1rem',
                    borderRadius: '2px',
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.9375rem' }}>
                        {cluster.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        {cluster.ward} • {cluster.missingInfra}
                      </div>
                    </div>
                    <Badge variant="escalated">{cluster.reportsCount} Reports</Badge>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#F8FAFC',
                      padding: '0.5rem',
                      borderRadius: '2px',
                      fontSize: '0.75rem',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.5rem',
                      margin: '0.5rem 0'
                    }}
                  >
                    <div>
                      <span style={{ color: '#D97706', fontWeight: 600 }}>Day Assessment:</span>
                      <div>{cluster.dayRating}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--color-alert-red)', fontWeight: 600 }}>Night Assessment:</span>
                      <div>{cluster.nightRating}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gov-blue)', fontWeight: 600 }}>
                      › {cluster.escalationStatus}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedCluster(cluster)}
                      className="btn btn-secondary btn-sm"
                    >
                      Audit Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Cluster Details Modal / Preview */}
        {selectedCluster && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--color-gold)',
              padding: '1.25rem',
              borderRadius: '2px',
              marginBottom: '2rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--color-primary-navy)' }}>
                {selectedCluster.title} – Detailed Inspection File
              </h3>
              <button
                type="button"
                onClick={() => setSelectedCluster(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}
              >
                &times; Close
              </button>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              <strong>Hazard Diagnostics:</strong> {selectedCluster.type}. Co-ordinates mapped for emergency sodium lamp replacement and pedestrian railing installation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlindSpotsPage;

