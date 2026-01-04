import type { Meta, StoryObj } from '@storybook/react';
import { colors } from '../colors';

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Color Swatch Component
const ColorSwatch = ({ name, value, large = false }: { name: string; value: string; large?: boolean }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '0.5rem',
    minWidth: large ? '200px' : '150px',
  }}>
    <div
      style={{
        height: large ? '120px' : '80px',
        borderRadius: '8px',
        backgroundColor: value,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <span style={{ 
        fontFamily: 'monospace', 
        fontSize: '0.875rem',
        fontWeight: 600,
        color: '#374151'
      }}>
        {name}
      </span>
      <span style={{ 
        fontFamily: 'monospace', 
        fontSize: '0.75rem',
        color: '#6b7280'
      }}>
        {value}
      </span>
    </div>
  </div>
);

const ColorScale = ({ title, scale }: { title: string; scale: Record<string, string> }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{ 
      fontSize: '1.25rem', 
      fontWeight: 600, 
      marginBottom: '1rem',
      color: '#0f172a'
    }}>
      {title}
    </h3>
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '1rem'
    }}>
      {Object.entries(scale).map(([key, value]) => (
        <ColorSwatch key={key} name={key} value={value} />
      ))}
    </div>
  </div>
);

const SemanticGroup = ({ title, group }: { title: string; group: Record<string, string> }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{ 
      fontSize: '1.125rem', 
      fontWeight: 600, 
      marginBottom: '1rem',
      color: '#0f172a'
    }}>
      {title}
    </h3>
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '1rem'
    }}>
      {Object.entries(group).map(([key, value]) => (
        <ColorSwatch key={key} name={key} value={value} large />
      ))}
    </div>
  </div>
);

export const PrimitiveSlate: Story = {
  render: () => <ColorScale title="Slate" scale={colors.primitive.slate} />,
};

export const PrimitiveViolet: Story = {
  render: () => <ColorScale title="Violet" scale={colors.primitive.violet} />,
};

export const PrimitiveEmerald: Story = {
  render: () => <ColorScale title="Emerald" scale={colors.primitive.emerald} />,
};

export const PrimitiveRose: Story = {
  render: () => <ColorScale title="Rose" scale={colors.primitive.rose} />,
};

export const PrimitiveAmber: Story = {
  render: () => <ColorScale title="Amber" scale={colors.primitive.amber} />,
};

export const AllPrimitives: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#0f172a' }}>
        Primitive Color Scales
      </h2>
      <p style={{ marginBottom: '2rem', color: '#64748b', lineHeight: 1.6 }}>
        Foundational color scales that form the basis of the Nexus design system.
      </p>
      <ColorScale title="Slate" scale={colors.primitive.slate} />
      <ColorScale title="Violet" scale={colors.primitive.violet} />
      <ColorScale title="Emerald" scale={colors.primitive.emerald} />
      <ColorScale title="Rose" scale={colors.primitive.rose} />
      <ColorScale title="Amber" scale={colors.primitive.amber} />
    </div>
  ),
};

export const SemanticBrand: Story = {
  render: () => <SemanticGroup title="Brand Colors" group={colors.semantic.brand} />,
};

export const SemanticBackground: Story = {
  render: () => <SemanticGroup title="Background Colors" group={colors.semantic.background} />,
};

export const SemanticForeground: Story = {
  render: () => <SemanticGroup title="Foreground Colors" group={colors.semantic.foreground} />,
};

export const SemanticBorder: Story = {
  render: () => <SemanticGroup title="Border Colors" group={colors.semantic.border} />,
};

export const SemanticStates: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#0f172a' }}>
        Semantic State Colors
      </h2>
      <SemanticGroup title="Success" group={colors.semantic.success} />
      <SemanticGroup title="Error" group={colors.semantic.error} />
      <SemanticGroup title="Warning" group={colors.semantic.warning} />
    </div>
  ),
};

export const SemanticCode: Story = {
  render: () => <SemanticGroup title="Code Syntax Colors" group={colors.semantic.code} />,
};

export const AllSemanticColors: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#0f172a' }}>
        Semantic Colors
      </h2>
      <p style={{ marginBottom: '2rem', color: '#64748b', lineHeight: 1.6 }}>
        Purpose-driven color mappings for consistent UI implementation. These colors adapt to light and dark themes.
      </p>
      <SemanticGroup title="Brand" group={colors.semantic.brand} />
      <SemanticGroup title="Background" group={colors.semantic.background} />
      <SemanticGroup title="Foreground" group={colors.semantic.foreground} />
      <SemanticGroup title="Border" group={colors.semantic.border} />
      <SemanticGroup title="Success" group={colors.semantic.success} />
      <SemanticGroup title="Error" group={colors.semantic.error} />
      <SemanticGroup title="Warning" group={colors.semantic.warning} />
      <SemanticGroup title="Highlight" group={colors.semantic.highlight} />
      <SemanticGroup title="Code" group={colors.semantic.code} />
    </div>
  ),
};

