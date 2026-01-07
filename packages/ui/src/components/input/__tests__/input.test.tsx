import React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { Input } from '../input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(<Input label="Email" required />);
    const label = screen.getByText(/email/i).parentElement;
    expect(label?.textContent).toContain('*');
  });

  it('renders left icon', () => {
    render(<Input leftIcon={<span data-testid="left-icon">←</span>} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon', () => {
    render(<Input rightIcon={<span data-testid="right-icon">→</span>} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input label="Username" error="Username is required" />);
    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  it('sets aria-invalid when error exists', () => {
    render(<Input label="Username" error="Invalid" />);
    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays helper text', () => {
    render(<Input label="Username" helper="Enter your username" />);
    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });

  it('renders disabled input', () => {
    render(<Input label="Username" disabled />);
    const input = screen.getByLabelText('Username');
    expect(input).toBeDisabled();
  });

  it('handles text input', async () => {
    const user = userEvent.setup();
    render(<Input label="Username" />);
    const input = screen.getByLabelText('Username');
    
    await user.type(input, 'testuser');
    expect(input).toHaveValue('testuser');
  });

  it('calls onChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Input label="Username" onChange={handleChange} />);
    
    const input = screen.getByLabelText('Username');
    await user.type(input, 'a');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('generates unique id when not provided', () => {
    const { container } = render(
      <>
        <Input label="First" />
        <Input label="Second" />
      </>
    );
    
    const inputs = container.querySelectorAll('input');
    expect(inputs[0].id).not.toBe(inputs[1].id);
  });

  it('uses provided id', () => {
    render(<Input label="Username" id="custom-id" />);
    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('id', 'custom-id');
  });
});
