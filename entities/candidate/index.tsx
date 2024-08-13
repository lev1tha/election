"use client";
import React, { useState, useEffect } from "react";
import style from "./condidate.module.css";
import { $api } from "@/shared/lib/api";
import { useRouter } from "next/router";

interface InputArrayType {
  [key: string]: string;
}

const InputArray = [
  { id: "bio", value: "Биография", type: "textarea" },
  { id: "photo", value: "Ваше фото", type: "file" },
  { id: "party", value: "Партия", type: "text" },
];

const Index = () => {
  const [data, setData] = useState<InputArrayType>({});
  const [photo, setPhoto] = useState<File | null>(null);
  const route = useRouter();

  useEffect(() => {
    $api.get("auth/profile/").then((req) => setData(req.data));
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, files } = event.target as HTMLInputElement &
      HTMLTextAreaElement;

    if (files && files.length > 0) {
      setPhoto(files[0]);
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

    if (photo) {
      formData.append("photo", photo);
    }

    $api
      .post("candidates/", formData)
      .then((response) => {
        console.log("Success:", response.data);
        route.push("/");
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
            {input.type === "textarea" ? (
              <textarea
                id={input.id}
                onChange={handleInputChange}
                className={style.biotext}
              />
            ) : (
              <input
                id={input.id}
                type={input.type}
                onChange={handleInputChange}
                className={style.photo}
              />
            )}
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
