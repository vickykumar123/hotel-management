import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetails } from "./useBookingDetails";
import Spinner from "../../ui/Spinner";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useEffect } from "react";
import { bookings } from "../../data/data-bookings";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingDetail, isLoading } = useBookingDetails();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBookings, isDeletingBooking } = useDeleteBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  useEffect(
    function () {
      if (!isLoading)
        document.title = `${bookingDetail?.guests?.fullName}-Booking Details`;
    },
    [isLoading, bookingDetail?.guests?.fullName]
  );

  if (isLoading) return <Spinner />;
  if (!bookingDetail) return <Empty resource="booking" />;
  const {
    id: bookingId,
    status,
    guests: { fullName },
  } = bookingDetail;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">
            {fullName} #{bookingId}
          </Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookingDetail} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            onClick={() => {
              checkout(bookingId);
            }}
          >
            Check out
          </Button>
        )}
        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
        <Modal>
          <Modal.Open opens="delete">
            <Button variations="danger" disabled={isDeletingBooking}>
              Delete Booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`${fullName} booking`}
              onConfirm={() => {
                deleteBookings(bookingId);
                navigate(-1);
              }}
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
