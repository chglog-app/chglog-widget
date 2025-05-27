import React, { useState } from 'react';
import { WhatsNewWidget } from '@chglog/whats-new-widget';

const App: React.FC = () => {
  const [repositorySlug, setRepositorySlug] = useState('demo-project');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [showAvatar, setShowAvatar] = useState(true);
  const [maxWidth, setMaxWidth] = useState(400);

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ marginBottom: '30px', color: '#333' }}>
          WhatsNew Widget - React Example
        </h1>
        
        <div style={{ marginBottom: '30px' }}>
          <p>
            This example demonstrates how to use the WhatsNew widget in a React application.
            Configure the widget using the controls below and see the changes in real-time.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Repository Slug:
            </label>
            <input
              type="text"
              value={repositorySlug}
              onChange={(e) => setRepositorySlug(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px'
              }}
              placeholder="Enter repository slug"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Position:
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as any)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-right">Top Right</option>
              <option value="top-left">Top Left</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Theme:
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Max Width:
            </label>
            <input
              type="number"
              value={maxWidth}
              onChange={(e) => setMaxWidth(Number(e.target.value))}
              min="300"
              max="600"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showAvatar}
              onChange={(e) => setShowAvatar(e.target.checked)}
            />
            <span style={{ fontWeight: '600' }}>Show Avatar</span>
          </label>
        </div>

        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          borderLeft: '4px solid #007bff',
          marginBottom: '30px'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Current Configuration:</h3>
          <pre style={{
            backgroundColor: '#f1f3f4',
            padding: '15px',
            borderRadius: '6px',
            fontSize: '14px',
            overflow: 'auto',
            margin: 0
          }}>
{`<WhatsNewWidget
  repositorySlug="${repositorySlug}"
  position="${position}"
  theme="${theme}"
  maxWidth={${maxWidth}}
  showAvatar={${showAvatar}}
/>`}
          </pre>
        </div>

        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '20px',
          borderRadius: '8px',
          borderLeft: '4px solid #28a745'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Features Demonstrated:</h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>✅ Real-time configuration updates</li>
            <li>✅ Responsive positioning</li>
            <li>✅ Theme switching</li>
            <li>✅ Customizable dimensions</li>
            <li>✅ Avatar toggle</li>
            <li>✅ TypeScript integration</li>
          </ul>
        </div>
      </div>

      {/* The actual widget */}
      <WhatsNewWidget
        repositorySlug={repositorySlug}
        position={position}
        theme={theme}
        maxWidth={maxWidth}
        showAvatar={showAvatar}
        customStyles={{
          fontFamily: 'inherit'
        }}
      />
    </div>
  );
};

export default App; 