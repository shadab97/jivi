import { forwardRef, ReactNode } from "react";
interface Props {
  label: ReactNode | string;
  icon?: ReactNode | string | null;
}

const gender = ["male", "female"];
const Select = forwardRef<HTMLSelectElement, Props>(function Text(
  { label, ...props },
  ref
) {
  return (
    <div className="flex my-2 flex-col">
      <label>
        {label}

        <span className="mx-1 text-sm text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          className="outline-none w-full   border-none bg-gray-200 p-3  rounded-md"
          ref={ref}
          {...props}
        >
          {gender.map((option) => (
            <option key={option} value={option}>
              {option.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default Select;
