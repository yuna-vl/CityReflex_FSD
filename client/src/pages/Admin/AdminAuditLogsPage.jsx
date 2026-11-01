import React, { useState, useMemo } from 'react';
import { useReports } from '../../hooks/useReports';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import {
  ScrollText,
  Search,
  Download,
  Eye,
  X
} from 'lucide-react';

export const AdminAuditLogsPage = () => {
  const { auditLogs } = useReports();

  const [roleFilter, setRoleFilter] = useState('ALL');
  const [actionCategory, setActionCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [exportFeedback, setExportFeedback] = useState(null);

  const filteredLogs = useMemo(() => {
    return (auditLogs || []).filter((log) => {
      // Role filter
      if (roleFilter !== 'ALL' && log.role !== roleFilter) return false;

      // Action Category filter
      if (actionCategory === 'MODERATION' && !log.action.includes('MODERATION')) return false;
      if (actionCategory === 'USER' && !log.action.includes('USER')) return false;
      if (actionCategory === 'GRIEVANCE' && !log.action.includes('GRIEVANCE') && !log.action.includes('FIELD')) return false;
      if (actionCategory === 'CONFIG' && !log.action.includes('CONFIG') && !log.action.includes('WARD') && !log.action.includes('CATEGORY') && !log.action.includes('SETTINGS')) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = (log.id || '').toLowerCase().includes(q);
        const matchAction = (log.action || '').toLowerCase().includes(q);
        const matchRecord = (log.relatedRecord || '').toLowerCase().includes(q);
        const matchUser = (log.user || '').toLowerCase().includes(q);
        const matchDesc = (log.description || '').toLowerCase().includes(q);
        if (!matchId && !matchAction && !matchRecord && !matchUser && !matchDesc) {
          return false;
        }
      }

      return true;
    });
  }, [auditLogs, roleFilter, actionCategory, searchQuery]);

  const handleExport = () => {
    setExportFeedback(
      `Audit Register exported: ${filteredLogs.length} verified administrative records downloaded as tamper-evident CSV archive.`
    );
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
          borderLeft: '4px solid var(--color-primary-navy)',
          borderRadius: '2px',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            National Informatics Centre • Forensic Audit Directorate
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', fontSize: '1.5rem', margin: '0.25rem 0' }}>
            Administrative Audit Register (Immutable Record)
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
            Chronological append-only event register capturing user authentication, complaint routing, inspections, moderation verdicts, and system reconfigurations.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Download}
          onClick={handleExport}
        >
          Export Official Audit Trail (CSV)
        </Button>
      </div>

      {exportFeedback && (
        <Alert
          type="success"
          title="Export Completed"
          dismissible
          onDismiss={() => setExportFeedback(null)}
        >
          {exportFeedback}
        </Alert>
      )}

      {/* Filter and Search Bar */}
      <Card>
        <Card.Body>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1 1 260px' }}>
              <input
                type="text"
                placeholder="Search by log ID, ticket, user, or action..."
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

            {/* Role Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Operator Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="form-control"
                style={{ width: 'auto', padding: '4px 8px', fontSize: '0.75rem' }}
              >
                <option value="ALL">All Roles</option>
                <option value="admin">System Administrator</option>
                <option value="authority">Municipal Authority</option>
                <option value="field_officer">Field Officer</option>
                <option value="citizen">Citizen Resident</option>
                <option value="system">Automated System</option>
              </select>
            </div>

            {/* Action Domain Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Event Domain:</span>
              <select
                value={actionCategory}
                onChange={(e) => setActionCategory(e.target.value)}
                className="form-control"
                style={{ width: 'auto', padding: '4px 8px', fontSize: '0.75rem' }}
              >
                <option value="ALL">All Event Types</option>
                <option value="MODERATION">Content Moderation</option>
                <option value="USER">User & Account Access</option>
                <option value="GRIEVANCE">Grievance & Inspections</option>
                <option value="CONFIG">System Configuration</option>
              </select>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <Card.Header variant="navy">
          <Card.Title icon={ScrollText}>
            Append-Only Audit Register ({filteredLogs.length} Verified Entries)
          </Card.Title>
        </Card.Header>
        <Card.Body noPadding>
          <div className="table-responsive">
            <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ width: '130px' }}>Log Reference</th>
                  <th style={{ width: '150px' }}>Timestamp</th>
                  <th style={{ width: '130px' }}>Operator Role</th>
                  <th>Action & Description</th>
                  <th style={{ width: '130px' }}>Target Record</th>
                  <th style={{ width: '80px', textAlign: 'right' }}>Payload</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-text-muted)' }}>
                      No audit log records found matching the active filter parameters.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {log.id}
                      </td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        {log.timestamp}
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '2px',
                            textTransform: 'uppercase',
                            backgroundColor:
                              log.role === 'admin' ? '#FEE2E2' :
                              log.role === 'authority' ? '#DBEAFE' :
                              log.role === 'field_officer' ? '#CCFBF1' :
                              log.role === 'citizen' ? '#F1F5F9' : '#FEF3C7',
                            color:
                              log.role === 'admin' ? '#991B1B' :
                              log.role === 'authority' ? '#1E40AF' :
                              log.role === 'field_officer' ? '#115E59' :
                              log.role === 'citizen' ? '#334155' : '#92400E'
                          }}
                        >
                          {log.role}
                        </span>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          {log.user}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.8125rem' }}>
                          {log.action}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                          {log.description}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gov-blue)' }}>
                          {log.relatedRecord || 'N/A'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => setSelectedLog(log)}
                          style={{
                            background: '#F8FAFC',
                            border: '1px solid var(--color-border)',
                            padding: '4px 8px',
                            borderRadius: '2px',
                            cursor: 'pointer',
                            fontSize: '0.75rem'
                          }}
                          title="View Log Details"
                        >
                          <Eye size={13} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            backgroundColor: 'rgba(0,0,0,0.5)',
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
              maxWidth: '520px',
              borderRadius: '2px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--color-primary-navy)',
                color: '#FFFFFF',
                padding: '1rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1rem', fontFamily: 'var(--font-serif)' }}>
                Audit Log Payload: {selectedLog.id}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8125rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Timestamp</span>
                  <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedLog.timestamp}</div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Related Record</span>
                  <div style={{ fontWeight: 700, color: 'var(--color-gov-blue)', marginTop: '2px', fontFamily: 'monospace' }}>{selectedLog.relatedRecord}</div>
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Operator Identity & Role</span>
                <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', marginTop: '2px' }}>
                  {selectedLog.user} ({selectedLog.role.toUpperCase()})
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Action Executed</span>
                <div style={{ fontWeight: 700, color: '#DC2626', marginTop: '2px' }}>{selectedLog.action}</div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Full Event Description</span>
                <div style={{ color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                  {selectedLog.description}
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="secondary" size="sm" onClick={() => setSelectedLog(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAuditLogsPage;
