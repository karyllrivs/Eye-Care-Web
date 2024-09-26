import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ label, selectedDate, onChange, name }) => {
  const [startDate, setStartDate] = useState(selectedDate);

  const handleDateChange = (date) => {
    setStartDate(date); // Update the local state
    onChange(date); // Pass the selected date to the parent component
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700 text-sm font-bold mb-1">
        {label}
      </label>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        name={name}
        dateFormat="MM/dd/yyyy" // Specify the date format as MM/DD/YYYY
        className="w-full border rounded py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default CustomDatePicker;
