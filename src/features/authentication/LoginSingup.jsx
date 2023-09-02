import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isSigningUp } = useSignup();
  const { register, formState, handleSubmit, getValues, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  function onSubmit({ fullName, email, password }) {
    // e.preventDefault();
    // const { fullName, email, password } = data;
    signup(
      { fullName, email, password },
      {
        onSuccess: () => navigate("/login"),
        onSettled: () => reset(),
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
    // console.log();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isSigningUp}
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isSigningUp}
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.email?.message}
      >
        <Input
          disabled={isSigningUp}
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should have length of 8",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isSigningUp}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variations="secondary"
          onClick={() => navigate("/login", { replace: true })}
        >
          Cancel
        </Button>
        <Button>{isSigningUp ? <SpinnerMini /> : `Sign-Up`}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
