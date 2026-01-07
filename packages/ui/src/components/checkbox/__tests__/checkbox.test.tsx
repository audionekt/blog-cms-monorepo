import React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../checkbox';

describe('Checkbox', () => {
  describe('Basic rendering', () => {
    it('renders checkbox input', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders without label', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });
  });

  describe('States', () => {
    it('renders unchecked by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('renders checked when checked prop is true', () => {
      render(<Checkbox checked readOnly />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('renders as disabled', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('renders with defaultChecked', () => {
      render(<Checkbox defaultChecked />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('Interactions', () => {
    it('toggles checked state when clicked', async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      
      expect(checkbox.checked).toBe(false);
      await user.click(checkbox);
      expect(checkbox.checked).toBe(true);
      await user.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });

    it('calls onChange when clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Checkbox onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');
      
      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Checkbox disabled onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');
      
      await user.click(checkbox);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('toggles when label is clicked', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Click me" />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      const label = screen.getByText('Click me');
      
      expect(checkbox.checked).toBe(false);
      await user.click(label);
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('Error and helper text', () => {
    it('displays error message', () => {
      render(<Checkbox error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('sets aria-invalid when error exists', () => {
      render(<Checkbox error="Error message" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });

    it('links error message with aria-describedby', () => {
      render(<Checkbox id="test-checkbox" error="Error message" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'test-checkbox-error');
    });

    it('displays helper text', () => {
      render(<Checkbox helper="This is helpful information" />);
      expect(screen.getByText('This is helpful information')).toBeInTheDocument();
    });

    it('links helper text with aria-describedby', () => {
      render(<Checkbox id="test-checkbox" helper="Helper text" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'test-checkbox-helper');
    });

    it('prioritizes error over helper text', () => {
      render(<Checkbox error="Error" helper="Helper" />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });
  });

  describe('ID generation', () => {
    it('generates unique id when not provided', () => {
      const { container } = render(
        <>
          <Checkbox />
          <Checkbox />
        </>
      );
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      const id1 = checkboxes[0].id;
      const id2 = checkboxes[1].id;
      
      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });

    it('uses provided id', () => {
      render(<Checkbox id="custom-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id', 'custom-checkbox');
    });
  });

  describe('HTML attributes', () => {
    it('forwards HTML attributes to input element', () => {
      render(<Checkbox data-testid="custom-checkbox" aria-label="Test checkbox" name="test" />);
      const checkbox = screen.getByTestId('custom-checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Test checkbox');
      expect(checkbox).toHaveAttribute('name', 'test');
    });

    it('applies custom className to wrapper', () => {
      const { container } = render(<Checkbox className="custom-class" />);
      const label = container.querySelector('label');
      expect(label).toHaveClass('custom-class');
    });

    it('supports required attribute', () => {
      render(<Checkbox required />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeRequired();
    });

    it('supports value attribute', () => {
      render(<Checkbox value="checkbox-value" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('value', 'checkbox-value');
    });
  });

  describe('Controlled component', () => {
    it('works as controlled component', async () => {
      const user = userEvent.setup();
      const ControlledCheckbox = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            label="Controlled"
          />
        );
      };

      render(<ControlledCheckbox />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      
      expect(checkbox.checked).toBe(false);
      await user.click(checkbox);
      expect(checkbox.checked).toBe(true);
      await user.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });
  });
});

