const TimePicker = ({ label, id, required, name }) => {
  return (
    <div className="mb-4 relative">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="time"
          id={id}
          name={name}
          className="w-full border rounded py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required={required}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <svg
            className="h-6 w-6 text-gray-400"
            xmlns=""
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
