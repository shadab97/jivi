# Tech i used

- React + TypeScript + Tailwind + Vite + zod + react hook form

# components

## how to use

```JSX
interface Props {
  max: number;
  min: number;
  defaultValue?: number;
  label: string;
  dataLabel?: Array<number>;
  onChange: (value: number) => void;
  variant?: "primary" | "danger";
}

<Input.Slider
  dataLabel={[60, 120]}
  label="Heart Rate"
  onChange={(val) => {  }}
  max={120}
  min={60}
  defaultValue={60}
/>


```

```JSX

interface Props {
  label: ReactNode | string;
  icon?: ReactNode | string | null;
  err: string | undefined;
}
 <Input.Text
  err={errors?.name?.message?.toString()}
  {...form.register("name")}
  icon="🙋🏻‍♂️"
  label="Name"
/>

```

# run commands

I have used yarn
so yarn dev etc

- "dev": "vite",
- "build": "tsc && vite build",
- "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
- "preview": "vite preview"
