import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Emblem from '../common/Emblem';
import {
  Phone,
  ExternalLink,
  X
} from 'lucide-react';
import Button from '../common/Button';

export const Footer = () => {
  // Modal states for policies and contact info so no links are broken
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <footer
      className="portal-footer"
      style={{
        marginTop: 'auto',
        backgroundColor: '#07182C',
        color: '#D7DEE7',
        borderTop: '3px solid var(--color-gold)'
      }}
      aria-label="Portal Institutional Footer"
    >
      {/* Top Emergency Helplines Strip */}
      <div
        style={{
          backgroundColor: '#0B2545',
          borderBottom: '1px solid #1E3A5F',
          padding: '0.625rem 0',
          fontSize: '0.8125rem'
        }}
      >
        <div
          className="portal-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={15} color="var(--color-gold)" />
            <span style={{ fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Citizen Civic & Emergency Helplines (Demo Directory):
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.75rem' }}>
            <span>
              <strong style={{ color: 'var(--color-gold)' }}>1916:</strong> Municipal Control Room
            </span>
            <span>•</span>
            <span>
              <strong style={{ color: 'var(--color-gold)' }}>112:</strong> National Emergency
            </span>
            <span>•</span>
            <span>
              <strong style={{ color: 'var(--color-gold)' }}>1091:</strong> Women Safety Helpline
            </span>
            <span>•</span>
            <span>
              <strong style={{ color: 'var(--color-gold)' }}>1098:</strong> Childline
            </span>
            <span>•</span>
            <span>
              <strong style={{ color: 'var(--color-gold)' }}>1077:</strong> Disaster Relief Desk
            </span>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Institutional Footer Content */}
      <div
        className="portal-container"
        style={{
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem'
        }}
      >
        <div className="grid-4" style={{ gap: '2rem' }}>
          {/* Column 1: About CivicReflex & Project Information */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Emblem size={44} />
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>
                  CivicReflex
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                  Accountable Action Portal
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.8125rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1rem' }}>
              CivicReflex is a citizen-first grievance redressal and pedestrian safety audit portal. Designed to foster open communication between citizens and field engineers through mandatory community verification.
            </p>

            <div
              style={{
                padding: '0.625rem 0.75rem',
                backgroundColor: '#0F294D',
                borderRadius: '2px',
                border: '1px solid #1E3A5F',
                fontSize: '0.75rem',
                color: '#CBD5E1'
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--color-gold)', marginBottom: '2px' }}>
                Academic Project Information
              </div>
              <div>Full Stack Development (MERN) Architecture. Frontend simulation phase. Local mock state mode.</div>
            </div>
          </div>

          {/* Column 2: Citizen Services */}
          <div>
            <h4
              style={{
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: '#FFFFFF',
                borderBottom: '2px solid var(--color-gold)',
                paddingBottom: '0.5rem',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Citizen Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8125rem', lineHeight: 2 }}>
              <li>
                <Link to="/report" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
                  › Lodge a Grievance
                </Link>
              </li>
              <li>
                <Link to="/track" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
                  › Track Complaint Lifecycle
                </Link>
              </li>
              <li>
                <Link to="/blind-spots" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
                  › Report Unsafe Location (Blind Spots)
                </Link>
              </li>
              <li>
                <Link to="/track?ticket=CR-2026-8843" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
                  › Verify Resolution (Community Sign-Off)
                </Link>
              </li>
              <li>
                <Link to="/services" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
                  › Citizen Charter & SLA Commitments
                </Link>
              </li>
              <li>
                <Link to="/notifications" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
                  › View Notifications & Circulars
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Accessibility, Privacy Policy & Terms */}
          <div>
            <h4
              style={{
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: '#FFFFFF',
                borderBottom: '2px solid var(--color-gold)',
                paddingBottom: '0.5rem',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Policies & Governance
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8125rem', lineHeight: 2 }}>
              <li>
                <button
                  type="button"
                  onClick={() => openModal('accessibility')}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', padding: 0, cursor: 'pointer', fontSize: '0.8125rem', textAlign: 'left' }}
                >
                  › Accessibility Statement (GIGW 2.0)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openModal('privacy')}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', padding: 0, cursor: 'pointer', fontSize: '0.8125rem', textAlign: 'left' }}
                >
                  › Privacy Policy & Data Protection
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openModal('terms')}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', padding: 0, cursor: 'pointer', fontSize: '0.8125rem', textAlign: 'left' }}
                >
                  › Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openModal('hyperlink')}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', padding: 0, cursor: 'pointer', fontSize: '0.8125rem', textAlign: 'left' }}
                >
                  › Hyperlink Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openModal('copyright')}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', padding: 0, cursor: 'pointer', fontSize: '0.8125rem', textAlign: 'left' }}
                >
                  › Copyright & Disclaimer
                </button>
              </li>
              <li>
                <Link to="/about#directory" style={{ color: '#CBD5E1', textDecoration: 'none' }}>
                  › Ward Nodal Officers Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Important Links & Contact Information */}
          <div>
            <h4
              style={{
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: '#FFFFFF',
                borderBottom: '2px solid var(--color-gold)',
                paddingBottom: '0.5rem',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Contact & Important Links
            </h4>

            {/* Contact Information Box */}
            <div
              style={{
                backgroundColor: '#0F294D',
                border: '1px solid #1E3A5F',
                borderRadius: '2px',
                padding: '0.75rem',
                marginBottom: '1rem',
                fontSize: '0.8125rem',
                lineHeight: 1.6
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '4px' }}>
                <Phone size={14} />
                <span>Contact Information</span>
              </div>
              <div style={{ color: '#CBD5E1' }}>
                <strong>Toll-Free (Demo):</strong> 1800-11-2484
              </div>
              <div style={{ color: '#CBD5E1' }}>
                <strong>Email:</strong> support@civicreflex.local
              </div>
              <div style={{ color: '#CBD5E1' }}>
                <strong>Hours:</strong> Mon – Sat, 08:00 AM – 08:00 PM
              </div>
            </div>

            {/* Important Links */}
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#94A3B8', marginBottom: '0.35rem' }}>
              Important Public Reference Links:
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.75rem', lineHeight: 1.8 }}>
              <li>
                <a
                  href="https://www.india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#CBD5E1', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  › National Portal of India <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href="https://pgportal.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#CBD5E1', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  › CPGRAMS Public Grievance Portal <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href="https://digitalindia.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#CBD5E1', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  › Digital India Initiative <ExternalLink size={10} />
                </a>
              </li>
            </ul>

            <div
              style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.35rem 0.625rem',
                backgroundColor: '#0F294D',
                border: '1px solid #1E3A5F',
                borderRadius: '2px'
              }}
            >
              <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Total Portal Visitors:</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-gold)', fontFamily: 'monospace' }}>
                02,481,930
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tricolor divider */}
      <div className="tricolor-strip" />

      {/* Bottom Legal / NIC Style Footer Notice */}
      <div
        style={{
          backgroundColor: '#040F1E',
          padding: '1.25rem 0',
          fontSize: '0.75rem',
          color: '#8E9BAE',
          borderTop: '1px solid #0F294D'
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
          <div>
            <div style={{ color: '#CBD5E1', fontWeight: 600 }}>
              CivicReflex – Citizen Civic Services & Accountability Portal (Academic Capstone FSD Project).
            </div>
            <div style={{ marginTop: '3px', fontSize: '0.6875rem', color: '#94A3B8' }}>
              <strong>Notice:</strong> This web portal is an independent academic project developed for educational purposes. It does not claim affiliation with any actual government ministry, municipal corporation, National Informatics Centre (NIC), or official public administration department.
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div>
              <strong>Design Standard:</strong> GIGW 2.0 & WCAG 2.1 AA Compliant
            </div>
            <div style={{ marginTop: '2px', fontSize: '0.6875rem', color: '#64748B' }}>
              <strong>Version:</strong> Milestone 2 (Public Homepage Complete) | Last Updated: 01 Nov 2026
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Policy & Statement Modals */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              color: 'var(--color-primary-navy)',
              width: '100%',
              maxWidth: '620px',
              borderRadius: '2px',
              border: '2px solid var(--color-gold)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                backgroundColor: 'var(--color-primary-navy)',
                color: '#FFFFFF',
                padding: '0.875rem 1.25rem',
                borderBottom: '2px solid var(--color-gold)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', margin: 0, color: '#FFFFFF' }}>
                {activeModal === 'accessibility' && 'Accessibility Statement (GIGW 2.0)'}
                {activeModal === 'privacy' && 'Privacy Policy & Data Protection'}
                {activeModal === 'terms' && 'Terms and Conditions'}
                {activeModal === 'hyperlink' && 'Hyperlink Policy'}
                {activeModal === 'copyright' && 'Copyright & Academic Project Disclaimer'}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: '4px' }}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
              {activeModal === 'accessibility' && (
                <div>
                  <p><strong>Standards Compliance:</strong> CivicReflex is designed in accordance with the Guidelines for Indian Government Websites (GIGW 2.0) and World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 AA.</p>
                  <p><strong>Accessibility Features:</strong></p>
                  <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
                    <li>High Contrast Accessibility Theme for low-vision and color-deficient users.</li>
                    <li>Dynamic Font Sizing (A-, A, A+) adjusting root rem scale.</li>
                    <li>Keyboard navigation and visible focus indicators across all interactive elements.</li>
                    <li>Screen reader skip-to-main-content landmark navigation.</li>
                  </ul>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Academic Prototype Accessibility Certification.</p>
                </div>
              )}

              {activeModal === 'privacy' && (
                <div>
                  <p><strong>Data Protection Principle:</strong> CivicReflex respects citizen privacy. In this academic phase, all citizen grievance logs, contact numbers, and photo attachments are handled locally using client-side React simulation state.</p>
                  <p><strong>Phone & Identity Masking:</strong> Citizen contact details are automatically masked (e.g. ******4821) on all public registers to prevent unauthorized solicitation.</p>
                  <p><strong>Location Coordinates:</strong> Geotagged coordinates submitted during grievance lodging are used solely to determine municipal ward jurisdictions and route work orders to designated nodal engineers.</p>
                </div>
              )}

              {activeModal === 'terms' && (
                <div>
                  <p><strong>Terms of Use:</strong> This application is intended for academic demonstrations and prototype civic grievance tracking. By accessing this portal, users agree to test its functionality responsibly.</p>
                  <p><strong>Vexatious Reports:</strong> Submitting defamatory, abusive, or knowingly fraudulent grievance reports on public registers is prohibited under administrative usage protocols.</p>
                  <p><strong>Community Verification:</strong> Citizens participating in the resolution verification workflow must physically inspect the reported location before casting confirmation votes.</p>
                </div>
              )}

              {activeModal === 'hyperlink' && (
                <div>
                  <p><strong>External Links:</strong> Hyperlinks to external government portals (e.g. National Portal of India, Digital India, CPGRAMS) are provided for reference only. CivicReflex does not maintain or control external third-party content.</p>
                  <p><strong>Inbound Links:</strong> Linking directly to the CivicReflex public portal is permitted provided the context does not imply unauthorized official state or central government sponsorship.</p>
                </div>
              )}

              {activeModal === 'copyright' && (
                <div>
                  <p><strong>Academic Prototype Notice:</strong> CivicReflex is an original academic project developed for Full Stack Development coursework.</p>
                  <p><strong>Non-Affiliation:</strong> This software is not affiliated with, endorsed by, or operated by any official Government of India ministry, municipal corporation, or the National Informatics Centre (NIC).</p>
                  <p>All brand logos, icons, and emblems used within CivicReflex are original or licensed open-source assets.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '0.75rem 1.25rem', backgroundColor: '#F8FAFC', borderTop: '1px solid var(--color-border)', textAlign: 'right' }}>
              <Button variant="secondary" size="sm" onClick={closeModal}>
                Close Statement
              </Button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
