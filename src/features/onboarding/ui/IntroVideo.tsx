'use client';

import { useEffect, useRef, useState } from 'react';

interface IntroVideoProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function IntroVideo({ onComplete, onSkip }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      // 비디오가 로드되지 않았으면 로드 대기
      if (video.readyState < 2) {
        await new Promise((resolve) => {
          video.addEventListener('canplay', resolve, { once: true });
        });
      }

      // 재생 시도
      await video.play();
    } catch (error) {
      console.error('동영상 자동 재생 실패:', error);
      // 자동 재생이 실패하면 사용자에게 재생 버튼 표시
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 3초 후 스킵 버튼 표시
    const skipTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 3000);

    const handleVideoEnd = () => {
      setIsPlaying(false);
      onComplete();
    };

    const handleVideoPlay = () => {
      setIsPlaying(true);
    };

    const handleVideoPause = () => {
      setIsPlaying(false);
    };

    const handleVideoCanPlay = () => {
      setIsVideoReady(true);
      // 비디오가 준비되면 자동 재생 시도
      if (!isPlaying) {
        playVideo();
      }
    };

    const handleVideoLoadStart = () => {
      setIsVideoReady(false);
    };

    const handleVideoError = () => {
      console.error('동영상 로드 실패');
      setVideoError(true);
      setIsVideoReady(false);
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('play', handleVideoPlay);
    video.addEventListener('pause', handleVideoPause);
    video.addEventListener('canplay', handleVideoCanPlay);
    video.addEventListener('loadstart', handleVideoLoadStart);
    video.addEventListener('error', handleVideoError);

    // 비디오 로드 완료 후 자동 재생 시도
    if (video.readyState >= 2) {
      setIsVideoReady(true);
      playVideo();
    }

    return () => {
      clearTimeout(skipTimer);
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('play', handleVideoPlay);
      video.removeEventListener('pause', handleVideoPause);
      video.removeEventListener('canplay', handleVideoCanPlay);
      video.removeEventListener('loadstart', handleVideoLoadStart);
      video.removeEventListener('error', handleVideoError);
    };
  }, [onComplete, isPlaying]);

  const handleSkip = () => {
    onSkip();
  };

  const handleVideoClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error('동영상 재생 실패:', error);
      }
    } else {
      video.pause();
    }
  };

  // 동영상 로드 실패 시 로고 표시
  if (videoError) {
    return (
      <div className="relative min-h-screen bg-[var(--black)] flex items-center justify-center">
        <div className="text-center">
          <img src="/assets/intro-badata2" alt="바다타 온보딩" className="w-32 h-32 mx-auto mb-8" />
          <h1 className="font-head-semibold text-[var(--white)] mb-4">
            바다타에 오신 것을 환영합니다
          </h1>
          <p className="text-[var(--white)]/80 mb-8">
            안전하고 편리한 기프티콘 거래와 데이터 쉐어링 서비스입니다
          </p>
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-[var(--main-3)] text-[var(--white)] rounded-full hover:bg-[var(--main-2)] transition-colors"
          >
            시작하기
          </button>
        </div>

        {/* 스킵 버튼 */}
        {showSkipButton && (
          <button
            onClick={handleSkip}
            className="absolute top-8 right-4 px-4 py-2 bg-[var(--white)]/20 backdrop-blur-sm text-[var(--white)] rounded-full font-caption-medium hover:bg-[var(--white)]/30 transition-colors"
          >
            건너뛰기
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[var(--black)] flex items-center justify-center">
      {/* 동영상 */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        onClick={handleVideoClick}
        playsInline
        muted
        preload="auto"
      >
        <source src="/assets/intro-badata.mp4" type="video/mp4" />
        브라우저가 동영상을 지원하지 않습니다.
      </video>

      {/* 스킵 버튼 */}
      {showSkipButton && (
        <button
          onClick={handleSkip}
          className="absolute top-8 right-4 px-4 py-2 bg-[var(--white)]/20 backdrop-blur-sm text-[var(--white)] rounded-full font-caption-medium hover:bg-[var(--white)]/30 transition-colors"
        >
          건너뛰기
        </button>
      )}

      {/* 재생/일시정지 버튼 (자동 재생 실패 시 또는 비디오가 준비되지 않았을 때) */}
      {(!isPlaying || !isVideoReady) && (
        <button
          onClick={handleVideoClick}
          className="absolute inset-0 flex items-center justify-center bg-[var(--black)]/50"
        >
          <div className="w-16 h-16 bg-[var(--white)]/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            {!isVideoReady ? (
              <div className="w-8 h-8 border-2 border-[var(--white)] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                className="w-8 h-8 text-[var(--white)] ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </button>
      )}

      {/* 로딩 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-[var(--white)]/60 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-[var(--white)]/60 rounded-full animate-pulse"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="w-2 h-2 bg-[var(--white)]/60 rounded-full animate-pulse"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
