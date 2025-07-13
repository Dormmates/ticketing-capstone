import React, { useState } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { ContentWrapper } from "./layout/Wrapper";
import cca_logo from "../assets/images/cca-logo.png";
import TextInput from "./ui/TextInput";

const CustomerHeader = () => {
  const [openReservation, setOpenReservation] = useState(false);

  const handleSeachReservation = () => {
    setOpenReservation((prev) => !prev);
  };

  const closeSearchReservationModal = () => {};

  return (
    <header className="fixed top-0 left-0 w-full h-[120px] z-50 border-b border-b-slate-300">
      <ContentWrapper className="flex flex-row justify-between items-center">
        <img className="w-full max-w-[150px] max-h-[100px]" src={cca_logo} alt="" />
        <Button className="h-full max-h-[50px]" onClick={handleSeachReservation}>
          Search Reservation
        </Button>
      </ContentWrapper>

      <Modal isOpen={openReservation} onClose={closeSearchReservationModal} title="Search Reservation">
        <ContentWrapper>
          <h1>Test</h1>
        </ContentWrapper>
      </Modal>
    </header>
  );
};

export default CustomerHeader;
