import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../../components/common/Badge';
import {
  User,
  Building2,
  Shield,
  Phone,
  Mail,
  MapPin,
  Award
} from 'lucide-react';

export const AuthorityProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
          Official Municipal Profile & Jurisdictional Authority
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
          Statutory officer credentials, delegated municipal powers, and administrative jurisdiction under Corporation By-laws 2026.
        </p>
      </div>

      <div className="grid-2" style={{ gap: '2rem', alignItems: 'flex-start' }}>
        {/* Profile Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderTop: '4px solid var(--color-gov-blue)',
            borderRadius: '2px',
            padding: '2rem',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#EEF3F8',
                color: 'var(--color-gov-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <User size={34} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                  {user?.name || 'Er. Rameshwar Rao'}
                </h2>
                <Badge variant="navy">Zonal Nodal Authority</Badge>
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-gold)', fontWeight: 700, marginTop: '2px' }}>
                {user?.designation || 'Superintending Executive Engineer'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Official Service ID: <strong>{user?.badgeNumber || 'NIC-MC-EXEC-842'}</strong>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Building2 size={16} color="var(--color-gov-blue)" />
              <div>
                <strong>Department Division:</strong> {user?.department || 'Public Works & Municipal Infrastructure'}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <MapPin size={16} color="var(--color-gold)" />
              <div>
                <strong>Zonal Jurisdiction:</strong> {user?.ward || 'All Wards (South & Central Zone HQ, Wards 01-24)'}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Mail size={16} color="var(--color-gov-blue)" />
              <div>
                <strong>Official Email:</strong> {user?.email || 'authority@civicreflex.gov.in'}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Phone size={16} color="var(--color-gov-blue)" />
              <div>
                <strong>Corporation Exchange:</strong> {user?.phone || '+91 94220 11099'}
              </div>
            </div>
          </div>
        </div>

        {/* Delegated Powers & Statutory Responsibilities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Award size={18} color="var(--color-gold)" />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                Delegated Statutory Powers (Municipal Code)
              </h3>
            </div>

            <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              <li>Authority to sanction urgent field work orders up to ₹25,00,000 for emergency hazard mitigation.</li>
              <li>Supervisory jurisdiction to reassign stalled grievances across specialized departmental divisions.</li>
              <li>Executive sanction to convert high-density citizen Blind Spot clusters into formal civic work orders.</li>
              <li>Final administrative arbitrator on citizen dispute appeals and contractor penalty enforcement.</li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Shield size={18} color="var(--color-gov-blue)" />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                GIGW 2.0 Security & Audit Notice
              </h3>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              This session is bound by national public data protection standards. Status transitions, officer allocations, and algorithmic escalation sanctions are permanently immutably logged with timestamp and officer digital badge credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityProfilePage;
