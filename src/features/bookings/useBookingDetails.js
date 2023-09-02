import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBookingDetails() {
  const { bookingId } = useParams();
  const { isLoading, data: bookingDetail } = useQuery({
    queryKey: ["bookingDetail", bookingId],
    queryFn: () => getBooking(bookingId),
  });
  return { isLoading, bookingDetail };
}
