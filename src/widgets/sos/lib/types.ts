// SOS 요청 응답 타입
export interface SosRequestResponse {
  code: number; 
  message: string | null;
  content: {
    sosId: number;
  };
}

// SOS 응답 응답 타입
export interface SosRespondResponse {
  code: number;
  message: string;
  content: {
    sosId: number;
    isSuccess: boolean;
  };
}
