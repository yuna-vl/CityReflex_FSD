import React, { useState } from 'react';
import { useReports } from '../../hooks/useReports';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import {
  Tag,
  Plus,
  Edit2,
  Search,
  X
} from 'lucide-react';

export const AdminCategoriesPage = () => {
  const { user: currentAdmin } = useAuth();
  const { categoriesList, departmentsList, saveCategory, toggleCategoryStatus } = useReports();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: 'Roads and Infrastructure',
    defaultPriority: 'High',
    defaultSlaHours: 48,
    status: 'Active',
    description: ''
  });

  const filteredCategories = (categoriesList || []).filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (c.name || '').toLowerCase().includes(q);
      const matchDept = (c.department || '').toLowerCase().includes(q);
      if (!matchName && !matchDept) return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      id: `cat-${Date.now()}`,
      name: '',
      department: departmentsList?.[0]?.name || 'Roads and Infrastructure',
      defaultPriority: 'Medium',
      defaultSlaHours: 48,
      status: 'Active',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      id: category.id,
      name: category.name,
      department: category.department,
      defaultPriority: category.defaultPriority,
      defaultSlaHours: category.defaultSlaHours,
      status: category.status,
      description: category.description
    });
    setIsModalOpen(true);
  };

  const handleToggle = (categoryId) => {
    const res = toggleCategoryStatus(categoryId, currentAdmin);
    if (res.success) {
      setFeedback({
        type: res.status === 'Active' ? 'success' : 'alert',
        message: `Category "${res.category.name}" is now ${res.status}. ${res.status === 'Deactivated' ? 'It is now hidden from new grievance submissions.' : 'It is now available for citizens to report.'}`
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Category Name is required.');
      return;
    }

    saveCategory(formData, currentAdmin);
    setFeedback({
      type: 'success',
      message: `Category "${formData.name}" parameters saved successfully.`
    });
    setIsModalOpen(false);
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
          borderLeft: '4px solid var(--color-gold)',
          borderRadius: '2px',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            Civic Taxonomy & SLA Governance
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', fontSize: '1.5rem', margin: '0.25rem 0' }}>
            Civic Service Categories & SLA Benchmarks
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
            Configure grievance categories, map responsible municipal departments, set statutory SLA resolution deadlines, and toggle live intake.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={handleOpenAdd}
        >
          Add Civic Category
        </Button>
      </div>

      <Alert type="info" title="Category Lifecycle Rule">
        Deactivating a category immediately hides it from the citizen grievance lodging form (<code>/report</code>), while strictly preserving all historical complaints and audit tracking records.
      </Alert>

      {feedback && (
        <Alert
          type={feedback.type}
          title="Taxonomy Update"
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
              placeholder="Search category name or mapped department..."
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

      {/* Categories Table */}
      <Card>
        <Card.Header variant="navy">
          <Card.Title icon={Tag}>
            Configured Civic Categories ({filteredCategories.length})
          </Card.Title>
        </Card.Header>
        <Card.Body noPadding>
          <div className="table-responsive">
            <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ width: '130px' }}>Category ID</th>
                  <th>Category Name & Description</th>
                  <th>Assigned Line Department</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Default Priority</th>
                  <th style={{ width: '110px', textAlign: 'center' }}>SLA Target</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Status</th>
                  <th style={{ width: '150px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((c) => {
                  const isActive = c.status === 'Active';

                  return (
                    <tr key={c.id} style={{ opacity: isActive ? 1 : 0.65, backgroundColor: !isActive ? '#F8FAFC' : undefined }}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                        {c.id}
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)' }}>{c.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                          {c.description}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{c.department}</div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '2px',
                            backgroundColor:
                              c.defaultPriority === 'Critical' ? '#FEE2E2' :
                              c.defaultPriority === 'High' ? '#FEF3C7' : '#EFF6FF',
                            color:
                              c.defaultPriority === 'Critical' ? '#991B1B' :
                              c.defaultPriority === 'High' ? '#92400E' : '#1E40AF'
                          }}
                        >
                          {c.defaultPriority}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
                        {c.defaultSlaHours} Hours
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '2px',
                            backgroundColor: isActive ? '#DCFCE7' : '#F1F5F9',
                            color: isActive ? '#166534' : '#64748B'
                          }}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(c)}
                            style={{
                              background: '#F8FAFC',
                              border: '1px solid var(--color-border)',
                              padding: '4px 6px',
                              borderRadius: '2px',
                              cursor: 'pointer'
                            }}
                            title="Edit Parameters"
                          >
                            <Edit2 size={13} color="var(--color-gov-blue)" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggle(c.id)}
                            style={{
                              backgroundColor: isActive ? '#FEF2F2' : '#DCFCE7',
                              border: `1px solid ${isActive ? '#FECACA' : '#86EFAC'}`,
                              color: isActive ? '#991B1B' : '#166534',
                              padding: '4px 8px',
                              borderRadius: '2px',
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                            title={isActive ? 'Deactivate from intake form' : 'Activate category'}
                          >
                            {isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* Add / Edit Modal */}
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
                {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Add Civic Category'}
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
                <div className="form-group">
                  <label className="form-label" htmlFor="cat-name">Category Title <span className="required">*</span></label>
                  <input
                    id="cat-name"
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Broken Traffic Signals"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cat-dept">Mapped Line Department <span className="required">*</span></label>
                  <select
                    id="cat-dept"
                    className="form-control"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    {(departmentsList || []).map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cat-prio">Default Urgency Level</label>
                    <select
                      id="cat-prio"
                      className="form-control"
                      value={formData.defaultPriority}
                      onChange={(e) => setFormData({ ...formData, defaultPriority: e.target.value })}
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="cat-sla">Statutory SLA (Hours)</label>
                    <input
                      id="cat-sla"
                      type="number"
                      className="form-control"
                      value={formData.defaultSlaHours}
                      onChange={(e) => setFormData({ ...formData, defaultSlaHours: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cat-desc">Category Scope / Instructions</label>
                  <textarea
                    id="cat-desc"
                    rows={2}
                    className="form-control"
                    placeholder="Brief description of defect types covered by this category..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Category Parameters
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;
