export const AddressInfoSection = () => (
  <div>
    <h2 className="font-small-medium text-[var(--black)] mb-4">이렇게 검색해 보세요</h2>
    <div className="font-small-regular text-[var(--black)]">
      <div className="flex items-start gap-2">
        <div className="w-1 h-1 bg-[var(--gray)] rounded-full mt-2 flex-shrink-0"></div>
        <span className="text-[var(--black)]">도로명 + 건물번호 (위례성대로 2)</span>
      </div>
      <div className="flex items-start gap-2">
        <div className="w-1 h-1 bg-[var(--gray)] rounded-full mt-2 flex-shrink-0"></div>
        <span className="text-[var(--black)]">건물명 + 번지 (방이동 44-2)</span>
      </div>
      <div className="flex items-start gap-2">
        <div className="w-1 h-1 bg-[var(--gray)] rounded-full mt-2 flex-shrink-0"></div>
        <span className="text-[var(--black)]">건물명, 아파트명(반포자이, 분당 주공아파트)</span>
      </div>
    </div>
  </div>
);

export default AddressInfoSection;
