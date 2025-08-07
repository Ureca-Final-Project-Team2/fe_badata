export function AlarmNoticeSection() {
  return (
    <div className="mt-6 rounded-xl border-2 border-[var(--gray-light)] bg-[var(--white)] overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--main-1)]">
        <span className="font-body-xs-semibold text-[var(--main-5)]">ⓘ</span>
        <span className="font-body-xs-semibold text-[var(--black)]">이용안내</span>
      </div>
      <div className="px-3 pb-3 pt-3 bg-[var(--white)]">
        <ul className="list-disc pl-4 space-y-3">
          <li className="font-caption-medium text-[var(--gray-mid)]">
            기기의 입고 시점에 따라 1회 발송되고, 이미 발송된 재입고 알림은 다시 발송되지 않으므로
            고객님께서 확인 후 원하실 때만 알림을 다시 받고 싶으실 경우 해당 상품 페이지에서
            재신청해주시기 바랍니다.
          </li>
          <li className="font-caption-medium text-[var(--gray-mid)]">
            대여 기간 내에 기기가 재고로 되지 않게 되면 재입고 알림 신청 내역에서 자동으로
            삭제됩니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
