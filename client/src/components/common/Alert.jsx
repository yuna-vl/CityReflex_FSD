import React from 'react';
import { Info, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

const ICON_MAP = {
  info: Info,
  warning: AlertTriangle,
  danger: AlertCircle,
  success: CheckCircle2
};

export const Alert = ({
  children,
  type = 'info',
  title,
  icon,
  className = '',
  onClose
}) => {
  const IconComponent = icon || ICON_MAP[type] || Info;

  return (
    <div className={`alert alert-${type} ${className}`.trim()} role="alert">
      <IconComponent size={20} className="alert-icon" style={{ flexShrink: 0, marginTop: '2px' }} />
      <div className="alert-content" style={{ flex: '1 1 auto' }}>
        {title && <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{title}</div>}
        <div>{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            color: 'inherit',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            lineHeight: 1
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;

