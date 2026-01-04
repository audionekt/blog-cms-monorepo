'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useListNavigation,
  FloatingFocusManager,
  Placement,
} from '@floating-ui/react';
import { Checkbox } from '../checkbox';
import * as S from './dropdown.styles';

export interface DropdownProps<T> {
  // Core props
  options: T[];
  value?: T | T[];
  onChange?: (value: T | T[] | undefined) => void;
  multiple?: boolean;

  // Render callbacks
  renderItem?: (item: T, index: number, selected: boolean) => React.ReactNode;
  renderSelected?: (item: T | T[] | undefined) => React.ReactNode;
  getItemLabel?: (item: T) => string;

  // Search functionality
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;
  filterOptions?: (options: T[], query: string) => T[];

  // Existing form props (maintained for consistency)
  label?: string;
  error?: string;
  helper?: string;
  state?: 'default' | 'error' | 'success';
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  id?: string;

  // Custom trigger
  children?: React.ReactNode;

  // Floating UI options
  placement?: Placement;
  offset?: number;
  maxHeight?: number;
}

function defaultGetItemLabel<T>(item: T): string {
  if (typeof item === 'string') return item;
  if (typeof item === 'object' && item !== null && 'label' in item) {
    return String((item as { label: unknown }).label);
  }
  return String(item);
}

function defaultFilterOptions<T>(
  options: T[],
  query: string,
  getItemLabel: (item: T) => string
): T[] {
  if (!query.trim()) return options;
  const lowerQuery = query.toLowerCase();
  return options.filter((item) =>
    getItemLabel(item).toLowerCase().includes(lowerQuery)
  );
}

