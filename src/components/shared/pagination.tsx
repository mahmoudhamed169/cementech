"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  totalPages?: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

export function DynamicPagination({
  totalPages = 5,
  currentPage = 1,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <Pagination dir="ltr" className="justify-center mt-6">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange?.(currentPage - 1)}
            className="[&>span]:hidden cursor-pointer"
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isActive = currentPage === page;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange?.(page)}
                className={`relative rounded-full px-4 py-2 flex justify-center items-center cursor-pointer transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#155DFC] to-[#193CB8] text-white"
                    : "text-[#155DFC] bg-clip-text bg-gradient-to-r from-[#155DFC] to-[#193CB8] rounded-full border border-gradient-to-r from-[#155DFC] to-[#193CB8]"
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onPageChange?.(currentPage + 1)
            }
            className="[&>span]:hidden cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
