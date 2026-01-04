import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.semantic.border.default};
`;

export const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const SelectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const BulkActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const TableWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.semantic.border.default};
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  border-bottom: 1px solid ${({ theme }) => theme.colors.semantic.border.default};
`;

export const Th = styled.th<{ $sortable?: boolean }>`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  text-align: left;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
  cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};
  user-select: none;

  &:hover {
    background-color: ${({ $sortable, theme }) =>
      $sortable ? theme.colors.semantic.background.base : 'transparent'};
  }
`;

export const ThContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.semantic.border.default};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.semantic.background.base};
  }
`;

export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.semantic.foreground.primary};
`;

export const PostTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const PostTitleText = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.semantic.foreground.primary};
`;

export const PostMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const PostDate = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
`;

export const TagsList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-wrap: wrap;
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.semantic.border.default};
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
`;

export const PaginationInfo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
`;

export const PaginationControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const TitleCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const PostImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const PostImagePlaceholder = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.semantic.foreground.tertiary};
`;

export const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.semantic.foreground.primary};
`;

export const FeaturedStar = styled.div`
  color: ${({ theme }) => theme.colors.primitive.amber['500']};
`;

export const Slug = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.semantic.foreground.tertiary};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
`;

export const AuthorCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const StatusBadge = styled.span`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const StatusPublished = styled(StatusBadge)`
  background-color: ${({ theme }) => theme.colors.semantic.status.success}20;
  color: ${({ theme }) => theme.colors.semantic.status.success};
`;

export const StatusDraft = styled(StatusBadge)`
  background-color: ${({ theme }) => theme.colors.semantic.foreground.secondary}20;
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
`;

export const StatusScheduled = styled(StatusBadge)`
  background-color: ${({ theme }) => theme.colors.semantic.brand.primary}20;
  color: ${({ theme }) => theme.colors.semantic.brand.primary};
`;

export const StatusArchived = styled(StatusBadge)`
  background-color: ${({ theme }) => theme.colors.semantic.foreground.tertiary}20;
  color: ${({ theme }) => theme.colors.semantic.foreground.tertiary};
`;

export const TagsCell = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-wrap: wrap;
`;

export const DateCell = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
`;

export const ActionsCell = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  justify-content: flex-end;
`;

export const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.semantic.border.default};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.duration.fast} ${({ theme }) => theme.transitions.easing.inOut};
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.semantic.background.base};
    border-color: ${({ theme }) => theme.colors.semantic.border.hover};
  }
`;

export const ActionButtonDanger = styled(ActionButton)`
  color: ${({ theme }) => theme.colors.semantic.status.error};

  &:hover {
    background-color: ${({ theme }) => theme.colors.semantic.status.error}10;
    border-color: ${({ theme }) => theme.colors.semantic.status.error};
  }
`;

export const SortIcon = styled.div`
  color: ${({ theme }) => theme.colors.semantic.foreground.tertiary};
`;

export const SortIconActive = styled(SortIcon)`
  color: ${({ theme }) => theme.colors.semantic.brand.primary};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[16]};
  text-align: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const ConfirmModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

export const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 8px;
`;

export const ModalDescription = styled.div`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 24px;
  line-height: 1.5;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const SvgIcon = styled.svg`
  display: block;
`;

