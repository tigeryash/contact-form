import { FieldErrors, UseFormRegister } from "react-hook-form";
import Asterisk from "./Asterisk";

type InputProps = {
  id: "fname" | "lname" | "email";
  text: string;
  register: UseFormRegister<{
    fname: string;
    lname: string;
    email: string;
    queryType: "queryType1" | "queryType2";
    message: string;
    terms: boolean;
  }>;
  errors: FieldErrors<{
    fname: string;
    lname: string;
    email: string;
    message: string;
    queryType: "queryType1" | "queryType2";
    terms: boolean;
  }>;
};
const Input = ({ id, text, register, errors }: InputProps) => {
  return (
    <div>
      <label htmlFor={id}>
        {text} <Asterisk />
      </label>
      <input
        {...register(id)}
        id={id}
        type="text"
        className=" py-3 mt-2 w-full px-4 rounded-lg border-custom"
      />
      {errors[id] && (
        <p className="text-red-600 mt-2" role="alert" aria-live="assertive">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};

export default Input;
