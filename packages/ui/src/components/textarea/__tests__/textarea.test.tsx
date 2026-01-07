import React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { TextArea } from '../textarea';

describe('TextArea', () => {
  it('renders textarea element', () => {
    render(<TextArea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<TextArea label="Description" />);
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(<TextArea label="Message" required />);
    const label = screen.getByText(/message/i).parentElement;
    expect(label?.textContent).toContain('*');
  });

  it('renders with default rows', () => {
    const { container } = render(<TextArea />);
    const textarea = container.querySelector('textarea');
    expect(textarea?.getAttribute('rows')).toBe('4');
  });

  it('renders with custom rows', () => {
    const { container } = render(<TextArea rows={10} />);
    const textarea = container.querySelector('textarea');
    expect(textarea?.getAttribute('rows')).toBe('10');
  });

  it('displays error message', () => {
    render(<TextArea label="Description" error="Description is required" />);
    expect(screen.getByText('Description is required')).toBeInTheDocument();
  });

  it('sets aria-invalid when error exists', () => {
    render(<TextArea label="Description" error="Invalid" />);
    const textarea = screen.getByLabelText('Description');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays helper text', () => {
    render(<TextArea label="Description" helper="Enter a description" />);
    expect(screen.getByText('Enter a description')).toBeInTheDocument();
  });

  it('renders disabled textarea', () => {
    render(<TextArea label="Description" disabled />);
    const textarea = screen.getByLabelText('Description');
    expect(textarea).toBeDisabled();
  });

  it('handles text input', async () => {
    const user = userEvent.setup();
    render(<TextArea label="Description" />);
    const textarea = screen.getByLabelText('Description');
    
    await user.type(textarea, 'Test description');
    expect(textarea).toHaveValue('Test description');
  });

  it('calls onChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<TextArea label="Description" onChange={handleChange} />);
    
    const textarea = screen.getByLabelText('Description');
    await user.type(textarea, 'a');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('generates unique id when not provided', () => {
    const { container } = render(
      <>
        <TextArea label="First" />
        <TextArea label="Second" />
      </>
    );
    
    const textareas = container.querySelectorAll('textarea');
    expect(textareas[0].id).not.toBe(textareas[1].id);
  });

  it('uses provided id', () => {
    render(<TextArea label="Description" id="custom-id" />);
    const textarea = screen.getByLabelText('Description');
    expect(textarea).toHaveAttribute('id', 'custom-id');
  });
});
