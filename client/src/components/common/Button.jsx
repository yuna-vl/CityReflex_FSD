import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...rest
}) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} aria-hidden="true" />}
    </button>
  );
};

export default Button;

