import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown } from './dropdown';
import { Button } from '../button';

const countryOptions = ['United States', 'Canada', 'Mexico', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia'];

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countryObjects: Country[] = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦' },
  { code: 'mx', name: 'Mexico', flag: '🇲🇽' },
  { code: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'de', name: 'Germany', flag: '🇩🇪' },
  { code: 'fr', name: 'France', flag: '🇫🇷' },
];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helper: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    searchable: { control: 'boolean' },
    multiple: { control: 'boolean' },
  },
} satisfies Meta<typeof Dropdown<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Dropdown
        options={countryOptions}
        value={value}
        onChange={setValue}
        placeholder="Select a country"
      />
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Dropdown
        label="Country"
        options={countryOptions}
        value={value}
        onChange={setValue}
        placeholder="Choose a country"
      />
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Dropdown
        label="Country"
        options={countryOptions}
        value={value}
        onChange={setValue}
        required
        placeholder="Select a country"
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Dropdown
        label="Country"
        options={countryOptions}
        value={value}
        onChange={setValue}
        error="Please select a country"
        placeholder="Select a country"
      />
    );
  },
};

export const WithHelper: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Dropdown
        label="Country"
        options={countryOptions}
        value={value}
        onChange={setValue}
        helper="Select your country of residence"
        placeholder="Select a country"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Dropdown
        label="Country"
        options={countryOptions}
        value="United States"
        disabled
      />
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Dropdown
        label="Country"
        options={countryOptions}
        value={value}
        onChange={setValue}
        fullWidth
        placeholder="Select a country"
      />
    );
  },
};

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Dropdown
        label="Country"
        options={countryOptions}
        value={value}
        onChange={setValue}
        searchable
        searchPlaceholder="Search countries..."
        placeholder="Select a country"
      />
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[] | undefined>();
    return (
      <Dropdown
        label="Countries"
        options={countryOptions}
        value={value}
        onChange={setValue}
        multiple
        placeholder="Select countries"
      />
    );
  },
};

export const SearchableMultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[] | undefined>();
    return (
      <Dropdown
        label="Countries"
        options={countryOptions}
        value={value}
        onChange={setValue}
        multiple
        searchable
        searchPlaceholder="Search countries..."
        placeholder="Select countries"
      />
    );
  },
};

export const WithCustomRenderers: Story = {
  render: () => {
    const [value, setValue] = useState<Country | undefined>();
    return (
      <Dropdown
        label="Country"
        options={countryObjects}
        value={value}
        onChange={setValue}
        getItemLabel={(item) => item.name}
        renderItem={(item, index, selected) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{item.flag}</span>
            <span>{item.name}</span>
            {selected && <span style={{ marginLeft: 'auto' }}>✓</span>}
          </div>
        )}
        renderSelected={(item) => (
          item ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{item.flag}</span>
              <span>{item.name}</span>
            </div>
          ) : (
            <span style={{ color: '#999' }}>Select a country</span>
          )
        )}
        placeholder="Select a country"
      />
    );
  },
};

export const CustomTrigger: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Dropdown
        options={countryOptions}
        value={value}
        onChange={setValue}
      >
        <Button variant="secondary">
          {value || 'Select Country'} ▼
        </Button>
      </Dropdown>
    );
  },
};

export const ManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    const manyOptions = Array.from({ length: 100 }, (_, i) => `Option ${i + 1}`);
    return (
      <Dropdown
        label="Choose a Number"
        options={manyOptions}
        value={value}
        onChange={setValue}
        searchable
        searchPlaceholder="Search options..."
        placeholder="Select an option"
      />
    );
  },
};

export const GenericWithObjects: Story = {
  render: () => {
    const [value, setValue] = useState<Country | undefined>();
    return (
      <Dropdown
        label="Country"
        options={countryObjects}
        value={value}
        onChange={setValue}
        getItemLabel={(item) => `${item.flag} ${item.name}`}
        placeholder="Select a country"
      />
    );
  },
};

