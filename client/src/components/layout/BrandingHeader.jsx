import React from 'react';
import { Link } from 'react-router-dom';
import Emblem from '../common/Emblem';
import { PhoneCall, ShieldCheck } from 'lucide-react';

export const BrandingHeader = () => {
  return (
    <div
      className="branding-header"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.875rem 0'
      }}
    >
      <div
        className="portal-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        {/* Left: Original CivicReflex Emblem & Institutional Titles */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          {/* Custom CivicReflex Emblem */}
          <Emblem size={56} />

          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--color-primary-navy)',
                  letterSpacing: '-0.01em',
                  margin: 0,
                  lineHeight: 1.15
                }}
              >
                CivicReflex
              </h1>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-gov-blue)',
                  backgroundColor: '#EDF2F7',
                  padding: '2px 8px',
                  borderRadius: '2px',
                  border: '1px solid var(--color-border)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                Civic Portal
              </span>
            </div>

            <div
              style={{
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--color-gov-blue)',
                lineHeight: 1.25,
                marginTop: '2px'
              }}
            >
              Citizen Civic Services & Accountability Portal
            </div>

            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-secondary)',
                marginTop: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span style={{ fontWeight: 600, color: '#855800' }}>
                Your City. Your Voice. Accountable Action.
              </span>
              <span>•</span>
              <span>An open civic infrastructure and pedestrian safety reporting platform</span>
            </div>
          </div>
        </Link>

        {/* Right: Institutional Support & Academic Identifier */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem'
          }}
          className="header-meta-group"
        >
          {/* 24x7 Citizen Helpline Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 0.875rem',
              backgroundColor: '#F8FAFC',
              border: '1px solid var(--color-border)',
              borderRadius: '2px'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-gold-light)',
                border: '1px solid var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#855800'
              }}
            >
              <PhoneCall size={18} aria-hidden="true" />
            </div>
            <div>
              <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                Civic Toll-Free (Demo)
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary-navy)', letterSpacing: '0.02em', lineHeight: 1.1 }}>
                1800-11-2484
              </div>
            </div>
          </div>

          {/* Academic FSD Tag */}
          <div
            style={{
              textAlign: 'right',
              borderLeft: '2px solid var(--color-border)',
              paddingLeft: '1rem',
              display: 'none',
              lg: 'block'
            }}
            className="d-none-sm"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
              <ShieldCheck size={14} color="var(--color-success-green)" />
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-success-green)', textTransform: 'uppercase' }}>
                Verified Academic Framework
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '1px' }}>
              Full Stack Development Project
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingHeader;

