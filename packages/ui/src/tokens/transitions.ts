// Aurigami Animation System

export const duration = {
  fast: '150ms',
  base: '200ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

export const easing = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const transitions = {
  default: `all ${duration.base} ${easing.inOut}`,
  fast: `all ${duration.fast} ${easing.inOut}`,
  slow: `all ${duration.slow} ${easing.inOut}`,
  colors: `color ${duration.base} ${easing.inOut}, background-color ${duration.base} ${easing.inOut}, border-color ${duration.base} ${easing.inOut}`,
  transform: `transform ${duration.base} ${easing.inOut}`,
  opacity: `opacity ${duration.base} ${easing.inOut}`,
} as const;

export type DurationToken = typeof duration;
export type DurationKey = keyof typeof duration;
export type EasingToken = typeof easing;
export type EasingKey = keyof typeof easing;
export type TransitionToken = typeof transitions;
export type TransitionKey = keyof typeof transitions;
