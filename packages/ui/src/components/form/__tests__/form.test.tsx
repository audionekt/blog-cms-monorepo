import React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { Form, FormSection, FormGrid, FormActions } from '../form';

describe('Form', () => {
  it('renders children', () => {
    render(
      <Form>
        <div>Form content</div>
      </Form>
    );
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('prevents default form submission', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn((e) => {
      expect(e.defaultPrevented).toBe(true);
    });

    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    await user.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('calls onSubmit handler', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    await user.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalled();
  });
});

describe('FormSection', () => {
  it('renders children', () => {
    render(
      <FormSection>
        <div>Section content</div>
      </FormSection>
    );
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<FormSection title="Personal Information"><div>Content</div></FormSection>);
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<FormSection description="Please provide your details"><div>Content</div></FormSection>);
    expect(screen.getByText('Please provide your details')).toBeInTheDocument();
  });

  it('renders title as h3 element', () => {
    render(<FormSection title="Section Title"><div>Content</div></FormSection>);
    const title = screen.getByText('Section Title');
    expect(title.tagName).toBe('H3');
  });
});

describe('FormGrid', () => {
  it('renders children', () => {
    render(
      <FormGrid>
        <div>Grid item 1</div>
        <div>Grid item 2</div>
      </FormGrid>
    );
    expect(screen.getByText('Grid item 1')).toBeInTheDocument();
    expect(screen.getByText('Grid item 2')).toBeInTheDocument();
  });
});

describe('FormActions', () => {
  it('renders children', () => {
    render(
      <FormActions>
        <button>Cancel</button>
        <button>Submit</button>
      </FormActions>
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
