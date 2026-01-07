import React from 'react';
import { render, screen } from '../../../test-utils';
import { Typography } from '../typography';

describe('Typography', () => {
  it('renders h1 variant as H1 element', () => {
    render(<Typography variant="h1">Heading 1</Typography>);
    const element = screen.getByText('Heading 1');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('H1');
  });

  it('renders h2 variant as H2 element', () => {
    render(<Typography variant="h2">Heading 2</Typography>);
    const element = screen.getByText('Heading 2');
    expect(element.tagName).toBe('H2');
  });

  it('renders p variant by default', () => {
    render(<Typography>Default text</Typography>);
    const element = screen.getByText('Default text');
    expect(element.tagName).toBe('P');
  });

  it('renders as custom element when as prop is provided', () => {
    render(<Typography variant="p" as="div">Custom element</Typography>);
    const element = screen.getByText('Custom element');
    expect(element.tagName).toBe('DIV');
  });

  it('forwards HTML attributes to the element', () => {
    render(
      <Typography variant="p" data-testid="custom-id" aria-label="Test label">
        With attributes
      </Typography>
    );
    const element = screen.getByTestId('custom-id');
    expect(element).toHaveAttribute('aria-label', 'Test label');
  });

  it('handles onClick events', () => {
    const handleClick = jest.fn();
    render(<Typography variant="h2" onClick={handleClick}>Clickable</Typography>);
    const element = screen.getByText('Clickable');
    element.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders text children', () => {
    render(<Typography variant="p">Simple text</Typography>);
    expect(screen.getByText('Simple text')).toBeInTheDocument();
  });

  it('renders React element children', () => {
    render(
      <Typography variant="p">
        Text with <strong>bold</strong> content
      </Typography>
    );
    expect(screen.getByText(/Text with/)).toBeInTheDocument();
    expect(screen.getByText('bold')).toBeInTheDocument();
    expect(screen.getByText('bold').tagName).toBe('STRONG');
  });
});
