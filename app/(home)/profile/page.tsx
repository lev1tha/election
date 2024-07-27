import React from "react";
import ProfileUI from "@/processes/profile/";
import Header from "@/widgets/header";

const Profile = () => {
  return (
    <>
      <Header />
      <div>
        <ProfileUI />
      </div>
    </>
  );
};

export default Profile;
