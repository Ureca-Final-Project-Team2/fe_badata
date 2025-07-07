export interface ApiResponse<T> {
  code: number; // 20000이면 성공, 나머지는 에러
  message?: string;
  content: T | null; // 실제 응답 데이터 (성공 시 T, 실패 시 null)
}
