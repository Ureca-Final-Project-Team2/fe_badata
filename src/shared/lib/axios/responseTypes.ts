export interface ApiResponse<T> {
  code: number;
  message?: string;
  content: T;
}

export interface ErrorResponse {
  status: number;
  code?: number;
  message?: string;
  content?: null;
}
