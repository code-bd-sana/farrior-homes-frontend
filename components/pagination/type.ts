export interface PaginationData {
  currentPage: number;
  perPage: number;
  total: number;
  totalPages: number;
}
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total?: number;
  perPage?: number;
  onPageChange: (page: number) => void; // make it required
  maxButtons?: number;
}
