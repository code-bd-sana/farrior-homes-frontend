import { PaginationData } from "@/components/pagination/type";

export interface TableControls {
  sortBy?: SortOption[];
  selectedSort?: string;
  onSortChange?: (value: string) => void;
  onPageChange: (page: number) => void;
}
export interface Action {
  text: string;
  link: string;
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
export interface UniversalTableProps {
  title: string;
  columns: string[];
  data: object[];
  pagination: PaginationData;
  controls?: TableControls;
  action: Action;
}
