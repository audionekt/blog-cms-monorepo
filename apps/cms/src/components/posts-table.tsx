'use client';

import React, { useState, useMemo } from 'react';
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
  Eye,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Star,
  ImageIcon,
} from 'lucide-react';
import { Typography, Button, Avatar, Chip, Checkbox } from 'aurigami';
import { useDeleteBlogPost, PostStatus, type BlogPostSummaryResponse } from '@repo/api';
import * as styles from './posts-table.css';

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
          <div className={styles.titleCell}>
            {row.original.featuredImageUrl ? (
              <img
                src={row.original.featuredImageUrl}
                alt=""
                className={styles.postImage}
              />
            ) : (
              <div className={styles.postImagePlaceholder}>
                <ImageIcon size={20} />
              </div>
            )}
            <div className={styles.titleContent}>
              <div className={styles.title}>
                {row.original.featured && (
                  <Star size={14} className={styles.featuredStar} fill="currentColor" />
                )}{' '}
                {row.original.title}
              </div>
              <div className={styles.slug}>/{row.original.slug}</div>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('author', {
        header: 'Author',
        cell: ({ row }) => (
          <div className={styles.authorCell}>
            <Avatar
              src={row.original.author.avatarUrl}
              alt={`${row.original.author.firstName} ${row.original.author.lastName}`}
              size="sm"
            />
            <span>
              {row.original.author.firstName} {row.original.author.lastName}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status;
          const statusStyles = {
            [PostStatus.PUBLISHED]: styles.statusPublished,
            [PostStatus.DRAFT]: styles.statusDraft,
            [PostStatus.SCHEDULED]: styles.statusScheduled,
            [PostStatus.ARCHIVED]: styles.statusArchived,
          };
          const statusIcons = {
            [PostStatus.PUBLISHED]: '✅',
            [PostStatus.DRAFT]: '📄',
            [PostStatus.SCHEDULED]: '🕐',
            [PostStatus.ARCHIVED]: '📦',
          };
          return (
            <span className={`${styles.statusBadge} ${statusStyles[status]}`}>
              {statusIcons[status]} {status}
            </span>
          );
        },
      }),
      columnHelper.accessor('tags', {
        header: 'Tags',
        cell: ({ row }) => (
          <div className={styles.tagsCell}>
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
          </div>
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
          <span className={styles.dateCell}>
            {new Date(row.original.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className={styles.actionsCell}>
            <button
              className={styles.actionButton}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/posts/${row.original.id}`);
              }}
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              className={`${styles.actionButton} ${styles.actionButtonDanger}`}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick([row.original.id]);
              }}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
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
      return <ChevronsUpDown size={14} className={styles.sortIcon} />;
    }
    return sortedColumn.desc ? (
      <ChevronDown size={14} className={`${styles.sortIcon} ${styles.sortIconActive}`} />
    ) : (
      <ChevronUp size={14} className={`${styles.sortIcon} ${styles.sortIconActive}`} />
    );
  };

  if (posts.length === 0 && !isLoading) {
    return (
      <div className={styles.tableWrapper}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <Typography variant="h3">No posts yet</Typography>
          <Typography variant="p">
            Create your first post to get started.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          {selectedCount > 0 ? (
            <div className={styles.selectionInfo}>
              <Typography variant="caption">
                {selectedCount} post{selectedCount !== 1 ? 's' : ''} selected
              </Typography>
              <div className={styles.bulkActions}>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setRowSelection({})}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleBulkDelete}
                  leftIcon={<Trash2 className={styles.svgIcon} />}
                >
                  Delete Selected
                </Button>
              </div>
            </div>
          ) : (
            <Typography variant="caption">
              {posts.length} post{posts.length !== 1 ? 's' : ''} total
            </Typography>
          )}
        </div>
        <div className={styles.toolbarRight}>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  return (
                    <th
                      key={header.id}
                      className={`${styles.th} ${canSort ? styles.thSortable : ''}`}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && renderSortIcon(header.column.id)}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`${styles.tr} ${row.getIsSelected() ? styles.trSelected : ''}`}
                onClick={() => router.push(`/posts/${row.original.id}`)}
                style={{ cursor: 'pointer' }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={styles.td}
                    onClick={cell.column.id === 'select' ? (e) => e.stopPropagation() : undefined}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              posts.length
            )}{' '}
            of {posts.length} posts
          </div>
          <div className={styles.paginationButtons}>
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
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className={styles.confirmModal} onClick={() => setDeleteModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTitle}>
              Delete {postsToDelete.length} post{postsToDelete.length !== 1 ? 's' : ''}?
            </div>
            <div className={styles.modalDescription}>
              This action cannot be undone. The selected posts will be permanently deleted.
            </div>
            <div className={styles.modalActions}>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

