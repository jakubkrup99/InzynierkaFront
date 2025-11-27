import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import PageSizeButton from "./PageSizeButton";

interface PaginationFooterProps {
  currentPage: number;
  totalPages: number;
  totalImages: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
}

function PaginationFooter({
  currentPage,
  totalImages,
  totalPages,
  onPageChange,
  onSizeChange,
}: PaginationFooterProps) {
  function handlePrevious() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <footer className=" bg-white border-t border-gray-200 shadow-lg mt-2">
      <div className="max-w-7xl mx-auto px-4 py-4 h-full">
        <div className="flex items-center justify-center flex-wrap gap-4">
          <div className="flex items-center gap-6 justify-center text-xl flex-wrap text-gray-600">
            <span className="font-semibold">
              Total Images: <span className="text-blue-600">{totalImages}</span>
            </span>
            <span className="font-semibold">
              Page: <span className="text-blue-600">{currentPage}</span> of{" "}
              <span className="text-blue-600">{totalPages}</span>
            </span>
            <div className="flex justify-center items-center gap-2">
              <span className="font-semibold">Page Size: </span>
              <PageSizeButton size={5} onClick={() => onSizeChange(5)} />
              <PageSizeButton size={10} onClick={() => onSizeChange(10)} />
              <PageSizeButton size={15} onClick={() => onSizeChange(15)} />
              <PageSizeButton size={30} onClick={() => onSizeChange(30)} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 p-2 rounded-lg font-semibold transition-colors text-white bg-blue-600`}
            >
              <MdKeyboardArrowLeft size={28} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-end gap-2 p-2 rounded-lg font-semibold transition-colors text-white bg-blue-600`}
            >
              <MdKeyboardArrowRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PaginationFooter;
