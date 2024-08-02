"use client";
import store from "@/entities/redux/store";
import React from "react";
import { Provider } from "react-redux";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default layout;
