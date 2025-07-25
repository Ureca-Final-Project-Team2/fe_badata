/* 
    가맹점 좋아요 토글 응답
*/
export interface LikeStoreResponse {
  code: number;
  message: string | null;
  content: number | null; // 생성/삭제된 storeLike 아이디
}
