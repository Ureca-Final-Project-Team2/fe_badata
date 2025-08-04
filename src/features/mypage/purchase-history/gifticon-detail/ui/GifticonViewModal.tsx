'use client';

import { getPartnerDefaultImage } from '@/shared/lib/getPartnerDefaultImage';
import { makeToast } from '@/shared/lib/makeToast';
import { downloadImage } from '@/shared/lib/proxyImageDownload';
import { Modal } from '@/shared/ui/Modal';

import type { KoreanBrandName } from '@/shared/config/brandMapping';

interface GifticonViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  gifticonDetail: {
    title: string;
    partner: string;
  };
  gifticonImage?: {
    postImage?: string;
    couponNumber?: string;
  };
  isImageLoading: boolean;
  showWarning: boolean;
  onConfirmView: () => void;
}

export default function GifticonViewModal({
  isOpen,
  onClose,
  gifticonDetail,
  gifticonImage,
  isImageLoading,
  showWarning,
  onConfirmView,
}: GifticonViewModalProps) {
  const handleCopyCouponNumber = async () => {
    if (gifticonImage?.couponNumber) {
      try {
        await navigator.clipboard.writeText(gifticonImage.couponNumber);
        makeToast('쿠폰 번호가 복사되었습니다.', 'success');
      } catch (error) {
        console.error('클립보드 복사 실패:', error);
        makeToast('쿠폰 번호 복사에 실패했습니다.', 'warning');
      }
    }
  };

  const handleDownloadImage = () => {
    if (gifticonImage?.postImage && gifticonDetail) {
      downloadImage(
        gifticonImage.postImage,
        `${gifticonDetail.title}_쿠폰.png`,
        () => makeToast('쿠폰 이미지가 다운로드되었습니다.', 'success'),
        () => makeToast('새 탭에서 이미지가 열렸습니다. 이미지를 길게 눌러 저장하세요.', 'success'),
        (error) => makeToast(error, 'warning'),
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[var(--black)] font-body-semibold">쿠폰</h2>
          <button onClick={onClose} className="text-[var(--gray-mid)] hover:text-[var(--black)]">
            ✕
          </button>
        </div>

        {isImageLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--main-3)]"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 기프티콘 이미지 */}
            <div className="w-full h-[400px] rounded-[15px] overflow-hidden bg-[var(--gray-light)] relative">
              <img
                src={
                  gifticonImage?.postImage ||
                  getPartnerDefaultImage(gifticonDetail.partner as KoreanBrandName)
                }
                alt={gifticonDetail.title}
                className={`w-full h-full object-cover ${showWarning ? 'blur-md' : ''}`}
                onError={(e) => {
                  e.currentTarget.src = getPartnerDefaultImage(
                    gifticonDetail.partner as KoreanBrandName,
                  );
                }}
              />

              {/* 경고 오버레이 */}
              {showWarning && (
                <div className="absolute inset-0 bg-[var(--black)]/50 flex items-center justify-center">
                  <div className="rounded-[15px] p-6 mx-4 text-center max-w-sm">
                    <div className="w-12 h-12 bg-[var(--red)] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg leading-none">⚠️</span>
                    </div>
                    <h3 className="text-[var(--black)] font-body-semibold mb-2">
                      기프티콘 열람 및 다운로드 전 안내
                    </h3>
                    <p className="text-[var(--black)] font-label-regular mb-4 text-center">
                      기프티콘 이미지를 열람하거나 다운로드하실 경우 재판매 및 부정 사용 위험이
                      발생할 수 있습니다. 신중하게 확인해주세요.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={onClose}
                        className="flex-1 bg-[var(--gray-light)] text-[var(--gray-dark)] font-body-semibold py-2 rounded-[8px]"
                      >
                        취소
                      </button>
                      <button
                        onClick={onConfirmView}
                        className="flex-1 bg-[var(--red)] text-[var(--white)] font-body-semibold py-2 rounded-[8px]"
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 쿠폰 번호 */}
            {gifticonImage?.couponNumber && !showWarning && (
              <div className="text-center">
                <p className="text-[var(--gray-dark)] font-label-regular">쿠폰 번호</p>
                <p className="text-[var(--black)] font-label-semibold">
                  {gifticonImage.couponNumber}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {!showWarning && (
        <div className="p-4 space-y-3">
          <button
            onClick={handleCopyCouponNumber}
            className="w-full bg-[var(--main-5)] text-[var(--white)] font-body-semibold py-3 rounded-[10px]"
          >
            바코드 번호 복사
          </button>
          <button
            onClick={handleDownloadImage}
            className="w-full bg-[var(--white)] text-[var(--main-5)] font-body-semibold py-3 rounded-[10px] border border-[var(--main-5)]"
          >
            이미지 다운로드
          </button>
        </div>
      )}
    </Modal>
  );
}
