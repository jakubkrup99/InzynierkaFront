interface RoundDeleteButtonProps {
  onClick: () => void;
}

function RoundDeleteButton({ onClick }: RoundDeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-500"
    >
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 6l12 12M6 18L18 6"
        />
      </svg>
    </button>
  );
}

export default RoundDeleteButton;
