import React from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Alert from '../../components/common/Alert';
import Emblem from '../../components/common/Emblem';
import { SLA_TARGETS } from '../../data/mockStatistics';
import { ShieldCheck, Users, Target, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export const AboutPage = () => {
  const slaColumns = [
    {
      header: 'Department / Wing',
      key: 'department',
      render: (val) => <span style={{ fontWeight: 600 }}>{val}</span>
    },
    {
      header: 'Civic Infrastructure Service',
      key: 'service',
      render: (val) => <span style={{ color: 'var(--color-primary-navy)' }}>{val}</span>
    },
    {
      header: 'Mandatory SLA Benchmark',
      key: 'timeline',
      render: (val) => (
        <span style={{ fontWeight: 700, color: 'var(--color-success-green)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle2 size={13} /> {val}
        </span>
      )
    }
  ];

  const wardOfficers = [
    { ward: 'Ward 03', zone: 'Central Zone', engineer: 'Er. Sandeep Patil', post: 'Junior Engineer (Civil)', contact: 'pwd-w03@civicreflex.gov.in' },
    { ward: 'Ward 08', zone: 'Central Zone', engineer: 'Dr. S. K. Mukherjee', post: 'Chief Sanitary Inspector', contact: 'sanitation-central@civicreflex.gov.in' },
    { ward: 'Ward 11', zone: 'West Zone', engineer: 'Er. P. B. Patil', post: 'Sub-Divisional Officer (Drainage)', contact: 'drainage-w11@civicreflex.gov.in' },
    { ward: 'Ward 14', zone: 'South Zone', engineer: 'Er. Rameshwar Rao', post: 'Executive Engineer (PWD)', contact: 'pwd-w14@civicreflex.gov.in' },
    { ward: 'Ward 22', zone: 'North Zone', engineer: 'Er. Amitava Sen', post: 'Assistant Engineer (Electrical)', contact: 'electrical-north@civicreflex.gov.in' }
  ];

  const officerColumns = [
    { header: 'Ward & Zone', key: 'ward', render: (val, row) => <div><strong>{val}</strong> <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>({row.zone})</span></div> },
    { header: 'Designated Officer', key: 'engineer', render: (val) => <span style={{ fontWeight: 600, color: 'var(--color-gov-blue)' }}>{val}</span> },
    { header: 'Designation', key: 'post' },
    { header: 'Official Contact', key: 'contact', render: (val) => <code style={{ fontSize: '0.8125rem' }}>{val}</code> }
  ];

  return (
    <div>
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <div className="portal-container" style={{ paddingTop: '2rem' }}>
        {/* Academic Prototype Notice */}
        <Alert type="info" title="Academic Full Stack Development Project Architecture">
          CivicReflex is developed as a comprehensive MERN-stack academic capstone project. In this initial frontend foundation phase, all portal data is driven by client-side state and structured local registers.
        </Alert>

        {/* Institutional Mission Header */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderLeft: '5px solid var(--color-primary-navy)',
            padding: '1.75rem',
            borderRadius: '2px',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Emblem size={64} />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Institutional Overview
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', margin: '0.25rem 0', color: 'var(--color-primary-navy)' }}>
                About CivicReflex
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-gov-blue)', fontWeight: 600, margin: 0 }}>
                Citizen Civic Services & Accountability Portal — Your City. Your Voice. Accountable Action.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid-3" style={{ gap: '1.25rem', marginBottom: '2.5rem' }}>
          <Card>
            <Card.Header variant="navy">
              <Card.Title icon={Target}>Our Mission</Card.Title>
            </Card.Header>
            <Card.Body>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                To transform public infrastructure maintenance from reactive complaints into transparent, accountable civic partnerships through geotagged evidence, SLA tracking, and mandatory community verification.
              </p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header variant="navy">
              <Card.Title icon={ShieldCheck}>Blind Spots Focus</Card.Title>
            </Card.Header>
            <Card.Body>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Unlike conventional portals that only fix reported breakdowns, CivicReflex proactively maps pedestrian safety hazards: dark street stretches, missing ramps, and broken pavements, prioritizing women and disabled citizens.
              </p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header variant="navy">
              <Card.Title icon={Award}>Citizen Verification</Card.Title>
            </Card.Header>
            <Card.Body>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                No complaint can be closed unilaterally by a contractor or engineer. A minimum threshold of local ward residents must physically verify the remediation, eliminating paper-only completions.
              </p>
            </Card.Body>
          </Card>
        </div>

        {/* Citizen Charter & SLA Section */}
        <section id="sla" style={{ marginBottom: '2.5rem' }}>
          <div className="section-heading">
            <span>Citizen Charter & Service Level Commitments</span>
            <Badge variant="navy">Gazette Benchmark</Badge>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            The following timeframes are statutory Citizen Charter commitments. Unresolved grievances automatically escalate through the municipal hierarchy upon SLA breach.
          </p>
          <Table columns={slaColumns} data={SLA_TARGETS} caption="Citizen Charter SLAs" />
        </section>

        {/* Ward & Field Engineer Directory */}
        <section id="directory" style={{ marginBottom: '2.5rem' }}>
          <div className="section-heading">
            <span>Ward Engineers & Nodal Officers Directory (Sample Register)</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            Designated engineers responsible for on-ground verification and contractor supervision across municipal wards.
          </p>
          <Table columns={officerColumns} data={wardOfficers} caption="Ward Officers Directory" />
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

