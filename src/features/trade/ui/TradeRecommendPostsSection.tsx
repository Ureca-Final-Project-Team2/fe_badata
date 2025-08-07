import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useKakaoLogin } from '@/entities/auth/model/useKakaoLogin';
import { PATH } from '@/shared/config/path';

export default function TradeRecommendPostsSection() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const handleLogin = useKakaoLogin();

  return (
    <section className="mb-6">
      {isLoggedIn ? (
        <div>
          <h3 className="font-body-semibold pb-4 px-1 flex items-center gap-2">{`${user?.name}님이 좋아하실 만한 게시물 💙`}</h3>
          <div
            className="relative w-full h-[160px] p-6 rounded-3xl bg-gradient-to-br from-[var(--main-5)] via-[var(--main-4)] to-[var(--main-3)] overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl"
            onClick={() => router.push(PATH.RECOMMEND)}
          >
            {/* 배경 효과 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

            <div className="relative z-10 flex items-center h-full">
              <Image
                src="/images/swiper.png"
                width={100}
                height={120}
                alt="스와이프"
                className="drop-shadow-lg filter brightness-110"
              />

              <div className="flex-1">
                <p className="font-body-semibold text-white text-lg leading-relaxed drop-shadow-md">
                  스와이프 한 번으로
                  <br />
                  <span className="text-[var(--main-1)]">마음에 드는 게시물</span>을<br />
                  저장해보세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-body-semibold pb-4 px-1 flex items-center gap-2">
            추천 게시물 보러가기 🪼
          </h3>
          <div className="relative w-full h-full p-6 rounded-3xl bg-gradient-to-br from-[var(--main-4)] to-[var(--main-5)] overflow-hidden">
            {/* 배경 효과 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

            <div className="relative z-10 flex flex-row justify-center items-center h-full gap-3">
              <Image
                src="/images/lock.png"
                width={100}
                height={100}
                alt="자물쇠"
                className="drop-shadow-lg"
              />
              <div className="flex flex-col items-start justify-center gap-2">
                <p className="font-body-semibold text-white leading-relaxed drop-shadow-md">
                  로그인하고
                  <br />
                  <span className="text-[var(--main-1)]">추천 게시물</span>을 받아볼까요?
                </p>

                <button
                  className="bg-white font-label-semibold text-[var(--main-5)] px-4 py-2 rounded-lg cursor-pointer hover:scale-[1.02] transition-all duration-300"
                  onClick={handleLogin}
                >
                  로그인하러 가기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
