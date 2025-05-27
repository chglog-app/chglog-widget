import React, { useState, useEffect, useCallback } from 'react';
import { WhatsNewWidgetProps, WhatsNewUpdate } from '../../types/widget';
import { 
  fetchLatestUpdate, 
  isDismissed, 
  markAsDismissed, 
  cleanupOldDismissals,
  detectTheme 
} from '../../lib/widget-utils';
import WhatsNewNotification from './WhatsNewNotification';

const WhatsNewWidget: React.FC<WhatsNewWidgetProps> = ({
  repositorySlug,
  position = 'bottom-right',
  theme = 'auto',
  maxWidth = 400,
  zIndex = 1000,
  showAvatar = true,
  customStyles,
}) => {
  const [update, setUpdate] = useState<WhatsNewUpdate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Resolve theme
  useEffect(() => {
    if (theme === 'auto') {
      setResolvedTheme(detectTheme());
      
      // Listen for theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleThemeChange = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleThemeChange);
      return () => mediaQuery.removeEventListener('change', handleThemeChange);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  // Fetch and check latest update
  const checkForUpdates = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Clean up old dismissals
      cleanupOldDismissals(repositorySlug);
      
      // Fetch latest update
      const response = await fetchLatestUpdate(repositorySlug);
      
      if (!response || !response.updates || response.updates.length === 0) {
        setUpdate(null);
        setShowNotification(false);
        return;
      }
      
      const latestUpdate = response.updates[0];
      setUpdate(latestUpdate);
      
      // Check if this update has been dismissed
      const dismissed = isDismissed(repositorySlug, latestUpdate.id);
      setShowNotification(!dismissed);
      
    } catch (error) {
      console.warn('WhatsNewWidget: Failed to check for updates:', error);
      setUpdate(null);
      setShowNotification(false);
    } finally {
      setIsLoading(false);
    }
  }, [repositorySlug]);

  // Initial load
  useEffect(() => {
    checkForUpdates();
  }, [checkForUpdates]);

  // Handle dismissal
  const handleDismiss = useCallback(() => {
    if (update) {
      markAsDismissed(repositorySlug, update.id);
      setShowNotification(false);
    }
  }, [repositorySlug, update]);

  // Handle view (also dismisses)
  const handleView = useCallback(() => {
    if (update) {
      markAsDismissed(repositorySlug, update.id);
      setShowNotification(false);
    }
  }, [repositorySlug, update]);

  // Don't render anything if loading, no update, or notification shouldn't show
  if (isLoading || !update || !showNotification) {
    return null;
  }

  return (
    <WhatsNewNotification
      update={update}
      position={position}
      theme={resolvedTheme}
      maxWidth={maxWidth}
      zIndex={zIndex}
      showAvatar={showAvatar}
      customStyles={customStyles}
      onDismiss={handleDismiss}
      onView={handleView}
    />
  );
};

export default WhatsNewWidget; 