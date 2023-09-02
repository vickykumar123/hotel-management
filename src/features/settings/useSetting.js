import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting() {
  const query = useQuery({
    queryKey: ["setting"],
    queryFn: getSettings,
  });
  const { isLoading, data: settingsData, error } = query;

  return { isLoading, settingsData, error };
}
