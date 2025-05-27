# WhatsNew Widget Usage Guide

This guide provides detailed instructions for implementing the WhatsNew widget in your application.

## Quick Start

### 1. Installation

```bash
npm install @chglog/whats-new-widget
```

### 2. Basic Implementation

```tsx
import React from 'react';
import { WhatsNewWidget } from '@chglog/whats-new-widget';

function App() {
  return (
    <div>
      {/* Your app content */}
      <WhatsNewWidget repositorySlug="your-repo-slug" />
    </div>
  );
}
```

## Configuration Options

### Position

Control where the notification appears on screen:

```tsx
<WhatsNewWidget 
  repositorySlug="your-repo"
  position="bottom-right" // bottom-right, bottom-left, top-right, top-left
/>
```

### Theme

Choose the visual theme:

```tsx
<WhatsNewWidget 
  repositorySlug="your-repo"
  theme="auto" // auto, light, dark
/>
```

- `auto`: Automatically detects user's system preference
- `light`: Always use light theme
- `dark`: Always use dark theme

### Sizing

Customize the notification dimensions:

```tsx
<WhatsNewWidget 
  repositorySlug="your-repo"
  maxWidth={500}
  zIndex={2000}
/>
```

### Avatar Display

Control whether to show author/repository avatars:

```tsx
<WhatsNewWidget 
  repositorySlug="your-repo"
  showAvatar={false}
/>
```

### Custom Styling

Apply custom CSS styles:

```tsx
<WhatsNewWidget 
  repositorySlug="your-repo"
  customStyles={{
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    fontFamily: 'Inter, sans-serif'
  }}
/>
```

## Advanced Usage

### Using Individual Components

For more control, you can use the notification component directly:

```tsx
import { WhatsNewNotification } from '@chglog/whats-new-widget';

const update = {
  id: 'update-123',
  title: 'New Feature Released',
  summary: 'We just launched an amazing new feature!',
  publishedAt: '2024-01-15T10:00:00Z',
  url: 'https://your-site.com/changelog/update-123',
  author: {
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg'
  }
};

<WhatsNewNotification
  update={update}
  position="bottom-right"
  theme="light"
  maxWidth={400}
  zIndex={1000}
  showAvatar={true}
  onDismiss={() => console.log('Dismissed')}
  onView={() => console.log('Viewed')}
/>
```

### Using Utility Functions

Access the underlying utility functions for custom implementations:

```tsx
import { 
  fetchLatestUpdate, 
  isDismissed, 
  markAsDismissed,
  formatRelativeTime 
} from '@chglog/whats-new-widget';

// Fetch latest update manually
const response = await fetchLatestUpdate('your-repo-slug');

// Check dismissal status
const dismissed = isDismissed('your-repo-slug', 'update-id');

// Mark as dismissed
markAsDismissed('your-repo-slug', 'update-id');

// Format timestamps
const timeAgo = formatRelativeTime('2024-01-15T10:00:00Z');
```

## Integration Patterns

### Next.js

```tsx
// pages/_app.tsx
import { WhatsNewWidget } from '@chglog/whats-new-widget';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <WhatsNewWidget repositorySlug="your-repo" />
    </>
  );
}
```

### React Router

```tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WhatsNewWidget } from '@chglog/whats-new-widget';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Your routes */}
      </Routes>
      <WhatsNewWidget repositorySlug="your-repo" />
    </BrowserRouter>
  );
}
```

### Conditional Rendering

Only show the widget on certain pages or for certain users:

```tsx
import { useLocation } from 'react-router-dom';
import { WhatsNewWidget } from '@chglog/whats-new-widget';

function App() {
  const location = useLocation();
  const showWidget = location.pathname === '/dashboard';

  return (
    <div>
      {/* Your app content */}
      {showWidget && (
        <WhatsNewWidget repositorySlug="your-repo" />
      )}
    </div>
  );
}
```

## Customization Examples

### Corporate Branding

```tsx
<WhatsNewWidget 
  repositorySlug="your-repo"
  theme="light"
  customStyles={{
    fontFamily: 'Corporate Sans, sans-serif',
    borderLeft: '4px solid #your-brand-color',
    backgroundColor: '#your-bg-color'
  }}
/>
```

### Mobile-Optimized

```tsx
<WhatsNewWidget 
  repositorySlug="your-repo"
  maxWidth={window.innerWidth < 768 ? 300 : 400}
  position={window.innerWidth < 768 ? 'bottom-left' : 'bottom-right'}
/>
```

### High Z-Index Environment

```tsx
<WhatsNewWidget 
  repositorySlug="your-repo"
  zIndex={9999} // Ensure it appears above modals, etc.
/>
```

## Troubleshooting

### Widget Not Appearing

1. **Check repository slug**: Ensure it matches your chglog.app repository
2. **Verify API access**: Check browser network tab for API errors
3. **Check dismissal state**: Clear localStorage to reset dismissals
4. **Verify updates exist**: Ensure there are published updates in your changelog

### Styling Issues

1. **Z-index conflicts**: Increase the `zIndex` prop value
2. **Theme not applying**: Check if `theme="auto"` is detecting correctly
3. **Custom styles not working**: Ensure CSS specificity is sufficient

### Performance Considerations

1. **API caching**: The widget respects API cache headers (5 minutes)
2. **Local storage cleanup**: Old dismissals are automatically cleaned up
3. **Minimal re-renders**: Widget only re-renders when necessary

## API Reference

### WhatsNewWidget Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `repositorySlug` | `string` | - | ✅ | Repository identifier from chglog.app |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | ❌ | Notification position |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | ❌ | Visual theme |
| `maxWidth` | `number` | `400` | ❌ | Maximum width in pixels |
| `zIndex` | `number` | `1000` | ❌ | CSS z-index value |
| `showAvatar` | `boolean` | `true` | ❌ | Show author/repo avatar |
| `customStyles` | `React.CSSProperties` | `undefined` | ❌ | Custom CSS styles |

### Update Object Structure

```typescript
interface WhatsNewUpdate {
  id: string;
  title: string;
  summary: string;
  publishedAt: string; // ISO 8601 date string
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
```

## Best Practices

1. **Repository Slug**: Use a consistent, descriptive slug across your changelog
2. **Update Frequency**: Don't overwhelm users with too frequent notifications
3. **Content Quality**: Write clear, concise update summaries
4. **Testing**: Test the widget in different screen sizes and themes
5. **Performance**: Monitor API response times and adjust caching as needed

## Support

For issues or questions:
- Check the [GitHub repository](https://github.com/chglog/whats-new-widget)
- Visit [chglog.app](https://chglog.app) for changelog management
- Review the API documentation at [chglog.app/docs](https://chglog.app/docs) 