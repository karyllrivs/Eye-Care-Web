import { useMemo, useState } from 'react'

const useFilterSearch = (currentItems, columns) => {

    const [filteredData, setFilteredData] = useState(currentItems);
    const [filter, setFilter] = useState("");
    const [selectedColumn, setSelectedColumn] = useState(columns[0]);

    useMemo(() => {
        setFilteredData(currentItems);
    }, [currentItems, setFilteredData])

    const handleChange = (e) => {
        const newFilter = e.target.value.toLowerCase();
        setFilter(newFilter);
    
        // Filter based on the selected column
        const result = currentItems.filter((item) => {
            if (selectedColumn === "gender") {  // Handle gender filtering
                // Check if the first letter of gender matches the filter
                return String(item[selectedColumn]).toLowerCase().startsWith(newFilter);
            } else {
                return String(item[selectedColumn]).toLowerCase().includes(newFilter);
            }
        });
    
        setFilteredData(result);
    };
    
    const handleChangeColumn = (e) => {
        setSelectedColumn(e.target.value);
        resetList();
    }

    const resetList = () => {
        setFilter("");
        setFilteredData(currentItems);
    }

    const FilterSearch =
        <form className="max-w-sm my-2 flex gap-2">
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Filter by ${selectedColumn}`}
                    value={filter}
                    onChange={handleChange}
                />
            </div>
            {
                columns.length > 1 ?
                    <select
                        name="column"
                        onChange={handleChangeColumn}
                        value={selectedColumn} className="block p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 capitalize"
                    >
                        {columns.map((column, id) => <option key={id} value={column}>{column}</option>)}
                    </select>
                    :
                    null
            }
        </form>;

    return [FilterSearch, filteredData];

}

export default useFilterSearch