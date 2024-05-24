import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "./lib/types";
import Input from "./components/Input";
import Asterisk from "./components/Asterisk";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [selected, setSelected] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const formSubmit: SubmitHandler<TSignUpSchema> = (data) => {
    console.log("Form Data:", data);
    console.log("Errors:", errors);
    console.log("Is Submitting:", isSubmitting);
    toast.success(
      <div className="">
        <h1 className="text-lg font-semibold">Message Sent!</h1>
        <p className="text-sm">
          Thanks for completing the form. We'll be in touch soon!
        </p>
      </div>,
      {
        style: {
          padding: "16px",
          background: "#2b4246",
          color: "white",
        },
        iconTheme: {
          primary: "#00d26a",
          secondary: "white",
        },
      }
    );
    setSelected("");
    reset();
  };

  return (
    <main className="bg-[#dff1e7] px-2 py-4 sm:py-8 md:py-16 lg:py-24 flex justify-center items-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="font-custom bg-white rounded-lg md:rounded-xl px-4 py-6 md:px-8 md:py-8 space-y-6 text-sm md:text-base"
      >
        <h1 className="text-2xl md:text-3xl font-semibold">Contact Us</h1>
        <div className="space-y-6 md:space-y-0 md:space-x-4 md:flex items-center justify-center">
          <Input
            id="fname"
            text="First Name"
            register={register}
            errors={errors}
          />
          <Input
            id="lname"
            text="Last Name"
            register={register}
            errors={errors}
          />
        </div>
        <Input
          id="email"
          text="Email Address"
          register={register}
          errors={errors}
        />

        <div className="space-y-3">
          <label htmlFor="Queries" className="">
            Query Type <Asterisk />
          </label>
          <div
            id="Queries"
            className="space-y-2 md:space-y-0 md:space-x-4 md:flex"
          >
            <div
              className={`${
                selected === "queryType1" ? "bg-[#dff1e7] " : ""
              } py-3 w-full px-6 rounded-lg border-custom flex items-center `}
            >
              <input
                {...register("queryType")}
                type="radio"
                id="queryType1"
                value="queryType1"
                onChange={() => setSelected("queryType1")}
              />
              <label className="ml-2" htmlFor="queryType1">
                General Enquiry
              </label>
            </div>
            <div
              className={`${
                selected === "queryType2" ? "bg-[#dff1e7] " : ""
              } py-3 px-6 w-full rounded-lg border-custom flex items-center `}
            >
              <input
                {...register("queryType")}
                type="radio"
                id="queryType2"
                value="queryType2"
                onChange={() => setSelected("queryType2")}
              />
              <label className="ml-2" htmlFor="queryType2">
                Support Request
              </label>
            </div>
          </div>
          {errors.queryType && (
            <p className="text-red-600" role="alert" aria-live="assertive">
              {errors.queryType?.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message">
            Message <Asterisk />
          </label>
          <textarea
            {...register("message")}
            id="message"
            className="h-56 md:h-24 py-3 px-4 mt-2 w-full rounded-lg border-2 outline-none border-gray-500 ring-0 flex items-center resize-none"
          />
          {errors.message && (
            <p className="text-red-600 mt-2" role="alert" aria-live="assertive">
              {errors.message?.message}
            </p>
          )}
        </div>

        <div className="flex-col">
          <div className="flex checkbox">
            <input
              {...register("terms")}
              type="checkbox"
              id="terms"
              name="terms"
              className="p-2 border-2 rounded"
            />
            <label htmlFor="terms" className="py-2 px-6">
              I consent to being contacted by the team <Asterisk />
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-600 mt-2" role="alert" aria-live="assertive">
              {errors.terms?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="green w-full text-white py-2 px-4 rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
}

export default App;
