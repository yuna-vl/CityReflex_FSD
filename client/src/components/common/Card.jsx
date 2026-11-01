import React from 'react';

export const Card = ({
  children,
  className = '',
  interactive = false,
  onClick,
  ...rest
}) => {
  return (
    <div
      className={`portal-card ${interactive ? 'interactive' : ''} ${className}`.trim()}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  variant = 'default', // 'default' | 'navy'
  className = '',
  action,
  ...rest
}) => {
  return (
    <div className={`portal-card-header ${variant} ${className}`.trim()} {...rest}>
      <div className="portal-card-header-main">{children}</div>
      {action && <div className="portal-card-header-action">{action}</div>}
    </div>
  );
};

export const CardTitle = ({
  children,
  icon: Icon,
  className = '',
  ...rest
}) => {
  return (
    <h3 className={`portal-card-title ${className}`.trim()} {...rest}>
      {Icon && <Icon size={18} aria-hidden="true" />}
      {children}
    </h3>
  );
};

export const CardBody = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div className={`portal-card-body ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
};

export const CardFooter = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div className={`portal-card-footer ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;

