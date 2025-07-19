interface StatusButtonProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export const StatusButton = ({ label, selected = false, onClick }: StatusButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      type="button"
      className={`
        px-4 py-2 rounded-md
        text-[length:var(--font-body-xs-semibold)] font-semibold
        ${selected ? 'bg-[var(--main-3)] text-[var(--black)]' : 'bg-white text-gray-700 border border-gray-300'}
      `}
    >
      {label}
    </button>
  );
};
