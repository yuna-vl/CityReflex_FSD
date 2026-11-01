import React, { useState } from 'react';
import { useReports } from '../../hooks/useReports';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Search,
  X
} from 'lucide-react';

export const AdminDepartmentsPage = () => {
  const { user: currentAdmin } = useAuth();
  const { departmentsList, saveDepartment, deleteDepartment } = useReports();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingDept, setEditingDept] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    code: '',
    nodalOfficer: '',
    officerCount: 5,
    budgetAllocated: '₹2.50 Cr',
    contactEmail: ''
  });

  const filteredDepts = (departmentsList || []).filter((d) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (d.name || '').toLowerCase().includes(q);
      const matchCode = (d.code || '').toLowerCase().includes(q);
      const matchOfficer = (d.nodalOfficer || '').toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchOfficer) return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingDept(null);
    setFormData({
      id: `dept-${Date.now()}`,
      name: '',
      code: '',
      nodalOfficer: '',
      officerCount: 6,
      budgetAllocated: '₹2.00 Cr',
      contactEmail: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dept) => {
    setEditingDept(dept);
    setFormData({
      id: dept.id,
      name: dept.name,
      code: dept.code,
      nodalOfficer: dept.nodalOfficer,
      officerCount: dept.officerCount,
      budgetAllocated: dept.budgetAllocated,
      contactEmail: dept.contactEmail
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      alert('Department Name and Code are required.');
      return;
    }

    saveDepartment(formData, currentAdmin);
    setFeedback({
      type: 'success',
      message: `Department "${formData.name}" details successfully recorded.`
    });
    setIsModalOpen(false);
  };

  const handleDelete = (deptId, deptName) => {
    if (window.confirm(`Are you sure you want to delete ${deptName}?`)) {
      deleteDepartment(deptId, currentAdmin);
      setFeedback({
        type: 'alert',
        message: `Department ${deptName} deleted from directory.`
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
          borderLeft: '4px solid #4F46E5',
          borderRadius: '2px',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            Municipal Administration Divisions
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', fontSize: '1.5rem', margin: '0.25rem 0' }}>
            Municipal Departments & Directorate Directory
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
            Supervise civic line departments, assigned nodal officers, engineering personnel headcount, and SLA compliance metrics.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={handleOpenAdd}
        >
          Add Municipal Department
        </Button>
      </div>

      {feedback && (
        <Alert
          type={feedback.type}
          title="Department Record"
          dismissible
          onDismiss={() => setFeedback(null)}
        >
          {feedback.message}
        </Alert>
      )}

      {/* Search Input */}
      <Card>
        <Card.Body>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search by department name, code, or nodal officer..."
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
        </Card.Body>
      </Card>

      {/* Departments Table */}
      <Card>
        <Card.Header variant="navy">
          <Card.Title icon={Building2}>
            Municipal Directorate Registry ({filteredDepts.length})
          </Card.Title>
        </Card.Header>
        <Card.Body noPadding>
          <div className="table-responsive">
            <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ width: '130px' }}>Dept. Code</th>
                  <th>Department Name</th>
                  <th>Nodal Executive Officer</th>
                  <th style={{ width: '100px', textAlign: 'center' }}>Engineers</th>
                  <th style={{ width: '100px', textAlign: 'center' }}>Active Cases</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>SLA Compliance</th>
                  <th style={{ width: '110px' }}>Budget Cap</th>
                  <th style={{ width: '100px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepts.map((d) => (
                  <tr key={d.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#4F46E5', fontSize: '0.8125rem' }}>
                      {d.code}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)' }}>{d.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{d.contactEmail}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{d.nodalOfficer}</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>Nodal Division Head</div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>
                      {d.officerCount}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
                      {d.activeComplaints || 0}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ fontWeight: 800, color: (d.slaComplianceRate || 90) >= 90 ? '#16A34A' : '#D97706' }}>
                        {d.slaComplianceRate || 90}%
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                      {d.budgetAllocated}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '4px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(d)}
                          style={{
                            background: '#F8FAFC',
                            border: '1px solid var(--color-border)',
                            padding: '4px 6px',
                            borderRadius: '2px',
                            cursor: 'pointer'
                          }}
                          title="Edit Department"
                        >
                          <Edit2 size={13} color="var(--color-gov-blue)" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(d.id, d.name)}
                          style={{
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            padding: '4px 6px',
                            borderRadius: '2px',
                            cursor: 'pointer'
                          }}
                          title="Delete Department"
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

      {/* Modal */}
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
              maxWidth: '540px',
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
                {editingDept ? `Edit ${editingDept.name}` : 'Add Municipal Department'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="dept-name">Department Name <span className="required">*</span></label>
                    <input
                      id="dept-name"
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. Urban Forestry & Greenery"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="dept-code">Dept Code <span className="required">*</span></label>
                    <input
                      id="dept-code"
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. UFG-CELL"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="dept-officer">Nodal Officer Name</label>
                    <input
                      id="dept-officer"
                      type="text"
                      className="form-control"
                      placeholder="e.g. Er. Rajeshwar Rao"
                      value={formData.nodalOfficer}
                      onChange={(e) => setFormData({ ...formData, nodalOfficer: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="dept-count">Field Officers Headcount</label>
                    <input
                      id="dept-count"
                      type="number"
                      className="form-control"
                      value={formData.officerCount}
                      onChange={(e) => setFormData({ ...formData, officerCount: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="dept-email">Contact Email</label>
                    <input
                      id="dept-email"
                      type="email"
                      className="form-control"
                      placeholder="dept@civicreflex.gov.in"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="dept-budget">Allocated Budget</label>
                    <input
                      id="dept-budget"
                      type="text"
                      className="form-control"
                      placeholder="₹2.50 Cr"
                      value={formData.budgetAllocated}
                      onChange={(e) => setFormData({ ...formData, budgetAllocated: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Department
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDepartmentsPage;
