import { 
  getStorageKey, 
  formatRelativeTime, 
  detectTheme 
} from '../src/lib/widget-utils';

// Mock localStorage for testing
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Widget Utils', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test('getStorageKey generates correct key format', () => {
    const key = getStorageKey('test-repo', 'update-123');
    expect(key).toBe('whats-new-dismissed-test-repo-update-123');
  });

  test('formatRelativeTime handles recent times', () => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    
    const result = formatRelativeTime(fiveMinutesAgo.toISOString());
    expect(result).toBe('5 minutes ago');
  });

  test('formatRelativeTime handles just now', () => {
    const now = new Date();
    const result = formatRelativeTime(now.toISOString());
    expect(result).toBe('just now');
  });

  test('formatRelativeTime handles hours', () => {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    
    const result = formatRelativeTime(twoHoursAgo.toISOString());
    expect(result).toBe('2 hours ago');
  });

  test('formatRelativeTime handles days', () => {
    const now = new Date();
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    
    const result = formatRelativeTime(threeDaysAgo.toISOString());
    expect(result).toBe('3 days ago');
  });

  test('detectTheme returns light by default', () => {
    const theme = detectTheme();
    expect(theme).toBe('light');
  });
}); 