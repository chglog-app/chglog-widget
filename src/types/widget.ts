import { CSSProperties } from 'react';

export interface WhatsNewWidgetProps {
  repositorySlug: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark' | 'auto';
  maxWidth?: number;
  zIndex?: number;
  showAvatar?: boolean;
  customStyles?: CSSProperties;
}

export interface WhatsNewUpdate {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  url: string;
  author?: {
    name: string;
    avatar?: string;
  };
  repository?: {
    name: string;
    avatar?: string;
  };
}

export interface WhatsNewApiResponse {
  updates: WhatsNewUpdate[];
  repository: {
    name: string;
    slug: string;
    avatar?: string;
  };
}

export interface DismissalState {
  dismissed: boolean;
  timestamp: number;
  updateId: string;
}

export interface WhatsNewNotificationProps {
  update: WhatsNewUpdate;
  position: NonNullable<WhatsNewWidgetProps['position']>;
  theme: NonNullable<WhatsNewWidgetProps['theme']>;
  maxWidth: number;
  zIndex: number;
  showAvatar: boolean;
  customStyles?: CSSProperties;
  onDismiss: () => void;
  onView: () => void;
} 