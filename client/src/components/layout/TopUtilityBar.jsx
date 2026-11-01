import React, { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Eye, Volume2, Globe, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' }
];

export const TopUtilityBar = () => {
  const { fontSize, setFontSize, highContrast, toggleHighContrast, language, changeLanguage } = useAccessibility();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef(null);

  // Close language menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div
      className="top-utility-bar"
      style={{
        backgroundColor: '#07182C',
        color: '#D7DEE7',
        fontSize: '0.75rem',
        borderBottom: '1px solid #1A365D',
        padding: '0.35rem 0'
      }}
    >
      <div
        className="portal-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        {/* Left: Official portal identification */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '0.04em' }}>
          <span style={{ fontWeight: 700, color: 'var(--color-gold)' }}>
            CITIZEN CIVIC SERVICES PORTAL
          </span>
          <span style={{ color: '#4A5568' }}>|</span>
          <span style={{ color: '#E2E8F0', display: 'none', md: 'inline' }} className="d-sm-inline">
            Public Grievance Redressal & Infrastructure Safety Portal (Academic Demo)
          </span>
        </div>

        {/* Right: Accessibility Controls & Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Skip link helper for screen readers */}
          <a
            href="#main-content"
            style={{
              color: '#CBD5E1',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Volume2 size={13} aria-hidden="true" />
            <span>Skip to Main Content</span>
          </a>

          <span style={{ color: '#334155' }}>|</span>

          {/* Font Size Adjusters: A- | A | A+ */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
            aria-label="Text size adjustment"
          >
            <span style={{ marginRight: '4px', color: '#94A3B8' }}>Font:</span>
            <button
              type="button"
              onClick={() => setFontSize('small')}
              aria-label="Decrease text size"
              title="Decrease Font Size (A-)"
              style={{
                backgroundColor: fontSize === 'small' ? 'var(--color-gold)' : 'transparent',
                color: fontSize === 'small' ? '#0B2545' : '#FFFFFF',
                border: '1px solid #334155',
                padding: '1px 6px',
                fontSize: '0.6875rem',
                cursor: 'pointer',
                fontWeight: 700,
                borderRadius: '2px'
              }}
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontSize('normal')}
              aria-label="Normal text size"
              title="Reset Font Size (A)"
              style={{
                backgroundColor: fontSize === 'normal' ? 'var(--color-gold)' : 'transparent',
                color: fontSize === 'normal' ? '#0B2545' : '#FFFFFF',
                border: '1px solid #334155',
                padding: '1px 6px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontWeight: 700,
                borderRadius: '2px'
              }}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize('large')}
              aria-label="Increase text size"
              title="Increase Font Size (A+)"
              style={{
                backgroundColor: fontSize === 'large' ? 'var(--color-gold)' : 'transparent',
                color: fontSize === 'large' ? '#0B2545' : '#FFFFFF',
                border: '1px solid #334155',
                padding: '1px 6px',
                fontSize: '0.8125rem',
                cursor: 'pointer',
                fontWeight: 700,
                borderRadius: '2px'
              }}
            >
              A+
            </button>
          </div>

          <span style={{ color: '#334155' }}>|</span>

          {/* High Contrast Mode Toggle */}
          <button
            type="button"
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
            title={highContrast ? 'Switch to Standard Contrast' : 'Switch to High Contrast Accessibility Theme'}
            style={{
              backgroundColor: highContrast ? '#FFFF00' : 'transparent',
              color: highContrast ? '#000000' : '#FFFFFF',
              border: '1px solid #334155',
              padding: '1px 8px',
              fontSize: '0.6875rem',
              fontWeight: 700,
              cursor: 'pointer',
              borderRadius: '2px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Eye size={12} aria-hidden="true" />
            <span>{highContrast ? 'Standard View' : 'High Contrast'}</span>
          </button>

          <span style={{ color: '#334155' }}>|</span>

          {/* Language Selector Dropdown */}
          <div style={{ position: 'relative' }} ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-expanded={langMenuOpen}
              aria-haspopup="true"
              style={{
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid #334155',
                padding: '1px 8px',
                fontSize: '0.6875rem',
                cursor: 'pointer',
                borderRadius: '2px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Globe size={12} aria-hidden="true" />
              <span>{currentLangObj.label} ({currentLangObj.native})</span>
              <ChevronDown size={11} aria-hidden="true" />
            </button>

            {langMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '4px',
                  backgroundColor: '#FFFFFF',
                  color: '#0B2545',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  zIndex: 1000,
                  minWidth: '160px',
                  padding: '4px 0'
                }}
              >
                <div
                  style={{
                    padding: '4px 12px',
                    fontSize: '0.6875rem',
                    color: '#64748B',
                    borderBottom: '1px solid #E2E8F0',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}
                >
                  Select Language (Demo)
                </div>
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      changeLanguage(item.code);
                      setLangMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '6px 12px',
                      fontSize: '0.8125rem',
                      border: 'none',
                      backgroundColor: language === item.code ? '#EDF2F7' : 'transparent',
                      color: language === item.code ? 'var(--color-gov-blue)' : '#1A2533',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: language === item.code ? 700 : 500
                    }}
                  >
                    <span>{item.label} – {item.native}</span>
                    {language === item.code && <Check size={14} color="var(--color-gov-blue)" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span style={{ color: '#334155' }}>|</span>

          {/* Official Administrative Login Shortcut */}
          <a
            href="/login"
            style={{
              color: 'var(--color-gold)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.6875rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '1px 6px',
              backgroundColor: '#132E52',
              border: '1px solid #234673',
              borderRadius: '2px'
            }}
          >
            <span>Official Login / Roles</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopUtilityBar;

