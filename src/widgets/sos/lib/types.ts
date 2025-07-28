export interface SosRequestResponse {
  code: number;
  message: string | null;
  content: {
    sosId: number;
  };
}

export interface SosRespondResponse {
  code: number;
  message: string | null;
  content: {
    sosId: number;
    isSuccess: boolean;
  };
}

export interface SosRequest {
  sosId: number;
}

export interface SosRespond {
  sosId: number;
  isSuccess: boolean;
} 