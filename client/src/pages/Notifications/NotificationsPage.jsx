import React, { useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Alert from '../../components/common/Alert';
import Button from '../../components/common/Button';
import { MOCK_NOTICES } from '../../data/mockNotifications';
import { Bell, Megaphone, FileText, Calendar, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export const NotificationsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState('NOT-2026-089');

  const categories = ['All', 'Sanitation & Drainage', 'Public Safety', 'Policy & Citizen Charter', 'Citizen Services'];

  const filteredNotices = selectedCategory === 'All'
    ? MOCK_NOTICES
    : MOCK_NOTICES.filter((n) => n.category === selectedCategory);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Citizen Services', to: '/services' }, { label: 'Notifications & Gazette' }]} />

      <div className="portal-container" style={{ paddingTop: '2rem' }}>
        <div className="section-heading">
          <span>Official Public Notices & Municipal Gazette</span>
          <Badge variant="navy">Public Bulletins</Badge>
        </div>

        <Alert type="info" title="Official Gazette & Public Notices Feed (Demonstration Content)">
          All circulars and advisories displayed on this portal represent realistic administrative civic workflows and are marked as demonstration items.
        </Alert>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                backgroundColor: selectedCategory === cat ? 'var(--color-gov-blue)' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--color-dark-slate)',
                border: '1px solid var(--color-border)',
                padding: '6px 14px',
                borderRadius: '2px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notice List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          {filteredNotices.map((notice) => {
            const isExpanded = expandedId === notice.id;

            return (
              <div
                key={notice.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderLeft: notice.urgency === 'High' ? '4px solid var(--color-alert-red)' : '4px solid var(--color-gov-blue)',
                  borderRadius: '2px',
                  boxShadow: 'var(--shadow-subtle)',
                  overflow: 'hidden'
                }}
              >
                {/* Header Strip */}
                <div
                  onClick={() => toggleExpand(notice.id)}
                  style={{
                    padding: '1rem 1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gov-blue)', fontFamily: 'monospace' }}>
                        {notice.id}
                      </span>
                      <Badge variant={notice.urgency === 'High' ? 'escalated' : 'pending'}>
                        {notice.urgency} Priority
                      </Badge>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {notice.department}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        • {notice.date}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--color-primary-navy)', margin: 0, lineHeight: 1.3 }}>
                      {notice.title}
                    </h3>

                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: '0.35rem 0 0 0' }}>
                      {notice.summary}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-gov-blue)' }}>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* Expanded Full Notice Text */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '1rem 1.25rem',
                      backgroundColor: '#F8FAFC',
                      borderTop: '1px solid var(--color-border-light)',
                      fontSize: '0.8125rem',
                      lineHeight: 1.7,
                      color: 'var(--color-dark-slate)'
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-primary-navy)' }}>
                      Complete Circular Body:
                    </div>
                    <p style={{ marginBottom: '1rem' }}>{notice.fullText}</p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Issuing Authority: Office of the Municipal Commissioner / Public Health & Engineering Wing
                      </span>
                      <Button variant="secondary" size="sm" icon={FileText}>
                        Download Gazette Notification (PDF Demo)
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;

