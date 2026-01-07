import { cn } from '../utils';

describe('cn', () => {
  it('combines multiple class names', () => {
    expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  });

  it('filters out falsy values', () => {
    expect(cn('class1', undefined, null, false, 'class2')).toBe('class1 class2');
  });

  it('handles empty array', () => {
    expect(cn()).toBe('');
  });

  it('handles all falsy values', () => {
    expect(cn(undefined, null, false)).toBe('');
  });

  it('handles single class name', () => {
    expect(cn('class1')).toBe('class1');
  });

  it('handles empty strings', () => {
    expect(cn('class1', '', 'class2')).toBe('class1 class2');
  });
});

