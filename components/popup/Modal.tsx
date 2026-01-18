'use client';

export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center  backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 inset-shadow-sm inset-shadow-blue-500 rounded-xl p-4 w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
