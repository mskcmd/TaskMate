import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => (
  <div className="flex justify-center items-center space-x-4">
    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 transition"
    >
      <ChevronLeft />
    </button>
    <span className="text-gray-600">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="p-2 bg-gray-200 rounded-full disabled:opacity-50 hover:bg-gray-300 transition"
    >
      <ChevronRight />
    </button>
  </div>
);

export default PaginationControls;