export function Dropdown<T>({
  options,
  value,
  onChange,
  multiple = false,
  renderItem,
  renderSelected,
  getItemLabel = defaultGetItemLabel,
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearchChange,
  filterOptions: customFilterOptions,
  label,
  error,
  helper,
  state,
  fullWidth,
  disabled = false,
  required,
  placeholder,
  id,
  children,
  placement = 'bottom-start',
  offset: offsetValue = 4,
  maxHeight = 300,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);

  const dropdownId = id || `dropdown-${React.useId()}`;
  const dropdownState = error ? 'error' : state || 'default';

  const selectedValues = useMemo(() => {
    if (value === undefined) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const isSelected = (item: T): boolean => {
    return selectedValues.some((selected) => selected === item);
  };

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return options;
    const filterFn = customFilterOptions || ((opts, q) => defaultFilterOptions(opts, q, getItemLabel));
    return filterFn(options, searchQuery);
  }, [options, searchQuery, searchable, customFilterOptions, getItemLabel]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(offsetValue), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    focusItemOnOpen: false,
    openOnArrowKeyDown: false,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
  ]);

  useEffect(() => {
    if (isOpen && searchable) {
      setSearchQuery('');
      setActiveIndex(null);
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    if (activeIndex !== null && listRef.current[activeIndex]) {
      listRef.current[activeIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  const handleSelect = (item: T) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const isCurrentlySelected = isSelected(item);
      const newValues = isCurrentlySelected
        ? currentValues.filter((v) => v !== item)
        : [...currentValues, item];
      onChange?.(newValues.length > 0 ? (newValues as T[]) : undefined);
    } else {
      onChange?.(item as T | T[] | undefined);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (activeIndex !== null && activeIndex < filteredOptions.length) {
        const item = filteredOptions[activeIndex];
        if (item !== undefined) {
          handleSelect(item);
        }
      } else if (!isOpen) {
        setIsOpen(true);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
    setActiveIndex(null);
  };

  const defaultRenderItem = (item: T, index: number, selected: boolean) => {
    const label = getItemLabel(item);
    const isActive = activeIndex === index;
    return (
      <S.MenuItem
        key={index}
        type="button"
        ref={(node) => {
          listRef.current[index] = node;
        }}
        $isActive={isActive}
        $isSelected={selected}
        $disabled={disabled}
        {...getItemProps({
          onClick: () => !disabled && handleSelect(item),
        })}
        role="option"
        aria-selected={selected}
        tabIndex={isActive ? 0 : -1}
      >
        {multiple && (
          <Checkbox
            checked={selected}
            readOnly
            tabIndex={-1}
            aria-hidden="true"
            style={{ pointerEvents: 'none' }}
          />
        )}
        <span>{label}</span>
      </S.MenuItem>
    );
  };

  const defaultRenderSelected = () => {
    if (multiple) {
      if (selectedValues.length === 0) {
        return <S.TriggerPlaceholder>{placeholder || 'Select...'}</S.TriggerPlaceholder>;
      }
      if (selectedValues.length === 1) {
        return <span>{getItemLabel(selectedValues[0]!)}</span>;
      }
      return <span>{selectedValues.length} selected</span>;
    } else {
      if (!value) {
        return <S.TriggerPlaceholder>{placeholder || 'Select...'}</S.TriggerPlaceholder>;
      }
      return <span>{getItemLabel(value as T)}</span>;
    }
  };

  const renderTriggerContent = () => {
    if (children) {
      if (React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
          ref: refs.setReference,
          ...getReferenceProps({
            onClick: () => !disabled && setIsOpen(!isOpen),
            onKeyDown: handleKeyDown,
            'aria-expanded': isOpen,
            'aria-haspopup': 'listbox',
            'aria-controls': `${dropdownId}-menu`,
            disabled,
          }),
        });
      }
      // If children is not a valid element, wrap it
      return (
        <div
          ref={refs.setReference}
          {...getReferenceProps({
            onClick: () => !disabled && setIsOpen(!isOpen),
            onKeyDown: handleKeyDown,
            'aria-expanded': isOpen,
            'aria-haspopup': 'listbox',
            'aria-controls': `${dropdownId}-menu`,
          })}
        >
          {children}
        </div>
      );
    }

    return (
      <S.TriggerWrapper>
        <S.Trigger
          ref={refs.setReference}
          type="button"
          $state={dropdownState}
          $disabled={disabled}
          {...getReferenceProps({
            onClick: () => !disabled && setIsOpen(!isOpen),
            onKeyDown: handleKeyDown,
            'aria-expanded': isOpen,
            'aria-haspopup': 'listbox',
            'aria-controls': `${dropdownId}-menu`,
            'aria-invalid': error ? 'true' : 'false',
            'aria-describedby':
              error ? `${dropdownId}-error` : helper ? `${dropdownId}-helper` : undefined,
            disabled,
          })}
        >
          {renderSelected
            ? renderSelected(multiple ? (value as T[] | undefined) : (value as T | undefined))
            : defaultRenderSelected()}
        </S.Trigger>
        <S.DropdownIcon
          $isOpen={isOpen}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </S.DropdownIcon>
      </S.TriggerWrapper>
    );
  };

  return (
    <S.DropdownWrapper $fullWidth={fullWidth}>
      {label && (
        <S.Label htmlFor={dropdownId}>
          {label}
          {required && <S.Required>*</S.Required>}
        </S.Label>
      )}

      {renderTriggerContent()}

      {error && (
        <S.Message id={`${dropdownId}-error`} $type="error">
          <S.ErrorIcon fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </S.ErrorIcon>
          {error}
        </S.Message>
      )}

      {helper && !error && (
        <S.Message id={`${dropdownId}-helper`} $type="helper">
          {helper}
        </S.Message>
      )}

      {isOpen &&
        createPortal(
          <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
            <S.Menu
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                maxHeight: `${maxHeight}px`,
                width: refs.reference.current && 'offsetWidth' in refs.reference.current 
                  ? `${(refs.reference.current as HTMLElement).offsetWidth}px` 
                  : 'auto',
                minWidth: '200px',
              }}
              {...getFloatingProps()}
              id={`${dropdownId}-menu`}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  if (activeIndex === null || activeIndex >= filteredOptions.length - 1) {
                    setActiveIndex(0);
                  } else {
                    setActiveIndex(activeIndex + 1);
                  }
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  if (activeIndex === null || activeIndex <= 0) {
                    setActiveIndex(filteredOptions.length - 1);
                  } else {
                    setActiveIndex(activeIndex - 1);
                  }
                } else if (e.key === 'Enter' && activeIndex !== null) {
                  e.preventDefault();
                  const item = filteredOptions[activeIndex];
                  if (item !== undefined) {
                    handleSelect(item);
                  }
                } else if (e.key === 'Escape') {
                  setIsOpen(false);
                }
              }}
            >
              {searchable && (
                <S.SearchInput
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      const firstIndex = filteredOptions.length > 0 ? 0 : null;
                      setActiveIndex(firstIndex);
                      if (firstIndex !== null) {
                        listRef.current[firstIndex]?.focus();
                      }
                    }
                  }}
                  autoFocus
                />
              )}
              <S.MenuList>
                {filteredOptions.length === 0 ? (
                  <S.EmptyState>No options found</S.EmptyState>
                ) : (
                  filteredOptions.map((item, index) => {
                    const selected = isSelected(item);
                    const isActive = activeIndex === index;
                    if (renderItem) {
                      const customItem = renderItem(item, index, selected);
                      return (
                        <S.MenuItem
                          key={index}
                          type="button"
                          ref={(node) => {
                            listRef.current[index] = node;
                          }}
                          $isActive={isActive}
                          $isSelected={selected}
                          {...getItemProps({
                            onClick: () => !disabled && handleSelect(item),
                          })}
                          role="option"
                          aria-selected={selected}
                          tabIndex={isActive ? 0 : -1}
                        >
                          {customItem}
                        </S.MenuItem>
                      );
                    }
                    return defaultRenderItem(item, index, selected);
                  })
                )}
              </S.MenuList>
            </S.Menu>
          </FloatingFocusManager>,
          document.body
        )}
    </S.DropdownWrapper>
  );
}

Dropdown.displayName = 'Dropdown';

