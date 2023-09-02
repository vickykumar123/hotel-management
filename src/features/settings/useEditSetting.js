import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSetting() {
  const queryClient = useQueryClient();
  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: (newSetting) => updateSetting(newSetting),
    onSuccess: () => {
      toast.success("Setting Edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["setting"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { editSetting, isEditing };
}
