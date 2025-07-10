export const MyReportStatus = () => (
  <>
    <h2 className="font-semibold mb-2">신고 내역 조회</h2>
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div>
          <div className="text-lg font-bold">0</div>
          <div>신고 접수</div>
        </div>
        <div>
          <div className="text-lg font-bold">1</div>
          <div>신고 검토</div>
        </div>
        <div>
          <div className="text-lg font-bold">1</div>
          <div>신고 완료</div>
        </div>
      </div>
    </section>
  </>
);
