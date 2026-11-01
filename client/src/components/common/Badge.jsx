import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  status,
  className = '',
  icon: Icon
}) => {
  // Map standard civic statuses to badge variants
  let resolvedVariant = variant;
  if (status) {
    const s = String(status).toLowerCase();
    if (s.includes('citizen-confirmed') || s.includes('confirmed')) {
      resolvedVariant = 'confirmed';
    } else if (s.includes('resolved') || s.includes('closed') || s.includes('completed')) {
      resolvedVariant = 'resolved';
    } else if (s.includes('assigned')) {
      resolvedVariant = 'assigned';
    } else if (s.includes('progress') || s.includes('review') || s.includes('inspection')) {
      resolvedVariant = 'in-progress';
    } else if (s.includes('escalated') || s.includes('reopened') || s.includes('critical') || s.includes('urgent')) {
      resolvedVariant = 'escalated';
    } else if (s.includes('verified')) {
      resolvedVariant = 'verified';
    } else if (s.includes('pending') || s.includes('registered') || s.includes('reported')) {
      resolvedVariant = 'pending';
    } else if (s.includes('demo')) {
      resolvedVariant = 'demo';
    }
  }

  return (
    <span className={`badge badge-${resolvedVariant} ${className}`.trim()}>
      {Icon && <Icon size={12} aria-hidden="true" />}
      {children || status}
    </span>
  );
};

export default Badge;

