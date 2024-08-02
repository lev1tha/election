import React from "react";
import Candidate from "@/entities/candidate";
import Header from "@/widgets/header";

const page = () => {
  return (
    <>
      <Header />
      <div>
        <Candidate />
      </div>
    </>
  );
};

export default page;
