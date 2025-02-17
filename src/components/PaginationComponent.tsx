"use client";
import { FC } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface PaginationProps {
  pageCount: number;
}

interface PaginationArrowProps {
  direction: "left" | "right";
  href: string;
  isDisabled: boolean;
}

const PaginationArrow: FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled
}) => {
  const router = useRouter();
  const isLeft = direction === "left";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        router.push(href, { scroll: false });
      }}
      className={`pagination-arrow ${isDisabled ? "disabled" : ""}`}
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {isLeft ? "«" : "»"}
    </button>
  );
}

export function PaginationComponent({ pageCount } : Readonly<PaginationProps>) {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extraire la page actuelle des paramètres URL, sinon par défaut 1
  const currentPage = Number(searchParams.get("page")) || 1;

  // Fonction pour créer des URLs pour la pagination
  const createPageURL = (pageNumber: number | string) => {
    const urlSearchparams = new URLSearchParams(searchParams);
    urlSearchparams.set("page", pageNumber.toString());
    return `${pathname}?${urlSearchparams.toString()}`
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="pagination-nav">
        <ul className="pagination-list">
          {/* Left arrow - sauf si sur la première page */}
          <li>
            <PaginationArrow
              direction="left"
              href={createPageURL(currentPage - 1)}
              isDisabled={currentPage <= 1}
            />
          </li>
          {/* Indicateur de page actuelle */}
          <li>
            <span className="page-number">Page {currentPage}</span>
          </li>
          {/* Right arrow - sauf si dernière page */}
          <li>
            <PaginationArrow
              direction="right"
              href={createPageURL(currentPage + 1)}
              isDisabled={currentPage >= pageCount}
            />
          </li>
        </ul>
    </nav>
  );

}