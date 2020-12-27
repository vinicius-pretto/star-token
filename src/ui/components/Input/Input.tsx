import * as React from "react";

interface Props {
  id: string;
  type: string;
  value: string;
  onChange: any;
  onBlur?: any;
  placeholder?: string;
  error?: any;
  touched?: any;
  maxLength?: number;
}

const Input = ({
  id,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  maxLength,
}: Props) => {
  const hasError = touched && error;

  return (
    <div className="input mb-sm form-group">
      <input
        id={id}
        type={type}
        className="input__field"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <p className={hasError ? "error" : "visibility-hidden"}>{error}</p>
    </div>
  );
};

export default Input;
