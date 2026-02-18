"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

export function DynamicPagination({
  totalPages,
  currentPage,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const siblingCount = 1; // عدد الصفحات جنب الحالية
  const pages: (number | "dots")[] = [];

  const left = Math.max(currentPage - siblingCount, 1);
  const right = Math.min(currentPage + siblingCount, totalPages);

  // أول صفحة
  if (left > 1) {
    pages.push(1);
  }

  // Ellipsis قبل
  if (left > 2) {
    pages.push("dots");
  }

  // الصفحات حول الحالية
  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  // Ellipsis بعد
  if (right < totalPages - 1) {
    pages.push("dots");
  }

  // آخر صفحة
  if (right < totalPages) {
    pages.push(totalPages);
  }

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

        {pages.map((item, index) => {
          if (item === "dots") {
            return (
              <PaginationItem key={`dots-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const isActive = currentPage === item;

          return (
            <PaginationItem key={item}>
              <PaginationLink
                onClick={() => onPageChange?.(item)}
                className={`rounded-full px-4 py-2 flex items-center justify-center cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#155DFC] to-[#193CB8] text-white"
                      : "bg-white text-[#155DFC] border border-[#155DFC] hover:bg-[#155DFC]/10"
                  }`}
              >
                {item}
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