export const ColorPalette: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>
        Complete Color Palette
      </h2>
      <p style={{ marginBottom: '2rem', color: '#64748b', lineHeight: 1.6 }}>
        All primitive color scales in the Nexus design system.
      </p>
      <div style={{ display: 'grid', gap: '3rem' }}>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#0f172a' }}>
            Neutral
          </h3>
          <ColorScale title="Slate" scale={colors.primitive.slate} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#0f172a' }}>
            Brand & Accent Colors
          </h3>
          <ColorScale title="Violet" scale={colors.primitive.violet} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#0f172a' }}>
            State Colors
          </h3>
          <ColorScale title="Emerald" scale={colors.primitive.emerald} />
          <ColorScale title="Rose" scale={colors.primitive.rose} />
          <ColorScale title="Amber" scale={colors.primitive.amber} />
        </div>
      </div>
    </div>
  ),
};

export const ColorUsageExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>
        Color Usage Examples
      </h2>
      
      {/* Primary Button */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#64748b' }}>
          Primary Button (Violet)
        </h3>
        <button style={{
          backgroundColor: colors.semantic.brand.primary,
          color: colors.semantic.foreground.onBrand,
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}>
          Click Me
        </button>
      </div>

      {/* Colored Chips */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#64748b' }}>
          Chip Colors
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { name: 'Violet', bg: colors.primitive.violet[100], fg: colors.primitive.violet[700] },
            { name: 'Emerald', bg: colors.primitive.emerald[100], fg: colors.primitive.emerald[600] },
            { name: 'Rose', bg: colors.primitive.rose[50], fg: colors.primitive.rose[600] },
            { name: 'Amber', bg: colors.primitive.amber[100], fg: colors.primitive.amber[700] },
            { name: 'Slate', bg: colors.primitive.slate[200], fg: colors.primitive.slate[700] },
          ].map(({ name, bg, fg }) => (
            <span
              key={name}
              style={{
                backgroundColor: bg,
                color: fg,
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Card */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#64748b' }}>
          Card Component
        </h3>
        <div style={{
          backgroundColor: colors.semantic.background.content,
          border: `1px solid ${colors.semantic.border.default}`,
          borderRadius: '0.75rem',
          padding: '1.5rem',
          maxWidth: '400px',
        }}>
          <h4 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 600, 
            color: colors.semantic.foreground.primary,
            marginBottom: '0.5rem'
          }}>
            Card Title
          </h4>
          <p style={{ 
            color: colors.semantic.foreground.secondary,
            lineHeight: 1.6
          }}>
            This card uses semantic background and border colors for consistency.
          </p>
        </div>
      </div>

      {/* Alert States */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#64748b' }}>
          Alert States
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { type: 'Success', stateColors: colors.semantic.success },
            { type: 'Error', stateColors: colors.semantic.error },
            { type: 'Warning', stateColors: colors.semantic.warning },
          ].map(({ type, stateColors }) => (
            <div
              key={type}
              style={{
                backgroundColor: stateColors.subtle,
                border: `1px solid ${stateColors.border}`,
                borderRadius: '0.5rem',
                padding: '1rem',
                maxWidth: '400px',
              }}
            >
              <strong style={{ color: stateColors.text }}>{type}:</strong>{' '}
              <span style={{ color: stateColors.text }}>
                This is a {type.toLowerCase()} message
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const DarkThemeColors: Story = {
  render: () => (
    <div style={{ 
      backgroundColor: colors.semanticDark.background.base, 
      padding: '2rem', 
      borderRadius: '1rem',
      color: colors.semanticDark.foreground.primary
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        Dark Theme Colors
      </h2>
      <p style={{ marginBottom: '2rem', color: colors.semanticDark.foreground.secondary, lineHeight: 1.6 }}>
        Preview of semantic colors in dark mode.
      </p>
      
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Brand Colors */}
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Brand</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {Object.entries(colors.semanticDark.brand).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ 
                  width: '80px', 
                  height: '50px', 
                  backgroundColor: value, 
                  borderRadius: '0.5rem',
                  border: `1px solid ${colors.semanticDark.border.default}`
                }} />
                <span style={{ fontSize: '0.75rem', color: colors.semanticDark.foreground.secondary }}>{key}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Background Colors */}
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Background</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {Object.entries(colors.semanticDark.background).filter(([, value]) => typeof value === 'string').map(([key, value]) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ 
                  width: '80px', 
                  height: '50px', 
                  backgroundColor: value as string, 
                  borderRadius: '0.5rem',
                  border: `1px solid ${colors.semanticDark.border.default}`
                }} />
                <span style={{ fontSize: '0.75rem', color: colors.semanticDark.foreground.secondary }}>{key}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};
