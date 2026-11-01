import React, { useState, useMemo } from 'react';
import { useReports } from '../../hooks/useReports';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Alert from '../../components/common/Alert';
import {
  Users,
  Search,
  UserCheck,
  UserX,
  Eye,
  Plus,
  Shield,
  X,
  AlertTriangle
} from 'lucide-react';

export const AdminUsersPage = () => {
  const { user: currentAdmin } = useAuth();
  const {
    usersList,
    toggleUserSuspension,
    createUser,
    reports
  } = useReports();

  // Filters and search
  const [roleFilter, setRoleFilter] = useState('ALL'); // 'ALL' | 'citizen' | 'authority' | 'field_officer' | 'admin'
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'Active' | 'Suspended'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date_desc'); // 'date_desc' | 'date_asc' | 'name_asc' | 'complaints_desc'

  // Modal states
  const [selectedUser, setSelectedUser] = useState(null); // User detail modal
  const [suspensionModalUser, setSuspensionModalUser] = useState(null); // User to suspend/reinstate
  const [suspensionReason, setSuspensionReason] = useState('');
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [actionFeedback, setActionFeedback] = useState(null);

  // New user form state
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'citizen',
    phone: '',
    ward: 'Ward 14 (South Zone)',
    department: 'General Administration',
    designation: ''
  });

  // Filtered and sorted users
  const filteredUsers = useMemo(() => {
    return (usersList || []).filter((u) => {
      // Role filter
      if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;

      // Status filter
      if (statusFilter !== 'ALL' && u.accountStatus !== statusFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (u.name || '').toLowerCase().includes(q);
        const matchEmail = (u.email || '').toLowerCase().includes(q);
        const matchPhone = (u.phone || '').toLowerCase().includes(q);
        const matchWard = (u.ward || '').toLowerCase().includes(q);
        const matchId = (u.id || '').toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone && !matchWard && !matchId) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name_asc') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'complaints_desc') {
        return (b.submittedComplaintsCount || 0) - (a.submittedComplaintsCount || 0);
      }
      return 0; // Default order
    });
  }, [usersList, roleFilter, statusFilter, searchQuery, sortBy]);

  // Handle Suspension / Reinstatement Submission
  const handleConfirmSuspension = (e) => {
    e.preventDefault();
    if (!suspensionModalUser) return;

    const isSuspending = suspensionModalUser.accountStatus !== 'Suspended';
    if (isSuspending && !suspensionReason.trim()) {
      alert('Please specify an official reason for suspending this user account.');
      return;
    }

    const res = toggleUserSuspension(suspensionModalUser.id, suspensionReason, currentAdmin);
    if (res.success) {
      setActionFeedback({
        type: 'success',
        message: `User ${suspensionModalUser.name} (${suspensionModalUser.id}) has been successfully ${res.status === 'Suspended' ? 'suspended' : 'reinstated'}.`
      });
      setSuspensionModalUser(null);
      setSuspensionReason('');
      if (selectedUser && selectedUser.id === suspensionModalUser.id) {
        setSelectedUser(res.user);
      }
    } else {
      alert(res.error);
    }
  };

  // Handle New User Creation
  const handleCreateUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email) {
      alert('Name and Email are mandatory.');
      return;
    }

    const res = createUser(newUserData, currentAdmin);
    if (res.success) {
      setActionFeedback({
        type: 'success',
        message: `New demonstration account created for ${newUserData.name} (${newUserData.email}).`
      });
      setAddUserModalOpen(false);
      setNewUserData({
        name: '',
        email: '',
        role: 'citizen',
        phone: '',
        ward: 'Ward 14 (South Zone)',
        department: 'General Administration',
        designation: ''
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Header */}
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
          borderLeft: '4px solid var(--color-gov-blue)',
          borderRadius: '2px',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            System Directory & Authentication Administration
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-navy)', fontSize: '1.5rem', margin: '0.25rem 0' }}>
            User Management & Access Control
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
            Supervise registered citizen accounts, authority personnel, junior engineers, and administrative credentials.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setAddUserModalOpen(true)}
        >
          Add New User Account
        </Button>
      </div>

      {actionFeedback && (
        <Alert
          type={actionFeedback.type}
          title="Administrative Action Recorded"
          dismissible
          onDismiss={() => setActionFeedback(null)}
        >
          {actionFeedback.message}
        </Alert>
      )}

      {/* Filter and Search Bar */}
      <Card>
        <Card.Body>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1 1 280px', minWidth: '240px' }}>
              <input
                type="text"
                placeholder="Search by name, email, phone, ward, or user ID..."
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

            {/* Role Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {['ALL', 'citizen', 'authority', 'field_officer', 'admin'].map((roleKey) => (
                <button
                  key={roleKey}
                  type="button"
                  onClick={() => setRoleFilter(roleKey)}
                  style={{
                    backgroundColor: roleFilter === roleKey ? 'var(--color-primary-navy)' : '#F1F5F9',
                    color: roleFilter === roleKey ? '#FFFFFF' : 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {roleKey === 'ALL' ? 'All Roles' : roleKey.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-control"
                style={{ width: 'auto', padding: '4px 8px', fontSize: '0.75rem' }}
              >
                <option value="ALL">All Statuses</option>
                <option value="Active">Active Only</option>
                <option value="Suspended">Suspended Only</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-control"
                style={{ width: 'auto', padding: '4px 8px', fontSize: '0.75rem' }}
              >
                <option value="date_desc">Registration Date</option>
                <option value="name_asc">Name (A to Z)</option>
                <option value="complaints_desc">Complaints Count</option>
              </select>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Users Directory Table */}
      <Card>
        <Card.Header variant="navy">
          <Card.Title icon={Users}>
            Official User Accounts Directory ({filteredUsers.length} Users Found)
          </Card.Title>
        </Card.Header>
        <Card.Body noPadding>
          <div className="table-responsive">
            <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ width: '120px' }}>User ID</th>
                  <th>Name & Contact</th>
                  <th style={{ width: '130px' }}>Assigned Role</th>
                  <th>Jurisdiction / Ward</th>
                  <th style={{ width: '100px', textAlign: 'center' }}>Account Status</th>
                  <th style={{ width: '150px', textAlign: 'right' }}>Administrative Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-text-muted)' }}>
                      No user records found matching the active search query or status criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const isCurrentAdmin = currentAdmin?.id === u.id;
                    const isSuspended = u.accountStatus === 'Suspended';

                    return (
                      <tr key={u.id} style={{ backgroundColor: isSuspended ? '#FFF5F5' : undefined }}>
                        {/* User ID */}
                        <td style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.8125rem' }}>
                          {u.id}
                        </td>

                        {/* Name & Contact */}
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', fontSize: '0.875rem' }}>
                            {u.name}
                            {isCurrentAdmin && (
                              <span style={{ marginLeft: '6px', fontSize: '0.6875rem', backgroundColor: '#DBEAFE', color: '#1E40AF', padding: '1px 5px', borderRadius: '2px' }}>
                                (You)
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'flex', gap: '0.75rem', marginTop: '2px' }}>
                            <span>{u.email}</span>
                            <span>•</span>
                            <span>{u.phone}</span>
                          </div>
                        </td>

                        {/* Role Badge */}
                        <td>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '2px',
                              textTransform: 'uppercase',
                              backgroundColor:
                                u.role === 'admin' ? '#FEE2E2' :
                                u.role === 'authority' ? '#DBEAFE' :
                                u.role === 'field_officer' ? '#CCFBF1' : '#F1F5F9',
                              color:
                                u.role === 'admin' ? '#991B1B' :
                                u.role === 'authority' ? '#1E40AF' :
                                u.role === 'field_officer' ? '#115E59' : '#334155'
                            }}
                          >
                            {u.role.replace('_', ' ')}
                          </span>
                          <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                            {u.designation || 'Registered Member'}
                          </div>
                        </td>

                        {/* Ward / Jurisdiction */}
                        <td>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-primary)' }}>
                            {u.ward || 'Central Municipal HQ'}
                          </div>
                          {u.department && u.department !== 'N/A' && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                              {u.department}
                            </div>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td style={{ textAlign: 'center' }}>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '2px',
                              backgroundColor: isSuspended ? '#FEE2E2' : '#DCFCE7',
                              color: isSuspended ? '#991B1B' : '#166534',
                              display: 'inline-block'
                            }}
                          >
                            {u.accountStatus}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                            {/* Inspect Detail Button */}
                            <button
                              type="button"
                              onClick={() => setSelectedUser(u)}
                              style={{
                                backgroundColor: '#F8FAFC',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-primary-navy)',
                                padding: '4px 8px',
                                borderRadius: '2px',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}
                              title="Inspect full user dossier"
                            >
                              <Eye size={13} /> View
                            </button>

                            {/* Suspend / Reinstate Button */}
                            <button
                              type="button"
                              disabled={isCurrentAdmin}
                              onClick={() => {
                                setSuspensionModalUser(u);
                                setSuspensionReason(u.suspensionReason || '');
                              }}
                              style={{
                                backgroundColor: isSuspended ? '#DCFCE7' : '#FEE2E2',
                                border: `1px solid ${isSuspended ? '#86EFAC' : '#FCA5A5'}`,
                                color: isSuspended ? '#166534' : '#991B1B',
                                padding: '4px 8px',
                                borderRadius: '2px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: isCurrentAdmin ? 'not-allowed' : 'pointer',
                                opacity: isCurrentAdmin ? 0.4 : 1,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}
                              title={isCurrentAdmin ? 'Administrators cannot suspend their own active account' : (isSuspended ? 'Reinstate user' : 'Suspend account access')}
                            >
                              {isSuspended ? (
                                <>
                                  <UserCheck size={13} /> Restore
                                </>
                              ) : (
                                <>
                                  <UserX size={13} /> Suspend
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* MODAL 1: User Detail Dossier Modal */}
      {selectedUser && (
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
              maxWidth: '680px',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={18} color="var(--color-gold)" />
                <h3 style={{ margin: 0, fontSize: '1rem', fontFamily: 'var(--font-serif)' }}>
                  User Account Dossier: {selectedUser.name} ({selectedUser.id})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '1.25rem', maxHeight: '75vh', overflowY: 'auto' }}>
              {selectedUser.accountStatus === 'Suspended' && (
                <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '0.75rem 1rem', borderRadius: '2px', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991B1B', fontWeight: 700, fontSize: '0.8125rem' }}>
                    <AlertTriangle size={16} />
                    <span>ACCOUNT CURRENTLY SUSPENDED</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#B91C1C', marginTop: '0.25rem' }}>
                    <strong>Reason:</strong> {selectedUser.suspensionReason || 'Violation of portal conduct guidelines.'}
                  </div>
                  {selectedUser.suspendedAt && (
                    <div style={{ fontSize: '0.6875rem', color: '#7F1D1D', marginTop: '2px' }}>
                      Enforced: {selectedUser.suspendedAt} by {selectedUser.suspendedBy || 'Administrator'}
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Full Legal Name</span>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary-navy)', marginTop: '2px' }}>{selectedUser.name}</div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Account Role</span>
                  <div style={{ fontWeight: 700, color: 'var(--color-gov-blue)', marginTop: '2px', textTransform: 'uppercase' }}>{selectedUser.role}</div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Official Email</span>
                  <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedUser.email}</div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Contact Phone</span>
                  <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedUser.phone}</div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Assigned Ward / Jurisdiction</span>
                  <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedUser.ward || 'Central Zone'}</div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Registration Date</span>
                  <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedUser.registrationDate || selectedUser.memberSince || 'March 2026'}</div>
                </div>
              </div>

              {/* Related Grievances Filed by this user */}
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ fontSize: '0.875rem', color: 'var(--color-primary-navy)', margin: '0 0 0.5rem 0' }}>
                  Associated Complaints in Registry
                </h4>
                <div style={{ border: '1px solid var(--color-border)', borderRadius: '2px', overflow: 'hidden' }}>
                  {(reports || []).filter((r) => (r.reporterName || '').includes(selectedUser.id) || (r.reporterName || '').includes(selectedUser.name)).length === 0 ? (
                    <div style={{ padding: '1rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                      No direct complaints logged under this user ID.
                    </div>
                  ) : (
                    (reports || []).filter((r) => (r.reporterName || '').includes(selectedUser.id) || (r.reporterName || '').includes(selectedUser.name)).map((r) => (
                      <div key={r.id} style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--color-border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                        <div>
                          <strong style={{ color: 'var(--color-gov-blue)' }}>{r.ticketNumber}</strong> - {r.title}
                        </div>
                        <Badge variant={r.status === 'Resolved' ? 'success' : 'neutral'}>{r.status}</Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                disabled={currentAdmin?.id === selectedUser.id}
                onClick={() => {
                  setSuspensionModalUser(selectedUser);
                  setSuspensionReason(selectedUser.suspensionReason || '');
                }}
                style={{
                  backgroundColor: selectedUser.accountStatus === 'Suspended' ? '#DCFCE7' : '#FEE2E2',
                  border: '1px solid var(--color-border)',
                  color: selectedUser.accountStatus === 'Suspended' ? '#166534' : '#991B1B',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: currentAdmin?.id === selectedUser.id ? 'not-allowed' : 'pointer'
                }}
              >
                {selectedUser.accountStatus === 'Suspended' ? 'Reinstate This Account' : 'Suspend Account Privileges'}
              </button>

              <Button variant="secondary" size="sm" onClick={() => setSelectedUser(null)}>
                Close Dossier
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Account Suspension Confirmation Modal */}
      {suspensionModalUser && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 70,
            backgroundColor: 'rgba(0,0,0,0.6)',
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
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                backgroundColor: suspensionModalUser.accountStatus === 'Suspended' ? '#15803D' : '#DC2626',
                color: '#FFFFFF',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <AlertTriangle size={20} />
              <h3 style={{ margin: 0, fontSize: '1rem', fontFamily: 'var(--font-serif)' }}>
                {suspensionModalUser.accountStatus === 'Suspended' ? 'Reinstate Account Access' : 'Confirm Administrative Account Suspension'}
              </h3>
            </div>

            <form onSubmit={handleConfirmSuspension}>
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  You are changing the account access status for <strong>{suspensionModalUser.name}</strong> ({suspensionModalUser.email}).
                  {suspensionModalUser.accountStatus !== 'Suspended'
                    ? ' Once suspended, this user will be blocked from logging into CivicReflex and cannot submit grievances or comments.'
                    : ' Reinstating will immediately restore this user’s login privileges and reporting capabilities.'}
                </p>

                {suspensionModalUser.accountStatus !== 'Suspended' && (
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="susp-reason">
                      Mandatory Reason for Account Suspension <span className="required">*</span>
                    </label>
                    <textarea
                      id="susp-reason"
                      rows={3}
                      className="form-control"
                      placeholder="e.g. Commercial advertising spam, repeated false reports, abusive language..."
                      value={suspensionReason}
                      onChange={(e) => setSuspensionReason(e.target.value)}
                      required
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                      This reason will be recorded in the append-only Administrative Audit Log and displayed upon attempted login.
                    </div>
                  </div>
                )}
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => setSuspensionModalUser(null)}
                >
                  Cancel
                </Button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: suspensionModalUser.accountStatus === 'Suspended' ? '#15803D' : '#DC2626',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '2px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {suspensionModalUser.accountStatus === 'Suspended' ? 'Confirm Reinstatement' : 'Confirm Suspension'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Create New User Account Modal */}
      {addUserModalOpen && (
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
              maxWidth: '560px',
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
                Add New Demonstration User Account
              </h3>
              <button
                type="button"
                onClick={() => setAddUserModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit}>
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="new-name">Full Name <span className="required">*</span></label>
                  <input
                    id="new-name"
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Smt. Radhika Sen"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="new-email">Email Address <span className="required">*</span></label>
                    <input
                      id="new-email"
                      type="email"
                      required
                      className="form-control"
                      placeholder="e.g. radhika@example.com"
                      value={newUserData.email}
                      onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="new-phone">Phone Number</label>
                    <input
                      id="new-phone"
                      type="text"
                      className="form-control"
                      placeholder="+91 98000 00000"
                      value={newUserData.phone}
                      onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="new-role">Role <span className="required">*</span></label>
                    <select
                      id="new-role"
                      className="form-control"
                      value={newUserData.role}
                      onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                    >
                      <option value="citizen">Citizen</option>
                      <option value="authority">Municipal Authority</option>
                      <option value="field_officer">Field Officer</option>
                      <option value="admin">System Administrator</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="new-ward">Ward</label>
                    <input
                      id="new-ward"
                      type="text"
                      className="form-control"
                      placeholder="e.g. Ward 14 (South Zone)"
                      value={newUserData.ward}
                      onChange={(e) => setNewUserData({ ...newUserData, ward: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="new-dept">Department / Division</label>
                  <input
                    id="new-dept"
                    type="text"
                    className="form-control"
                    placeholder="e.g. Roads and Infrastructure"
                    value={newUserData.department}
                    onChange={(e) => setNewUserData({ ...newUserData, department: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <Button variant="secondary" size="sm" type="button" onClick={() => setAddUserModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Create User
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
