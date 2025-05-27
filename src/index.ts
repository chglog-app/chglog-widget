export { default as WhatsNewWidget } from './components/widget/WhatsNewWidget';
export { default as WhatsNewNotification } from './components/widget/WhatsNewNotification';

export type {
  WhatsNewWidgetProps,
  WhatsNewUpdate,
  WhatsNewApiResponse,
  DismissalState,
  WhatsNewNotificationProps,
} from './types/widget';

export {
  fetchLatestUpdate,
  isDismissed,
  markAsDismissed,
  cleanupOldDismissals,
  detectTheme,
  formatRelativeTime,
  getStorageKey,
} from './lib/widget-utils'; 