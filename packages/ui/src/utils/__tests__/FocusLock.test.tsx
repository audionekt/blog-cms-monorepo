import React from 'react';
import { render, screen, waitFor } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { FocusLock } from '../FocusLock';

describe('FocusLock', () => {
  beforeEach(() => {
    // Clear any existing focus
    document.body.focus();
  });

  it('focuses first focusable element on mount', () => {
    render(
      <FocusLock>
        <button>First</button>
        <button>Second</button>
      </FocusLock>
    );

    const firstButton = screen.getByText('First');
    expect(firstButton).toHaveFocus();
  });

  it('focuses container when no focusable elements', () => {
    const { container } = render(
      <FocusLock>
        <div>No focusable elements</div>
      </FocusLock>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveFocus();
    expect(wrapper).toHaveAttribute('tabindex', '-1');
  });

  it('locks focus within container with Tab key', async () => {
    const user = userEvent.setup();
    render(
      <FocusLock>
        <button>First</button>
        <button>Second</button>
        <button>Third</button>
      </FocusLock>
    );

    const firstButton = screen.getByText('First');
    const secondButton = screen.getByText('Second');
    const thirdButton = screen.getByText('Third');

    firstButton.focus();
    await user.tab();
    expect(secondButton).toHaveFocus();

    await user.tab();
    expect(thirdButton).toHaveFocus();

    // Should wrap to first
    await user.tab();
    expect(firstButton).toHaveFocus();
  });

  it('locks focus with Shift+Tab key', async () => {
    const user = userEvent.setup();
    render(
      <FocusLock>
        <button>First</button>
        <button>Second</button>
        <button>Third</button>
      </FocusLock>
    );

    const firstButton = screen.getByText('First');
    const thirdButton = screen.getByText('Third');

    firstButton.focus();
    // Shift+Tab from first should go to last
    await user.tab({ shift: true });
    expect(thirdButton).toHaveFocus();
  });

  it('returns focus on unmount when returnFocus is true', async () => {
    const TestComponent = ({ show }: { show: boolean }) => {
      return (
        <>
          <button>Outside</button>
          {show && (
            <FocusLock returnFocus>
              <button>Inside</button>
            </FocusLock>
          )}
        </>
      );
    };

    // Render without FocusLock first
    const { rerender } = render(<TestComponent show={false} />);
    const outsideButton = screen.getByText('Outside');

    // Focus outside button first (this will be captured as previousActiveElement)
    outsideButton.focus();
    expect(outsideButton).toHaveFocus();

    // Now mount FocusLock - it will capture outsideButton as previousActiveElement
    rerender(<TestComponent show={true} />);
    const insideButton = screen.getByText('Inside');
    
    // Wait for FocusLock to focus the inside button
    await waitFor(() => {
      expect(insideButton).toHaveFocus();
    });

    // Spy on focus method to verify it's called
    const focusSpy = jest.spyOn(outsideButton, 'focus');

    // Unmount should trigger cleanup and call focus on previousActiveElement
    rerender(<TestComponent show={false} />);
    
    // Verify focus was called on the previous active element
    expect(focusSpy).toHaveBeenCalled();
    
    focusSpy.mockRestore();
  });

  it('does not return focus when returnFocus is false', () => {
    const TestComponent = ({ show }: { show: boolean }) => {
      return (
        <>
          <button>Outside</button>
          {show && (
            <FocusLock returnFocus={false}>
              <button>Inside</button>
            </FocusLock>
          )}
        </>
      );
    };

    const { rerender } = render(<TestComponent show={true} />);
    const outsideButton = screen.getByText('Outside');
    const insideButton = screen.getByText('Inside');

    outsideButton.focus();
    insideButton.focus();

    rerender(<TestComponent show={false} />);
    // Focus should not return to outside button
    expect(outsideButton).not.toHaveFocus();
  });

  it('handles disabled elements correctly', () => {
    render(
      <FocusLock>
        <button disabled>Disabled</button>
        <button>Enabled</button>
      </FocusLock>
    );

    const enabledButton = screen.getByText('Enabled');
    expect(enabledButton).toHaveFocus();
  });

  it('handles mixed focusable elements', () => {
    render(
      <FocusLock>
        <input type="text" placeholder="Input" />
        <button>Button</button>
        <a href="#">Link</a>
      </FocusLock>
    );

    const input = screen.getByPlaceholderText('Input');
    expect(input).toHaveFocus();
  });
});

