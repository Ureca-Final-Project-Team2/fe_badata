export interface ReportStatus {
  questionCount: number;
  answerCount: number;
  completeCount: number;
}

export interface ReportStatusResponse {
  code: number;
  message: string | null;
  content: ReportStatus;
}
