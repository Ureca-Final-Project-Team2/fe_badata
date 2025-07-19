interface StatusButtonProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export const StatusButton = ({ label, selected = false, onClick }: StatusButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-full border text-sm font-medium
        ${
          selected
            ? 'bg-[#ADE7FF] text-black border-transparent'
            : 'bg-white text-gray-700 border border-gray-300'
        }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
