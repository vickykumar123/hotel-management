import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      // console.log(user);
      toast.success(
        "Account created Successfully!, Please verify the user's email address"
      );
    },
  });
  return { signup, isSigningUp };
}
