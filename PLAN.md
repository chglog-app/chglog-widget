## React Widget Library for Chglog.app

domain: chglog.app

### 1. **Core Widget Structure**
- **Component Name**: `WhatsNewWidget`
- **Location**: `src/components/widget/WhatsNewWidget.tsx`
- **Type**: Standalone React component that can be embedded in any website
- **Dependencies**: Minimal external deps (only React, no heavy UI libraries)

### 2. **Widget Features & Behavior**
- **Floating Notification**: Positioned fixed (bottom-right corner by default)
- **Dismissible**: Close button with local storage persistence
- **Auto-show Logic**: Only shows if user hasn't dismissed the latest update
- **Responsive**: Works on mobile and desktop
- **Customizable**: Configurable position, styling, and repository slug

### 3. **API Integration**
- **Endpoint**: Uses existing `/api/public/whats-new/[slug]` endpoint
- **Query Parameters**: `?limit=1&format=summary` to get latest update only
- **Error Handling**: Graceful fallback if API fails or no updates found
- **Caching**: Respects API cache headers (5 minutes)

### 4. **Local Storage Strategy**
```typescript
// Storage key format: `whats-new-dismissed-${repositorySlug}-${changelogId}`
// Stores: { dismissed: true, timestamp: Date.now() }
```

### 5. **Component Props Interface**
```typescript
interface WhatsNewWidgetProps {
  repositorySlug: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  theme?: 'light' | 'dark' | 'auto'
  maxWidth?: number
  zIndex?: number
  showAvatar?: boolean
  customStyles?: React.CSSProperties
}
```

### 6. **Implementation Files**
- `src/components/widget/WhatsNewWidget.tsx` - Main widget component
- `src/components/widget/WhatsNewNotification.tsx` - Notification UI component
- `src/lib/widget-utils.ts` - Local storage and API utilities
- `src/types/widget.ts` - TypeScript interfaces
- `public/widget.js` - Standalone bundle for external embedding

### 7. **Widget Lifecycle**
1. **Mount**: Check local storage for dismissed state
2. **Fetch**: Call whats-new API for latest update
3. **Compare**: Check if latest update ID matches dismissed ID
4. **Show/Hide**: Display notification if not dismissed
5. **Dismiss**: Store dismissal state with update ID
6. **Cleanup**: Remove old dismissed entries (optional)

### 8. **Styling Approach**
- **CSS-in-JS**: Inline styles to avoid external CSS dependencies
- **Minimal Design**: Clean, modern notification style
- **Brand Colors**: Use repository avatar/colors when available
- **Animation**: Smooth slide-in/fade-out transitions

### 9. **Distribution Strategy**
- **NPM Package**: Publishable React component
- **CDN Script**: Standalone JavaScript file for non-React sites
- **Installation Guide**: Documentation with code examples
- **Demo Page**: Live example at `/widget-demo`

### 10. **Error Handling & Edge Cases**
- **Network Failures**: Silent fail with no notification
- **Invalid Slug**: Log error, don't show notification
- **No Updates**: Don't show notification
- **Storage Errors**: Fallback to session-based dismissal
- **CORS Issues**: Handled by existing API CORS headers

This plan creates a lightweight, embeddable widget that integrates seamlessly with the existing whats-new API infrastructure while providing a smooth user experience for end-users visiting websites that implement it.
