import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { PATH } from '@/shared/config/path';

export default function TradeRecommendPostsSection() {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();

  return (
    <section className="mb-6">
      {isLoggedIn ? (
        <div>
          <h3 className="font-body-semibold pb-4 px-1 flex items-center gap-2">{`${user?.name}님이 좋아하실 만한 게시물 💙`}</h3>
          <div
            className="relative w-full h-[160px] p-6 rounded-3xl bg-gradient-to-br from-[var(--main-5)] via-[var(--main-4)] to-[var(--main-3)] overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl"
            onClick={() => router.push(PATH.ROOT)}
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
          <div
            className="relative w-full h-[160px] p-6 rounded-3xl bg-gradient-to-br from-[var(--main-5)] via-[var(--main-4)] to-[var(--main-3)] overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl"
            onClick={() => router.push(PATH.MYPAGE.LIKE_POST)}
          >
            {/* 배경 효과 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

            <div className="relative z-10 flex items-center h-full gap-6">
              <Image
                src="/images/lock.png"
                width={80}
                height={120}
                alt="자물쇠"
                className="drop-shadow-lg "
              />

              <div className="flex-1">
                <p className="font-body-semibold text-white text-lg leading-relaxed drop-shadow-md">
                  로그인을 하면
                  <br />
                  <span className="text-[var(--main-1)]">추천 게시물</span>을<br />
                  제공받을 수 있어요!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
