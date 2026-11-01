import React from 'react';
import { useReports } from '../../hooks/useReports';

export const AuthorityAnalyticsPage = () => {
  const { reports } = useReports();

  const totalReports = reports.length;
  const resolvedReports = reports.filter(
    (r) => r.status === 'Resolved' || r.status === 'Citizen-Confirmed' || r.status === 'Closed'
  ).length;
  const resolutionPercentage = totalReports > 0 ? Math.round((resolvedReports / totalReports) * 100) : 0;

  // Ward performance aggregation
  const wardMetrics = [
    { ward: 'Ward 14 (South Zone)', total: 18, resolved: 14, pending: 4, avgHours: '38.4 hrs', compliance: 92 },
    { ward: 'Ward 08 (Central Zone)', total: 15, resolved: 12, pending: 3, avgHours: '26.1 hrs', compliance: 95 },
    { ward: 'Ward 22 (North Zone)', total: 12, resolved: 8, pending: 4, avgHours: '52.0 hrs', compliance: 84 },
    { ward: 'Ward 11 (West Zone)', total: 9, resolved: 7, pending: 2, avgHours: '31.5 hrs', compliance: 88 },
    { ward: 'Ward 03 (Central Zone)', total: 8, resolved: 6, pending: 2, avgHours: '44.2 hrs', compliance: 86 }
  ];

  // Department-wise SLA compliance
  const departmentSla = [
    { dept: 'Health & Sanitation Directorate', received: 1890, resolved: 1780, rate: 94.2, slaHours: '24 Hours' },
    { dept: 'Public Works Department (PWD)', received: 1420, resolved: 1290, rate: 90.8, slaHours: '72 Hours' },
    { dept: 'Electrical Infrastructure Wing', received: 980, resolved: 890, rate: 90.8, slaHours: '48 Hours' },
    { dept: 'Storm Water Drainage Division', received: 740, resolved: 650, rate: 87.8, slaHours: '24 Hours' },
    { dept: 'Accessibility & Barrier-Free Cell', received: 524, resolved: 440, rate: 84.0, slaHours: '168 Hours' }
  ];

  // High-priority issue distribution
  const priorityDistribution = [
    { level: 'Critical Priority (Immediate Hazard)', count: reports.filter((r) => r.severity === 'Critical').length, color: 'var(--color-alert-red)', percentage: 22 },
    { level: 'High Priority (Major Obstruction)', count: reports.filter((r) => r.severity === 'High').length, color: '#D97706', percentage: 46 },
    { level: 'Medium Priority (Standard Repair)', count: reports.filter((r) => r.severity === 'Medium').length, color: 'var(--color-gov-blue)', percentage: 24 },
    { level: 'Low Priority (Routine Work)', count: reports.filter((r) => r.severity === 'Low').length, color: '#64748B', percentage: 8 }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
          Ward Performance & Municipal SLA Analytics
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
          Zonal performance indices, Citizen Charter SLA compliance rates, and turnaround analytics.
        </p>
      </div>

      {/* Top 4 Metric Summaries */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-primary-navy)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Grievances Audited</div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-primary-navy)', margin: '0.25rem 0' }}>{totalReports}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Across 5 pilot wards</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-success-green)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Zonal Resolution Rate</div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-success-green)', margin: '0.25rem 0' }}>{resolutionPercentage}%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-success-green)' }}>{resolvedReports} of {totalReports} resolved</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-gold)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>Average Turnaround Time</div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: '#B7791F', margin: '0.25rem 0' }}>38.4 Hours</div>
          <div style={{ fontSize: '0.75rem', color: '#B7791F' }}>Within 72h charter SLA</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-gov-blue)', padding: '1.25rem', borderRadius: '2px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>SLA Compliance Index</div>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-gov-blue)', margin: '0.25rem 0' }}>91.2%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-gov-blue)' }}>Statutory benchmark met</div>
        </div>
      </div>

      {/* Ward Comparison Table & Progress Meters */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-subtle)',
          marginBottom: '2rem'
        }}
      >
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
            Ward-Wise Redressal & Turnaround Breakdown
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Comparative audit of municipal performance across residential and commercial wards.
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Ward Jurisdiction</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Total Filed</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Resolved</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Active Pending</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Resolution Velocity</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Avg Time</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>SLA Compliance</th>
              </tr>
            </thead>
            <tbody>
              {wardMetrics.map((wm) => {
                const pct = Math.round((wm.resolved / wm.total) * 100);
                return (
                  <tr key={wm.ward} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
                      {wm.ward}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600 }}>{wm.total}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--color-success-green)', fontWeight: 700 }}>{wm.resolved}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', color: '#B7791F', fontWeight: 600 }}>{wm.pending}</td>
                    <td style={{ padding: '10px 12px', width: '220px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '8px', backgroundColor: '#EEF2F6', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', backgroundColor: 'var(--color-success-green)' }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, minWidth: '35px' }}>{pct}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', fontFamily: 'monospace', fontWeight: 600 }}>{wm.avgHours}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gov-blue)', backgroundColor: '#EEF3F8', padding: '2px 8px', borderRadius: '2px' }}>
                        {wm.compliance}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Department Performance & Priority Distribution */}
      <div className="grid-2" style={{ gap: '1.5rem' }}>
        {/* Department SLA Table */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
              Departmental Redressal Efficiency
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              Compliance against statutory Citizen Charter resolution deadlines
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {departmentSla.map((d) => (
              <div key={d.dept} style={{ borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.625rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary-navy)' }}>{d.dept}</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-success-green)' }}>{d.rate}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  <span>Target SLA: {d.slaHours}</span>
                  <span>{d.resolved} of {d.received} complaints</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Level Breakdown */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
              High-Priority Hazard Segmentation
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              Proportion of grievances categorized by public safety urgency
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {priorityDistribution.map((p) => (
              <div key={p.level}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary-navy)' }}>{p.level}</span>
                  <span style={{ fontWeight: 700 }}>{p.count} complaints ({p.percentage}%)</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#EEF2F6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${p.percentage}%`, height: '100%', backgroundColor: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityAnalyticsPage;
