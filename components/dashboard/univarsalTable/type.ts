import { PaginationData } from "@/components/pagination/type";

export interface TableControls {
  sortBy?: SortOption[];
  selectedSort?: string;
  onSortChange?: (value: string) => void;
  onPageChange: (page: number) => void;
}

export interface UniversalTableProps {
  title: string;
  columns: string[];
  data: [];
  paginaton: PaginationData;
  controls?: TableControls;
}
export interface SortOption {
  label: string;
  value: string;
}

export interface TableControls {
  sortBy?: SortOption[];
  selectedSort?: string;
  onSortChange?: (value: string) => void;
  onPageChange: (page: number) => void;
}
