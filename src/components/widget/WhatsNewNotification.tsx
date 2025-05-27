import React, { useState, useEffect } from 'react';
import { WhatsNewNotificationProps } from '../../types/widget';
import { formatRelativeTime } from '../../lib/widget-utils';

const WhatsNewNotification: React.FC<WhatsNewNotificationProps> = ({
  update,
  position,
  theme,
  maxWidth,
  zIndex,
  showAvatar,
  customStyles,
  onDismiss,
  onView,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // Trigger slide-in animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onDismiss();
    }, 300);
  };

  const handleView = () => {
    window.open(update.url, '_blank', 'noopener,noreferrer');
    onView();
  };

  // Position styles
  const getPositionStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      margin: '16px',
    };

    switch (position) {
      case 'bottom-right':
        return { ...baseStyles, bottom: 0, right: 0 };
      case 'bottom-left':
        return { ...baseStyles, bottom: 0, left: 0 };
      case 'top-right':
        return { ...baseStyles, top: 0, right: 0 };
      case 'top-left':
        return { ...baseStyles, top: 0, left: 0 };
      default:
        return { ...baseStyles, bottom: 0, right: 0 };
    }
  };

  // Theme styles
  const getThemeStyles = () => {
    const isDark = theme === 'dark';
    return {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f9fafb' : '#111827',
      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
      boxShadow: isDark 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
        : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    };
  };

  // Animation styles
  const getAnimationStyles = () => {
    const isBottomPosition = position.includes('bottom');
    const isRightPosition = position.includes('right');
    
    let transform = 'translate(0, 0)';
    
    if (!isVisible || isAnimatingOut) {
      if (isBottomPosition) {
        transform = 'translateY(100%)';
      } else {
        transform = 'translateY(-100%)';
      }
      
      if (isRightPosition) {
        transform += ' translateX(100%)';
      } else {
        transform += ' translateX(-100%)';
      }
    }

    return {
      transform,
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
      opacity: (!isVisible || isAnimatingOut) ? 0 : 1,
    };
  };

  const containerStyles: React.CSSProperties = {
    ...getPositionStyles(),
    ...getThemeStyles(),
    ...getAnimationStyles(),
    maxWidth: `${maxWidth}px`,
    width: '100%',
    minWidth: '320px',
    borderRadius: '12px',
    padding: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: '14px',
    lineHeight: '1.5',
    zIndex,
    cursor: 'pointer',
    ...customStyles,
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '8px',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    lineHeight: '1.4',
  };

  const metaStyles: React.CSSProperties = {
    fontSize: '12px',
    opacity: 0.7,
    margin: '0 0 8px 0',
  };

  const summaryStyles: React.CSSProperties = {
    margin: '0 0 12px 0',
    lineHeight: '1.5',
  };

  const avatarStyles: React.CSSProperties = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    marginRight: '8px',
    flexShrink: 0,
  };

  const closeButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    color: 'inherit',
    opacity: 0.7,
    lineHeight: 1,
    marginLeft: '8px',
    flexShrink: 0,
  };

  const footerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '12px',
    opacity: 0.8,
  };

  const badgeStyles: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
    color: '#ffffff',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500',
  };

  const avatar = showAvatar && (update.author?.avatar || update.repository?.avatar);

  return (
    <div style={containerStyles} onClick={handleView}>
      <div style={headerStyles}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {avatar && (
              <img 
                src={avatar} 
                alt={update.author?.name || update.repository?.name || 'Avatar'} 
                style={avatarStyles}
              />
            )}
            <h3 style={titleStyles}>{update.title}</h3>
          </div>
          <div style={metaStyles}>
            {formatRelativeTime(update.publishedAt)}
            {update.author?.name && ` • by ${update.author.name}`}
          </div>
        </div>
        <button
          style={closeButtonStyles}
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.7';
          }}
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
      
      <div style={summaryStyles}>
        {update.summary}
      </div>
      
      <div style={footerStyles}>
        <span style={badgeStyles}>What's New</span>
        <span>Click to view →</span>
      </div>
    </div>
  );
};

export default WhatsNewNotification; 