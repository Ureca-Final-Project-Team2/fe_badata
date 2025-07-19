interface StatusButtonProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export const StatusButton = ({ label, selected = false, onClick }: StatusButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-full border ${
        selected ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-300'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
