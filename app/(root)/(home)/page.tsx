"use client";
import { $api } from "@/shared/lib/api";
import Header from "@/widgets/header";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    $api.get("auth/profile/").then((req) => {
      localStorage.setItem("useInfo", JSON.stringify(req.data));
    });
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;
