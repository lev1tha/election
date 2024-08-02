"use client";
import React, { useEffect, useState } from "react";
import { $api } from "@/shared/lib/api";

const Index = () => {
  const [voterPost, setVoterPost] = useState({ address: "", user: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVoterPost((prevData) => ({ ...prevData, address: value }));
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("useInfo");
    if (userInfo) {
      const userId = JSON.parse(userInfo).id;
      setVoterPost((prevData) => ({ ...prevData, user: userId }));
    }
  }, []);

  const handleSendVoter = () => {
    if (voterPost.address && voterPost.user) {
      $api
        .get(`voter/${voterPost.user}/`)
        .then((response) => {
          return $api.put(`voter/${voterPost.user}/`, voterPost);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return $api.post("voter/", voterPost);
          } else {
            console.error(error);
          }
        })
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    }
  };

  console.log(voterPost);

  return (
    <div>
      <input
        type="text"
        placeholder="Адрес проживания"
        value={voterPost.address}
        onChange={handleInputChange}
      />
      <button onClick={handleSendVoter}>Голосую</button>
    </div>
  );
};

export default Index;
