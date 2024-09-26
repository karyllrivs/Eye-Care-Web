import { useEffect, useMemo, useState } from "react";

const usePagination = (data) => {

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  const indexOfLastItem = useMemo(
    () => currentPage * itemsPerPage,
    [currentPage, itemsPerPage]
  );
  const indexOfFirstItem = useMemo(
    () => indexOfLastItem - itemsPerPage,
    [indexOfLastItem, itemsPerPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [data])

  useEffect(() => {
    setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem))
  }, [data, indexOfFirstItem, indexOfLastItem]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const Pagination = (
    <ul className="flex justify-end">
      {Array(Math.ceil(data.length / itemsPerPage))
        .fill()
        .map((_, index) => (
          <li
            key={index}
            className={`cursor-pointer px-3 py-1 mx-1 my-1 border rounded-full ${currentPage === index + 1
              ? "bg-gray-500 text-white"
              : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </li>
        ))}
    </ul>
  );

  return [Pagination, currentItems];
};

export default usePagination;
