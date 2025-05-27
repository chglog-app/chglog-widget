import { DismissalState, WhatsNewApiResponse } from '../types/widget';

const STORAGE_PREFIX = 'whats-new-dismissed';
const API_BASE_URL = 'https://chglog.app/api/public/v1/whats-new';

/**
 * Generate storage key for dismissal state
 */
export function getStorageKey(repositorySlug: string, updateId: string): string {
  return `${STORAGE_PREFIX}-${repositorySlug}-${updateId}`;
}

/**
 * Check if an update has been dismissed
 */
export function isDismissed(repositorySlug: string, updateId: string): boolean {
  try {
    const key = getStorageKey(repositorySlug, updateId);
    const stored = localStorage.getItem(key);
    if (!stored) return false;
    
    const dismissalState: DismissalState = JSON.parse(stored);
    return dismissalState.dismissed && dismissalState.updateId === updateId;
  } catch (error) {
    console.warn('Failed to check dismissal state:', error);
    return false;
  }
}

/**
 * Mark an update as dismissed
 */
export function markAsDismissed(repositorySlug: string, updateId: string): void {
  try {
    const key = getStorageKey(repositorySlug, updateId);
    const dismissalState: DismissalState = {
      dismissed: true,
      timestamp: Date.now(),
      updateId,
    };
    localStorage.setItem(key, JSON.stringify(dismissalState));
  } catch (error) {
    console.warn('Failed to mark as dismissed:', error);
  }
}

/**
 * Clean up old dismissal entries (older than 30 days)
 */
export function cleanupOldDismissals(repositorySlug: string): void {
  try {
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`${STORAGE_PREFIX}-${repositorySlug}-`)) {
        const stored = localStorage.getItem(key);
        if (stored) {
          try {
            const dismissalState: DismissalState = JSON.parse(stored);
            if (dismissalState.timestamp < thirtyDaysAgo) {
              keysToRemove.push(key);
            }
          } catch {
            // Invalid JSON, remove it
            keysToRemove.push(key);
          }
        }
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.warn('Failed to cleanup old dismissals:', error);
  }
}

/**
 * Fetch latest update from the API
 */
export async function fetchLatestUpdate(repositorySlug: string): Promise<WhatsNewApiResponse | null> {
  try {
    const url = `${API_BASE_URL}/${encodeURIComponent(repositorySlug)}?limit=1&format=summary`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        // Repository not found or no updates
        return null;
      }
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data: WhatsNewApiResponse = await response.json();
    return data;
  } catch (error) {
    console.warn('Failed to fetch latest update:', error);
    return null;
  }
}

/**
 * Detect user's preferred theme
 */
export function detectTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (error) {
    console.warn('Failed to detect theme:', error);
  }
  
  return 'light';
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) {
      return diffMinutes <= 1 ? 'just now' : `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    } else if (diffDays < 7) {
      return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  } catch (error) {
    console.warn('Failed to format relative time:', error);
    return 'recently';
  }
} 