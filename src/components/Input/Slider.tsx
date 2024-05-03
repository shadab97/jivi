import classNames from "classnames";
import { forwardRef, useState } from "react";

function calculateSliderPercentage(
  value: number,
  min: number,
  max: number
): number {
  const range = max - min;
  const valueRelativeToMin = value - min;
  const percentage = (valueRelativeToMin / range) * 100;
  return Math.floor(percentage);
}
interface Props {
  max: number;
  min: number;
  defaultValue?: number;
  label: string;
  dataLabel?: Array<number>;
  onChange: (value: number) => void;
  variant?: "primary" | "danger";
}

const Slider = forwardRef<HTMLInputElement, Props>(function Slider(
  {
    min,
    max,
    variant = "primary",
    onChange,
    defaultValue,
    dataLabel,
    label,
    ...props
  },
  ref
) {
  const MAX = max;
  const MIN = min;
  const [slider, setSlider] = useState(defaultValue ?? 0);
  const width = calculateSliderPercentage(
    Number(slider),
    Number(MIN),
    Number(MAX)
  );
  const bgImage =
    variant === "primary"
      ? `linear-gradient(#298de5, #298de5)`
      : `linear-gradient(#ed2a2a, #ed2a2a)`;

  return (
    <div className="my-2">
      <label className="font-medium">{label}</label>

      <div className="relative mt-2">
        <div
          className={classNames(
            "absolute z-[-10] top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent ",
            {
              "to-red-300": variant === "danger",
              "to-blue-300": variant === "primary",
            }
          )}
          style={{
            height: "24px",
            width: `${width}%`,
            left: 0,
          }}
        ></div>

        <input
          ref={ref}
          {...props}
          onChange={(e) => {
            const value = e.target.valueAsNumber;
            setSlider(value);
            onChange(value);
          }}
          min={MIN}
          max={MAX}
          style={{
            backgroundSize: `${width}% 100%`,
            backgroundImage: bgImage,
          }}
          value={slider}
          list="markers"
          className={classNames("w-full bg-gradient-to-r", {
            "[&&::-webkit-slider-thumb]:bg-blue-500 ": variant === "primary",
            "[&&::-webkit-slider-thumb]:bg-red-500 ": variant === "danger",
          })}
          type="range"
        />
      </div>

      <datalist className="mt-2 flex justify-between" id="markers">
        {dataLabel?.map((each: number | string) => (
          <option key={each} value={each}>
            {each}
          </option>
        ))}
      </datalist>
    </div>
  );
});
export default Slider;
