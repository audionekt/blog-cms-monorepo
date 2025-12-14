import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactDOM from 'react-dom';
import { Dropdown } from '../dropdown';

const testOptions = ['Option 1', 'Option 2', 'Option 3'];

describe('Dropdown', () => {
  beforeEach(() => {
    // Mock createPortal to render in the same container
    jest.spyOn(ReactDOM, 'createPortal').mockImplementation((element) => element as React.ReactPortal);
    
    // Mock scrollIntoView as it's not implemented in JSDOM
    Element.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders dropdown trigger', () => {
    render(<Dropdown options={testOptions} />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Dropdown label="Country" options={testOptions} />);
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(<Dropdown label="City" options={testOptions} required />);
    const label = screen.getByText(/city/i).parentElement;
    expect(label?.textContent).toContain('*');
  });

  it('displays placeholder when no value selected', () => {
    render(<Dropdown options={testOptions} placeholder="Choose an option" />);
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('displays selected value', () => {
    render(<Dropdown options={testOptions} value="Option 1" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('opens dropdown menu on click', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={testOptions} />);
    const trigger = screen.getByRole('combobox');
    
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  it('displays all options when opened', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={testOptions} />);
    const trigger = screen.getByRole('combobox');
    
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  });

  it('calls onChange when option is selected', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Dropdown options={testOptions} onChange={handleChange} />);
    const trigger = screen.getByRole('combobox');
    
    await user.click(trigger);
    
    await waitFor(() => {
      const option = screen.getByText('Option 2');
      expect(option).toBeInTheDocument();
    });
    
    const option = screen.getByText('Option 2');
    await user.click(option);
    
    expect(handleChange).toHaveBeenCalledWith('Option 2');
  });

  it('closes dropdown after selecting option in single select mode', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={testOptions} />);
    const trigger = screen.getByRole('combobox');
    
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    const option = screen.getByText('Option 1');
    await user.click(option);
    
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('supports multi-select mode', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const TestComponent = () => {
      const [value, setValue] = React.useState<string[]>([]);
      return (
        <Dropdown 
          options={testOptions} 
          multiple 
          value={value}
          onChange={(newValue) => {
            setValue(newValue as string[]);
            handleChange(newValue);
          }} 
        />
      );
    };
    render(<TestComponent />);
    const trigger = screen.getByRole('combobox');
    
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    const option1 = screen.getByText('Option 1');
    await user.click(option1);
    
    expect(handleChange).toHaveBeenCalledWith(['Option 1']);
    
    const option2 = screen.getByText('Option 2');
    await user.click(option2);
    
    expect(handleChange).toHaveBeenLastCalledWith(['Option 1', 'Option 2']);
  });

  it('keeps dropdown open in multi-select mode', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={testOptions} multiple />);
    const trigger = screen.getByRole('combobox');
    
    await user.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    const option = screen.getByText('Option 1');
    await user.click(option);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  it('displays search input when searchable', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={testOptions} searchable />);
    const trigger = screen.getByRole('combobox');
    
    await user.click(trigger);
    
    const searchInput = await screen.findByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('filters options based on search query', async () => {
    const user = userEvent.setup();
    render(<Dropdown options={testOptions} searchable searchPlaceholder="Search..." />);
    const trigger = screen.getByRole('combobox');
    
    await user.click(trigger);
    
    const searchInput = await screen.findByPlaceholderText('Search...');
    await user.type(searchInput, 'Option 1');
    
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    });
  });

  it('displays error message', () => {
    render(<Dropdown options={testOptions} error="Country is required" />);
    expect(screen.getByText('Country is required')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Dropdown options={testOptions} helper="Select your country" />);
    expect(screen.getByText('Select your country')).toBeInTheDocument();
  });

  it('renders disabled dropdown', () => {
    render(<Dropdown options={testOptions} disabled value="Option 1" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
  });

  it('uses custom getItemLabel', () => {
    interface Item {
      name: string;
      id: number;
    }
    const items: Item[] = [
      { name: 'Item 1', id: 1 },
      { name: 'Item 2', id: 2 },
    ];
    
    render(
      <Dropdown
        options={items}
        value={items[0]}
        getItemLabel={(item) => item.name}
      />
    );
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('uses custom renderSelected', () => {
    render(
      <Dropdown
        options={testOptions}
        value="Option 1"
        renderSelected={() => <span>Custom Selected</span>}
      />
    );
    
    expect(screen.getByText('Custom Selected')).toBeInTheDocument();
  });

  it('generates unique id when not provided', () => {
    const { container } = render(
      <>
        <Dropdown label="First" options={testOptions} />
        <Dropdown label="Second" options={testOptions} />
      </>
    );
    
    const triggers = container.querySelectorAll('button');
    expect(triggers[0].getAttribute('aria-controls')).not.toBe(
      triggers[1].getAttribute('aria-controls')
    );
  });

  it('uses provided id', () => {
    render(<Dropdown label="Country" options={testOptions} id="custom-id" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-controls', 'custom-id-menu');
  });

  describe('Keyboard navigation', () => {
    it('opens dropdown on Enter key', async () => {
      const user = userEvent.setup();
      render(<Dropdown options={testOptions} />);
      const trigger = screen.getByRole('combobox');
      
      trigger.focus();
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('closes dropdown on Escape key', async () => {
      const user = userEvent.setup();
      render(<Dropdown options={testOptions} />);
      const trigger = screen.getByRole('combobox');
      
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('Multi-select deselection', () => {
    it('deselects option when clicked again in multi-select', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Dropdown options={testOptions} multiple onChange={handleChange} value={['Option 1']} />);
      const trigger = screen.getByRole('combobox');
      
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
      
      const option1 = screen.getAllByText('Option 1')[1]; // Get the option in the menu, not the trigger
      await user.click(option1);
      
      expect(handleChange).toHaveBeenCalledWith(undefined);
    });

    it('displays count when multiple items selected', () => {
      render(<Dropdown options={testOptions} multiple value={['Option 1', 'Option 2']} />);
      expect(screen.getByText('2 selected')).toBeInTheDocument();
    });

    it('displays single item name when one item selected in multi-select', () => {
      render(<Dropdown options={testOptions} multiple value={['Option 1']} />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  describe('Custom render functions', () => {
    it('uses custom renderItem', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          options={testOptions}
          renderItem={(item) => <div>Custom: {item}</div>}
        />
      );
      const trigger = screen.getByRole('combobox');
      
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Custom: Option 1')).toBeInTheDocument();
      });
    });
  });

  describe('Search functionality', () => {
    it('calls onSearchChange when search input changes', async () => {
      const user = userEvent.setup();
      const handleSearchChange = jest.fn();
      render(<Dropdown options={testOptions} searchable onSearchChange={handleSearchChange} />);
      const trigger = screen.getByRole('combobox');
      
      await user.click(trigger);
      
      const searchInput = await screen.findByPlaceholderText(/search/i);
      await user.type(searchInput, 'test');
      
      await waitFor(() => {
        expect(handleSearchChange).toHaveBeenCalled();
      });
    });

    it('uses custom filterOptions', async () => {
      const user = userEvent.setup();
      const customFilter = jest.fn((options) => options.filter((o: string) => o.includes('1')));
      
      render(
        <Dropdown
          options={testOptions}
          searchable
          filterOptions={customFilter}
        />
      );
      const trigger = screen.getByRole('combobox');
      
      await user.click(trigger);
      
      const searchInput = await screen.findByPlaceholderText(/search/i);
      await user.type(searchInput, 'test');
      
      await waitFor(() => {
        expect(customFilter).toHaveBeenCalled();
      });
    });

    it('shows empty state when no options match search', async () => {
      const user = userEvent.setup();
      render(<Dropdown options={testOptions} searchable />);
      const trigger = screen.getByRole('combobox');
      
      await user.click(trigger);
      
      const searchInput = await screen.findByPlaceholderText(/search/i);
      await user.type(searchInput, 'nonexistent');
      
      await waitFor(() => {
        expect(screen.getByText('No options found')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('sets aria-expanded correctly', async () => {
      const user = userEvent.setup();
      render(<Dropdown options={testOptions} />);
      const trigger = screen.getByRole('combobox');
      
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      
      await user.click(trigger);
      
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('sets aria-invalid when error exists', () => {
      render(<Dropdown options={testOptions} error="Required" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-invalid', 'true');
    });

    it('links error message with aria-describedby', () => {
      render(<Dropdown options={testOptions} id="test-dropdown" error="Error message" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-describedby', 'test-dropdown-error');
    });

    it('links helper text with aria-describedby', () => {
      render(<Dropdown options={testOptions} id="test-dropdown" helper="Helper text" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-describedby', 'test-dropdown-helper');
    });
  });

  describe('Custom trigger', () => {
    it('renders custom trigger with children', () => {
      render(
        <Dropdown options={testOptions}>
          <button>Custom Trigger</button>
        </Dropdown>
      );
      expect(screen.getByText('Custom Trigger')).toBeInTheDocument();
    });
  });

  describe('Placement and positioning', () => {
    it('accepts custom placement prop', () => {
      render(<Dropdown options={testOptions} placement="top-start" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });

    it('accepts custom offset prop', () => {
      render(<Dropdown options={testOptions} offset={8} />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });

    it('accepts custom maxHeight prop', () => {
      render(<Dropdown options={testOptions} maxHeight={200} />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('Full width', () => {
    it('renders with fullWidth prop', () => {
      const { container } = render(<Dropdown options={testOptions} fullWidth />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('State prop', () => {
    it('applies error state when state prop is error', () => {
      render(<Dropdown options={testOptions} state="error" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });

    it('applies success state when state prop is success', () => {
      render(<Dropdown options={testOptions} state="success" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });
  });
});

