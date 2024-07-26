"use client";
import React, { useState, useEffect } from "react";
import { $api } from "@/shared/lib/api";

const Index = () => {
  const [viewProfile, setViewProfile] = useState<object | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    $api
      .get("auth/profile/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setViewProfile(response.data);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
      });
  }, []);

  return (
    <div>
      <h1>Profile Information</h1>
      {viewProfile ? (
        <pre>{JSON.stringify(viewProfile, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Index;
