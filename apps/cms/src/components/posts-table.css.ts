import { style, keyframes } from '@vanilla-extract/css';

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(-8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const container = style({
  width: '100%',
});

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '0.75rem 0.75rem 0 0',
  borderBottom: '1px solid #e5e7eb',
  gap: '1rem',
  flexWrap: 'wrap',
});

export const toolbarLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const toolbarRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const selectionInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.5rem 1rem',
  backgroundColor: '#eff6ff',
  borderRadius: '0.5rem',
  animation: `${fadeIn} 0.2s ease-out`,
});

export const bulkActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const tableWrapper = style({
  backgroundColor: 'white',
  borderRadius: '0 0 0.75rem 0.75rem',
  overflow: 'hidden',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.875rem',
});

export const thead = style({
  backgroundColor: '#f9fafb',
  borderBottom: '1px solid #e5e7eb',
});

export const th = style({
  padding: '0.75rem 1rem',
  textAlign: 'left',
  fontWeight: 600,
  color: '#374151',
  whiteSpace: 'nowrap',
  ':first-child': {
    paddingLeft: '1.5rem',
    width: '48px',
  },
});

export const thSortable = style({
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background-color 0.15s',
  ':hover': {
    backgroundColor: '#f3f4f6',
  },
});

export const sortIcon = style({
  display: 'inline-flex',
  marginLeft: '0.25rem',
  opacity: 0.5,
});

export const sortIconActive = style({
  opacity: 1,
  color: '#2563eb',
});

export const tr = style({
  borderBottom: '1px solid #e5e7eb',
  transition: 'background-color 0.15s',
  ':hover': {
    backgroundColor: '#f9fafb',
  },
  ':last-child': {
    borderBottom: 'none',
  },
});

export const trSelected = style({
  backgroundColor: '#eff6ff',
  ':hover': {
    backgroundColor: '#dbeafe',
  },
});

export const td = style({
  padding: '1rem',
  verticalAlign: 'middle',
  ':first-child': {
    paddingLeft: '1.5rem',
    width: '48px',
  },
});

export const titleCell = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const postImage = style({
  width: '64px',
  height: '48px',
  borderRadius: '0.375rem',
  objectFit: 'cover',
  backgroundColor: '#f3f4f6',
  flexShrink: 0,
});

export const postImagePlaceholder = style({
  width: '64px',
  height: '48px',
  borderRadius: '0.375rem',
  backgroundColor: '#f3f4f6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#9ca3af',
  flexShrink: 0,
});

export const titleContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  minWidth: 0,
});

export const title = style({
  fontWeight: 600,
  color: '#111827',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '300px',
});

export const slug = style({
  fontSize: '0.75rem',
  color: '#6b7280',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const authorCell = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const statusBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  padding: '0.25rem 0.5rem',
  borderRadius: '9999px',
  fontSize: '0.75rem',
  fontWeight: 500,
});

export const statusPublished = style({
  backgroundColor: '#dcfce7',
  color: '#166534',
});

export const statusDraft = style({
  backgroundColor: '#f3f4f6',
  color: '#374151',
});

export const statusScheduled = style({
  backgroundColor: '#fef3c7',
  color: '#92400e',
});

export const statusArchived = style({
  backgroundColor: '#fee2e2',
  color: '#991b1b',
});

export const dateCell = style({
  color: '#6b7280',
  whiteSpace: 'nowrap',
});

export const actionsCell = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  justifyContent: 'flex-end',
});

export const actionButton = style({
  padding: '0.5rem',
  borderRadius: '0.375rem',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#6b7280',
  transition: 'all 0.15s',
  ':hover': {
    backgroundColor: '#f3f4f6',
    color: '#111827',
  },
});

export const actionButtonDanger = style({
  ':hover': {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
});

export const pagination = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 1.5rem',
  borderTop: '1px solid #e5e7eb',
  backgroundColor: 'white',
  borderRadius: '0 0 0.75rem 0.75rem',
});

export const paginationInfo = style({
  color: '#6b7280',
  fontSize: '0.875rem',
});

export const paginationButtons = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const emptyState = style({
  padding: '4rem 2rem',
  textAlign: 'center',
});

export const emptyIcon = style({
  fontSize: '3rem',
  marginBottom: '1rem',
});

export const confirmModal = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 50,
  animation: `${fadeIn} 0.15s ease-out`,
});

export const modalContent = style({
  backgroundColor: 'white',
  borderRadius: '0.75rem',
  padding: '1.5rem',
  maxWidth: '400px',
  width: '90%',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
});

export const modalTitle = style({
  fontSize: '1.125rem',
  fontWeight: 600,
  marginBottom: '0.5rem',
});

export const modalDescription = style({
  color: '#6b7280',
  marginBottom: '1.5rem',
});

export const modalActions = style({
  display: 'flex',
  gap: '0.75rem',
  justifyContent: 'flex-end',
});

export const svgIcon = style({
  width: '1rem',
  height: '1rem',
});

export const featuredStar = style({
  color: '#f59e0b',
});

export const tagsCell = style({
  display: 'flex',
  gap: '0.25rem',
  flexWrap: 'wrap',
});

