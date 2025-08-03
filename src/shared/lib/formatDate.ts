import { format } from 'date-fns';

/**
 * 날짜 포맷팅 유틸 함수들
 */
export const formatDateToLocalDateTime = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

/**
 * 날짜를 한국 형식으로 포맷팅 (YYYY.MM.DD)
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '.')
    .replace(/\s/g, '')
    .replace(/\.$/, ''); // 마지막 점 제거
};

/**
 * 날짜와 시간을 한국 형식으로 포맷팅 (YYYY.MM.DD. 오전/오후 HH:MM)
 */
export const formatDateTime = (dateString: string): string => {
  return new Date(dateString)
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(/\./g, '.')
    .replace(/\s/g, '')
    .replace(/(오전|오후)/g, ' $1 ');
};

/**
 * 날짜를 간단한 형식으로 포맷팅 (MM/DD)
 */
export const formatShortDate = (dateString: string): string => {
  return new Date(dateString)
    .toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '/')
    .replace(/\s/g, '');
};

/**
 * 시간만 포맷팅 (오전/오후 HH:MM)
 */
export const formatTime = (dateString: string): string => {
  return new Date(dateString)
    .toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(/(오전|오후)/g, ' $1 ');
};

/**
 * 상대적 시간 포맷팅 (방금 전, N분 전, N시간 전, N일 전)
 */
export const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const targetDate = new Date(dateString);
  const diffInMs = now.getTime() - targetDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return '방금 전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  } else {
    return formatDate(dateString);
  }
};
