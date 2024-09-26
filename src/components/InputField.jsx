const InputField = ({ label, type, placeholder, name, value, onChange, icon }) => {
  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700 text-sm font-bold mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          className={`${icon ? "pl-10" : "pl-3"
            } pr-3 w-full border rounded py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
      </div>
    </div>
  );
};

export default InputField;
