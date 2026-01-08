'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type RowSelectionState,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import {
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Typography, Button, Avatar, Chip, Checkbox, FocusLock } from 'aurigami';
import { useDeleteBlogPost, PostStatus, type BlogPostSummaryResponse } from '@repo/api';
import * as S from './posts-table.styles';

interface PostsTableProps {
  posts: BlogPostSummaryResponse[];
  isLoading?: boolean;
}

const columnHelper = createColumnHelper<BlogPostSummaryResponse>();

export function PostsTable({ posts, isLoading }: PostsTableProps) {
  const router = useRouter();
  const deletePost = useDeleteBlogPost();
  
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postsToDelete, setPostsToDelete] = useState<number[]>([]);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            aria-label={`Select ${row.original.title}`}
          />
        ),
      }),
      columnHelper.accessor('title', {
        header: 'Post',
        cell: ({ row }) => (
          <S.TitleCell>
            <S.TitleContent>
              <S.Title>
                {row.original.featured && (
                  <S.FeaturedStar as={Star} size={14} fill="currentColor" />
                )}{' '}
                {row.original.title}
              </S.Title>
              <S.Slug>/{row.original.slug}</S.Slug>
            </S.TitleContent>
          </S.TitleCell>
        ),
      }),
      columnHelper.accessor('author', {
        header: 'Author',
        cell: ({ row }) => (
          <S.AuthorCell>
            <Avatar
              src={row.original.author.avatarUrl}
              alt={`${row.original.author.firstName} ${row.original.author.lastName}`}
              size="sm"
            />
            <span>
              {row.original.author.firstName} {row.original.author.lastName}
            </span>
          </S.AuthorCell>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status;
          const StatusComponent = {
            [PostStatus.PUBLISHED]: S.StatusPublished,
            [PostStatus.DRAFT]: S.StatusDraft,
            [PostStatus.SCHEDULED]: S.StatusScheduled,
            [PostStatus.ARCHIVED]: S.StatusArchived,
          }[status];
          const statusIcons = {
            [PostStatus.PUBLISHED]: '✅',
            [PostStatus.DRAFT]: '📄',
            [PostStatus.SCHEDULED]: '🕐',
            [PostStatus.ARCHIVED]: '📦',
          };
          return (
            <StatusComponent>
              {statusIcons[status]} {status}
            </StatusComponent>
          );
        },
      }),
      columnHelper.accessor('tags', {
        header: 'Tags',
        cell: ({ row }) => (
          <S.TagsCell>
            {row.original.tags.slice(0, 2).map((tag) => (
              <Chip key={tag.id} size="sm">
                {tag.name}
              </Chip>
            ))}
            {row.original.tags.length > 2 && (
              <Chip size="sm" variant="outlined">
                +{row.original.tags.length - 2}
              </Chip>
            )}
          </S.TagsCell>
        ),
      }),
      columnHelper.accessor('viewCount', {
        header: 'Views',
        cell: ({ row }) => (
          <span>{row.original.viewCount.toLocaleString()}</span>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created',
        cell: ({ row }) => (
          <S.DateCell>
            {new Date(row.original.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </S.DateCell>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <S.ActionsCell>
            <S.ActionButton
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/posts/${row.original.id}`);
              }}
              title="Edit"
            >
              <Edit size={16} />
            </S.ActionButton>
            <S.ActionButtonDanger
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick([row.original.id]);
              }}
              title="Delete"
            >
              <Trash2 size={16} />
            </S.ActionButtonDanger>
          </S.ActionsCell>
        ),
      }),
    ],
    [router]
  );

  const table = useReactTable({
    data: posts,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  const handleDeleteClick = (ids: number[]) => {
    setPostsToDelete(ids);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await Promise.all(postsToDelete.map((id) => deletePost.mutateAsync(id)));
      setRowSelection({});
      setDeleteModalOpen(false);
      setPostsToDelete([]);
    } catch (error) {
      console.error('Failed to delete posts:', error);
    }
  };

  const handleBulkDelete = () => {
    const ids = selectedRows.map((row) => row.original.id);
    handleDeleteClick(ids);
  };

  const renderSortIcon = (columnId: string) => {
    const sortedColumn = sorting.find((s) => s.id === columnId);
    if (!sortedColumn) {
      return <S.SortIcon as={ChevronsUpDown} size={14} />;
    }
    return sortedColumn.desc ? (
      <S.SortIconActive as={ChevronDown} size={14} />
    ) : (
      <S.SortIconActive as={ChevronUp} size={14} />
    );
  };

  if (posts.length === 0 && !isLoading) {
    return (
      <S.TableWrapper>
        <S.EmptyState>
          <S.EmptyIcon>📝</S.EmptyIcon>
          <Typography variant="h3">No posts yet</Typography>
          <Typography variant="p">
            Create your first post to get started.
          </Typography>
        </S.EmptyState>
      </S.TableWrapper>
    );
  }

  return (
    <S.Container>
      {/* Toolbar */}
      <S.Toolbar>
        <S.ToolbarLeft>
          {selectedCount > 0 ? (
            <S.SelectionInfo>
              <Typography variant="caption">
                {selectedCount} post{selectedCount !== 1 ? 's' : ''} selected
              </Typography>
              <S.BulkActions>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setRowSelection({})}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleBulkDelete}
                  leftIcon={<Trash2 size={16} />}
                >
                  Delete Selected
                </Button>
              </S.BulkActions>
            </S.SelectionInfo>
          ) : (
            <Typography variant="caption">
              {posts.length} post{posts.length !== 1 ? 's' : ''} total
            </Typography>
          )}
        </S.ToolbarLeft>
        <S.ToolbarRight>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First
          </Button>
        </S.ToolbarRight>
      </S.Toolbar>

      {/* Table */}
      <S.TableWrapper>
        <S.Table>
          <S.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  return (
                    <S.Th
                      key={header.id}
                      $sortable={canSort}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <S.ThContent>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && renderSortIcon(header.column.id)}
                      </S.ThContent>
                    </S.Th>
                  );
                })}
              </tr>
            ))}
          </S.Thead>
          <S.Tbody>
            {table.getRowModel().rows.map((row) => (
              <S.Tr
                key={row.id}
                onClick={() => router.push(`/posts/${row.original.id}`)}
                style={{ cursor: 'pointer' }}
              >
                {row.getVisibleCells().map((cell) => (
                  <S.Td
                    key={cell.id}
                    onClick={cell.column.id === 'select' ? (e) => e.stopPropagation() : undefined}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </S.Td>
                ))}
              </S.Tr>
            ))}
          </S.Tbody>
        </S.Table>

        {/* Pagination */}
        <S.Pagination>
          <S.PaginationInfo>
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              posts.length
            )}{' '}
            of {posts.length} posts
          </S.PaginationInfo>
          <S.PaginationControls>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              leftIcon={<ChevronLeft size={16} />}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              rightIcon={<ChevronRight size={16} />}
            >
              Next
            </Button>
          </S.PaginationControls>
        </S.Pagination>
      </S.TableWrapper>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <S.ConfirmModal onClick={() => setDeleteModalOpen(false)}>
          <FocusLock>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
              <S.ModalTitle>
                Delete {postsToDelete.length} post{postsToDelete.length !== 1 ? 's' : ''}?
              </S.ModalTitle>
              <S.ModalDescription>
                This action cannot be undone. The selected posts will be permanently deleted.
              </S.ModalDescription>
              <S.ModalActions>
                <Button
                  variant="ghost"
                  onClick={() => setDeleteModalOpen(false)}
                  disabled={deletePost.isPending}
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleConfirmDelete}
                  disabled={deletePost.isPending}
                >
                  {deletePost.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </S.ModalActions>
            </S.ModalContent>
          </FocusLock>
        </S.ConfirmModal>
      )}
    </S.Container>
  );
}

