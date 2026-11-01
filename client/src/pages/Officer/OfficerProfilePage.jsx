import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../../components/common/Badge';
import {
  HardHat,
  Building2,
  Shield,
  Phone,
  Mail,
  MapPin,
  Wrench
} from 'lucide-react';

export const OfficerProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary-navy)', margin: '0 0 0.25rem 0' }}>
          Field Engineering Squad Profile & Ward Jurisdiction
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
          Assigned quick response engineering unit, field tool equipment checklist, and municipal ward boundaries.
        </p>
      </div>

      <div className="grid-2" style={{ gap: '2rem', alignItems: 'flex-start' }}>
        {/* Officer Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderTop: '4px solid var(--color-gold)',
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
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <HardHat size={34} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                  {user?.name || 'Mr. V. Nair'}
                </h2>
                <Badge variant="gold">Field Junior Engineer</Badge>
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-gov-blue)', fontWeight: 700, marginTop: '2px' }}>
                {user?.designation || 'Junior Engineer (Roads)'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Field Service Badge: <strong>{user?.badgeNumber || 'NIC-MC-ENG-014'}</strong>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Building2 size={16} color="var(--color-gov-blue)" />
              <div>
                <strong>Department Division:</strong> {user?.department || 'Roads and Infrastructure'}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <MapPin size={16} color="var(--color-gold)" />
              <div>
                <strong>Assigned Ward Boundary:</strong> {user?.ward || 'Ward 14 (South Zone)'}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <HardHat size={16} color="var(--color-gov-blue)" />
              <div>
                <strong>Engineering Unit:</strong> {user?.engineeringSquad || 'PWD Squad #4 (Ward 14 Quick Response)'}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Mail size={16} color="var(--color-gov-blue)" />
              <div>
                <strong>Official Email:</strong> {user?.email || 'officer.pwd@civicreflex.gov.in'}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Phone size={16} color="var(--color-gov-blue)" />
              <div>
                <strong>Field Emergency Dispatch:</strong> {user?.phone || '+91 98231 77412'}
              </div>
            </div>
          </div>
        </div>

        {/* Operational Checklist & Role Boundaries */}
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
              <Wrench size={18} color="var(--color-gov-blue)" />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                Squad Equipment & Material Authorization
              </h3>
            </div>

            <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              <li>Direct allocation of cold-mix bituminous asphalt and emulsion primer.</li>
              <li>Handheld calibrated laser depth measurement and geotagged photographic recorder.</li>
              <li>Mobilization authorization for 1-ton vibrating road roller and safety barricade unit.</li>
              <li>Rapid response target: On-ground physical inspection within 24 hours of assignment.</li>
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
              <Shield size={18} color="var(--color-gold)" />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', color: 'var(--color-primary-navy)', margin: 0 }}>
                Integrity & Sign-Off Demarcation
              </h3>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Under CivicReflex dual-key verification rules, completing a work order transitions it to <strong>Resolved</strong>. A field officer cannot self-certify citizen satisfaction; final <strong>Citizen-Confirmed</strong> closure requires independent verification voting by affected ward residents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerProfilePage;
