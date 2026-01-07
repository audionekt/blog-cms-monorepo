import React from 'react';
import { render, screen } from '../../../test-utils';
import { Card } from '../card';

describe('Card', () => {
  it('renders as article by default', () => {
    const { container } = render(<Card>Article card</Card>);
    const card = container.firstChild;
    expect(card?.nodeName).toBe('ARTICLE');
  });

  it('renders as custom element when as prop is provided', () => {
    const { container } = render(<Card as="div">Div card</Card>);
    const card = container.firstChild;
    expect(card?.nodeName).toBe('DIV');
  });

  it('forwards HTML attributes to the element', () => {
    render(
      <Card data-testid="custom-card" aria-label="Test card">
        With attributes
      </Card>
    );
    const card = screen.getByTestId('custom-card');
    expect(card).toHaveAttribute('aria-label', 'Test card');
  });

  it('handles onClick events', () => {
    const handleClick = jest.fn();
    const { container } = render(<Card onClick={handleClick}>Clickable card</Card>);
    const card = container.firstChild as HTMLElement;
    card?.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders text children', () => {
    render(<Card>Simple text content</Card>);
    expect(screen.getByText('Simple text content')).toBeInTheDocument();
  });

  it('renders React element children', () => {
    render(
      <Card>
        <h2>Title</h2>
        <p>Content</p>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
