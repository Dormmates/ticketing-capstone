import React, { useState } from "react";
import logo from "../assets/images/cca-logo.png";
import { useAuthContext } from "../context/AuthContext";
import { ContentWrapper } from "./layout/Wrapper";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import TextInput, { PasswordInput } from "./ui/TextInput";

const Header = () => {
  const { user } = useAuthContext();
  const [userForm, setUserForm] = useState({
    firstName: user?.firstName + "",
    lastName: user?.lastName + "",
    email: user?.email + "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    contactNumber: user?.distributor.length !== 0 ? user?.distributor[0].contactNumber : "",
  });

  const [openAccount, setOpenAccount] = useState(false);

  const closeAccountModal = () => {
    setUserForm({
      firstName: user?.firstName + "",
      lastName: user?.lastName + "",
      email: user?.email + "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      contactNumber: user?.distributor.length !== 0 ? user?.distributor[0].contactNumber : "",
    });

    setOpenAccount(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[120px] z-50 bg-white border-b border-lightGrey ">
      <ContentWrapper className="h-full flex justify-between items-center">
        <div className="gap-10  items-center flex">
          <img className=" max-w-[150px] " src={logo} alt="cca logo" />
          <p className=" hidden sm:flex">CCCA Website</p>
        </div>
        <div className="flex gap-5 items-center">
          {user?.role !== "distributor" && <Button>Bell</Button>}

          <Button
            onClick={() => setOpenAccount(true)}
            variant="plain"
            className="flex flex-col bg-gray rounded-2xl items-start pl-2 pr-10 py-2  !text-black"
          >
            <p className="font-semibold ">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-lightGrey">{user?.role === "head" ? "CCA Head" : user?.role === "trainer" ? "CCA Trainer" : "Distributor"}</p>
          </Button>
        </div>
      </ContentWrapper>

      <Modal isOpen={openAccount} onClose={closeAccountModal} title="My Account Details" className="w-[95%] lg:w-[50%]">
        <ContentWrapper className="border border-lightGrey rounded-md mt-10">
          <div>
            <h1 className="text-xl mb-5">Basic Information</h1>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <TextInput label="First name" value={userForm.firstName} onChange={handleInputChange} name="firstName" />
                <TextInput label="Last name" value={userForm.lastName} onChange={handleInputChange} name="lastName" />
              </div>
              <div className="flex gap-5">
                <TextInput label="Email" value={userForm.email} onChange={handleInputChange} name="email" />
                {user?.distributor.length !== 0 && (
                  <TextInput
                    label="Contact Number"
                    type="number"
                    value={userForm.contactNumber + ""}
                    onChange={handleInputChange}
                    name="contactNumber"
                  />
                )}

                {user?.department[0]?.name && (
                  <TextInput label="Group (Cannot Edit)" disabled={true} value={user.department[0].name} onChange={() => {}} />
                )}
              </div>

              {user?.distributor.length !== 0 && (
                <div className="flex gap-5">
                  <TextInput
                    label="Distributor Type (Cannot Edit)"
                    disabled={true}
                    value={user?.distributor[0].distributortypes.name + ""}
                    onChange={() => {}}
                  />
                  {user?.distributor[0].distributortypes.id === 2 && (
                    <TextInput label="Department (Cannot Edit)" disabled={true} value={user.distributor[0].department.name} onChange={() => {}} />
                  )}
                </div>
              )}
            </div>
          </div>
        </ContentWrapper>

        <ContentWrapper className="border border-lightGrey rounded-md mt-10">
          <div>
            <h1 className="text-xl mb-5">Change Password</h1>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <PasswordInput label="Current Passowrd" value={userForm.currentPassword} onChange={handleInputChange} name="currentPassword" />
              </div>
              <div className="flex gap-5">
                <PasswordInput label="New Password" value={userForm.newPassword} onChange={handleInputChange} name="newPassword" />
                <PasswordInput label="Confirm New Password" value={userForm.confirmPassword} onChange={handleInputChange} name="confirmPassword" />
              </div>
            </div>
          </div>
        </ContentWrapper>
      </Modal>
    </header>
  );
};

export default Header;
