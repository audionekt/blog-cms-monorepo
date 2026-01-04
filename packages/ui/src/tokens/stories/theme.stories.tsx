import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Typography } from '../../components/typography';

const meta = {
  title: 'Design System/Theme',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ThemeShowcase = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Theme Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <Typography variant="h2">
            Theme Showcase
          </Typography>
        </div>

        {/* Component Showcase */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <Card padding="lg">
            <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
              Primary Card
            </Typography>
            <Typography variant="p" style={{ marginBottom: '1rem' }}>
              Cards automatically adapt to the current theme, adjusting backgrounds and borders.
            </Typography>
            <Button variant="primary" fullWidth>
              Primary Action
            </Button>
          </Card>

          <Card variant="elevated" padding="lg">
            <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
              Elevated Card
            </Typography>
            <Typography variant="p" style={{ marginBottom: '1rem' }}>
              Elevated variant uses shadows for depth in both light and dark modes.
            </Typography>
            <Button variant="secondary" fullWidth>
              Secondary Action
            </Button>
          </Card>

          <Card variant="outlined" padding="lg">
            <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
              Outlined Card
            </Typography>
            <Typography variant="p" style={{ marginBottom: '1rem' }}>
              Outlined cards provide a lighter visual weight with border emphasis.
            </Typography>
            <Button variant="ghost" fullWidth>
              Ghost Action
            </Button>
          </Card>
        </div>

        {/* State Colors */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <Button variant="success" fullWidth>
            Success State
          </Button>
          <Button variant="danger" fullWidth>
            Error State
          </Button>
        </div>

        {/* Typography Scale */}
        <Card padding="lg">
          <Typography variant="h1" style={{ marginBottom: '0.5rem' }}>
            Heading 1
          </Typography>
          <Typography variant="h2" style={{ marginBottom: '0.5rem' }}>
            Heading 2
          </Typography>
          <Typography variant="h3" style={{ marginBottom: '0.5rem' }}>
            Heading 3
          </Typography>
          <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
            Heading 4
          </Typography>
          <Typography variant="p" style={{ marginBottom: '0.5rem' }}>
            Body text that adapts to the theme with proper foreground colors.
          </Typography>
          <Typography variant="caption">
            Caption text • Smaller and muted
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export const InteractiveThemeSwitch: Story = {
  render: () => <ThemeShowcase />,
};

const ComponentShowcase = () => (
  <div style={{ padding: '2rem', minHeight: '100vh' }}>
    <Typography variant="h2" style={{ marginBottom: '1.5rem' }}>
      Component Showcase
    </Typography>
    
    <Card padding="lg" style={{ marginBottom: '1rem' }}>
      <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
        Card Component
      </Typography>
      <Typography variant="p">
        Cards with styled-components theme integration.
      </Typography>
    </Card>

    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  </div>
);

export const ComponentShowcaseStory: Story = {
  render: () => <ComponentShowcase />,
};

// Removed theme adaptation story - styled-components handles theming differently

