"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
}

export function DynamicPagination({ totalPages, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const siblingCount = 1;
  const pages: (number | "dots")[] = [];

  const left = Math.max(currentPage - siblingCount, 1);
  const right = Math.min(currentPage + siblingCount, totalPages);

  if (left > 1) pages.push(1);
  if (left > 2) pages.push("dots");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < totalPages - 1) pages.push("dots");
  if (right < totalPages) pages.push(totalPages);

  return (
    <Pagination dir="ltr" className="justify-center mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
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
                onClick={() => handlePageChange(item)}
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

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            className="[&>span]:hidden cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
