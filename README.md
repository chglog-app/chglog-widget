# @chglog/whats-new-widget

A lightweight React widget library for displaying changelog notifications from [chglog.app](https://chglog.app).

## Features

- 🚀 **Lightweight**: Minimal dependencies, only requires React
- 🎨 **Customizable**: Configurable position, theme, and styling
- 📱 **Responsive**: Works seamlessly on mobile and desktop
- 🌙 **Theme Support**: Light, dark, and auto themes
- 💾 **Smart Dismissal**: Remembers dismissed notifications using localStorage
- ⚡ **Fast**: Efficient API calls with built-in caching
- 🔧 **TypeScript**: Full TypeScript support with type definitions

## Installation

```bash
npm install @chglog/whats-new-widget
```

```bash
yarn add @chglog/whats-new-widget
```

```bash
pnpm add @chglog/whats-new-widget
```

## Quick Start

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

export default App;
```

## API Reference

### WhatsNewWidget Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `repositorySlug` | `string` | **Required** | The repository slug from chglog.app |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Position of the notification |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Theme for the notification |
| `maxWidth` | `number` | `400` | Maximum width of the notification in pixels |
| `zIndex` | `number` | `1000` | CSS z-index for the notification |
| `showAvatar` | `boolean` | `true` | Whether to show author/repository avatar |
| `customStyles` | `React.CSSProperties` | `undefined` | Custom CSS styles to apply |

## Usage Examples

### Basic Usage

```tsx
import { WhatsNewWidget } from '@chglog/whats-new-widget';

<WhatsNewWidget repositorySlug="my-awesome-project" />
```

### Custom Position and Theme

```tsx
<WhatsNewWidget 
  repositorySlug="my-awesome-project"
  position="top-left"
  theme="dark"
/>
```

### Custom Styling

```tsx
<WhatsNewWidget 
  repositorySlug="my-awesome-project"
  maxWidth={500}
  customStyles={{
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  }}
/>
```

### Without Avatar

```tsx
<WhatsNewWidget 
  repositorySlug="my-awesome-project"
  showAvatar={false}
/>
```

## Advanced Usage

### Using Individual Components

You can also use the notification component directly for more control:

```tsx
import { WhatsNewNotification } from '@chglog/whats-new-widget';

const update = {
  id: '1',
  title: 'New Feature Released',
  summary: 'We just released an amazing new feature!',
  publishedAt: '2024-01-15T10:00:00Z',
  url: 'https://example.com/changelog/1',
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

```tsx
import { 
  fetchLatestUpdate, 
  isDismissed, 
  markAsDismissed 
} from '@chglog/whats-new-widget';

// Fetch latest update
const response = await fetchLatestUpdate('my-repo-slug');

// Check if dismissed
const dismissed = isDismissed('my-repo-slug', 'update-id');

// Mark as dismissed
markAsDismissed('my-repo-slug', 'update-id');
```

## Widget Behavior

### Lifecycle

1. **Mount**: Widget checks localStorage for dismissed state
2. **Fetch**: Calls the chglog.app API for the latest update
3. **Compare**: Checks if the latest update ID matches any dismissed ID
4. **Show/Hide**: Displays notification only if not previously dismissed
5. **Dismiss**: Stores dismissal state with update ID in localStorage
6. **Cleanup**: Automatically removes old dismissal entries (30+ days)

### Local Storage

The widget uses localStorage to remember dismissed notifications:

- **Storage Key Format**: `whats-new-dismissed-{repositorySlug}-{updateId}`
- **Storage Value**: `{ dismissed: true, timestamp: Date.now(), updateId: string }`
- **Automatic Cleanup**: Entries older than 30 days are automatically removed

### Error Handling

The widget gracefully handles various error scenarios:

- **Network failures**: Silent fail, no notification shown
- **Invalid repository slug**: Logs warning, no notification shown
- **No updates available**: No notification shown
- **localStorage errors**: Falls back to session-based dismissal
- **CORS issues**: Handled by chglog.app API CORS headers

## TypeScript Support

The library is written in TypeScript and includes full type definitions:

```tsx
import type { 
  WhatsNewWidgetProps, 
  WhatsNewUpdate,
  WhatsNewApiResponse 
} from '@chglog/whats-new-widget';
```

## Browser Support

- Modern browsers with ES2015+ support
- React 16.8+ (hooks support required)
- localStorage support (graceful fallback if unavailable)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, open an issue on GitHub. 