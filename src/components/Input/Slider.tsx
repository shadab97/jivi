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
  defaultValue: number;
  label: string;
  dataLabel?: Array<number>;
}

const Slider = forwardRef<HTMLInputElement, Props>(function Slider(
  { min, max, defaultValue, dataLabel, label, ...props },
  ref
) {
  const MAX = max;
  const MIN = min;
  const [slider, setSlider] = useState(defaultValue);
  const width = calculateSliderPercentage(
    Number(slider),
    Number(MIN),
    Number(MAX)
  );

  return (
    <div className="my-2">
      <label className="font-medium">{label}</label>

      <div className="relative mt-2">
        <div
          className="absolute z-[-10] top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent to-red-100"
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
            // onChange(value);
          }}
          min={MIN}
          max={MAX}
          style={{
            backgroundSize: `${width}% 100%`,
          }}
          value={slider}
          list="markers"
          className="w-full"
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
