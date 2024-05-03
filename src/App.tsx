import "./App.css";
import Input from "./components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";

const makeApiCall = async (data: User) => {
  return fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, userId: 1 }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};
const validationSchema = [
  z.object({
    heartRate: z.union([z.number(), z.string()]),
    bloodPressure: z.union([z.number(), z.string()]),
    name: z.string().min(3).max(20),
    dateOfBirth: z.string().min(1, "Select a date"), // select a date
    gender: z.enum(["male", "female"]),
  }),
];

// Get the type from the Zod schema
type User = z.infer<(typeof validationSchema)[0]>;

function App() {
  const [userData, setUserData] = useState<User | FieldValues | undefined>();
  const [isSubmitSuccessFull, setIsSubmitSuccessFull] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(validationSchema[0]),
  });
  const errors = form.formState.errors;
  const isSubmitSuccessful = form.formState.isSubmitSuccessful;

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    await makeApiCall(data).then((res) => {
      setIsSubmitSuccessFull(true);
      console.log("res", res);
      setIsLoading(false);
    });
  };
  return (
    <div className="">
      {/* header */}
      <section className="border-b border-asklepios-gray-200   p-4">
        <h1 className="font-bold text-base">
          {isSubmitSuccessFull ? "Preview" : "Details"}
        </h1>
      </section>

      {!isSubmitSuccessFull ? (
        <div className="container mx-auto my-4 px-4 ">
          {isSubmitSuccessful ? (
            <div className="flex flex-col gap-y-4 h-[calc(100vh-100px)]">
              <p className=" text-lg font-semibold">
                Please confirm your details to continue
              </p>
              <div className="space-y-4">
                {Object.entries(userData!)?.map(([label, val]) => (
                  <div key={label} className="text-lg ">
                    <span className="font-bold">{label}</span>:
                    <span className="pl-4">{val}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => {
                    if (userData) {
                      form.reset(userData);
                    }
                  }}
                  className="p-4 w-full rounded-md bg-slate-300"
                >
                  Edit
                </button>
                <button
                  disabled={isLoading}
                  onClick={() => handleSubmit(userData)}
                  className="p-4 w-full rounded-md bg-blue-500"
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          ) : (
            <form
              className="flex flex-col gap-y-4"
              onSubmit={form.handleSubmit(
                (val) => {
                  setUserData(val);
                  console.log(val);
                },
                (err) => {
                  console.log("error", err);
                }
              )}
            >
              <Input.Slider
                dataLabel={[60, 120]}
                label="Heart Rate"
                {...form.register("heartRate")}
                onChange={(val) => {
                  form.setValue("heartRate", Number(val));
                }}
                max={120}
                min={60}
                defaultValue={60}
              />

              <Input.Slider
                dataLabel={[120, 130, 150]}
                label="Blood pressure"
                {...form.register("bloodPressure")}
                onChange={(val) => {
                  form.setValue("bloodPressure", Number(val));
                }}
                max={150}
                min={120}
                variant="danger"
                defaultValue={120}
              />
              <Input.Text
                err={errors?.name?.message?.toString()}
                {...form.register("name")}
                icon="🙋🏻‍♂️"
                label="Name"
              />

              <Input.Date
                icon="📅"
                {...form.register("dateOfBirth")}
                label="Date of birth"
                err={errors?.dateOfBirth?.message?.toString()}
              />

              <Input.Select {...form.register("gender")} label="Gender" />
              <button
                className="w-full bg-blue-500 p-2 rounded-md text-white text-md"
                type="submit"
              >
                Next
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="px-4 flex flex-col  gap-4 my-4 h-[calc(100vh-100px)]">
          <div className="my-auto p-4">
            <p className="font-bold">Thank you</p>
            <p>Your details are saved successfuly</p>
          </div>

          <button
            onClick={() => window?.location?.reload()}
            className="p-4  mt-auto w-full rounded-md bg-blue-500"
          >
            Submit Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
