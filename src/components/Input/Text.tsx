import classNames from "classnames";
import { ReactNode, forwardRef } from "react";

interface Props {
  label: ReactNode | string;
  icon?: ReactNode | string | null;
  err: string | undefined;
}

const Text = forwardRef<HTMLInputElement, Props>(function Text(
  { label, icon, err, ...props },
  ref
) {
  return (
    <div className="my-2">
      <label>
        {label}
        <span className="mx-1 text-sm text-red-500">*</span>
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute px-2 top-1/2 -translate-y-1/2">{icon}</div>
        )}
        <input
          ref={ref}
          {...props}
          className={classNames(
            "w-full  outline-none border-none bg-gray-200 p-3 rounded-md",
            {
              "pl-8": icon,
            }
          )}
          type="text"
        />
      </div>
      <p className="text-red-500 text-xs">{err}</p>
    </div>
  );
});

export default Text;
