import { IPaginatedType } from 'src/types/query';

export function responseData<T>(
  items: any[],
  total: number,
  currentPage: number,
  totalPage: number,
): IPaginatedType<T> {
  return {
    items: items || [],
    total,
    currentPage: currentPage || 0,
    totalPage,
  };
}
