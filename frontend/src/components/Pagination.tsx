"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pageCount: number;
}

export default function Pagination({ pageCount }: PaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (pageCount <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Anterior</span>
        </Link>
      ) : (
        <span className="p-2 rounded-full border border-gray-200 text-gray-300 cursor-not-allowed">
          <ChevronLeft className="h-5 w-5" />
        </span>
      )}

      {/* Page Numbers - Simplified for now (showing simplified range or just prev/next if many) */}
       <span className="text-sm font-medium text-gray-700">
          Página {currentPage} de {pageCount}
       </span>

      {/* Next Button */}
      {currentPage < pageCount ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Siguiente</span>
        </Link>
      ) : (
        <span className="p-2 rounded-full border border-gray-200 text-gray-300 cursor-not-allowed">
          <ChevronRight className="h-5 w-5" />
        </span>
      )}
    </div>
  );
}
