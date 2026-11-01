import React from 'react';

export const StatsCard = ({
  icon: Icon,
  value,
  label,
  subtitle,
  accent = 'blue', // 'blue' | 'gold' | 'green' | 'red'
  className = ''
}) => {
  return (
    <div className={`stat-box ${accent} ${className}`.trim()}>
      {Icon && (
        <div className="stat-box-icon">
          <Icon size={24} aria-hidden="true" />
        </div>
      )}
      <div className="stat-box-content">
        <div className="stat-box-value">{value}</div>
        <div className="stat-box-label">{label}</div>
        {subtitle && (
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

