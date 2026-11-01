import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        backgroundColor: '#EDF2F7',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.5rem 0',
        fontSize: '0.8125rem'
      }}
    >
      <div className="portal-container" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.375rem' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: 'var(--color-gov-blue)',
            textDecoration: 'none',
            fontWeight: 600
          }}
        >
          <Home size={14} aria-hidden="true" />
          <span>Home</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight size={12} color="var(--color-text-muted)" aria-hidden="true" />
              {isLast || !item.to ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  style={{
                    color: isLast ? 'var(--color-primary-navy)' : 'var(--color-text-secondary)',
                    fontWeight: isLast ? 700 : 500
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  style={{
                    color: 'var(--color-gov-blue)',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;

