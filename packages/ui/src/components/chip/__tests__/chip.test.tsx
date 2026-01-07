import React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { Chip } from '../chip';

describe('Chip', () => {
  describe('Basic rendering', () => {
    it('renders as span element', () => {
      render(<Chip>Span element</Chip>);
      const chip = screen.getByText('Span element');
      expect(chip.tagName).toBe('SPAN');
    });

    it('forwards HTML attributes to the element', () => {
      render(
        <Chip data-testid="custom-chip" aria-label="Test chip">
          With attributes
        </Chip>
      );
      const chip = screen.getByTestId('custom-chip');
      expect(chip).toHaveAttribute('aria-label', 'Test chip');
    });

    it('renders text children', () => {
      render(<Chip>Tag text</Chip>);
      expect(screen.getByText('Tag text')).toBeInTheDocument();
    });

    it('renders with icon and text', () => {
      render(
        <Chip>
          <span>Icon</span> Text
        </Chip>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText(/Text/)).toBeInTheDocument();
    });

    it('works in a list of tags', () => {
      render(
        <div>
          <Chip>Tag 1</Chip>
          <Chip>Tag 2</Chip>
          <Chip>Tag 3</Chip>
        </div>
      );
      expect(screen.getByText('Tag 1')).toBeInTheDocument();
      expect(screen.getByText('Tag 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 3')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Chip variant="default">Default</Chip>);
      expect(screen.getByText('Default')).toBeInTheDocument();
    });

    it('renders outlined variant', () => {
      render(<Chip variant="outlined">Outlined</Chip>);
      expect(screen.getByText('Outlined')).toBeInTheDocument();
    });

    it('renders featured variant', () => {
      render(<Chip variant="featured">Featured</Chip>);
      expect(screen.getByText('Featured')).toBeInTheDocument();
    });

    it('renders success variant', () => {
      render(<Chip variant="success">Success</Chip>);
      expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('renders warning variant', () => {
      render(<Chip variant="warning">Warning</Chip>);
      expect(screen.getByText('Warning')).toBeInTheDocument();
    });

    it('renders error variant', () => {
      render(<Chip variant="error">Error</Chip>);
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Chip size="sm">Small</Chip>);
      expect(screen.getByText('Small')).toBeInTheDocument();
    });

    it('renders medium size by default', () => {
      render(<Chip>Medium</Chip>);
      expect(screen.getByText('Medium')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<Chip size="lg">Large</Chip>);
      expect(screen.getByText('Large')).toBeInTheDocument();
    });
  });

  describe('Colors', () => {
    it('renders amethyst color', () => {
      render(<Chip color="amethyst">Amethyst</Chip>);
      expect(screen.getByText('Amethyst')).toBeInTheDocument();
    });

    it('renders sky color', () => {
      render(<Chip color="sky">Sky</Chip>);
      expect(screen.getByText('Sky')).toBeInTheDocument();
    });

    it('renders ruby color', () => {
      render(<Chip color="ruby">Ruby</Chip>);
      expect(screen.getByText('Ruby')).toBeInTheDocument();
    });

    it('renders sage color', () => {
      render(<Chip color="sage">Sage</Chip>);
      expect(screen.getByText('Sage')).toBeInTheDocument();
    });

    it('renders gold color', () => {
      render(<Chip color="gold">Gold</Chip>);
      expect(screen.getByText('Gold')).toBeInTheDocument();
    });

    it('renders charcoal color', () => {
      render(<Chip color="charcoal">Charcoal</Chip>);
      expect(screen.getByText('Charcoal')).toBeInTheDocument();
    });

    it('uses color over variant when both are provided', () => {
      render(<Chip variant="success" color="amethyst">Color Priority</Chip>);
      expect(screen.getByText('Color Priority')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('handles onClick events', () => {
      const handleClick = jest.fn();
      render(<Chip onClick={handleClick}>Clickable chip</Chip>);
      const chip = screen.getByText('Clickable chip');
      chip.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick with event', () => {
      const handleClick = jest.fn();
      render(<Chip onClick={handleClick}>Click me</Chip>);
      const chip = screen.getByText('Click me');
      chip.click();
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('Dismissible', () => {
    it('renders dismiss button when dismissible', () => {
      const handleDismiss = jest.fn();
      render(<Chip dismissible onDismiss={handleDismiss}>Dismissible</Chip>);
      const dismissButton = screen.getByRole('button', { name: /dismiss/i });
      expect(dismissButton).toBeInTheDocument();
    });

    it('does not render dismiss button when not dismissible', () => {
      render(<Chip>Not dismissible</Chip>);
      const dismissButton = screen.queryByRole('button', { name: /dismiss/i });
      expect(dismissButton).not.toBeInTheDocument();
    });

    it('calls onDismiss when dismiss button is clicked', async () => {
      const user = userEvent.setup();
      const handleDismiss = jest.fn();
      render(<Chip dismissible onDismiss={handleDismiss}>Dismissible</Chip>);
      const dismissButton = screen.getByRole('button', { name: /dismiss/i });
      await user.click(dismissButton);
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when dismiss button is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      const handleDismiss = jest.fn();
      render(
        <Chip onClick={handleClick} dismissible onDismiss={handleDismiss}>
          Dismissible
        </Chip>
      );
      const dismissButton = screen.getByRole('button', { name: /dismiss/i });
      await user.click(dismissButton);
      expect(handleDismiss).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not render dismiss button when dismissible but no onDismiss', () => {
      render(<Chip dismissible>No handler</Chip>);
      const dismissButton = screen.queryByRole('button', { name: /dismiss/i });
      expect(dismissButton).not.toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(<Chip className="custom-class">Custom</Chip>);
      const chip = screen.getByText('Custom');
      expect(chip).toHaveClass('custom-class');
    });
  });
});
