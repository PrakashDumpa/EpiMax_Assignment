const FormInputs = ({
  label,
  value,
  onChange,
  type,
  optionsData,
  required,
}) => {
  const renderInputs = () => {
    switch (type) {
      case "select":
        return (
          <select
            id={label}
            className={`form-control w-100`}
            value={value}
            onChange={onChange}
            required={required}
          >
            <>
              <option hidden>Select</option>
              {optionsData?.map((eachOption) => {
                return (
                  <option key={eachOption.id} value={eachOption.optionValue}>
                    {eachOption.name}
                  </option>
                );
              })}
            </>
          </select>
        );

      case "textarea":
        return (
          <textarea
            type={type}
            id={label}
            className={`form-control`}
            rows={3}
            value={value}
            onChange={onChange}
            required={required}
          />
        );

      default:
        return (
          <input
            id={label}
            className={`form-control `}
            type={type}
            value={value}
            required={required}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <div className="form-group ">
      <label htmlFor={label}>{label}</label>
      {renderInputs()}
    </div>
  );
};

export default FormInputs;
