import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  EyeOff,
  Search,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Building2,
  FileText,
  Bell,
  Trash2,
  Lightbulb,
  Droplets,
  Footprints,
  Construction,
  ChevronRight
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import StatsCard from '../../components/common/StatsCard';
import Alert from '../../components/common/Alert';
import { PORTAL_METRICS, TRANSPARENCY_METRICS } from '../../data/mockStatistics';
import { CIVIC_CATEGORIES } from '../../data/mockReports';
import { MOCK_TICKETS } from '../../data/mockTickets';
import { MOCK_NOTICES } from '../../data/mockNotifications';

import { useReports } from '../../hooks/useReports';

export const HomePage = () => {
  const navigate = useNavigate();
  const { getTicket, userReports } = useReports();
  const [quickTicketId, setQuickTicketId] = useState('');
  const [quickResult, setQuickResult] = useState(null);
  const [quickError, setQuickError] = useState('');

  const handleQuickTrack = (e) => {
    e.preventDefault();
    setQuickError('');
    const trimmed = quickTicketId.trim().toUpperCase();

    if (!trimmed) {
      setQuickError('Please enter a valid Complaint Number or Ticket ID (e.g. CR-2026-8842).');
      return;
    }

    const found = getTicket(trimmed);
    if (found) {
      setQuickResult(found);
    } else {
      setQuickError(`No record found for "${trimmed}". Try demo ticket CR-2026-8842 or CR-2026-8843.`);
      setQuickResult(null);
    }
  };

  // Map Category Icons for Section 3
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'roads':
        return <Construction size={22} />;
      case 'sanitation':
        return <Trash2 size={22} />;
      case 'lighting':
        return <Lightbulb size={22} />;
      case 'drainage':
        return <Droplets size={22} />;
      case 'accessibility':
        return <Footprints size={22} />;
      case 'public_safety':
        return <ShieldAlert size={22} />;
      default:
        return <AlertCircle size={22} />;
    }
  };

  // Columns for Section 5: Latest Notifications and Circulars Table
  const notificationColumns = [
    {
      header: 'S.No.',
      key: 'sNo',
      width: '60px',
      align: 'center',
      render: (val) => <span style={{ fontWeight: 700, color: 'var(--color-text-secondary)' }}>{val}</span>
    },
    {
      header: 'Notification Title & Summary',
      key: 'title',
      render: (val, row) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.9375rem' }}>
              {val}
            </span>
            {row.isNew && <span className="badge badge-new">NEW</span>}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            {row.summary}
          </div>
        </div>
      )
    },
    {
      header: 'Reference Number',
      key: 'refNumber',
      width: '180px',
      render: (val) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--color-gov-blue)', fontSize: '0.8125rem' }}>
          {val}
        </span>
      )
    },
    {
      header: 'Published Date',
      key: 'publishedDate',
      width: '120px',
      render: (val) => <span style={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>{val}</span>
    },
    {
      header: 'Status',
      key: 'status',
      width: '120px',
      render: (val) => (
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--color-success-green)',
            backgroundColor: 'var(--color-success-bg)',
            padding: '2px 8px',
            borderRadius: '2px',
            border: '1px solid var(--color-success-border)',
            display: 'inline-block'
          }}
        >
          {val}
        </span>
      )
    }
  ];

  return (
    <div className="homepage-content">
      {/* =========================================================================
          PRESERVED SECTION: Institutional Hero Banner
          ========================================================================= */}
      <section
        style={{
          backgroundColor: '#0B2545',
          color: '#FFFFFF',
          backgroundImage: 'linear-gradient(135deg, #07182C 0%, #0B2545 60%, #003366 100%)',
          borderBottom: '4px solid var(--color-gold)',
          padding: '2.5rem 0'
        }}
      >
        <div className="portal-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
              gap: '2.5rem',
              alignItems: 'center'
            }}
            className="hero-grid"
          >
            {/* Left Hero Message */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(205, 162, 80, 0.15)',
                  border: '1px solid var(--color-gold)',
                  borderRadius: '2px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '1rem'
                }}
              >
                <span>National Civic Accountability Initiative</span>
                <span>•</span>
                <span>Academic FSD Prototype</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.25rem',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: '1rem'
                }}
              >
                Direct Civic Grievance Redressal & Pedestrian Safety Audit
              </h2>

              <p
                style={{
                  fontSize: '1rem',
                  color: '#CBD5E1',
                  lineHeight: 1.6,
                  marginBottom: '1.75rem',
                  maxWidth: '580px'
                }}
              >
                CivicReflex bridges citizens with municipal engineers to resolve road potholes, garbage accumulation, unlit streets, and inaccessible urban walkways through time-bound Service Level Agreements (SLAs) and mandatory public verification.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Button
                  variant="gold"
                  size="lg"
                  icon={AlertCircle}
                  onClick={() => navigate('/report')}
                >
                  File a Grievance Now
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  icon={EyeOff}
                  onClick={() => navigate('/blind-spots')}
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderColor: '#4A5568' }}
                >
                  Audit Blind Spots
                </Button>
              </div>
            </div>

            {/* Right Hero: Quick Grievance Tracker Card */}
            <div>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-primary-navy)',
                  borderRadius: '3px',
                  border: '2px solid var(--color-gold)',
                  padding: '1.5rem',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Search size={20} color="var(--color-gov-blue)" />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: 0, color: 'var(--color-primary-navy)' }}>
                    Quick Grievance Tracker
                  </h3>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                  Enter your 10-digit Ticket ID to inspect live progress, assigned field engineer, and resolution evidence.
                </p>

                <form onSubmit={handleQuickTrack}>
                  <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                    <label htmlFor="quick-ticket-input" className="form-label">
                      Complaint / Ticket Number:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        id="quick-ticket-input"
                        type="text"
                        className="form-control"
                        placeholder="e.g. CR-2026-8842"
                        value={quickTicketId}
                        onChange={(e) => setQuickTicketId(e.target.value)}
                        style={{ fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 600 }}
                      />
                      <Button variant="primary" type="submit" icon={Search}>
                        Track
                      </Button>
                    </div>
                  </div>
                </form>

                {/* Sample quick ticket buttons */}
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                  <span>Quick Select: </span>
                  {userReports.slice(0, 3).map((r, idx) => (
                    <React.Fragment key={r.ticketNumber}>
                      {idx > 0 && <span>, </span>}
                      <button
                        type="button"
                        onClick={() => {
                          setQuickTicketId(r.ticketNumber);
                          setQuickError('');
                          setQuickResult(getTicket(r.ticketNumber));
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
                        {r.ticketNumber}
                      </button>
                    </React.Fragment>
                  ))}
                  {userReports.length < 2 && (
                    <>
                      <span>, </span>
                      <button
                        type="button"
                        onClick={() => {
                          setQuickTicketId('CR-2026-8843');
                          setQuickError('');
                          setQuickResult(getTicket('CR-2026-8843'));
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--color-gov-blue)', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600, padding: 0 }}
                      >
                        CR-2026-8843
                      </button>
                    </>
                  )}
                </div>

                {quickError && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <Alert type="danger">{quickError}</Alert>
                  </div>
                )}

                {/* Quick Result Snapshot */}
                {quickResult && (
                  <div
                    style={{
                      marginTop: '1rem',
                      padding: '0.875rem',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--color-gov-blue)' }}>{quickResult.ticketNumber}</span>
                      <Badge status={quickResult.currentStatus} />
                    </div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary-navy)', marginBottom: '0.25rem' }}>
                      {quickResult.subject}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                      {quickResult.ward} • Assigned: {quickResult.assignedAuthority.name}
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/track?ticket=${quickResult.ticketNumber}`)}
                      style={{ width: '100%' }}
                    >
                      View Complete Lifecycle & Evidence
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRESERVED SECTION: Key Civic Performance Indicators (KPI Strip)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', padding: '1.25rem 0' }}>
        <div className="portal-container">
          <div className="grid-4" style={{ gap: '1rem' }}>
            <StatsCard
              icon={FileText}
              value={PORTAL_METRICS.totalRegistered}
              label="Grievances Registered"
              subtitle="Across 64 Municipal Wards"
              accent="blue"
            />
            <StatsCard
              icon={CheckCircle2}
              value={PORTAL_METRICS.totalResolved}
              label="Resolved & Verified"
              subtitle={`${PORTAL_METRICS.resolutionRate} Redressal Rate`}
              accent="green"
            />
            <StatsCard
              icon={Clock}
              value={PORTAL_METRICS.activeUnderReview}
              label="Active In-Progress"
              subtitle={`Avg Time: ${PORTAL_METRICS.avgRedressalTimeHours} Hours`}
              accent="gold"
            />
            <StatsCard
              icon={EyeOff}
              value={PORTAL_METRICS.activeBlindSpots}
              label="Blind Spots Audited"
              subtitle="Unlit streets & barrier audits"
              accent="red"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: Citizen Quick Services (Formal Government-Style Directory Tiles)
          ========================================================================= */}
      <section style={{ padding: '2.5rem 0', backgroundColor: 'var(--color-background)' }}>
        <div className="portal-container">
          <div className="section-heading">
            <span>Citizen Quick Services</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              Official Citizen Services Directory
            </span>
          </div>

          <div className="quick-services-grid">
            {/* Tile 1: Lodge a Grievance */}
            <div
              className="service-tile"
              onClick={() => navigate('/report')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/report')}
            >
              <div>
                <div className="service-tile-top">
                  <div className="service-tile-icon">
                    <AlertCircle size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="service-tile-title">Lodge a Grievance</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-alert-red)', fontWeight: 600 }}>
                      SLA-Bound Filing
                    </span>
                  </div>
                </div>
                <p className="service-tile-desc">
                  Report potholes, overflowing garbage bins, broken streetlights, or drainage overflow with photographic proof and GPS coordinates.
                </p>
              </div>
              <div className="service-tile-action">
                <span>File Grievance</span>
                <ChevronRight size={14} aria-hidden="true" />
              </div>
            </div>

            {/* Tile 2: Track Complaint */}
            <div
              className="service-tile"
              onClick={() => navigate('/track')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/track')}
            >
              <div>
                <div className="service-tile-top">
                  <div className="service-tile-icon">
                    <Search size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="service-tile-title">Track Complaint</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gov-blue)', fontWeight: 600 }}>
                      Real-Time Progress
                    </span>
                  </div>
                </div>
                <p className="service-tile-desc">
                  Check live status using your 10-digit Ticket ID. Review Junior Engineer inspection logs, contractor work orders, and resolution schedules.
                </p>
              </div>
              <div className="service-tile-action">
                <span>Inspect Lifecycle</span>
                <ChevronRight size={14} aria-hidden="true" />
              </div>
            </div>

            {/* Tile 3: Report an Unsafe Location */}
            <div
              className="service-tile"
              onClick={() => navigate('/blind-spots')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/blind-spots')}
            >
              <div>
                <div className="service-tile-top">
                  <div className="service-tile-icon" style={{ backgroundColor: '#FDF4E6', color: '#B88E3E' }}>
                    <EyeOff size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="service-tile-title">Report an Unsafe Location</h3>
                    <span style={{ fontSize: '0.75rem', color: '#B88E3E', fontWeight: 600 }}>
                      Blind Spots Audit
                    </span>
                  </div>
                </div>
                <p className="service-tile-desc">
                  Tag poorly illuminated dark corridors, missing pedestrian footpaths, deserted stretches, and accessibility barriers to trigger safety escalations.
                </p>
              </div>
              <div className="service-tile-action" style={{ color: '#B88E3E' }}>
                <span>Audit Safety</span>
                <ChevronRight size={14} aria-hidden="true" />
              </div>
            </div>

            {/* Tile 4: View Public Grievances */}
            <div
              className="service-tile"
              onClick={() => navigate('/track')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/track')}
            >
              <div>
                <div className="service-tile-top">
                  <div className="service-tile-icon">
                    <FileText size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="service-tile-title">View Public Grievances</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                      Open Public Register
                    </span>
                  </div>
                </div>
                <p className="service-tile-desc">
                  Browse community grievances across all 64 municipal wards. Review problem categories, affected localities, and departmental remediation actions.
                </p>
              </div>
              <div className="service-tile-action">
                <span>Browse Register</span>
                <ChevronRight size={14} aria-hidden="true" />
              </div>
            </div>

            {/* Tile 5: Verify Resolution */}
            <div
              className="service-tile"
              onClick={() => navigate('/track?ticket=CR-2026-8843')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/track?ticket=CR-2026-8843')}
            >
              <div>
                <div className="service-tile-top">
                  <div className="service-tile-icon" style={{ backgroundColor: '#EAF5ED', color: 'var(--color-success-green)' }}>
                    <CheckCircle2 size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="service-tile-title">Verify Resolution</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-success-green)', fontWeight: 600 }}>
                      Community Sign-Off
                    </span>
                  </div>
                </div>
                <p className="service-tile-desc">
                  Exercise citizen accountability. Confirm whether completed works in your neighborhood meet satisfactory quality standards before official sign-off.
                </p>
              </div>
              <div className="service-tile-action" style={{ color: 'var(--color-success-green)' }}>
                <span>Cast Verification</span>
                <ChevronRight size={14} aria-hidden="true" />
              </div>
            </div>

            {/* Tile 6: View Notifications */}
            <div
              className="service-tile"
              onClick={() => navigate('/notifications')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/notifications')}
            >
              <div>
                <div className="service-tile-top">
                  <div className="service-tile-icon">
                    <Bell size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="service-tile-title">View Notifications</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gov-blue)', fontWeight: 600 }}>
                      Gazette Circulars
                    </span>
                  </div>
                </div>
                <p className="service-tile-desc">
                  Read official municipal advisories, seasonal monsoon desilting notices, road closure bulletins, and updated Citizen Charter service commitments.
                </p>
              </div>
              <div className="service-tile-action">
                <span>View Bulletins</span>
                <ChevronRight size={14} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: How CivicReflex Works (Horizontal on Desktop, Vertical on Mobile)
          ========================================================================= */}
      <section style={{ padding: '2.5rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="portal-container">
          <div className="section-heading">
            <span>How CivicReflex Works</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              Four-Step Accountable Governance Workflow
            </span>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '2rem', maxWidth: '750px' }}>
            CivicReflex establishes an accountable, closed-loop grievance resolution process where complaints cannot be closed without verified physical remediation and ward citizen sign-off.
          </p>

          <div className="how-it-works-grid">
            {/* Step 1 */}
            <div className="how-it-works-step">
              <div className="step-number-badge">01</div>
              <h3 className="step-title">Citizen reports a civic issue</h3>
              <p className="step-desc">
                A citizen lodges a civic infrastructure problem or unsafe blind spot via web or mobile. Uploads photographic proof, selects GPS location, and tags problem severity.
              </p>
            </div>

            {/* Step 2 */}
            <div className="how-it-works-step">
              <div className="step-number-badge">02</div>
              <h3 className="step-title">Authorities verify and assign</h3>
              <p className="step-desc">
                The portal routes the complaint to the designated Ward Junior Engineer. The official conducts physical site verification and initiates the statutory Citizen Charter SLA timer.
              </p>
            </div>

            {/* Step 3 */}
            <div className="how-it-works-step">
              <div className="step-number-badge">03</div>
              <h3 className="step-title">Department takes corrective action</h3>
              <p className="step-desc">
                The nodal department executes corrective repairs (asphalt patching, streetlight cable replacement, or waste clearance). Remediation photos are uploaded to the audit trail.
              </p>
            </div>

            {/* Step 4 */}
            <div className="how-it-works-step">
              <div className="step-number-badge">04</div>
              <h3 className="step-title">Citizen verifies the resolution</h3>
              <p className="step-desc">
                The ticket is conditionally marked resolved. Registered ward residents physically inspect the work and cast verification votes. Minimum 3 community votes are mandatory for final closure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: Civic Issue Categories
          ========================================================================= */}
      <section style={{ padding: '2.5rem 0', backgroundColor: 'var(--color-background)' }}>
        <div className="portal-container">
          <div className="section-heading">
            <span>Civic Issue Categories</span>
            <Link to="/report" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              Report in Any Category ›
            </Link>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
            Select an infrastructure service category to lodge a geotagged complaint or inspect active neighborhood remediation works.
          </p>

          <div className="categories-showcase-grid">
            {CIVIC_CATEGORIES.map((cat) => (
              <div key={cat.id} className="category-showcase-card">
                <div className="category-icon-box">
                  {getCategoryIcon(cat.id)}
                </div>
                <div className="category-details">
                  <h3 className="category-name">{cat.name}</h3>
                  <div className="category-count-badge">
                    {cat.count.toLocaleString()} Active Reports
                  </div>
                  <p className="category-subtext">{cat.description}</p>
                  <div style={{ marginTop: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => navigate(`/report?category=${cat.id}`)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '3px 10px', fontSize: '0.75rem' }}
                    >
                      Report Issue ›
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: Blind Spots Feature Section (Visually Distinct)
          ========================================================================= */}
      <section className="blind-spots-feature-section">
        <div className="portal-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-primary-navy)', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 700, borderRadius: '2px', textTransform: 'uppercase' }}>
              Safety Innovation
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-gold)', fontWeight: 600 }}>
              Pedestrian & Women Safety Audit
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FFFFFF', fontWeight: 700, margin: '0.25rem 0 0.75rem 0' }}>
            Beyond Complaints: Report What Makes Your Streets Unsafe
          </h2>

          <p style={{ fontSize: '0.9375rem', color: '#CBD5E1', maxWidth: '780px', lineHeight: 1.6, margin: 0 }}>
            Conventional complaint systems only fix broken things that are reported. CivicReflex’s <strong>Blind Spots</strong> system empowers citizens to document everyday fear and friction in public spaces—from pitch-black stretches to missing ramps—creating crowd-sourced safety heatmaps that automatically escalate into municipal action plans.
          </p>

          <div className="blind-spots-feature-grid">
            {/* Feature 1: Poorly Lit Streets */}
            <div className="blind-spot-card">
              <Lightbulb size={24} color="var(--color-gold)" aria-hidden="true" />
              <h4>Poorly Lit Streets</h4>
              <p>
                Tag stretches where streetlights are completely absent, non-functional, or obscured by tree canopies, creating hazardous dark zones after sunset.
              </p>
            </div>

            {/* Feature 2: Unsafe Areas */}
            <div className="blind-spot-card">
              <ShieldAlert size={24} color="var(--color-gold)" aria-hidden="true" />
              <h4>Unsafe Areas</h4>
              <p>
                Report deserted walkways, overgrown brush corners, unmonitored subways, and blind turns where citizens—especially women—feel vulnerable.
              </p>
            </div>

            {/* Feature 3: Missing Footpaths */}
            <div className="blind-spot-card">
              <Footprints size={24} color="var(--color-gold)" aria-hidden="true" />
              <h4>Missing Footpaths</h4>
              <p>
                Identify sudden pavement drop-offs and broken sidewalk connections that force pedestrians to navigate oncoming fast vehicular traffic.
              </p>
            </div>

            {/* Feature 4: Missing Accessibility Ramps */}
            <div className="blind-spot-card">
              <Building2 size={24} color="var(--color-gold)" aria-hidden="true" />
              <h4>Missing Accessibility Ramps</h4>
              <p>
                Document 8-inch high curbs, missing drop-curbs, and broken tactile paving at bus terminals and government centers that exclude persons with disabilities.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ fontSize: '0.8125rem', color: '#CBD5E1' }}>
              <strong>Multi-Citizen Cluster Detection:</strong> When 3 or more citizens tag the same dark corridor, an automated priority cluster is generated for the Joint Safety Committee.
            </div>

            <Button
              variant="gold"
              size="lg"
              icon={EyeOff}
              onClick={() => navigate('/blind-spots')}
            >
              Explore Blind Spots
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: Latest Notifications and Circulars
          ========================================================================= */}
      <section style={{ padding: '2.5rem 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)' }}>
        <div className="portal-container">
          <div className="section-heading">
            <span>Latest Notifications and Circulars</span>
            <Link to="/notifications" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              View Complete Gazette Archive ›
            </Link>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
            Official municipal administrative circulars, public service announcements, and statutory Citizen Charter revisions. Entries marked with <span className="badge badge-new" style={{ verticalAlign: 'middle', margin: '0 2px' }}>NEW</span> represent demonstration updates issued in the current month.
          </p>

          <Table
            columns={notificationColumns}
            data={MOCK_NOTICES}
            caption="Government Notifications and Circulars Register"
          />

          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              backgroundColor: '#F8FAFC',
              padding: '0.75rem 1rem',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              fontSize: '0.8125rem',
              color: 'var(--color-text-secondary)'
            }}
          >
            <div>
              <strong>Demonstration Notice:</strong> All circular reference numbers and dates are simulated for academic full stack testing.
            </div>
            <Button
              variant="secondary"
              size="sm"
              icon={FileText}
              onClick={() => navigate('/notifications')}
            >
              Search Circulars Database
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: Public Transparency Section
          ========================================================================= */}
      <section style={{ padding: '2.5rem 0', backgroundColor: 'var(--color-background)' }}>
        <div className="portal-container">
          <div className="section-heading">
            <span>Public Transparency & Redressal Performance</span>
            <Badge variant="navy">Demo Accountability Metrics</Badge>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.75rem' }}>
            To uphold public integrity and trust, CivicReflex publishes real-time aggregated metrics on civic complaint volume, departmental compliance rates, and average resolution times.
          </p>

          {/* 4 Main Transparency Metric Boxes */}
          <div className="transparency-kpi-grid">
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderTop: '4px solid var(--color-gov-blue)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Total Grievances Received
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary-navy)', margin: '0.35rem 0' }}>
                {TRANSPARENCY_METRICS.totalReceived.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-gov-blue)', fontWeight: 600 }}>
                Across 64 Municipal Wards
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderTop: '4px solid var(--color-success-green)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Resolved Grievances
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-success-green)', margin: '0.35rem 0' }}>
                {TRANSPARENCY_METRICS.resolvedCount.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-success-green)', fontWeight: 600 }}>
                {TRANSPARENCY_METRICS.resolvedPercentage}% Successful Resolution
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderTop: '4px solid #B7791F', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Pending Grievances
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#B7791F', margin: '0.35rem 0' }}>
                {TRANSPARENCY_METRICS.pendingCount.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#B7791F', fontWeight: 600 }}>
                {TRANSPARENCY_METRICS.pendingPercentage}% Under Active Investigation
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderTop: '4px solid var(--color-gold)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Average Resolution Time
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary-navy)', margin: '0.35rem 0' }}>
                {TRANSPARENCY_METRICS.avgResolutionHours} Hours
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-success-green)', fontWeight: 600 }}>
                Within Citizen Charter SLA Target
              </div>
            </div>
          </div>

          {/* Visual Resolution Meter & Department Breakdown */}
          <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Visual Resolution Distribution Bar */}
            <div className="transparency-meter-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                  Cumulative Redressal Distribution
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Demo Data</span>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: '0 0 1rem 0' }}>
                Visual ratio of completed community verified repairs compared to tickets undergoing inspection or contractor execution.
              </p>

              {/* Progress Meter Bar */}
              <div className="transparency-progress-bar">
                <div
                  className="progress-resolved"
                  style={{ width: `${TRANSPARENCY_METRICS.resolvedPercentage}%` }}
                  title={`Resolved: ${TRANSPARENCY_METRICS.resolvedPercentage}%`}
                >
                  {TRANSPARENCY_METRICS.resolvedPercentage}% Resolved
                </div>
                <div
                  className="progress-pending"
                  style={{ width: `${TRANSPARENCY_METRICS.pendingPercentage}%` }}
                  title={`Pending: ${TRANSPARENCY_METRICS.pendingPercentage}%`}
                >
                  {TRANSPARENCY_METRICS.pendingPercentage}%
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-success-green)', display: 'inline-block', borderRadius: '2px' }} />
                  <span><strong>Resolved & Verified:</strong> {TRANSPARENCY_METRICS.resolvedCount.toLocaleString()} ({TRANSPARENCY_METRICS.resolvedPercentage}%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: '#B7791F', display: 'inline-block', borderRadius: '2px' }} />
                  <span><strong>Under Field Execution:</strong> {TRANSPARENCY_METRICS.pendingCount.toLocaleString()} ({TRANSPARENCY_METRICS.pendingPercentage}%)</span>
                </div>
              </div>
            </div>

            {/* Department Performance Meters */}
            <div className="transparency-meter-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                  Departmental SLA Compliance
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Target: &gt;85%</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
                {TRANSPARENCY_METRICS.departmentPerformance.map((dept, index) => (
                  <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-dark-slate)', marginBottom: '3px' }}>
                      <span>{dept.name}</span>
                      <span style={{ color: dept.rate >= 90 ? 'var(--color-success-green)' : 'var(--color-gov-blue)' }}>
                        {dept.rate}% ({dept.resolved.toLocaleString()} / {dept.received.toLocaleString()})
                      </span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${dept.rate}%`,
                          backgroundColor: dept.color,
                          borderRadius: '2px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Transparency Watermark / Disclaimer */}
          <Alert type="info">
            <strong>Public Disclosure:</strong> CivicReflex is an academic Full Stack Development project. All transparency statistics, departmental resolution percentages, and grievance counts shown above are demonstration data to illustrate the citizen accountability interface.
          </Alert>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
