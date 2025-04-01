import FilterIcon from '@/core/components/icons/filter-icon';
import SortIcon from '@/core/components/icons/sort.icon';
import { cn } from '@/core/lib/utils';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { QuickFilterInput } from './quick-input-filter';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

type SortType = 'asc' | 'desc';

type Column = {
  header: React.ReactNode;
  accessorKey: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  minWidth?: number;
  maxWidth?: number;
};

interface DataTableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  columns: Column[];
  onSort?: (key: string, sortType: SortType) => void;
}

interface DataTableFiltersPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onToggleFilters?: () => void;
  onSearch: (search: string) => void;
  filtersSelected?: string[];
}

const alignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const DataTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <Table ref={ref} className={cn('table-auto', className)} {...props} />
));

const AppSortIcon = ({
  column,
  sortKey,
  sortOrder,
}: {
  column: Column;
  sortKey: string | null;
  sortOrder: SortType;
  className?: string;
}) => {
  return (
    <SortIcon
      className={
        sortKey === column.accessorKey && sortOrder === 'desc'
          ? 'rotate-0'
          : 'rotate-180'
      }
    />
  );
};

const DataTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  DataTableHeaderProps
>(({ className, columns, onSort, ...props }, ref) => {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<SortType>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      return;
    }
    setSortKey(key);
    setSortOrder('desc');
  };

  useEffect(() => {
    if (sortKey) onSort?.(sortKey, sortOrder);
  }, [onSort, sortKey, sortOrder]);

  return (
    <TableHeader ref={ref} className={cn(className)} {...props}>
      <TableRow className="hover:bg-transparent">
        {columns.map((column) => (
          <TableHead
            key={column.accessorKey}
            className={cn(
              'px-4 border-b border-gray-250 h-16 hover:bg-slate-100/50',
              column.sortable ? 'cursor-pointer' : '',
              column.minWidth ? `min-w-['${column.minWidth}px']` : '',
              column.maxWidth ? `max-w-['${column.maxWidth}px']` : ''
            )}
            onClick={() => column.sortable && handleSort(column.accessorKey)}
          >
            <div
              className={`relative flex items-center gap-3 ${
                alignMap[column.align || 'left']
              }`}
            >
              {typeof column.header === 'string' ? (
                <p className="m-0 w-full text-nowrap font-medium text-foreground text-base">
                  {column.header}
                </p>
              ) : (
                column.header
              )}
              {column.sortable && (
                <AppSortIcon
                  column={column}
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                />
              )}
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
});

const DataTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <TableBody ref={ref} className={cn(className)} {...props} />
));

const DataTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <TableRow ref={ref} className={cn(className)} {...props} />
));

const DataTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <TableCell
    ref={ref}
    className={cn('border-gray-250 border-b py-3 text-gray-500', className)}
    {...props}
  />
));

const DataTableFiltersPanel = React.forwardRef<
  HTMLDivElement,
  DataTableFiltersPanelProps
>(
  (
    { className, onToggleFilters, onSearch, filtersSelected, ...props },
    ref
  ) => {
    const { t } = useTranslation();

    const formatFiltersDisplay = useCallback(
      (filters: string[], t: (key: string) => string) => {
        if (filters.length === 1) {
          return filters[0];
        }

        const allFiltersButLast = filters.slice(0, -1).join(', ');
        const lastFilter = filters[filters.length - 1];

        return `${allFiltersButLast} ${t(
          'common:filter_conjuction'
        )} ${lastFilter}`;
      },
      []
    );

    return (
      <div
        className={cn('flex justify-between items-center mb-4', className)}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          {t('common:search_here')}
          <QuickFilterInput onFilter={onSearch} />
        </div>
        <div className="flex items-center gap-1">
          {filtersSelected && filtersSelected.length > 0 && (
            <span className="text-sm font-normal text-gray-400">
              {t('common:filters_applied')}{' '}
              {formatFiltersDisplay(filtersSelected, t)}
            </span>
          )}
          {onToggleFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFilters}
              className="relative"
            >
              <FilterIcon />
              {filtersSelected && filtersSelected?.length > 0 && (
                <div className="absolute top-2 right-1 translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow">
                      {filtersSelected.length}
                    </span>
                  </div>
                </div>
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

export {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableFiltersPanel,
  DataTableHeader,
  DataTableRow,
  type Column,
  type SortType,
};
