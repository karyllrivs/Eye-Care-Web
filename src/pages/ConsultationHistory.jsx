import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { CiViewList } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selector";
import axiosClient from "../utils/axiosClient";
import { formatDateToLong } from "../utils/formatter";

function ConsultationHistory() {
  const [consultations, setConsultations] = useState([]);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {

    const { _id } = currentUser;

    axiosClient
      .get("/consultations/" + _id)
      .then(({ data }) => {
        setConsultations(data);
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          alert(message);
        }
      );
  }, [currentUser]);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consultations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(consultations.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow pl-[20rem] pr-[4rem]">
          <div className="mt-10 px-8 lg:px-0">
            <h1 className="text-2xl font-bold text-[#384D6C] mb-4 underline pb-8">
              Consultation history
            </h1>

            <ul className="divide-y divide-gray-200 dark:divide-gray-700 mt-4 ml-14 mr-14">
              {currentItems.map((item, index) => (
                <li key={index} className="pb-4 sm:pb-6">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <CiViewList className="w-6 h-6 text-gray-900 " />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-black truncate ">
                        {formatDateToLong(item.date)}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-normal text-gray-900 gap-4">
                      <span>{item.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-end items-center fixed bottom-0 right-0 w-full bg-white py-4 pr-10">
              <button
                className="bg-gray-800 outline-2 outline-gray-800 text-white px-3 py-1 rounded-md disabled:opacity-50 mr-2"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <ul className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <li
                    key={index}
                    className={`px-3 py-1 cursor-pointer ${currentPage === index + 1
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200"
                      }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </li>
                ))}
              </ul>
              <button
                className="bg-gray-800 text-white px-3 py-1 rounded-md disabled:opacity-50 ml-2"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ConsultationHistory;
