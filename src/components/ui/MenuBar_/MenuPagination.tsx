"use client";
import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import MenuCardList from "./MenuCardList";
import MenuCard_anim from "./MenuCard_anim";
type MenuPaginationProps = {
  pageData: Array<menuProductData>;
  category?: string;
  showCount?: number;
  showPage?: number;
};
const MenuPagination = ({
  pageData,
  showCount = 8,
  showPage = 1,
  category,
}: MenuPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(showPage);

  useLayoutEffect(() => {
    setCurrentPage(1);
  }, [pageData]);

  const totalPages = useMemo(
    () => Math.max(Math.ceil((pageData?.length || 0) / showCount), 1),
    [pageData, showCount]
  );

  const handlePagination = useCallback((res: string, count: number = 1) => {
    const setpage = (prev: number) => {
      switch (res) {
        case "const":
          return count ? count : 1;
        case "prev":
          return prev - count;
        case "next":
          return prev + count;
      }
    };

    setCurrentPage((prev) => {
      const newval = setpage(prev);
      return newval ? newval : 1;
    });
  }, []);

  return (
    <>
      <div className="MenuPagination">
        {
          //prev button
          pageData?.length && (
            <span
              className={`pageBtn ${currentPage == 1 ? "disabled" : ""}`}
              onClick={(e) => {
                currentPage === 1 ? null : handlePagination("prev");
              }}
            >
              Prev
            </span>
          )
        }
        <div className="pagination__num">
          {
            // first page number
            pageData?.length && (
              <span
                className={`pageNumBtn ${
                  // ""
                  currentPage - 1 <= 0 ||
                  currentPage - 2 <= 0 ||
                  currentPage - 3 <= 0
                    ? "hide"
                    : ""
                }`}
                onClick={(e) => {
                  handlePagination("const", 1);
                }}
              >
                {1}
              </span>
            )
          }
          {
            // scene between first page
            pageData?.length && (
              <span
                className={`pageSpaceBtn ${
                  // ""
                  currentPage - 1 <= 0 ||
                  currentPage - 2 <= 0 ||
                  currentPage - 3 <= 0
                    ? "hide"
                    : ""
                }  `}
              >
                ...
              </span>
            )
          }
          {
            // page prev prev to current page
            pageData?.length && (
              <span
                className={`pageNumBtn ${
                  // ""
                  currentPage - 2 > 0 ? "" : "hide"
                } `}
                onClick={(e) => {
                  handlePagination("prev", 2);
                }}
              >
                {currentPage - 2}
              </span>
            )
          }
          {
            // page prev to current page
            pageData?.length && (
              <span
                className={`pageNumBtn ${
                  // ""
                  currentPage - 1 > 0 ? "" : "hide"
                } `}
                onClick={(e) => {
                  handlePagination("prev", 1);
                }}
              >
                {currentPage - 1}
              </span>
            )
          }
          {
            // current page
            pageData?.length && (
              <span className={`pageNumBtn active`}>{currentPage}</span>
            )
          }
          {
            // page next to current page
            pageData?.length && (
              <span
                className={`pageNumBtn ${
                  // ""
                  currentPage + 1 <= totalPages ? "" : "hide"
                }  `}
                onClick={(e) => {
                  handlePagination("next", 1);
                }}
              >
                {currentPage + 1}
              </span>
            )
          }
          {
            // page next next to current page
            pageData?.length && (
              <span
                className={`pageNumBtn ${
                  // ""
                  currentPage + 2 <= totalPages ? "" : "hide"
                }   `}
                onClick={(e) => {
                  handlePagination("next", 2);
                }}
              >
                {currentPage + 2}
              </span>
            )
          }
          {
            // gap after current page
            pageData?.length && (
              <span
                className={`pageSpaceBtn ${
                  // ""
                  currentPage + 2 < totalPages ? "" : "hide"
                }   `}
              >
                ...
              </span>
            )
          }
          {
            // final last landing page
            pageData?.length && (
              <span
                className={`pageNumBtn ${
                  // ""
                  currentPage + 2 < totalPages ? "" : "hide"
                }  `}
                onClick={(e) => {
                  handlePagination("const", totalPages);
                }}
              >
                {totalPages}
              </span>
            )
          }
        </div>

        {
          // next button page
          pageData?.length && (
            <span
              className={`pageBtn ${currentPage == totalPages ? "disabled" : ""}`}
              onClick={(e) => {
                currentPage == totalPages ? null : handlePagination("next", 1);
              }}
            >
              Next
            </span>
          )
        }
      </div>
      <MenuCardList
        cardListData={pageData}
        cardListCurrentPage={currentPage}
        cardListShowData={showCount}
      />
      <MenuCard_anim
        selector={".MenuCard_Item"}
        depedency={[category ? category : "All", currentPage]}
      />
    </>
  );
};

export default MenuPagination;
