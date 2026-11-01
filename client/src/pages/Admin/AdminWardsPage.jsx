import React, { useState } from 'react';
import { useReports } from '../../hooks/useReports';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Search,
  X
} from 'lucide-react';

export const AdminWardsPage = () => {
  const { user: currentAdmin } = useAuth();
  const { wardsList, saveWard, deleteWard, usersList } = useReports();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('ALL');
  const [editingWard, setEditingWard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    wardNumber: '',
    wardName: '',
    zone: 'South Zone',
    assignedAuthority: 'Er. Rameshwar Rao',
    fieldOfficersText: 'Mr. V. Nair',
    status: 'Active'
  });

  // Extract authorities and officers for dropdowns
  const authorities = (usersList || []).filter((u) => u.role === 'authority');

  // Filtered wards
  const filteredWards = (wardsList || []).filter((w) => {
    if (selectedZone !== 'ALL' && w.zone !== selectedZone) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNum = (w.wardNumber || '').toLowerCase().includes(q);
      const matchName = (w.wardName || '').toLowerCase().includes(q);
      const matchAuth = (w.assignedAuthority || '').toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchAuth) return false;
    }
    return true;
  });

  const handleOpenAddModal = () => {
    setEditingWard(null);
    setFormData({
      wardNumber: `Ward ${Math.floor(10 + Math.random() * 80)}`,
      wardName: '',
      zone: 'South Zone',
      assignedAuthority: authorities[0]?.name || 'Er. Rameshwar Rao',
      fieldOfficersText: 'Mr. V. Nair',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (ward) => {
    setEditingWard(ward);
    setFormData({
      wardNumber: ward.wardNumber,
      wardName: ward.wardName,
      zone: ward.zone,
      assignedAuthority: ward.assignedAuthority,
      fieldOfficersText: (ward.fieldOfficers || []).join(', '),
      status: ward.status || 'Active'
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.wardNumber || !formData.wardName) {
      alert('Ward Number and Name are required.');
      return;
    }

    const wardPayload = {
      wardNumber: formData.wardNumber,
      wardName: formData.wardName,
      zone: formData.zone,
      assignedAuthority: formData.assignedAuthority,
      fieldOfficers: formData.fieldOfficersText.split(',').map((s) => s.trim()).filter(Boolean),
      status: formData.status
    };

    saveWard(wardPayload, currentAdmin);
    setFeedback({
      type: 'success',
      message: `Ward ${formData.wardNumber} (${formData.wardName}) configuration saved successfully.`
    });
    setIsModalOpen(false);
  };

  const handleDelete = (wardNumber) => {
    if (window.confirm(`Are you sure you want to decommission ${wardNumber}?`)) {
      deleteWard(wardNumber, currentAdmin);
      setFeedback({
        type: 'alert',
        message: `${wardNumber} has been removed from active municipal directory.`
      });
    }
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
          borderLeft: '4px solid #D97706',
          borderRadius: '2px',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            Geographic Municipal Boundaries Directorate
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', fontSize: '1.5rem', margin: '0.25rem 0' }}>
            Municipal Ward Directory & Zonal Jurisdiction
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
            Configure ward numbers, administrative zones, assign nodal engineers, and supervise zonal grievance resolution rates.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={handleOpenAddModal}
        >
          Add Municipal Ward
        </Button>
      </div>

      {feedback && (
        <Alert
          type={feedback.type}
          title="Directory Operation"
          dismissible
          onDismiss={() => setFeedback(null)}
        >
          {feedback.message}
        </Alert>
      )}

      {/* Filter Bar */}
      <Card>
        <Card.Body>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', flex: '1 1 260px' }}>
              <input
                type="text"
                placeholder="Search ward number, landmark, authority..."
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Municipal Zone:</span>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="form-control"
                style={{ width: 'auto', padding: '4px 8px', fontSize: '0.75rem' }}
              >
                <option value="ALL">All Zones</option>
                <option value="South Zone">South Zone</option>
                <option value="Central Zone">Central Zone</option>
                <option value="North Zone">North Zone</option>
                <option value="West Zone">West Zone</option>
                <option value="East Zone">East Zone</option>
              </select>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Ward Directory Table */}
      <Card>
        <Card.Header variant="navy">
          <Card.Title icon={MapPin}>
            Active Municipal Wards ({filteredWards.length})
          </Card.Title>
        </Card.Header>
        <Card.Body noPadding>
          <div className="table-responsive">
            <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ width: '110px' }}>Ward No.</th>
                  <th>Ward Name & Zone</th>
                  <th>Assigned Authority</th>
                  <th>Mapped Field Officers</th>
                  <th style={{ width: '110px', textAlign: 'center' }}>Grievances</th>
                  <th style={{ width: '110px', textAlign: 'center' }}>Resolution %</th>
                  <th style={{ width: '90px', textAlign: 'center' }}>Status</th>
                  <th style={{ width: '110px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWards.map((w) => (
                  <tr key={w.wardNumber}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
                      {w.wardNumber}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)' }}>{w.wardName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{w.zone}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{w.assignedAuthority}</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>Zonal Lead</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        {(w.fieldOfficers || []).join(', ') || 'Unassigned'}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>
                      {w.totalGrievances || 0}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ fontWeight: 700, color: (w.resolutionRate || 0) >= 75 ? '#16A34A' : '#D97706' }}>
                        {w.resolutionRate || 0}%
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '2px',
                          backgroundColor: w.status === 'Active' ? '#DCFCE7' : '#F1F5F9',
                          color: w.status === 'Active' ? '#166534' : '#64748B'
                        }}
                      >
                        {w.status || 'Active'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '4px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(w)}
                          style={{
                            background: '#F8FAFC',
                            border: '1px solid var(--color-border)',
                            padding: '4px 6px',
                            borderRadius: '2px',
                            cursor: 'pointer'
                          }}
                          title="Edit Ward Configuration"
                        >
                          <Edit2 size={13} color="var(--color-gov-blue)" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(w.wardNumber)}
                          style={{
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            padding: '4px 6px',
                            borderRadius: '2px',
                            cursor: 'pointer'
                          }}
                          title="Decommission Ward"
                        >
                          <Trash2 size={13} color="#DC2626" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* Add / Edit Ward Modal */}
      {isModalOpen && (
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
                {editingWard ? `Configure ${editingWard.wardNumber}` : 'Add New Municipal Ward'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="ward-num">Ward Number <span className="required">*</span></label>
                    <input
                      id="ward-num"
                      type="text"
                      required
                      className="form-control"
                      value={formData.wardNumber}
                      onChange={(e) => setFormData({ ...formData, wardNumber: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="ward-name">Ward Name & Landmarks <span className="required">*</span></label>
                    <input
                      id="ward-name"
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. M.G. Road & Shanthi Nagar"
                      value={formData.wardName}
                      onChange={(e) => setFormData({ ...formData, wardName: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="ward-zone">Municipal Zone <span className="required">*</span></label>
                    <select
                      id="ward-zone"
                      className="form-control"
                      value={formData.zone}
                      onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                    >
                      <option value="South Zone">South Zone</option>
                      <option value="Central Zone">Central Zone</option>
                      <option value="North Zone">North Zone</option>
                      <option value="West Zone">West Zone</option>
                      <option value="East Zone">East Zone</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="ward-status">Status</label>
                    <select
                      id="ward-status"
                      className="form-control"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Under Revision">Under Revision</option>
                      <option value="Decommissioned">Decommissioned</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="ward-auth">Assigned Municipal Authority</label>
                  <select
                    id="ward-auth"
                    className="form-control"
                    value={formData.assignedAuthority}
                    onChange={(e) => setFormData({ ...formData, assignedAuthority: e.target.value })}
                  >
                    {authorities.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name} ({a.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="ward-officers">Mapped Field Officers (comma separated)</label>
                  <input
                    id="ward-officers"
                    type="text"
                    className="form-control"
                    placeholder="e.g. Mr. V. Nair, Dr. S. K. Mukherjee"
                    value={formData.fieldOfficersText}
                    onChange={(e) => setFormData({ ...formData, fieldOfficersText: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Ward Configuration
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWardsPage;
