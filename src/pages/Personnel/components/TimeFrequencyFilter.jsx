import { useMemo, useState } from "react";
import { filterAnnually, filterDaily, filterQuarterly, filterWeekly } from "../../../utils/timeFrequencyFilters";

const useTimeFrequencyFilter = (items) => {
    const [filter, setFilter] = useState("");

    const timeFrequencyFilteredItems = useMemo(() => {
        switch (filter) {
            case "daily":
                return filterDaily(items);
            case "weekly":
                return filterWeekly(items);
            case "quarterly":
                return filterQuarterly(items);
            case "annually":
                return filterAnnually(items);
            default:
                return items;
        }
    }, [filter, items]);

    const TimeFrequencyFilter =
        <select
            onChange={(e) => setFilter(e.target.value)} value={filter}
            className="block w-25 my-2 p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="">All Time Period</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
        </select>

    return [TimeFrequencyFilter, timeFrequencyFilteredItems]
};

export default useTimeFrequencyFilter;
