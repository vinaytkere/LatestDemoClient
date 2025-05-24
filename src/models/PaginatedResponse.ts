// models/PaginatedResponse.ts
export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
    pageNumber: number; // usually 1-based from backend
    pageSize: number;
    totalPages: number;
}  