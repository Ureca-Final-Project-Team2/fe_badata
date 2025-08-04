/**
 * 서버 프록시를 사용한 이미지 다운로드 유틸 함수들
 */

/**
 * 프록시 API를 통해 이미지 다운로드
 */
export const downloadImageViaProxy = async (
  imageUrl: string,
  fileName: string,
  onSuccess?: () => void,
  onError?: (error: string) => void,
): Promise<boolean> => {
  try {
    // 프록시 API를 통해 이미지 다운로드
    const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error('이미지 다운로드 실패');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onSuccess?.();
    return true;
  } catch (error) {
    console.error('프록시 다운로드 실패:', error);
    onError?.('이미지 다운로드에 실패했습니다.');
    return false;
  }
};

/**
 * 프록시 다운로드 실패 시 폴백으로 새 탭에서 이미지 열기
 */
export const openImageInNewTab = (imageUrl: string): void => {
  window.open(imageUrl, '_blank');
};

/**
 * 통합 이미지 다운로드 함수 (프록시 + 폴백)
 */
export const downloadImage = async (
  imageUrl: string,
  fileName: string,
  onSuccess?: () => void,
  onFallback?: () => void,
  onError?: (error: string) => void,
): Promise<void> => {
  // 1차: 프록시 다운로드 시도
  const success = await downloadImageViaProxy(imageUrl, fileName, onSuccess, onError);

  if (!success) {
    // 2차: 폴백으로 새 탭에서 열기
    openImageInNewTab(imageUrl);
    onFallback?.();
  }
};
