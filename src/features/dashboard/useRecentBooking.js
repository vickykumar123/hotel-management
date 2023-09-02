import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBooking() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString(); //this is basically for filtering of data. subDays from date-fns will substract date from now.

  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { booking, isLoading };
}
