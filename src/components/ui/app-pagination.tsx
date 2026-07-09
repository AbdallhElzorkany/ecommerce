import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface AppPaginationProps {
  metadata: {
    currentPage: number;
    numberOfPages: number;
    nextPage?: number;
    prevPage?: number;
  };
  basePath: string;
}

export function AppPagination({ metadata, basePath }: AppPaginationProps) {
  const { currentPage, numberOfPages, nextPage, prevPage } = metadata;

  if (numberOfPages <= 1) return null;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (numberOfPages <= maxPagesToShow) {
      for (let i = 1; i <= numberOfPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "ellipsis", numberOfPages);
      } else if (currentPage >= numberOfPages - 2) {
        pageNumbers.push(
          1,
          "ellipsis",
          numberOfPages - 3,
          numberOfPages - 2,
          numberOfPages - 1,
          numberOfPages
        );
      } else {
        pageNumbers.push(
          1,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          numberOfPages
        );
      }
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        {prevPage && (
          <PaginationItem>
            <PaginationPrevious href={`${basePath}?page=${prevPage}`} />
          </PaginationItem>
        )}

        {renderPageNumbers().map((num, idx) => {
          if (num === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={num}>
              <PaginationLink
                href={`${basePath}?page=${num}`}
                isActive={num === currentPage}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {nextPage && (
          <PaginationItem>
            <PaginationNext href={`${basePath}?page=${nextPage}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
