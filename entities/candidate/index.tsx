"use client";
import React, { useState } from "react";
import style from "./condidate.module.css";
import { $api } from "@/shared/lib/api";

interface InputArrayType {
  [key: string]: string;
}

const InputArray = [
  { id: "bio", value: "Биография", type: "text" },
  { id: "avatar", value: "", type: "file" },
];

const Index = () => {
  const [data, setData] = useState<InputArrayType>({});
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = event.target;

    if (files && files.length > 0) {
      setAvatar(files[0]);
    } else {
      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const sendCondidateInfo = () => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (avatar) {
      formData.append("avatar", avatar);
    }

    // Replace with your actual API endpoint and logic
    $api
      .post("candidates/")
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={style.container}>
      <h1>Отправка данных кандидата</h1>
      <form className={style.form}>
        {InputArray.map((input) => (
          <div key={input.id} className={style.inputGroup}>
            <label htmlFor={input.id}>{input.value}</label>
            <input
              id={input.id}
              type={input.type}
              onChange={handleInputChange}
              className={style.input}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={sendCondidateInfo}
          className={style.button}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Index;
