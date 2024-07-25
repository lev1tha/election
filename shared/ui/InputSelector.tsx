import React from "react";

interface PropsInputT {
  placeholder?: string;
  id: string;
  className?: string;
  type?: string;
  options?: { value: string; label: string }[];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const InputForm: React.FC<PropsInputT> = ({
  placeholder,
  id,
  className,
  type = "text",
  options,
  onChange,
}) => {
  if (type === "select" && options) {
    return (
      <select className={className} id={id} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input placeholder={placeholder} id={id} type={type} onChange={onChange} />
  );
};

export default InputForm;
