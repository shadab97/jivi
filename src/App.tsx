import "./App.css";
import Input from "./components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  heartRate: z.number(),
  bloodPressure: z.number(),
  name: z.string(),
  dateOfBirth: z.date(),
  gender: z.enum(["male", "female"]),
  weight: z.union([z.number(), z.null()]),
  weightMetric: z.enum(["kg", "lb"]),
  height: z.union([z.number(), z.null()]),
  heightMetric: z.enum(["cm", "in"]),
  age: z.union([z.number(), z.null()]),
});
// Get the type from the Zod schema
type User = z.infer<typeof schema>;

function App() {
  // const [userData, _] = useState<User>({
  //   name: "",
  //   heartRate: 0,
  //   bloodPressure: 0,
  //   dateOfBirth: new Date(),
  //   gender: "male",
  //   weight: null,
  //   weightMetric: "kg",
  //   height: null,
  //   heightMetric: "cm",
  //   age: null,
  // });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(schema) });

  console.log("errors", { errors });
  return (
    <div className="">
      {/* header */}
      <section className="border-b border-asklepios-gray-200  p-4">
        <h1 className="font-bold text-base">Details</h1>
      </section>
      {/*range slider component */}
      {/* {JSON.stringify(userData, null, "\t")} */}

      <div className="container mx-auto my-4 px-4">
        <form>
          <Input.Slider
            defaultValue={0}
            label="Heart Rate"
            {...register("heartRate")}
            max={120}
            min={60}
          />
          <Input.Slider
            dataLabel={[120, 130, 150]}
            defaultValue={0}
            label="Blood pressure"
            {...register("bloodPressure")}
            max={150}
            min={120}
          />
          <Input.Text {...register("name")} icon="🙋🏻‍♂️" label="Name" />
          <Input.Date
            icon="📅"
            {...register("dateOfBirth")}
            label="Date of birth"
          />
          <button
            className="w-full bg-blue-500 p-2 rounded-md text-white text-md"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit((value) => {
                console.log("submit", value);
              });
            }}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
